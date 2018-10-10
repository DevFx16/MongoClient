import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})

export class AgregarPage implements OnInit {

  constructor(private _Router: Router) { }

  ngOnInit() {
  }

}
