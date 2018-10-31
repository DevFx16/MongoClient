import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MongoColeccionService {

  UrlBase: string = 'https://mongoclient.herokuapp.com/';

  constructor(private Http: HttpClient) { }

  Listar(Url: string, Cole: string): string[] {
    var N = [];
    this.Http.get(this.UrlBase + '/ListarColeccion', { headers: new HttpHeaders().set('url', Url).set('coleccion', Cole)}).toPromise().then(json => {

    }).catch(err => {
      N = [];
    })
    return N;
  }
}
