import { /* inject, */ BindingScope, injectable} from '@loopback/core';

//importacion de paquetes
const generador = require("password-generator")
const cryptoJS = require("crypto-js")

@injectable({scope: BindingScope.TRANSIENT})
export class AutentificacionService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */
  //generar clave
  GenerarClave() {
    let clave = generador(8, false);
    return clave
  }
  //cifrar clave
  CifrarClave(clave: string) {
    let claveCifrada = cryptoJS.MD5(clave).toString()
    return claveCifrada
  }

}
