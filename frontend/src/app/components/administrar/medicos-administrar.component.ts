import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClivetService } from '../../services/clivet.service';
import { Medico } from '../../interfaces/medico.interface';

@Component({
  selector: 'app-medicos-administrar',
  templateUrl: './medicos-administrar.component.html',
  styles: []
})
export class MedicosAdministrarComponent implements OnInit {

  medicos:Medico[];

  cargando:boolean = false;

  constructor( private clivet:ClivetService, private router:Router ) {}

  ngOnInit() {
    this.loadScripts()
    this.getClientes()
  }

  getClientes(){
    this.cargando = true
    this.clivet.getMedicos()
      .subscribe( (data:Medico[]) => {
        this.medicos = data;
        this.cargando = false;
      });
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
