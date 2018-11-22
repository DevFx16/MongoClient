import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MongoConexionService } from '../../Services/MongoConexion/mongo-conexion.service';
import Conexion from '../../Models/Conexion';
import { MongoColeccionService } from '../../Services/MongoColeccion/mongo-coleccion.service';
import { LoadingController, ActionSheetController, ModalController } from '@ionic/angular';
import { AgregarUsuarioPage } from '../agregar-usuario/agregar-usuario.page';
import { EditorPage } from '../editor/editor.page';
import swal from 'sweetalert';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free/ngx';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss']
})
export class DatosPage implements OnInit {

  Datos: Conexion;
  Colecciones: string[] = [];
  DocumentosCol: any[] = [];
  Seleccion: number = -1;
  SeleccionId: string = '';
  Spin: boolean = false;
  Select: boolean = false;
  Doc: any;
  ConfigBanner: AdMobFreeBannerConfig = {
    autoShow: true,
    id: 'ca-app-pub-9624629768425340/1116329952',
    isTesting: false
  };
  ConfigInter: AdMobFreeInterstitialConfig = {
    autoShow: true,
    id: 'ca-app-pub-9624629768425340/8864502623',
    isTesting: false,
  };
  
  constructor(
    private _Router: Router,
    private _Conexion: MongoConexionService,
    private _Params: ActivatedRoute,
    private _Coleccion: MongoColeccionService,
    public Loading: LoadingController,
    private _Action: ActionSheetController,
    public _Modal: ModalController,
    private _Ads: AdMobFree
  ) {
    this._Params.params.subscribe(Params => {
      this.Datos = Params as Conexion;
    });
  }

  ngOnInit() {
    this.ListarCol();
    this._Ads.banner.config(this.ConfigBanner);
    this._Ads.banner.prepare().then(json => { }).catch(err => { console.log(err); });
    this._Ads.interstitial.config(this.ConfigInter);
    this._Ads.interstitial.prepare().then(json => { }).catch(err => { console.log(err) });
  }

