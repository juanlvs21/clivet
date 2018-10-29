import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from '../../interfaces/cliente.interface';
import { ClivetService } from '../../services/clivet.service';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css']
})
export class NuevoClienteComponent implements OnInit {

  cliente:Cliente = {
    ci: "",
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    direccion: ""
  }

  error:boolean = false ;
  cargando:boolean = false;
  errorCi:boolean = false;
  errorNombre:boolean = false;
  errorApellido:boolean = false;
  errorTelefono:boolean = false;

  numerosError:number = 0;
  nombresError:number = 0;
  apellidosError:number = 0;
  telefonoError:number = 0;

  constructor(private clivet:ClivetService, private router:Router) { }

  ngOnInit() {
  }
  
  guardar(){
    this.cargando = true;
    this.errorCi = false;
    this.errorNombre = false;
    this.errorApellido = false;
    this.errorTelefono = false;

    this.numerosError = 0;
    this.nombresError = 0;
    this.apellidosError = 0;
    this.telefonoError = 0;

    let patron = ['0','1','2','3','4','5','6','7','8','9']
    let patron2 = [' ','a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z','á','é','í','ó','ú', 'Á', 'É', 'Í', 'Ó', 'Ú']

    for (let i = 0; i < this.cliente.ci.length; i++) {
      for (let j = 0; j < patron2.length; j++) {
        if (this.cliente.ci[i] == patron2[j]) {
          this.numerosError++
        }
      }
    }

    for (let i = 0; i < this.cliente.nombre.length; i++) {
      for (let j = 0; j < patron.length; j++) {
        if (this.cliente.nombre[i] == patron[j]) {
          this.nombresError++
        }
      }
    }

    for (let i = 0; i < this.cliente.apellido.length; i++) {
      for (let j = 0; j < patron.length; j++) {
        if (this.cliente.apellido[i] == patron[j]) {
          this.apellidosError++
        }
      }
    }

    for (let i = 0; i < this.cliente.telefono.length; i++) {
      for (let j = 0; j < patron2.length; j++) {
        if (this.cliente.telefono[i] == patron2[j]) {
          this.telefonoError++
        }
      }
    }

    console.log("Ci:"+this.numerosError)
    console.log("Nombre:"+this.nombresError)
    console.log("Apellido:"+this.apellidosError)
    console.log("Telefono:"+this.telefonoError)

    if ((this.numerosError == 0)&&(this.nombresError == 0)&&(this.apellidosError == 0)&&(this.telefonoError == 0)) {
      this.clivet.nuevoCliente(this.cliente)
      .subscribe( data => {
      this.cargando = false;
      this.router.navigate(['clientes']);
      },
      error => {
        console.error('Error al registrar nuevo Cliente: '+error);
        this.cargando = false;
        this.error = true;
      })      
    }else if(this.numerosError > 0){
      console.error('Solo numeros')
      this.cargando = false;
      this.errorCi = true
    }else if(this.nombresError > 0){
      console.error('Solo letras')
      this.cargando = false;
      this.errorNombre = true
    }else if(this.apellidosError > 0){
      console.error('Solo letras')
      this.cargando = false;
      this.errorApellido = true
    }else if(this.telefonoError > 0){
      console.error('Solo numeros')
      this.cargando = false;
      this.errorTelefono = true
    } 
  }

}
