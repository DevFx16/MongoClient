import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MongoConexionService } from './Services/MongoConexion/mongo-conexion.service';
import { AppUpdate } from '@ionic-native/app-update/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _Conexion: MongoConexionService,
    private _Update: AppUpdate
  ) {
    this.initializeApp();
  }

  initializeApp() {
    const Url: string = 'https://github.com/FernanPro18/MongoClient/blob/master/Actualizacion.xml';
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.hide();
      this.splashScreen.hide();
      this._Update.checkAppUpdate(Url).then(json => {console.log('Actualización disponible')});
      var Ar = this._Conexion.RetornarConexiones();
      localStorage.clear();
      localStorage.setItem('Conexiones', JSON.stringify(Ar));
    });
  }
}
