import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MongoConexionService } from '../../Services/MongoConexion/mongo-conexion.service';
import Conexion from '../../Models/Conexion';
import { MongoColeccionService } from '../../Services/MongoColeccion/mongo-coleccion.service';
import { LoadingController } from '@ionic/angular';
import swal from 'sweetalert';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})
export class DatosPage implements OnInit {

  Datos: Conexion;
  Colecciones: string[] = [];
  Seleccion: number = -1;

  constructor(private _Router: Router, private _Conexion: MongoConexionService, private _Params: ActivatedRoute, private _Coleccion: MongoColeccionService, public Loading: LoadingController) {
    this._Params.params.subscribe(Params => {
      this.Datos = Params as Conexion;
    });
  }

  Refrescar(event) {

  }


  async ListarCol() {
    const Load = await this.Loading.create({
      message: 'Por favor espere un momento...',
      showBackdrop: false,
      spinner: 'circles',
      mode: 'ios',
    });
    await Load.present();
    this._Coleccion.Listar(this.Datos.Url).then(json => {
      this.Colecciones = (json as any).Colecciones;
      Load.dismiss();
    }).catch(err => {
      Load.dismiss();
      swal('Agregado', 'Ha ocurrido un error vuelva a intentar', 'error');
    });
  }

  ngOnInit() {
    this.ListarCol();
  }

}
