import { Info } from './../info/info';
import { Listado } from './../listado/listado';
import { Inicio } from './../inicio/inicio';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the MisTabs tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-mis-tabs',
  templateUrl: 'mis-tabs.html'
})

export class MisTabs {

  tab1Root: any = Inicio;
  tab2Root: any = Listado;
  tab3Root: any = Info;

  constructor(public navCtrl: NavController) {}

}
