import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClivetService } from '../../services/clivet.service';
import { Cliente } from '../../interfaces/cliente.interface';

@Component({
  selector: 'app-clientes-administrar',
  templateUrl: './clientes-administrar.component.html',
  styles: []
})
export class ClientesAdministrarComponent implements OnInit {

  clientes:Cliente[];

  cargando:boolean = false;

  constructor( public clivet:ClivetService, private router:Router ) {}

  ngOnInit() {
    this.loadScripts()
    this.getClientes()
  }

  getClientes(){
    this.cargando = true
    this.clivet.getClientesAdmin()
      .subscribe( (data:Cliente[]) => {
        this.clientes = data;
        this.cargando = false;
      });
  }

  eliminarClientes(){
    if (confirm('¿Está seguro que quiere eliminar los datos de forma permanente?')) {
      this.clivet.deleteClientesAdmin()
        .subscribe( () => {
          this.eliminarMascotas()
          this.eliminarConsultas()
          this.getClientes()
          this.router.navigate(['/administrar'])
        })

    }
  }

  eliminarMascotas(){
    this.clivet.deleteMascotasAdmin()
      .subscribe( () => {
      })
  }

  eliminarConsultas(){
    this.clivet.deleteConsultasAdmin()
      .subscribe( () => {
      })
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
