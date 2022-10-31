import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Persona} from '../models';
import {PersonaRepository} from '../repositories';
import { llaves } from '../config/Llaves';
const jwt = require('jsonwebtoken')

//importacion de paquetes
const generador = require("password-generator")
const cryptoJS = require("crypto-js")

@injectable({scope: BindingScope.TRANSIENT})
export class AutentificacionService {
  constructor(
    @repository(PersonaRepository)
    public personarepositorio: PersonaRepository
  ) { }

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
  //Identificar persona
  IdentificarPersona(usuario: string, clave: string){
    try {

      let p = this.personarepositorio.findOne({where:{correo: usuario, clave: clave}})
      if(p){
        return p //si esxixte retornamos los datos de l usuario
      }
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }

  //crear token
  GeneradorTokenJWT(persona: Persona){
    let token = jwt.sign({
      data:{
        id: persona.id,
        correo: persona.correo,
        nombre: persona.nombre
      }
    },
    llaves.claveJWT)
    return token
  }

  // Validamos el token
  ValidarToken(token: string){
    try {
      let datos = jwt.verify(token, llaves.claveJWT)
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
