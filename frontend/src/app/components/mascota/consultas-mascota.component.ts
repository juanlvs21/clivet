import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ClivetService } from '../../services/clivet.service';
import { Cliente } from '../../interfaces/cliente.interface';
import { Mascota } from '../../interfaces/mascota.interface';
import { Detalle } from '../../interfaces/detalle.interface';

@Component({
  selector: 'app-consultas-mascota',
  templateUrl: './consultas-mascota.component.html',
  styles: []
})
export class ConsultasMascotaComponent implements OnInit {

  id: number;
  id_cliente: number;
  cliente: Cliente;
  mascota:Mascota;
  detalles:Detalle[];

  datosdetalle = {
    id_historia: "",
    descripcion: ""
  }

  cargando:boolean = true;
  guardadodetalle:boolean = false;
  eliminando:boolean = false;

  eliminandodetalle:number = -1;
  totalconsulta:number = 0;

  constructor(private clivet: ClivetService, private activatedRouted: ActivatedRoute, private router:Router) { }

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
      .subscribe((data: any) => {
        this.mascota = data;
        this.id_cliente = data.id_cliente;
        this.getCliente();
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
        this.cargando = false;
        this.totalconsulta = data.length;
      });
  }

  getCliente(){
    this.clivet.getCliente(this.id_cliente)
      .subscribe( (data:Cliente) => {
        this.cliente = data;
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
