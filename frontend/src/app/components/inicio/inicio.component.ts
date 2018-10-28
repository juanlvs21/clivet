import { Component, OnInit } from '@angular/core';
import { ClivetService } from '../../services/clivet.service';
import { Consulta } from '../../interfaces/consulta.interface';
import { Mascota } from '../../interfaces/mascota.interface';
import { Usuario } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  
  consultasFecha:Consulta[] = [];
  mascotas:Mascota[] = [];
  medicos:Usuario[] = [];

  totalperros:number = 0;
  totalgatos:number = 0;
  totalconsultascurso:number = 0  
  totalconsultasfinalizadas:number = 0  
  totalconsultas:number = 0 

  nohayconsultas:boolean = false

  constructor( public clivet: ClivetService, ) { }
  
  ngOnInit() {
    this.loadScripts();
    this.getMascotas()
    this.getConsultas()
    this.getConsultasHoy()
    this.getMedicos()
  }

  // ----- MASCOTAS -----
  getMascotas(){
    this.totalperros= 0;
    this.totalgatos = 0;
    this.clivet.getMascotas()
    .subscribe( (data:Mascota[]) => {
      this.mascotas = data;
      console.log(this.mascotas)
      for (let i = 0; i < data.length; i++) {
        if( data[i].tipo == "Perro"){
          this.totalperros = this.totalperros + 1;
        }
        if ( data[i].tipo == "Gato"){
          this.totalgatos = this.totalgatos + 1;
        }
        this.doughnutChartData = [this.totalperros, this.totalgatos];
      }
    });
  }
  
  // ----- CONSULTAS -----
  getConsultas(){
    this.totalconsultascurso = 0  
    this.totalconsultasfinalizadas = 0  
    this.totalconsultas = 0 
    this.clivet.getConsultasHistorial()
      .subscribe( (data:any) => {
        for (let i = 0; i < data.length; i++) {
          this.totalconsultas = data.length;
          if (data[i].finalizada == 0) {
            this.totalconsultascurso = this.totalconsultascurso + 1;
          }else{
            this.totalconsultasfinalizadas = this.totalconsultasfinalizadas + 1;
          }
        }
        this.pieChartData = [this.totalconsultascurso, this.totalconsultasfinalizadas, this.totalconsultas];
      });
  }  

  getConsultasHoy(){
    this.nohayconsultas = false;
    let fechaformat = new Date();
    let fecha = fechaformat.getFullYear() + '-' + ("0" + (fechaformat.getMonth() + 1)).slice(-2) + '-' + ("0" + fechaformat.getDate()).slice(-2);    
    this.clivet.getConsultasFecha(fecha)
      .subscribe( (data:Consulta[]) => {
        this.consultasFecha = data;
        if (data.length == 0) {
          this.nohayconsultas = true;
        }
        console.log(this.consultasFecha)
      });
  }

  // ----- MEDICOS -----
  getMedicos(){
    this.medicos = []
    this.clivet.getUsuarios()
      .subscribe( (data:Usuario[]) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].tipo == 2) {
            this.medicos.push(data[i])
          }
        }
      });
  }

  // ----- Doughnut -----
  public doughnutChartLabels:string[] = ['Perros', 'Gatos'];
  public doughnutChartData:number[] = [0, 0];
  public doughnutChartType:string = 'doughnut';

  // ----- Pie ----- 
  public pieChartLabels:string[] = ['En curso', 'Finalizadas', 'Totales'];
  public pieChartData:number[] = [0, 0, 0];
  public pieChartType:string = 'pie';
 
  // ---------- Events ----------
  public chartClicked(e:any):void {
    console.log(e);
  }
  
  public chartHovered(e:any):void {
    console.log(e);
  }

  loadScripts() {
    const dynamicScripts = [
      'assets/libs/jquery/jquery.min.js',
      'assets/libs/bootstrap/js/bootstrap.bundle.min.js',
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
