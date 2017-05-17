import { Db } from './../../providers/db';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-listado',
  templateUrl: 'listado.html',
})
export class Listado {
  sitios: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: Db
  ) { }

  /**se ejecuta al cargar la página, el problema es que al contrario del modal, que se carga 
   * cada vez que lo llamamos, las paginas que se muestran al cambiar de pestaña se cargan una 
   * única vez al inicio, por lo que si guardamos nuevos sitios estos no se refrescaran a no ser 
   * que cierres la aplicación y la vuelvas a abrir */
  ionViewDidLoad() {
    console.log('ionViewDidLoad Listado');
  }

/**ionViewDidEnter: se ejecuta cuando la página ha sido cargada y ahora es la página activa.*/
  ionViewDidEnter() {
    this.db.getSitios().then((res) => {
      this.sitios = [];
      for (var i = 0; i < res.rows.length; i++) {
        this.sitios.push({
          lat: res.rows.item(i).lat,
          lng: res.rows.item(i).lng,
          address: res.rows.item(i).address,
          description: res.rows.item(i).description,
          foto: res.rows.item(i).foto
        });
      }

    }, (err) => { /* alert('error al sacar de la bd'+err) */ })
  }
}
