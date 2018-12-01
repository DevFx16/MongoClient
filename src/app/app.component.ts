import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MongoConexionService } from './Services/MongoConexion/mongo-conexion.service';
import { CodePush, InstallMode, SyncStatus } from '@ionic-native/code-push/ngx';

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
    private _CodePush: CodePush
  ) {
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

  CodePushVerificar() {
    this._CodePush.sync({
      updateDialog: {
        appendReleaseDescription: true,
        descriptionPrefix: "\n\nChange log:\n"
      },
      installMode: InstallMode.IMMEDIATE
    }).subscribe(
      (data) => {console.log('CODE PUSH SUCCESSFUL: ' + data);},(err) => {console.log('CODE PUSH ERROR: ' + err);});
  }
}
