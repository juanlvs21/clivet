import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Mascota } from '../../interfaces/mascota.interface';
import { ClivetService } from '../../services/clivet.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agregar-mascota',
  templateUrl: './agregar-mascota.component.html',
  styleUrls: ['./agregar-mascota.component.css']
})
export class AgregarMascotaComponent{
 
  id:number = 0;
  error:boolean = false;
  errorNombre:boolean = false;
  errorRaza:boolean = false;
  letrasError:number = 0;
  letrasError2:number = 0;

  cliente:string = "";
  
  mascota:Mascota = {
    nombre: "",
    tipo: "",
    sexo: "",
    raza: "",
    edad: 0,
    tamano: 0,
    peso: 0,
    descripcion: "",
    antecedentes: "",
    id_cliente: 0
  }

  constructor(private clivet: ClivetService, private activatedRouted: ActivatedRoute, private router:Router) {
    this.activatedRouted.params.subscribe(params => {
      this.id = params['id'];
    })

    this.clivet.getCliente(this.id)
      .subscribe((data: any) => {
        this.mascota.id_cliente = data.id;
        this.cliente = data.nombre + " " + data.apellido;
      });
  }

  guardar(){
    // let patron = [' ','a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z','á','é','í','ó','ú', 'Á', 'É', 'Í', 'Ó', 'Ú']
    let patron = ['0','1','2','3','4','5','6','7','8','9']
    this.letrasError = 0;
    this.letrasError2 = 0;
    this.errorNombre = false
    this.errorRaza = false

    for (let i = 0; i < this.mascota.nombre.length; i++) {
      for (let j = 0; j < patron.length; j++) {
        if (this.mascota.nombre[i] == patron[j]) {
          this.letrasError++
        }
      }
    }

    for (let i = 0; i < this.mascota.raza.length; i++) {
      for (let j = 0; j < patron.length; j++) {
        if (this.mascota.raza[i] == patron[j]) {
          this.letrasError2++
        }
      }
    }

    if((this.letrasError == 0)&&(this.letrasError2 == 0)) {
      console.log(this.mascota);
      this.clivet.nuevaMascota(this.mascota)
        .subscribe( () => {
          console.log("Mascota registrada");
          this.router.navigate(['/cliente', this.id]);
        },
        error => {
          console.error('Error al agregar nueva Mascota: '+error);
          this.error = true;
        });
    }else if(this.letrasError > 0){
      console.error('Solo letras')
      this.errorNombre = true
    }else if(this.letrasError2 > 0){
      console.error('Solo letras')
      this.errorRaza = true
    } 

  }

}
