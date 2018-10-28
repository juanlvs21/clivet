import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClivetService } from '../../services/clivet.service';
import { Cliente } from '../../interfaces/cliente.interface';
import { Mascota } from '../../interfaces/mascota.interface';
import { Detalle } from '../../interfaces/detalle.interface';

@Component({
  selector: 'app-historia-mascota',
  templateUrl: './historia-mascota.component.html',
  styles: []
})
export class HistoriaMascotaComponent implements OnInit {

  id: number;
  id_cliente: number;
  id_detalle: number;
  cliente: Cliente;
  mascota:Mascota;
  detalle:Detalle;

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
      this.id_detalle = params['id_detalle'];
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

  getDetalle(){
    this.clivet.getUnicoDetalle(this.id_detalle)
      .subscribe( (data:Detalle) => {
        console.log(data);
        this.detalle = data[0];
        this.cargando = false;
      });
  }  
  
  eliminarDetalle(id:number){
    this.eliminandodetalle = id;
    if (confirm('¿Desea eliminar este detalle de historia?')) {
      this.clivet.deleteDetalle(id) 
      .subscribe(response => {
        this.eliminandodetalle = -1;
        console.log("Detalle Eliminado");
        this.router.navigate(['/mascota',this.id,'consultas'])
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
