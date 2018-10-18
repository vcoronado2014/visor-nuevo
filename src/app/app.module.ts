import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from '../../node_modules/ngx-modialog/plugins/bootstrap';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// RUTAS
import { APP_ROUTER } from './app.routes';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
//Servicios
import { ServicioVisorService } from './services/servicio-visor.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    BootstrapModalModule,
    ToastModule.forRoot(),
    RouterModule.forRoot([]),
    APP_ROUTER
  ],
  providers: [ServicioVisorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
