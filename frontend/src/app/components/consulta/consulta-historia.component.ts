import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ClivetService } from '../../services/clivet.service';
import { Cliente } from '../../interfaces/cliente.interface';
import { Mascota } from '../../interfaces/mascota.interface';
import { Consulta } from '../../interfaces/consulta.interface';
import { Detalle } from '../../interfaces/detalle.interface';

@Component({
  selector: 'app-consulta-historia',
  templateUrl: './consulta-historia.component.html',
  styles: []
})
export class ConsultaHistoriaComponent implements OnInit {

  id_mascota: number;
  id_consulta: number;
  id_cliente: number;
  cliente: Cliente;
  mascota:Mascota;
  detalle:Detalle;
  consulta:Consulta;

  datosdetalle = {
    id_historia: "",
    descripcion: ""
  }

  cargando:boolean = true;
  guardadodetalle:boolean = false;
  eliminando:boolean = false;
  editando:boolean = false;
  guardado:boolean = false;

  eliminandodetalle:number = -1;

  constructor(private clivet: ClivetService, private activatedRouted: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.getIp();
    this.getMascota();
    this.loadScripts();
  }

  getIp(){
    this.activatedRouted.params.subscribe(params => {
      this.id_mascota = params['id_mascota'];
      this.id_consulta = params['id_consulta'];
      this.datosdetalle.id_historia = params['id_mascota'];
    })
  }

  // ----- MASCOTA -----
  getMascota(){
    this.clivet.getMascota(this.id_mascota)
      .subscribe((data: any) => {
        this.mascota = data;
        this.id_cliente = data.id_cliente;
        this.getConsulta();
        this.getCliente();
        this.getDetalle();
      });
  }

  // ----- CONSULTA -----
  getConsulta(){
    this.clivet.getConsulta(this.id_consulta)
      .subscribe( (data:Consulta) => {
        this.consulta = data;
      });
  } 

  // ----- DETALLE -----
  getDetalle(){
    this.cargando = true;   
    let f = new Date()
    let fecha = f.getFullYear()+"-"+(f.getMonth() +1)+"-"+f.getDate()

    this.clivet.getDetalle(this.id_mascota)
      .subscribe( (data:Detalle[]) => {
        for (let i = 0; i < data.length; i++) {
          let fd = data[i].fecha.split("T") 
          if (fd[0] == fecha) {
            this.detalle = data[i];
            this.datosdetalle.descripcion = data[i].descripcion
            this.guardado = true;
            console.log(this.detalle);
            this.editando = true
          }else{
            this.editando = false
          }
        }
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
        this.guardado = true;
      },
      error => {
        console.error('Error al agregar nuevo Detalle: '+error);
        this.guardadodetalle = false;
      });
  }

  editarDetalle(detalle:NgForm){
    this.clivet.deleteDetalle(this.detalle.id) 
      .subscribe(response => {
        this.eliminandodetalle = -1;
        this.agregardetalle(detalle)
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

  // ----- CLIENTE -----
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
