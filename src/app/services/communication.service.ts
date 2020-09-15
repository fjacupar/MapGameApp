import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommunicationService {

  private message = new Subject<any>();

  private flagSelected = new Subject<any>();

  private countrySelectedOnMap = new Subject<any>();

  private successfulCountry = new Subject<any>();

  constructor() { }

  getMessage(): Subject<any> {
    return this.message;
  }

  setMessage(message: any) {
    this.message.next(message);
  }

  getFlagSelected(): Subject<any> {
    return this.flagSelected;
  }

  setFlagSelected(flagSelected: any) {
    this.flagSelected.next(flagSelected);
  }

  getCountrySelectedOnMap(): Subject<any> {
    return this.countrySelectedOnMap;
  }

  setCountrySelectedOnMap(countrySelectedOnMap: any) {
    this.countrySelectedOnMap.next(countrySelectedOnMap);
  }

  getSuccessfulCountry(): Subject<any> {
    return this.successfulCountry;
  }

  setSuccessfulCountry(successfulCountry: any) {
    this.successfulCountry.next(successfulCountry);
  }

}