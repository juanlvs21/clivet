import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClivetService } from '../../services/clivet.service';
import { Detalle } from '../../interfaces/detalle.interface';

@Component({
  selector: 'app-detalles-administrar',
  templateUrl: './detalles-administrar.component.html',
  styles: []
})
export class DetallesAdministrarComponent implements OnInit {

  detalles:Detalle[];

  cargando:boolean = false;

  constructor( private clivet:ClivetService, private router:Router ) {}

  ngOnInit() {
    this.loadScripts()
    this.getDetalles()
  }

  getDetalles(){
    this.cargando = true
    this.clivet.getDetallesAdmin()
      .subscribe( (data:Detalle[]) => {
        this.detalles = data;
        console.log(data)
        this.cargando = false;
      });
  }

  eliminarDetalles(){
    if (confirm('¿Está seguro que quiere eliminar los datos de forma permanente?')) {
      this.clivet.deleteDetallesAdmin()
        .subscribe( () => {
          this.getDetalles()
          this.router.navigate(['/administrar'])
        })

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
