import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AutheticationService } from 'src/app/authetication.service';
import { Router } from '@angular/router';
import { AlertButton, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup
  
  constructor(public formBuilder: FormBuilder, public loadingCntrl: LoadingController, public authService: AutheticationService, public router: Router, public alertController: AlertController) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      correo: ['',[
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")
      ]],
      clave: ['',[
        Validators.required]]
    })
  }

  get errorControl(){
    return this.loginForm?.controls;
  }

  async loginIn(){
    if (this.loginForm.valid){
      const loading = await this.loadingCntrl.create();
      await loading.present();
      if(this.loginForm?.valid){
        const user = await this.authService.loginUser(this.loginForm.value.correo, this.loginForm.value.clave).catch((error)=>{
          console.log(error);
          loading.dismiss()

        })

        if(user){
          loading.dismiss()
          this.router.navigate(['/inicio'])
        }else{
          console.log('Favor ingrese credenciales validas')
        }
    }
    }
    else{
      console.log('No guarda')
        const fracaso = await this.alertController.create({
          cssClass: "my-custom-class",
          header: 'Campos vacios',
          message: 'Rellene todos los campos para iniciar sesión',
          buttons: ['Entendido']
    });
      await fracaso.present();
  }

}
}
