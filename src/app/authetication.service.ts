import { Injectable } from '@angular/core';

import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AutheticationService {

  constructor(public ngFireAuth: AngularFireAuth) {

   }

  async registerUser(correo: string, clave: string){
    return await this.ngFireAuth.createUserWithEmailAndPassword(correo, clave) /* Enviando al backend */
  }

  async loginUser(correo: string, clave: string){ /* Iniciar sesión comparando credenciales */
    return await this.ngFireAuth.signInWithEmailAndPassword(correo, clave)
  }

  async resetPassword(correo: string){ /* Reseteo de clave con correo */
    return await this.ngFireAuth.sendPasswordResetEmail(correo)
  }

  async singOut(){
    return await this.ngFireAuth.signOut()
  }

  async getProfile(){
    return await this.ngFireAuth.currentUser
  }
}
