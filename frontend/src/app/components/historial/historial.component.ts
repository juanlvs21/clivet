import { Component, OnInit } from '@angular/core';
import { ClivetService } from '../../services/clivet.service';
import { Consulta } from '../../interfaces/consulta.interface';
import { Mascota } from '../../interfaces/mascota.interface';
import { Medico } from '../../interfaces/medico.interface';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styles: []
})
export class HistorialComponent implements OnInit {

  consultas:Consulta[] = [];
  consultasFecha:Consulta[] = [];
  mascotas:Mascota[] = [];
  medicos:Medico[] = [];

  cargando:boolean = false;
  
  constructor( private clivet:ClivetService ) {}

  ngOnInit() {
    this.loadScripts();
    this.getConsultas();
    this.getMascotas()
    this.getMedicos()
  }

  // ----- CONSULTAS -----
  getConsultas(){
    this.cargando = true;

    this.clivet.getConsultasHistorial()
      .subscribe( (data:Consulta[]) => {
        this.consultas = data
      });
  }  
  
  // ----- MASCOTAS -----
  getMascotas(){
    this.clivet.getMascotas()
      .subscribe( (data:Mascota[]) => {
        // this.cargando = false;
        this.mascotas = data;
      });
  } 
  
  // ----- MEDICOS -----
  getMedicos(){
    this.clivet.getMedicos()
      .subscribe( (data:Medico[]) => {
        this.cargando = false;
        this.medicos = data;
      });
  }

  loadScripts() {
    const dynamicScripts = [
      'assets/libs/jquery/jquery.min.js',
      'assets/libs/bootstrap/js/bootstrap.bundle.min.js',
      'assets/libs/datatables/jquery.dataTables.js',
      'assets/libs/datatables/dataTables.bootstrap4.js',
      'assets/libs/sb-admin/sb-admin-datatables.min.js',
      'assets/libs/chartjs/Chart.bundle.min.js'
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
