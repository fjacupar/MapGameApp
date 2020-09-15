import { Component, OnInit } from '@angular/core';
import { Messages } from '../../constants/messages';

@Component({
  selector: 'app-lateral-menu',
  templateUrl: './lateral-menu.component.html',
  styleUrls: ['./lateral-menu.component.css']
})
export class LateralMenuComponent implements OnInit {

  iconLateralMenu: string = Messages.CLOSE_PANEL_ICON_URL;

  natoCountriesText: string = Messages.NATO_COUNTRIES_TEXT;

  isLateralMenuExpanded: boolean = true;

  expandNatoCountriesMenu: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  //This method handles the toggle of the lateral menu 
  toggleLateralMenu() {
    if (this.isLateralMenuExpanded === true) {
      this.isLateralMenuExpanded = false;
      this.iconLateralMenu = Messages.OPEN_PANEL_ICON_URL;
    } else {
      this.isLateralMenuExpanded = true;
      this.iconLateralMenu = Messages.CLOSE_PANEL_ICON_URL;
    }
  }

  //This method shows/hides the panel with flags of NATO countries
  showNatoCountriesMenu() {
    if (this.expandNatoCountriesMenu === false) {
      this.expandNatoCountriesMenu = true;
    } else {
      this.expandNatoCountriesMenu = false;
    }
  }

  //This method set expandNatoCountriesMenu property to false when the countries panel has been closed
  checkCountriesPanel(isOpenCountriesPanel: boolean) {
    if (isOpenCountriesPanel === false) {
      this.expandNatoCountriesMenu = false;
    }
  }

}
