import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ClivetService } from '../../services/clivet.service';
import { Cliente } from '../../interfaces/cliente.interface';
import { Mascota } from '../../interfaces/mascota.interface';
import { Vacunas } from '../../interfaces/vacunas.interface';

@Component({
  selector: 'app-vacunas',
  templateUrl: './vacunas.component.html',
  styles: []
})
export class VacunasComponent implements OnInit {

  id: number;
  id_cliente: number;
  cliente: Cliente;
  mascota:Mascota;
  vacunas:Vacunas;

  vacuna= {
    nombre: "",
    fecha: "",
    id_mascota: 0
  }

  cargando:boolean = true;
  guardandovacuna:boolean = false;

  eliminando:number = -1;

  totalvacunas:number = 0;

  constructor(private clivet: ClivetService, private activatedRouted: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.getIp();
    this.getMascota();
    this.loadScripts();
  }

  getIp(){
    this.activatedRouted.params.subscribe(params => {
      this.id = params['id'];
    })
  }

  // ----- MASCOTA -----
  getMascota(){
    this.clivet.getMascota(this.id)
      .subscribe((data: any) => {
        this.mascota = data;
        this.id_cliente = data.id_cliente;
        this.vacuna.id_mascota = this.id;
        this.getCliente();
        this.getVacunas();
      });
  }

  // ----- CLIENTE -----
  getCliente(){
    this.clivet.getCliente(this.id_cliente)
      .subscribe( (data:Cliente) => {
        this.cliente = data;
      });
  }  
  
  // ----- VACUNAS -----
  getVacunas(){
    this.clivet.getVacunas(this.id)
      .subscribe((data: any) => {
        this.vacunas = data;
        this.totalvacunas = data.length;
        this.cargando = false;
      });
  }

  deleteVacuna( id:number ){
    this.eliminando = id;
    if (confirm('¿Desea eliminar esta vacuna?')) {
      this.clivet.deleteVacunas(id)
        .subscribe( data => {
          console.log("Vacuna eliminada");
          this.eliminando = -1;
          this.getVacunas();
        });
    }
  }

  agregarVacuna( vacuna:NgForm ){
    this.guardandovacuna = true;
    this.clivet.nuevaVacuna(vacuna.value)
      .subscribe( data => {
        console.log("Detalle registrado");
        this.vacuna.nombre = "";
        this.vacuna.fecha = "";
        this.guardandovacuna = false;
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
