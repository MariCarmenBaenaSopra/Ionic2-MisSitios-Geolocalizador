import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class Db {
  db: SQLiteObject = null;   /**db: donde se guardará el manejador de la base de datos una vez establecida la conexión */

  constructor(public sqlite: SQLite) {
    console.log('Hello DB Provider');
  }

/**Método para crear/abrir la base de datos */
  public openDb(){
      return this.sqlite.create({   //Este método crea la base de datos si no existe y abre la conexión.
          name: 'data.db',
          location: 'default'       // el campo location es obligatorio
      })
      .then((db: SQLiteObject) => {
       this.db =db;
     })
  }




/**Crear una tabla con los campos que vamos a necesitar para guardar nuestros sitios con los campos que necesitamos */
  public createTableSitios() {
    return this.db.executeSql("create table if not exists sitios( id INTEGER PRIMARY KEY AUTOINCREMENT, lat FLOAT, lng FLOAT, address TEXT, description TEXT, foto TEXT )", {})
    /**CAMPOS DE LA TABLA:
     *  id: identificador
     *  lat: latitud
     *  lng: longitud
     *  address: direccion
     *  description: descripcion del sitio
     *  foto: foto fotmato base 64*/
  }




/**Método para guardar nuestros sitios: */
  public addSitio(sitio){
    let sql = "INSERT INTO sitios (lat, lng, address, description, foto) values (?,?,?,?,?)";
    return this.db.executeSql(sql,[sitio.lat,sitio.lng,sitio.address,sitio.description,sitio.foto]);
  }




/**Obtener los sitios que tenemos guardados en la base de datos */
  getSitios() {
    let sql = "SELECT * FROM sitios";
    return this.db.executeSql(sql, {});
  }
}
