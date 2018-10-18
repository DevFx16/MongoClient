import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MongoConexionService {

  Arr: string[];

  constructor() { }

  Conexion(Url: string) {

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
