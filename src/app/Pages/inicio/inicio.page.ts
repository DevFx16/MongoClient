import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';
import { MongoConexionService } from '../../Services/MongoConexion/mongo-conexion.service';
import { ActionSheetController } from '@ionic/angular';
import Conexion from '../../Models/Conexion';
import swal from 'sweetalert';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})

export class InicioPage implements OnInit {

  Conexiones: Conexion[];
  ConfigBanner: AdMobFreeBannerConfig = {
    autoShow: true,
    id: 'ca-app-pub-9624629768425340/1116329952',
    isTesting: false,
  };

  constructor(private _Ads: AdMobFree, private _Router: Router, private _Conexion: MongoConexionService, private _Action: ActionSheetController) {
    this._Router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (this._Router.url === '/Inicio') {
          this.Conexiones = this._Conexion.RetornarConexiones();
        }
      }
    });
  }

  ngOnInit() {
    this._Ads.banner.config(this.ConfigBanner);
    this._Ads.banner.prepare().then(json => { }).catch(err => { console.log(err); });
    this.Conexiones = this._Conexion.RetornarConexiones();
  }

  Agregar(): void {
    this._Router.navigate(['/Agregar']);
  }

  Refrescar(event) {
    setTimeout(() => {
      this.Conexiones = this._Conexion.RetornarConexiones();
      event.target.complete();
    }, 1500);
  }

  async Accion(index: number, Item: Conexion) {
    const actionSheet = await this._Action.create({
      header: 'Opciones',
      buttons: [{
        text: 'Borrar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.EliminarConexion(index);
        }
      }, {
        text: 'Ver',
        icon: 'ios-eye',
        handler: () => {
          this._Router.navigate(['/Datos', Item]);
        }
      }, {
        text: 'Clancelar',
        icon: 'close',
        role: 'cancel',
      }],
      backdropDismiss: false,
      keyboardClose: true,
      mode: 'ios'
    });
    await actionSheet.present();
  }

  EliminarConexion(index: number): void {
    if (this.Conexiones.length <= 0) {
      swal('Agregado', 'No hay mas conexiónes', 'error');
    } else {
      swal({
        title: '¿Esta seguro de querer eliminar esta conexión?',
        icon: 'warning',
        buttons: ['Cancelar', 'Eliminar'],
        dangerMode: true
      }).then(value => {
        if (value) {
          this._Conexion.EliminarConexion(index);
        }
      });
    }
  }

}
