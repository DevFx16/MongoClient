import { Component, OnInit } from '@angular/core';
import { MongoConexionService } from '../../Services/MongoConexion/mongo-conexion.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { LoadingController } from '@ionic/angular';
import Conexion from '../../Models/Conexion';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})

export class AgregarPage implements OnInit {

  Opcion: boolean = false;
  Conexion = { Host: '', Puerto: 80, Base: '', Auth: false, User: '', Password: '', Url: '' };

  constructor(private _Conexion: MongoConexionService, private _Router: Router, public Loading: LoadingController) { }

  ngOnInit() { }

  Select(Valor): void {
    this.Opcion = Valor == '1';
    this.Conexion = { Host: '', Puerto: 80, Base: '', Auth: false, User: '', Password: '', Url: '' }
  }

  ClickConexion(): void {
    if (!this.Opcion) {
      if (this.Conexion.Url.length <= 0) {
        swal('Error', 'Url requerida', 'error');
      } else {
        this.Peticion();
      }
    } else {
      if (this.Conexion.Host.length <= 0 || this.Conexion.Base.length <= 0 || this.Conexion.Puerto == null) {
        swal('Error', 'Todos los campos son requeridos', 'error');
      } else {
        if (this.Conexion.Auth) {
          if (this.Conexion.User.length <= 0 || this.Conexion.Password.length <= 0) {
            swal('Error', 'Todos los campos son requeridos', 'error');
          } else {
            this.Peticion();
          }
        } else {
          this.Peticion();
        }
      }
    }
  }

  async Peticion() {
    if (this._Conexion.Existe(this.Conexion.Url)) {
      swal('Duplicado', 'La conexión ya existe', 'error');
    } else {
      const Load = await this.Loading.create({
        message: 'Por favor espere un momento...',
        showBackdrop: false,
        spinner: 'circles',
        mode: 'ios',
      });
      await Load.present();
      await this._Conexion.Conexion(this.Conexion.Url).then(json => {
        Load.dismiss();
        this._Conexion.Guardar(new Conexion(this.Conexion.Url, 'Hola Mundo'));
        swal('Agregado', 'La conexión se ha hecho satisfactoriamente', 'success');
      }).catch(err => {
        Load.dismiss();
        swal('Agregado', err.error.Error, 'error');
      })
    }
  }

}
