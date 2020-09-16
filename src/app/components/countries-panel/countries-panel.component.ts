import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Messages } from '../../constants/messages';
import { Paths } from '../../constants/paths';
import { DataService } from '../../services/data.service';
import { CommunicationService } from '../../services/communication.service';
import { NatoCountryModel } from '../../models/natoCountry.model'

@Component({
  selector: 'app-countries-panel',
  templateUrl: './countries-panel.component.html',
  styleUrls: ['./countries-panel.component.css']
})
export class CountriesPanelComponent implements OnInit {

  @Input() isParentMenuExpanded: boolean;

  @Input() expandCountriesPanel: boolean;

  @Output() closeCountriesPanelEvent = new EventEmitter<boolean>();

  natoCountriesText: string = Messages.NATO_COUNTRIES_TEXT;

  natoCountries: NatoCountryModel[] = new Array<NatoCountryModel>();

  constructor(private dataService: DataService, private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.getNatoCountries();
  }

  //This function get Nato Countries from local geojson file by using DataService and its findAll method with http get
  getNatoCountries() {
    this.dataService.findAll(Paths.NATO_COUNTRIES_FILE).subscribe(response => {
      this.natoCountries = response.natoCountries;
    });
  }

  //This function close the Nato countries panel
  closeCountriesPanel() {
    this.expandCountriesPanel = false;
    this.closeCountriesPanelEvent.emit(this.expandCountriesPanel);
  }

  //This function manages when a flag is selected on country panel
  selectFlag(flagSelected: NatoCountryModel) {
    this.communicationService.setMessage(Messages.FIND_COUNTRY_INFO_MESSAGE);
    this.communicationService.setFlagSelected(flagSelected);
    this.closeCountriesPanel();
  }
}