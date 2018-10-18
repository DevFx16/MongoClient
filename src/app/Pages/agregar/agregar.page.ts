import { Component, OnInit } from '@angular/core';
import { MongoConexionService } from '../../Services/MongoConexion/mongo-conexion.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})

export class AgregarPage implements OnInit {

  Opcion: boolean = false;
  Conexion = { Host: '', Puerto: 80, Base: '', Auth: false, User: '', Password: '', Url: '' };

  constructor(private _Conexion: MongoConexionService, private _Router: Router) { }

  ngOnInit() {}

  Select(Valor): void {
    this.Opcion = Valor == '1';
    this.Conexion = {Host: '', Puerto: 80, Base: '', Auth: false, User: '', Password: '', Url: '' }
  }

  ClickConexion(): void {
    if (!this.Opcion) {
      if (this.Conexion.Url.length <= 0) {
        swal('Error', 'Url requerida', 'error');
      } else {

      }
    } else {
      if (this.Conexion.Host.length <= 0 || this.Conexion.Base.length <= 0 || this.Conexion.Puerto == null) {
        swal('Error', 'Todos los campos son requeridos', 'error');
      } else {
        if (this.Conexion.Auth) {
          if (this.Conexion.User.length <= 0 || this.Conexion.Password.length <= 0) {
            swal('Error', 'Todos los campos son requeridos', 'error');
          } else {

          }
        } else {

        }
      }
    }
  }

}
