import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import { Map, View } from 'ol';
import VectorImageLayer from 'ol/layer/VectorImage';
import GeoJSON from 'ol/format/GeoJSON';
import { Fill, Stroke, Style } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import { Endpoints } from '../../constants/endpoints';
import { CommunicationService } from '../../services/communication.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: Map;

  countriesVectorImageLayer: VectorImageLayer;

  callbackPointerMoveMapEvent: any;

  callbackClickMapEvent: any;

  isCountryHighlighted: any = null

  countriesSuccessful: any[] = new Array();


  constructor(private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.initMap();
    this.subscribeToService();
  }

  //This function susbscribess to communicationService to get info/data from other components
  subscribeToService() {
    this.communicationService.getFlagSelected().subscribe((data) => {
      if (data !== null && data !== undefined) {
        this.registerMapEvents();
      }
    });
    this.communicationService.getSuccessfulCountry().subscribe((data) => {
      this.manageSuccessfulCountry(data);
    });
  }

  //This function initializes the map and layer object
  initMap() {
    let initialStyle = new Style({
      fill: new Fill({
        color: '#e8f5f9',
      }),
      stroke: new Stroke({
        color: '#319FD3',
        width: 1.2,
      })
    });

    //VectorImageLayer for faster rendering during interaction and animations
    this.countriesVectorImageLayer = new VectorImageLayer({
      imageRatio: 1,
      source: new VectorSource({
        url: Endpoints.WORLD_COUNTRIES_FILE,
        format: new GeoJSON(),
      }),
      style: initialStyle
    });

    this.map = new Map({
      target: 'map',
      layers: [this.countriesVectorImageLayer],
      view: new View({
        center: [0, 0],
        zoom: 0
      })
    });
  }

  //This function register map events
  registerMapEvents() {
    this.callbackPointerMoveMapEvent = (evt) => {
      this.pointerMoveOnCountry(evt);
    }
    this.map.on('pointermove', this.callbackPointerMoveMapEvent)

    this.callbackClickMapEvent = (evt) => {
      this.clickOnCountry(evt);
    }
    this.map.on('click', this.callbackClickMapEvent);
  }

  //This function unregister map events
  unregisterMapEvents() {
    this.map.un('pointermove', this.callbackPointerMoveMapEvent);
    this.map.un('click', this.callbackClickMapEvent);
  }

  //This function apply styles when pointermove event on Map
  pointerMoveOnCountry(evt: any) {
    let highlightStyle = new Style({
      fill: new Fill({
        color: 'rgba(255,101,80,.6)',
      }),
      stroke: new Stroke({
        color: '#3399CC',
        width: 2,
      }),
    });
    if (this.isCountryHighlighted !== null) {
      this.isCountryHighlighted.setStyle(undefined);
      this.isCountryHighlighted = null;
    }

    this.map.forEachFeatureAtPixel(evt.pixel, (f) => {
      let higlighted: boolean;
      //We have to ensure that we dont highlight countries features that are in countriesSuccessful array that holds
      //country features that the user answer is correct 
      if (this.countriesSuccessful.length > 0) {
        for (let i = 0; i < this.countriesSuccessful.length; i++) {
          if (this.countriesSuccessful[i].ol_uid !== f.ol_uid) {
            higlighted = this.highlightCountry(f, highlightStyle);
            return higlighted;
          }
        }
      } else {
        higlighted = this.highlightCountry(f, highlightStyle);
        return higlighted;
      }
    });
  }

  //This function sets the higlight style to the country feature on map
  highlightCountry(feature: any, highlightStyle: Style) {
    this.isCountryHighlighted = feature;
    feature.setStyle(highlightStyle);
    return true;
  }

  //This function gets the feature clicked on Map and send it throw service to InfoScoreComponent
  clickOnCountry(evt: any) {
    let feature = this.map.forEachFeatureAtPixel(evt.pixel,
      function (feature, layer) {
        return feature;
      });
    if (feature) {
      this.communicationService.setCountrySelectedOnMap(feature);
    }
  }

  //This function receives the country feature when user answer yes to the question, apply styles to it and unregister Map events
  manageSuccessfulCountry(data: any) {
    if (data !== null) {
      let sucessfulCountry = data;
      let features = this.countriesVectorImageLayer.getSource().getFeatures();
      let newStyle = new Style({
        fill: new Fill({
          color: 'rgba(94,155,149,.6)',
        }),
        stroke: new Stroke({
          color: '#3399CC',
          width: 2,
        }),
      });
      for (let i = 0; i < features.length; i++) {
        if (features[i].ol_uid === sucessfulCountry.ol_uid) {
          this.unregisterMapEvents();
          features[i].setStyle(newStyle);
          this.countriesSuccessful.push(features[i]);
          this.isCountryHighlighted.setStyle(undefined);
        }
      }
    } else {
      this.unregisterMapEvents();
    }
  }
}
