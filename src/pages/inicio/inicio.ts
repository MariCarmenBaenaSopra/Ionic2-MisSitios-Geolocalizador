import { ModalNuevoSitio } from './../modal-nuevo-sitio/modal-nuevo-sitio';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';

/*Para que Typescript no de error por no reconocer la clase 
google cuando la llamemos desde la función que vamos a crear -> loadMap(), 
vamos a declarar la variable google justo debajo de los imports 
con declare var google: any;*/
declare var google: any;

@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})

export class Inicio {
  map: any; //manejo del mapa
  coords: any = {lat:0, lng:0 }  //objeto para latitus y longuitud

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    private geolocation: Geolocation,
    public modalCtrl: ModalController) {

      platform.ready().then(() => {
        //la plataforma esta lista y ya tenemos acceso a los plugins
        this.obtenerPosicion();
      });
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Inicio');
  }

/**CARGAR MAPA */
  loadMap(){
    //variable mapContainer el elemento div con id=”map” que habíamos creado en la vista
    let mapContainer = document.getElementById('map');
    //creamos un mapa con google.maps.Map
    /** le pasamos dos parámetros, el primero es el elemento contenedor del mapa que lo hemos recogido en la variable mapContainer y el segundo parámetro es un objeto 
     * donde le pasamos la configuración del mapa, en este caso le pasamos las coordenadas al parámetro center y le decimos que muestre el mapa con un zoom de 12. */
    this.map = new google.maps.Map(mapContainer, {
      center: this.coords,
      zoom: 12
    });

    //colocamos la img para colocar el marcador
    let miMarker = new google.maps.Marker({
      icon: 'assets/img/ico_estoy_aqui.png',
      map: this.map,         /**idicamos la variable que contiene el mapa donde se tiene que situar*/
      position: this.coords  /**asignamos las coordenadas donde se tiene que situar */
    });
  }

/**OBTENER COORDENADAS PARA POSICIONAR MI MAPA */
  obtenerPosicion():any{
    //getCurrentPosition() del plugin Geolocation nos devuelve una promesa.
    this.geolocation.getCurrentPosition().then(res => { //res= recibimos el objeti
      this.coords.lat = res.coords.latitude;            //obtencion de la respuesta de latitud
      this.coords.lng = res.coords.longitude;           //obtencion de la respuesta de longuitud
    
      this.loadMap();    //mostrar 1 mapa en la pagina centrado en las coordenadas que hemos recogido
    })
    .catch((error)=>{
        console.log(error);
      }
    );
  }

/**FAB & MODAL*/
  nuevoSitio(){
    //abrimos modal para añadir nuestro ModalNuevoSitio

    /**Para crear un modal utilizamos el método create del componente ModalController y le pasamos como primer parámetro el controlador de la página que hemos creado 
     * para el modal y que hemos llamado ModalNuevoSitio. El segundo parámetro es opcional y se utiliza para pasarle datos a nuestro modal, en este caso lo vamos a 
     * utilizar para pasarle el objeto this.coords que contiene las coordenadas que hemos obtenido. */
    let mimodal = this.modalCtrl.create(ModalNuevoSitio, this.coords);
    
    //Una vez creado el modal para que se muestre en pantalla invocamos al método present();
    mimodal.present();
  }

}
