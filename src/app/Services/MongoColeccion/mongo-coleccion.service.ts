import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class MongoColeccionService {
  UrlBase: string = "https://mongoclient.herokuapp.com/";

  constructor(private Http: HttpClient) {}

  Listar(Url: string): any {
    return this.Http.get(this.UrlBase + "Colecciones", {
      headers: new HttpHeaders().set("url", Url)
    }).toPromise();
  }

  DocumentosColeccion(Url: string, Coleccion: string) {
    return this.Http.get(this.UrlBase + "ListarColeccion", {
      headers: new HttpHeaders().set("url", Url).set("coleccion", Coleccion)
    }).toPromise();
  }

  EliminarColeccion(Url: string, Coleccion: string) {
    return this.Http.delete(this.UrlBase + "EliminarColeccion", {
      headers: new HttpHeaders().set("url", Url).set("coleccion", Coleccion)
    }).toPromise();
  }

  EliminarDocumento(Url: string, Coleccion: string, Id: string){
    return this.Http.delete(this.UrlBase + "EliminarDoc", {
      headers: new HttpHeaders().set("url", Url).set("coleccion", Coleccion).set("id", Id)
    }).toPromise();
  }
}