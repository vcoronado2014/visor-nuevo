import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// RUTAS
import { APP_ROUTER } from './app.routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTER
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
