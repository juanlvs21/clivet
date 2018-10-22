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

  constructor(private clivet:ClivetService, private router:Router) { }

  ngOnInit() {
  }
  
  guardar(){
    // console.log(this.cliente);  
    this.cargando = true;
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
  }

}
