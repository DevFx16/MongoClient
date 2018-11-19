import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular'
import { Roles, Usuario } from '../../Models/Usuario';
import Conexion from '../../Models/Conexion';
import { NavParams } from '@ionic/angular';
import swal from 'sweetalert';
import { MongoConexionService } from '../../Services/MongoConexion/mongo-conexion.service';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.page.html',
  styleUrls: ['./agregar-usuario.page.scss'],
})

export class AgregarUsuarioPage implements OnInit {

  Conexion: Conexion = this.navParams.get('Conexion');

  User: Usuario = {
    Username: '',
    Password: '',
    Role: [new Roles('', '')]
  }

  constructor(public _Modal: ModalController, private navParams: NavParams, private _Conexion: MongoConexionService, public Loading: LoadingController) {}

  ngOnInit() {
    this.User.Role = [new Roles('', this.Conexion.BaseDatos)];
  }

  async AgregarUsuario() {
    if(this.User.Username === '' || this.User.Password === '' || this.User.Role[0].role === ''){
      swal('Error', 'Todos los campos son obligatorios', 'error');
    }else{
     let Load = await this.Loading.create({
        message: 'Por favor espere un momento...',
        showBackdrop: false,
        spinner: 'circles',
        mode: 'ios'
      });
      await Load.present();
      this._Conexion.AgregarUsuario(this.Conexion.Url, this.User).then(user => {
        Load.dismiss();
        swal('Agregado', 'Usuario Creado', 'success');
      }).catch(err => {
        Load.dismiss();
        err.error.Error
        ? swal('Error', err.error.Error, 'error')
        : swal('Error', 'No autorizado revise sus datos', 'error');
      });
    }
  }

}
