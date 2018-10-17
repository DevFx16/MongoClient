import { Injectable } from '@angular/core';
import Mongo from 'mongodb';

@Injectable({
  providedIn: 'root'
})

export class MongoConexionService {

  Arr: string[];

  constructor() { }

  Conexion(Url: string) {
    return new Promise((resolve, reject) => {
      Mongo.connect(Url, { useNewUrlParser: true }).then((client) => {
        this.Guardar(Url);
        client.close(true);
        resolve()
      }).catch((err) => {
        reject(err);
      })
    })
  }

  private Guardar(Obje: string) {
    var Local = localStorage.getItem('Conexiones');
    if (Local) {
      this.Arr = JSON.parse(Local);
      this.Arr.push(Obje);
      localStorage.setItem('Conexiones', JSON.stringify(this.Arr));
    } else {
      this.Arr = [];
      this.Arr.push(Obje);
      localStorage.setItem('Conexiones', JSON.stringify(this.Arr));
    }
  }
}
