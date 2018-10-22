import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Conexion from '../../Models/Conexion';
@Injectable({
  providedIn: 'root'
})

export class MongoConexionService {

  UrlBase: string = 'https://mongoclient.herokuapp.com/';
  Arr: Conexion[];

  constructor(private Http: HttpClient, ) { }

  Conexion(Url: string) {
    return this.Http.get(this.UrlBase + 'Conexion', { headers: new HttpHeaders().set('url', Url) }).toPromise();
  }

  Existe(Url: string): Boolean {
    var Local = localStorage.getItem('Conexiones');
    var R = false;
    if (Local) {
      this.Arr = JSON.parse(Local);
      this.Arr.map(Item => {
        if(Item.Url == Url){
          R = true;
        }
      });
      return R;
    } else {
      this.Arr = [];
      return false;
    }
  }

  Guardar(Obje: Conexion) {
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
