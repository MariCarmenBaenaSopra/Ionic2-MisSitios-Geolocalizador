import { Db } from './../../providers/db';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

declare var google: any;

@Component({
  selector: 'page-modal-nuevo-sitio',
  templateUrl: 'modal-nuevo-sitio.html'
})

export class ModalNuevoSitio {
  coords: any = { lat: 0, lng: 0 }
  address: string;                //guardaremos la dirección que luego mostraremos en la vista.
  description: string = '';       //contendrá la descripción del lugar que introduzcamos desde el formulario.
  foto: any = '';                 //guardaremos una foto del lugar codificada en base 64.

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private camera: Camera,
    private db: Db) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalNuevoSitioPage');
    this.coords.lat = this.navParams.get('lat');
    this.coords.lng = this.navParams.get('lng');

    this.getAddress(this.coords).then(results => {
      this.address = results[0]['formatted_address'];
    }, errStatus => {
      // Aquí iría el código para manejar el error
    });
  }

  cerrarModal() {
    this.viewCtrl.dismiss();
  }

  getAddress(coords): any {
    var geocoder = new google.maps.Geocoder();

    return new Promise(function (resolve, reject) {
      geocoder.geocode({ 'location': coords }, function (results, status) { // llamado asincronamente
        if (status == google.maps.GeocoderStatus.OK) {
          resolve(results);
        } else {
          reject(status);
        }
      });
    });
  }

  sacarFoto() {
    let cameraOptions: CameraOptions = {
      quality: 50,
      encodingType: this.camera.EncodingType.JPEG,            //encodingType: Selecciona la codificación del archivo de imagen devuelto, puede ser JPEG o PNG.
      targetWidth: 800,                                       //targetWidth: Anchura de la foto.  
      targetHeight: 600,                                      //targetHeight: Altura de la foto.
      destinationType: this.camera.DestinationType.DATA_URL,  /**destinationType: Define el formato del valor devuelto, puede ser :
                                                                    DATA_URL devuelve la imagen como una cadena codificada en base64.
                                                                    FILE_URI: Crea un archivo con la imagen y devuelve la ruta al archivo.
                                                                    NATIVE_URI: devuelve la ruta nativa al archivo (assets-library:// en iOS o content:// en Android).*/
      sourceType: this.camera.PictureSourceType.CAMERA,      /**sourceType: Indica el origen de la foto, puede ser:
                                                                    CAMERA (por defecto).
                                                                    PHOTOLIBRARY
                                                                    SAVEDPHOTOALBUM */
      correctOrientation: true                               //correctOrientation: Gira la imagen para corregir la orientación del dispositivo durante la captura.
    }


    /** this.foto guardamos la imagen codificada en formato base64 que recibimos de la cámara, para poder mostrarla como parte de la url */
    this.camera.getPicture(cameraOptions).then((imageData) => {
      // imageData is a base64 encoded string
      this.foto = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    });
  }


/**Guardar en la bbdd */
  guardarSitio() {
    let sitio = {
      lat: this.coords.lat,
      lng: this.coords.lng,
      address: this.address,
      description: this.description,
      foto: this.foto
    }
    this.db.addSitio(sitio).then((res) => {
      this.cerrarModal();
      /*  alert('se ha introducido correctamente en la bd'); */
    }, (err) => { /* alert('error al meter en la bd'+err) */ })
  }
}