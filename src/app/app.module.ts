import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MongoConexionService } from './Services/MongoConexion/mongo-conexion.service';
import { MongoColeccionService } from './Services/MongoColeccion/mongo-coleccion.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AgregarUsuarioPageModule } from './Pages/agregar-usuario/agregar-usuario.module';
import { EditorPageModule } from './Pages/editor/editor.module';
import { AppUpdate } from '@ionic-native/app-update';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, AgregarUsuarioPageModule, EditorPageModule],
  providers: [
    StatusBar,
    SplashScreen,
    AdMobFree,
    AppUpdate,
    MongoConexionService,
    MongoColeccionService,
    JsonPipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
