import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AutheticationService } from 'src/app/authetication.service';
import { AlertButton, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.page.html',
  styleUrls: ['./singup.page.scss'],
})
export class SingupPage implements OnInit {
  regForm: FormGroup
  
  constructor(public formBuilder: FormBuilder, public loadingCntrl: LoadingController, public authService: AutheticationService, public router: Router, public alertController: AlertController) { 

  }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      rut: ['',[
        Validators.required,
        Validators.pattern("^[0-9]+[-|‐]{1}[0-9kK]{1}$")]],
      nombreCompleto: ['',[Validators.required]],
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
    return this.regForm?.controls;
  }

  async singUp(){
    if(this.regForm.invalid){
      console.log('No guarda')
        const fracaso = await this.alertController.create({
          cssClass: "my-custom-class",
          header: 'Registro incompleto',
          message: 'Debe completar todos los campos para registrarse',
          buttons: ['Entendido']
        });
  
      await fracaso.present();
    }else{
      const loading = await this.loadingCntrl.create();
        await loading.present();
        if(this.regForm?.valid){
          const user = await this.authService.registerUser(this.regForm.value.correo, this.regForm.value.clave).catch((error)=>{
            console.log(error);
            loading.dismiss()

          })
          console.log('guarda')
        const exito = await this.alertController.create({
          cssClass: "my-custom-class",
          header: 'Registro exitoso',
          message: 'Se ha registrado con exito',
          buttons: ['Entendido']
        });
  
        await exito.present();
  
        // Redirige a la pestaña "home" después de un breve retraso
        setTimeout(() => {
        this.router.navigateByUrl('/login');
        }, 0); // Cambia este valor según sea necesario

          if(user){
            loading.dismiss()
            this.router.navigate(['/login'])
          }else{
            console.log('Favor ingrese credenciales validas')
          }
        }
      }
    }
    

}
