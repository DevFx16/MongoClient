import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MongoConexionService } from "../../Services/MongoConexion/mongo-conexion.service";
import Conexion from "../../Models/Conexion";
import { MongoColeccionService } from "../../Services/MongoColeccion/mongo-coleccion.service";
import { LoadingController, ActionSheetController } from "@ionic/angular";
import swal from "sweetalert";

@Component({
  selector: "app-datos",
  templateUrl: "./datos.page.html",
  styleUrls: ["./datos.page.scss"]
})
export class DatosPage implements OnInit {
  Datos: Conexion;
  Colecciones: string[] = [];
  DocumentosCol: any[] = [];
  Seleccion: number = -1;
  SeleccionId: string = "";
  Spin: boolean = false;
  Select: boolean = false;
  Doc: any;

  constructor(
    private _Router: Router,
    private _Conexion: MongoConexionService,
    private _Params: ActivatedRoute,
    private _Coleccion: MongoColeccionService,
    public Loading: LoadingController,
    private _Action: ActionSheetController
  ) {
    this._Params.params.subscribe(Params => {
      this.Datos = Params as Conexion;
    });
  }

  ngOnInit() {
    this.ListarCol();
  }

  async Accion() {
    const actionSheet = await this._Action.create({
      header: "Opciones",
      buttons: [
        {
          text: "Agregar usuario",
          icon: "md-person-add",
          handler: () => {}
        },
        {
          text: "Borrar usuario",
          role: "destructive",
          icon: "trash",
          handler: () => {}
        },
        {
          text: "Agregar Colección",
          icon: "md-add-circle",
          handler: () => {}
        },
        {
          text: "Regresar",
          icon: "md-arrow-back",
          handler: () => {
            this._Router.navigate(["/Inicio"]);
          }
        },
        {
          text: "Clancelar",
          icon: "close",
          role: "cancel"
        }
      ],
      backdropDismiss: false,
      keyboardClose: true,
      mode: "ios"
    });
    await actionSheet.present();
  }

  Refrescar(event) {
    this.Seleccion = -1;
    this.SeleccionId = "";
    this.Colecciones.forEach(element => {
      localStorage.removeItem(this.Datos.BaseDatos + "/" + element);
    });
    this._Coleccion
      .Listar(this.Datos.Url)
      .then(json => {
        this.Colecciones = (json as any).Colecciones;
        this.Colecciones.splice(this.Colecciones.indexOf("system.indexes"), 1);
        event.target.complete();
      })
      .catch(err => {
        this.Colecciones = [];
        event.target.complete();
        swal("Error", "Ha ocurrido un error vuelva a intentar", "error");
      });
  }

  async ListarCol() {
    const Load = await this.Loading.create({
      message: "Por favor espere un momento...",
      showBackdrop: false,
      spinner: "circles",
      mode: "ios"
    });
    await Load.present();
    return this._Coleccion
      .Listar(this.Datos.Url)
      .then(json => {
        this.Colecciones = (json as any).Colecciones;
        this.Colecciones.splice(this.Colecciones.indexOf("system.indexes"), 1);
        Load.dismiss();
      })
      .catch(err => {
        Load.dismiss();
        swal("Error", "Ha ocurrido un error vuelva a intentar", "error");
      });
  }

  EliminarColeccion(Item: string) {
    this.Confirm("¿Seguro que desea eliminar esta colección?", "Eliminar").then(
      async valor => {
        if (valor) {
          const Load = await this.Cargando();
          await Load.present();
          this._Coleccion
            .EliminarColeccion(this.Datos.Url, Item)
            .then(json => {
              this.Colecciones.splice(this.Colecciones.indexOf(Item), 1);
              this.DocumentosCol = [];
              localStorage.removeItem(this.Datos.BaseDatos + "/" + Item);
              Load.dismiss();
            })
            .catch(err => {
              Load.dismiss();
              swal("Error", "Ha ocurrido un error vuelva a intentar", "error");
            });
        }
      }
    );
  }

  EliminarDocumento(Doc: any, Item: string) {
    this.Confirm("¿Seguro que desea eliminar este documento?", "Eliminar").then(
      async valor => {
        if (valor) {
          const Load = await this.Cargando();
          await Load.present();
          this._Coleccion
            .EliminarDocumento(this.Datos.Url, Item, Doc._id)
            .then(json => {
              this.DocumentosCol.splice(this.DocumentosCol.indexOf(Doc), 1);
              localStorage.setItem(
                this.Datos.BaseDatos + "/" + Item,
                JSON.stringify(this.DocumentosCol)
              );
              Load.dismiss();
            })
            .catch(err => {
              Load.dismiss();
              swal("Error", "Ha ocurrido un error vuelva a intentar", "error");
            });
        }
      }
    );
  }

  Documentos(i: number, item: string): void {
    this.Spin = true;
    this.Seleccion = i === this.Seleccion ? -1 : i;
    this.Select = true;
    this.SeleccionId = "";
    if (this.Seleccion !== -1) {
      const N = JSON.parse(
        localStorage.getItem(this.Datos.BaseDatos + "/" + item)
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
              this.Datos.BaseDatos + "/" + item,
              JSON.stringify(this.DocumentosCol)
            );
            this.Spin = false;
          })
          .catch(err => {
            this.Seleccion = -1;
            swal("Error", "Ha ocurrido un error vuelva a intentar", "error");
          });
      }
    }
  }

  SelectId(Id: string, i: number): void {
    this.Select = false;
    this.SeleccionId = Id === this.SeleccionId ? "" : Id;
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
      icon: "warning",
      buttons: ["Cancelar", Boton],
      dangerMode: true
    });
  }

  async Cargando() {
    return this.Loading.create({
      message: "Por favor espere un momento...",
      showBackdrop: false,
      spinner: "circles",
      mode: "ios"
    });
  }
}
