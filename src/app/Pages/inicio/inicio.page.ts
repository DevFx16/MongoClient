import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  Conexiones: object[];

  constructor(private _Router: Router) { }

  ngOnInit() {
    this.Conexiones = [];
  }

  Agregar(): void {
    this._Router.navigate(['/Agregar']);
  }

}
