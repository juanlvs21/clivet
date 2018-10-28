import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ClivetService } from '../../services/clivet.service';
import { Cliente } from '../../interfaces/cliente.interface';
import { Mascota } from '../../interfaces/mascota.interface';
import { Detalle } from '../../interfaces/detalle.interface';
import { Vacunas } from '../../interfaces/vacunas.interface';

@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.css']
})
export class MascotaComponent implements OnInit {

  id: number;
  id_cliente: number;
  cliente: Cliente;
  mascota:Mascota;
  detalles:Detalle[];
  vacunas:Vacunas[];

  vacuna= {
    nombre: "",
    fecha: "",
    id_mascota: 0
  }

  datosdetalle = {
    id_historia: "",
    descripcion: ""
  }

  cargando:boolean = true;
  guardadodetalle:boolean = false;
  eliminando:boolean = false;

  eliminandodetalle:number = -1;

  totalvacunas:number = 0;
  totaldetalles: number = 0;

  constructor(public clivet: ClivetService, private activatedRouted: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.getIp();
    this.getMascota();
    this.loadScripts();
  }

  getIp(){
    this.activatedRouted.params.subscribe(params => {
      this.id = params['id'];
      this.datosdetalle.id_historia = params['id'];
    })
  }

  getMascota(){
    this.clivet.getMascota(this.id)
      .subscribe((data: Mascota) => {
        this.mascota = data;
        this.id_cliente = data.id_cliente;
        this.vacuna.id_mascota = this.id;
        this.getCliente();
        this.getVacunas();
        this.getDetalle();
      });
  }

  eliminarMascota(){
    this.eliminando = true;
    if (confirm(`¿Desea eliminar a ${this.mascota.nombre}?`)) {
      this.clivet.deleteMascota(this.id) 
      .subscribe(response => {
        this.eliminando = false;
        console.log("Mascota Eliminada");
        this.router.navigate(['/cliente', this.id_cliente ]);
      });
    }else{
      this.eliminando = false;
    }
  }

  getDetalle(){
    this.clivet.getDetalle(this.id)
      .subscribe( (data:Detalle[]) => {
        console.log(data);
        this.detalles = data;
        this.totaldetalles = data.length;
        this.cargando = false;
      });
  }

  agregardetalle( detalle:NgForm ){
    this.guardadodetalle = true;
    this.clivet.nuevoDetalle(detalle.value)
      .subscribe( data => {
        console.log("Detalle registrado");
        this.datosdetalle.descripcion = "";
        this.getDetalle();
        this.guardadodetalle = false;
      },
      error => {
        console.error('Error al agregar nuevo Detalle: '+error);
        this.guardadodetalle = false;
      });
  }

  eliminarDetalle(id:number){
    this.eliminandodetalle = id;
    if (confirm('¿Desea eliminar este detalle de historia?')) {
      this.clivet.deleteDetalle(id) 
      .subscribe(response => {
        this.eliminandodetalle = -1;
        console.log("Detalle Eliminado");
        this.getDetalle();
      });
    }else{
      this.eliminandodetalle = -1;
    }
  }

  getCliente(){
    this.clivet.getCliente(this.id_cliente)
      .subscribe( (data:Cliente) => {
        this.cliente = data;
      });
  }  
  
  getVacunas(){
    this.clivet.getVacunas(this.id)
      .subscribe((data: Vacunas[]) => {
        this.vacunas = data;
        this.totalvacunas = data.length;
      });
  }

  deleteVacuna( id:number ){
    if (confirm('¿Desea eliminar esta vacuna?')) {
      this.clivet.deleteVacunas(id)
        .subscribe( data => {
          console.log("Vacuna eliminada");
          this.getVacunas();
        });
    }
  }

  agregarVacuna( vacuna:NgForm ){
    this.clivet.nuevaVacuna(vacuna.value)
      .subscribe( (data:Vacunas) => {
        console.log("Detalle registrado");
        this.vacuna.nombre = "";
        this.vacuna.fecha = "";
        this.getVacunas();
      },
      error => {
        console.error('Error al agregar vacuna: '+error);
      }); 
  }

  loadScripts() {
    const dynamicScripts = [
      'assets/libs/jquery/jquery.min.js',
      'assets/libs/bootstrap/js/bootstrap.bundle.min.js',
      'assets/libs/datatables/jquery.dataTables.js',
      'assets/libs/datatables/dataTables.bootstrap4.js',
      'assets/libs/sb-admin/sb-admin-datatables.min.js'
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
}
