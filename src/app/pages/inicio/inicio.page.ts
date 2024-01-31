import { Component, OnInit } from '@angular/core';
import { AutheticationService } from 'src/app/authetication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
})
export class InicioPage {
  user: any
  alertButtons=['Entendido'];

  constructor(public router:Router, public authService:AutheticationService) {
    this.user = authService.getProfile()
  }

  async desconectar(){
    this.authService.singOut().then(()=>{
      this.router.navigate(['/login'])
    }).catch((error)=>{
      console.log(error);
    })

  }

  

}
