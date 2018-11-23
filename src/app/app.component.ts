import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { MongoConexionService } from "./Services/MongoConexion/mongo-conexion.service";
import { AppUpdate } from '@ionic-native/app-update';

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _Conexion: MongoConexionService,
    private _Update: AppUpdate
  ) {
    this._Update.checkAppUpdate('').then(() => { console.log('Actualización disponible') });
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.hide();
      this.splashScreen.hide();
      var Ar = this._Conexion.RetornarConexiones();
      localStorage.clear();
      localStorage.setItem('Conexiones', JSON.stringify(Ar));
    });
  }
}
