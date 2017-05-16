import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-modal-nuevo-sitio',
  templateUrl: 'modal-nuevo-sitio.html'
})

export class ModalNuevoSitio {
  coords: any = {lat:0, lng:0 }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private viewCtrl : ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalNuevoSitioPage');
    this.coords.lat = this.navParams.get('lat');
    this.coords.lng = this.navParams.get('lng');
  }

  cerrarModal(){ 
    this.viewCtrl.dismiss();
  }
}