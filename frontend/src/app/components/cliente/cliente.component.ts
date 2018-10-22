import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ClivetService } from '../../services/clivet.service';
import { Cliente } from '../../interfaces/cliente.interface';
import { Mascota } from '../../interfaces/mascota.interface';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  
  id_cliente:number = 0;
  cliente:Cliente;
  mascotas:Mascota;

  eliminando:boolean = false;
  eliminandocliente:boolean = false;

  constructor( private clivet:ClivetService, private activatedRouted: ActivatedRoute, private router:Router ) {}

  ngOnInit() {
    this.loadScripts();
    this.getId();
    this.getCliente();
    this.getMascotas(this.id_cliente);
  }

  getId(){
    this.activatedRouted.params.subscribe(params => {
      this.id_cliente = params['id'];
    })
  }
  
  getCliente(){
    this.clivet.getCliente(this.id_cliente)
      .subscribe( (data:Cliente) => {
        this.cliente = data;
        console.log(this.cliente);
      });
  }

  eliminarCliente(){
    this.eliminandocliente = true;
    if (confirm(`¿Desea eliminar a ${this.cliente.nombre}?`)) {
      this.clivet.deleteCliente(this.id_cliente) 
      .subscribe(response => {
        console.log("Cliente Eliminado");
        this.eliminandocliente = false;
        this.router.navigate(['/clientes']);
      });
    }else{
      this.eliminandocliente = false;
    }
  }

  getMascotas( id:number ){
    this.clivet.getMascotasCliente(id)
      .subscribe( (data:Mascota) => {
        console.log(data);
        // this.cargando = false;
        this.mascotas = data;
      });
  }

  eliminarMascota(id:number){
    this.eliminando = true;
    if (confirm(`¿Desea eliminar esta mascota de ${this.cliente.nombre}?`)) {
      this.clivet.deleteMascota(id) 
      .subscribe(response => {
        this.eliminando = false;
        console.log("Mascota Eliminada");
        this.getMascotas(this.id_cliente);
      });
    }else{
      this.eliminando = false;
    }
  }

  loadScripts() {
    const dynamicScripts = [
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
