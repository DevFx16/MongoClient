import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MongoConexionService } from '../../Services/MongoConexion/mongo-conexion.service';
import Conexion from '../../Models/Conexion';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})
export class DatosPage implements OnInit {

  Datos: Conexion;
  Colecciones: string[] = [];

  constructor(private _Router: Router, private _Conexion: MongoConexionService, private _Params: ActivatedRoute) {
    this._Params.params.subscribe(Params => {
      this.Datos = Params as Conexion;
     });
  }

  Refrescar(event){

  }

  ListarColeccion(): void{

  }

  ngOnInit() {

  }

}
