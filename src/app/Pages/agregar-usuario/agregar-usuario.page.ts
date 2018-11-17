import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'
import Usuario from '../../Models/Usuario';
@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.page.html',
  styleUrls: ['./agregar-usuario.page.scss'],
})
export class AgregarUsuarioPage implements OnInit {

  User: Usuario;

  constructor(public _Modal: ModalController) { }

  ngOnInit() {

  }

  AgregarUsuario(){
    
  }

}
