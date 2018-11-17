export default class Conexion {
  Url: string;
  BaseDatos: string;

  constructor(Url: string, BaseDatos: string) {
    this.Url = Url;
    this.BaseDatos = BaseDatos;
  }
}