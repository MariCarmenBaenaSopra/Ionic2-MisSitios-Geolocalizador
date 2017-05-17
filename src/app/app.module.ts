import { ModalNuevoSitio } from './../pages/modal-nuevo-sitio/modal-nuevo-sitio';
import { Info } from './../pages/info/info';
import { Listado } from './../pages/listado/listado';
import { Inicio } from './../pages/inicio/inicio';
import { MisTabs } from './../pages/mis-tabs/mis-tabs';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

//Proveedor de BBDD
  import { Db } from './../providers/db';
  import { SQLite } from '@ionic-native/sqlite';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MisTabs,
    Inicio,
    Listado,
    Info,
    ModalNuevoSitio
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MisTabs,
    Inicio,
    Listado,
    Info,
    ModalNuevoSitio
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    Geolocation,
    Camera,
    Db,
    SQLite
  ]
})
export class AppModule {}
