import { Db } from '../providers/db';
import { MisTabs } from './../pages/mis-tabs/mis-tabs';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = MisTabs;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public db: Db
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      /*abrir la base de datos y crear la tabla en platform.ready para 
      asegurarnos de que el plugin SQlite ya se ha cargado antes de utilizarlo*/
      this.db.openDb()
       .then(() => this.db.createTableSitios())
       console.log("LA BBDD ES:" + this.db);
    });
  }
}

