import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Connect4GridComponent} from './connect4-grid/connect4-grid.component';
import {HttpClientModule} from "@angular/common/http";
import {ApiModule, Configuration} from "../services";

@NgModule({
  declarations: [
    AppComponent,
    Connect4GridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApiModule.forRoot(() => {
      return new Configuration({
        basePath: ``,
      })
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}