import { Component, OnInit } from '@angular/core';
import { Messages } from '../../constants/messages';
import { CommunicationService } from '../../services/communication.service';
import { NatoCountryModel } from '../../models/natoCountry.model' 

@Component({
  selector: 'app-info-score',
  templateUrl: './info-score.component.html',
  styleUrls: ['./info-score.component.css']
})
export class InfoScoreComponent implements OnInit {

  scoreText: string = Messages.SCORE;

  playedText: string = Messages.PLAYED_COUNTRIES;

  yesText: string = Messages.YES_INFO_MESSAGE;

  noText: string = Messages.NO_INFO_MESSAGE;

  scoreValue: number = 0;

  playedCountries: number = 0;

  showCountryFlag: boolean;

  infoMessage: string = Messages.INITIAL_INFO_MESSAGE + ' ' + Messages.INSTRUCTION_INFO_MESSAGE;

  showQuestionMessage: boolean = false;

  newMessage: string;

  countryFlagSelected: NatoCountryModel;

  countrySelectedOnMap: any;

  countryFeature: any;

  constructor(private communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.subscribeToService();
  }

  //This function susbscribess to communicationService to get info/data from other components
  subscribeToService() {
    this.communicationService.getMessage().subscribe((data) => {
      this.infoMessage = data;
    });
    this.communicationService.getFlagSelected().subscribe((data) => {
      this.countryFlagSelected = data;
      this.showCountryFlag = true;
    });
    this.communicationService.getCountrySelectedOnMap().subscribe((data) => {
      this.countryFeature = data;
      this.countrySelectedOnMap = this.countryFeature.getProperties();
      this.infoMessage = Messages.QUESTION_INFO_MESSAGE;
      this.showQuestionMessage = true;
    });  
  }

  //This function closes question text
  closeQuestionText() {
    this.showQuestionMessage = false;
    this.infoMessage = Messages.FIND_COUNTRY_INFO_MESSAGE;  
  }

  //This functions validates the country when the user answer yes the question
  validateCountrySelected() {
    if (this.countrySelectedOnMap.name === this.countryFlagSelected.name) {
      this.communicationService.setSuccessfulCountry(this.countryFeature);
      this.showQuestionMessage = false;
      this.showCountryFlag = false;
      this.scoreValue +=5;
      this.playedCountries +=1;
      this.infoMessage = Messages.SUCCESS_COUNTRY_SELECTED_INFO_MESSAGE + ' ' + Messages.INSTRUCTION_INFO_MESSAGE;
    } else {
      this.showQuestionMessage = false;
      this.showCountryFlag = false;
      this.playedCountries +=1;
      this.infoMessage = Messages.ERROR_COUNTRY_SELECTED_INFO_MESSAGE + ' ' + Messages.INSTRUCTION_INFO_MESSAGE ;
    }
  }
}
