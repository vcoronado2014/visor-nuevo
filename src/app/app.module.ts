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

//Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SicComponent } from './components/sic/sic.component';
import { ExamenesComponent } from './components/examenes/examenes.component';
import { LmeComponent } from './components/lme/lme.component';

//Plugin
import { NgxLoadingModule } from 'ngx-loading';

//Servicios
import { ServicioVisorService } from './services/servicio-visor.service';
import { AtencionesComponent } from './components/atenciones/atenciones.component';
//para filtrar
import { ServicioFiltros } from './services/servicio-filtros';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SicComponent,
    ExamenesComponent,
    LmeComponent,
    AtencionesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    BootstrapModalModule,
    ToastModule.forRoot(),
    RouterModule.forRoot([]),
    APP_ROUTER,
    NgxLoadingModule
  ],
  providers: [ServicioVisorService, ServicioFiltros],
  bootstrap: [AppComponent]
})
export class AppModule { }
