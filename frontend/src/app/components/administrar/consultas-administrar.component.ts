import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClivetService } from '../../services/clivet.service';
import { Consulta } from '../../interfaces/consulta.interface';

@Component({
  selector: 'app-consultas-administrar',
  templateUrl: './consultas-administrar.component.html',
  styles: []
})
export class ConsultasAdministrarComponent implements OnInit {

  consultas:Consulta[];

  cargando:boolean = false;

  constructor( private clivet:ClivetService, private router:Router ) {}

  ngOnInit() {
    this.loadScripts()
    this.getConsultas()
  }

  getConsultas(){
    this.cargando = true
    this.clivet.getConsultasAdmin()
      .subscribe( (data:Consulta[]) => {
        this.consultas = data;
        this.cargando = false;
      });
  }

  eliminarConsultas(){
    if (confirm('¿Está seguro que quiere eliminar los datos de forma permanente?')) {
      this.clivet.deleteConsultasAdmin()
        .subscribe( () => {
          this.getConsultas()
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