  async Accion() {
    const actionSheet = await this._Action.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Agregar usuario',
          icon: 'md-person-add',
          handler: () => { this.Modal(AgregarUsuarioPage, { Conexion: this.Datos }); }
        },
        {
          text: 'Borrar usuario',
          role: 'destructive',
          icon: 'trash',
          handler: () => { this.BorrarUsuario(); }
        },
        {
          text: 'Agregar Colección',
          icon: 'md-add-circle',
          handler: () => { this.AgregarColeccion(); }
        },
        {
          text: 'Regresar',
          icon: 'md-arrow-back',
          handler: () => { this._Router.navigate(['/Inicio']); }
        },
        {
          text: 'Clancelar',
          icon: 'close',
          role: 'cancel'
        }
      ],
      backdropDismiss: false,
      keyboardClose: true,
      mode: 'ios'
    });
    await actionSheet.present();
  }

  Refrescar(event) {
    this.Seleccion = -1;
    this.SeleccionId = '';
    this.Colecciones.forEach(element => {
      localStorage.removeItem(this.Datos.BaseDatos + '/' + element);
    });
    this._Coleccion
      .Listar(this.Datos.Url)
      .then(json => {
        this.Colecciones = (json as any).Colecciones;
        this.Colecciones.splice(this.Colecciones.indexOf('system.indexes'), 1);
        event.target.complete();
      })
      .catch(err => {
        this.Colecciones = [];
        event.target.complete();
        swal('Error', 'Ha ocurrido un error vuelva a intentar', 'error');
      });
  }

  async ListarCol() {
    const Load = await this.Loading.create({
      message: 'Por favor espere un momento...',
      showBackdrop: false,
      spinner: 'circles',
      mode: 'ios'
    });
    await Load.present();
    return this._Coleccion
      .Listar(this.Datos.Url)
      .then(json => {
        this.Colecciones = (json as any).Colecciones;
        this.Colecciones.splice(this.Colecciones.indexOf('system.indexes'), 1);
        Load.dismiss();
      })
      .catch(err => {
        Load.dismiss();
        swal('Error', 'Ha ocurrido un error vuelva a intentar', 'error');
      });
  }

  EliminarColeccion(Item: string) {
    this.Confirm('¿Seguro que desea eliminar esta colección?', 'Eliminar').then(
      async valor => {
        if (valor) {
          const Load = await this.Cargando();
          await Load.present();
          this._Coleccion
            .EliminarColeccion(this.Datos.Url, Item)
            .then(json => {
              this.Colecciones.splice(this.Colecciones.indexOf(Item), 1);
              this.DocumentosCol = [];
              localStorage.removeItem(this.Datos.BaseDatos + '/' + Item);
              Load.dismiss();
            })
            .catch(err => {
              Load.dismiss();
              swal('Error', 'Ha ocurrido un error vuelva a intentar', 'error');
            });
        }
      }
    );
  }

  EliminarDocumento(Doc: any, Item: string) {
    this.Confirm('¿Seguro que desea eliminar este documento?', 'Eliminar').then(
      async valor => {
        if (valor) {
          const Load = await this.Cargando();
          await Load.present();
          this._Coleccion
            .EliminarDocumento(this.Datos.Url, Item, Doc._id)
            .then(json => {
              this.DocumentosCol.splice(this.DocumentosCol.indexOf(Doc), 1);
              localStorage.setItem(
                this.Datos.BaseDatos + '/' + Item,
                JSON.stringify(this.DocumentosCol)
              );
              Load.dismiss();
            })
            .catch(err => {
              Load.dismiss();
              swal('Error', 'Ha ocurrido un error vuelva a intentar', 'error');
            });
        }
      }
    );
  }

  Documentos(i: number, item: string): void {
    this.Spin = true;
    this.Seleccion = i === this.Seleccion ? -1 : i;
    this.Select = true;
    this.SeleccionId = '';
    if (this.Seleccion !== -1) {
      const N = JSON.parse(
        localStorage.getItem(this.Datos.BaseDatos + '/' + item)
      );
      if (N) {
        this.DocumentosCol = N as any[];
        this.Spin = false;
      } else {
        this._Coleccion
          .DocumentosColeccion(this.Datos.Url, item)
          .then(json => {
            this.DocumentosCol = (json as any).Docs as any[];
            localStorage.setItem(
              this.Datos.BaseDatos + '/' + item,
              JSON.stringify(this.DocumentosCol)
            );
            this.Spin = false;
          })
          .catch(err => {
            this.Seleccion = -1;
            swal('Error', 'Ha ocurrido un error vuelva a intentar', 'error');
          });
      }
    }
  }

  SelectId(Id: string, i: number): void {
    this.Select = false;
    this.SeleccionId = Id === this.SeleccionId ? '' : Id;
    if (this.SeleccionId.length > 0) {
      this.Doc = this.DocumentosCol[i];
      this.Select = true;
    } else {
      this.Doc = {};
    }
  }

  Confirm(Titulo: string, Boton: string) {
    return swal({
      title: Titulo,
      closeOnClickOutside: false,
      closeOnEsc: false,
      icon: 'warning',
      buttons: ['Cancelar', Boton],
      dangerMode: true
    });
  }

  Input(Titulo: string, tipo: string) {
    return swal({
      text: Titulo,
      closeOnClickOutside: false,
      buttons: ['Cancelar', 'Ok'],
      closeOnEsc: false,
      content: {
        element: 'input',
        attributes: {
          type: tipo
        }
      }
    });
  }

  AgregarColeccion() {
    this.Input('Nombre de la colección: ', 'text').then(async json => {
      if (json) {
        let Load = await this.Cargando();
        await Load.present();
        this._Coleccion
          .AgregarColeccion(this.Datos.Url, json as string)
          .then(col => {
            Load.dismiss();
            swal('Agregado: ' + (col as any).Nombre, 'Refresque para ver cambio', 'success');
          })
          .catch(err => {
            Load.dismiss();
            err.error.Error
              ? swal('Error', err.error.Error, 'error')
              : swal('Error', 'No autorizado revise sus datos', 'error');
          });
      } else {
        swal('Error', 'Proporcione un nombre', 'error');
      }
    });
  }

  async Cargando() {
    return this.Loading.create({
      message: 'Por favor espere un momento...',
      showBackdrop: false,
      spinner: 'circles',
      mode: 'ios'
    });
  }

  CambiarNombre(Col: string) {
    this.Input('Nombre de la colección modificada: ', 'text').then(async json => {
      if (json) {
        let Load = await this.Cargando();
        await Load.present();
        this._Coleccion
          .CambiarNombre(this.Datos.Url, Col, json as string)
          .then(col => {
            Load.dismiss();
            swal('Modificado: ' + (col as any).Nombre, 'Refresque para ver cambio', 'success');
          })
          .catch(err => {
            Load.dismiss();
            err.error.Error
              ? swal('Error', err.error.Error, 'error')
              : swal('Error', 'No autorizado revise sus datos', 'error');
          });
      } else {
        swal('Error', 'Proporcione un nombre', 'error');
      }
    });
  }

  BorrarUsuario() {
    this.Input('Nombre del usuario a eliminar: ', 'text').then(async json => {
      if (json) {
        this.Confirm('¿Desea eliminar este usuario ' + json + '? ', 'Eliminar').then(async boton => {
          if (boton) {
            let Load = await this.Cargando();
            await Load.present();
            this._Conexion.BorrarUsuario(this.Datos.Url, json).then(json2 => {
              Load.dismiss();
              swal('Eliminado', 'Usuario: ' + json + ' ha sido eliminado satisfactoriamente', 'success');
            }).catch(err => {
              Load.dismiss();
              err.error.Error
                ? swal('Error', err.error.Error, 'error')
                : swal('Error', 'No autorizado revise sus datos', 'error');
            });
          }
        })
      } else {
        swal('Error', 'Proporcione un nombre', 'error');
      }
    });
  }

  AgregarDoc(Col: string) {
    this.Modal(EditorPage, { Json: '{}', Accion: true, Datos: { Conexion: this.Datos, Col: Col } });
  }

  ActualizarDoc(Col: string, Doc: any){
    this.Modal(EditorPage, { Json: JSON.stringify(Doc), Accion: false, Datos: { Conexion: this.Datos, Col: Col } });
  }

  async Modal(Page: any, Data: any) {
    const modal = await this._Modal.create({
      component: Page,
      componentProps: Data,
      mode: 'ios',
      keyboardClose: true,
      backdropDismiss: false
    });
    return await modal.present();
  }
}
