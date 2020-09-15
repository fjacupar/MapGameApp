import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { InfoScoreComponent } from './components/info-score/info-score.component';
import { LateralMenuComponent } from './components/lateral-menu/lateral-menu.component';
import { CountriesPanelComponent } from './components/countries-panel/countries-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HeaderComponent,
    InfoScoreComponent,
    LateralMenuComponent,
    CountriesPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
