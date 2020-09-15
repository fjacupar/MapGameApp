import {CityModel} from './city.model';

export interface NatoCountryModel {
    name: string;
    flagImage: string;
    cities: CityModel[];
  }