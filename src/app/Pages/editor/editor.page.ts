import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, LoadingController } from '@ionic/angular';
import { MongoColeccionService } from '../../Services/MongoColeccion/mongo-coleccion.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit {

  Json: string = this.navParams.get('Json');
  Boton: boolean = this.navParams.get('Accion');
  Datos: any = this.navParams.get('Datos');
  Pipe: object;
  Id: string;

  constructor(public _Modal: ModalController, private navParams: NavParams, private _Coleccion: MongoColeccionService, public Loading: LoadingController) { }

  ngOnInit() {
    this.Cambio();
    if (!this.Boton) {
      this.Id = (this.Pipe as any)._id;
      delete (this.Pipe as any)._id;
      this.Json = JSON.stringify(this.Pipe);
      this.Cambio();
    }
  }

  Cambio() {
    try {
      this.Pipe = JSON.parse(this.Json);
    } catch (e) { this.Pipe = {} }
  }

  async BotonAc() {
    if (Object.keys(this.Pipe).length === 0) {
      swal('Error', 'Error JSON invalido, no debe estar vacio y no debe repetir identificadores', 'error');
    } else {
      let Load = await this.Loading.create({
        message: 'Por favor espere un momento...',
        showBackdrop: false,
        spinner: 'circles',
        mode: 'ios'
      });
      await Load.present();
      if (this.Boton) {
        this._Coleccion.AgregarDoc(this.Datos.Conexion.Url, Object.assign({ Coleccion: this.Datos.Col }, { Doc: this.Pipe })).then(json => {
          Load.dismiss();
          swal('Agregado', 'Documento agreado refresque los datos', 'success');
          localStorage.removeItem(this.Datos.Conexion.BaseDatos + '/' + this.Datos.Col);
        }).catch(err => {
          Load.dismiss();
          err.error.Error
            ? swal('Error', err.error.Error, 'error')
            : swal('Error', 'No autorizado revise sus datos', 'error');
        });
      } else {
        this._Coleccion.ActualizarDoc(this.Datos.Conexion.Url, Object.assign({ Coleccion: this.Datos.Col }, { Doc: this.Pipe, Id: this.Id })).then(json => {
          Load.dismiss();
          swal('Actualizado', 'Documento ha sido actualizado refresque los datos', 'success');
          localStorage.removeItem(this.Datos.Conexion.BaseDatos + '/' + this.Datos.Col);
        }).catch(err => {
          Load.dismiss();
          err.error.Error
            ? swal('Error', err.error.Error, 'error')
            : swal('Error', 'No autorizado revise sus datos', 'error');
        });
      }
    }
  }
}