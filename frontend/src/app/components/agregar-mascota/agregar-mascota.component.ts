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
  
  cliente:string = "";
  
  mascota:Mascota = {
    nombre: "",
    tipo: "",
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
    console.log(this.mascota);
    this.clivet.nuevaMascota(this.mascota)
      .subscribe( data => {
        console.log("Mascota registrada");
        this.router.navigate(['/cliente', this.id]);
      },
      error => {
        console.error('Error al agregar nueva Mascota: '+error);
        this.error = true;
      });
  }

}
