import { Component, OnInit } from '@angular/core';
import { ClivetService } from '../../services/clivet.service';
import { Consulta } from '../../interfaces/consulta.interface';
import { Mascota } from '../../interfaces/mascota.interface';
import { Usuario } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {

  consultas:Consulta[] = [];
  consultasFecha:Consulta[] = [];
  mascotas:Mascota[] = [];
  medicos:Usuario[] = [];

  consultashoy:number;
  consultastotal:number;

  cargando:boolean = false;
  guardado:boolean = false;

  f = new Date()
  fecha:string = ""
  
  constructor( private clivet:ClivetService ) {}

  ngOnInit() {
    this.loadScripts();
    this.getDate();
    this.getConsultas();
    this.getConsultasHoy();
    this.getMascotas();
    this.getMedicos();
  }

  // ----- FECHA ------
  getDate(){
    let f = new Date()
    this.fecha = f.getFullYear()+"-"+(f.getMonth() +1)+"-"+f.getDate()
  }

  // ----- CONSULTAS -----
  getConsultas(){
    this.cargando = true;
    let fecha;
    this.consultas = [];

    this.clivet.getConsultas()
      .subscribe( (data:Consulta[]) => {
        // this.cargando = false;
        for (let i = 0; i < data.length; i++) {
          fecha = data[i].fecha.split("T")
          if (fecha[0] >= this.fecha) {
            this.consultas.push(data[i]);
            this.consultastotal = data.length;
            this.doughnutChartData = [this.consultashoy, this.consultastotal];
            this.cargando = false;            
          }else{
            this.finalizarConsultaPasada(data[i].id)
          }
        }
      });
      this.cargando = false;            
  }  

  finalizarConsultaPasada(id:number){
    this.clivet.finalizarConsulta(id)
      .subscribe( () => {
      })
  }

  getConsultasHoy(){
    let fechaformat = new Date();
    let fecha = fechaformat.getFullYear() + '-' + ("0" + (fechaformat.getMonth() + 1)).slice(-2) + '-' + ("0" + fechaformat.getDate()).slice(-2);    
    this.clivet.getConsultasFecha(fecha)
      .subscribe( (data:Consulta[]) => {
        // this.cargando = false;
        this.consultasFecha = data;
        this.consultashoy = data.length;
        this.doughnutChartData = [this.consultashoy, this.consultastotal];
      });
  }  
  
  eliminarConsulta(id:number){
    if (confirm("¿Desea eliminar esta consulta?")) {
      this.clivet.deleteConsulta(id) 
      .subscribe(response => {
        console.log("Consulta Eliminada");
        this.getConsultas();
        this.getConsultasHoy();
      });
    }
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
    this.medicos = []
    this.clivet.getUsuarios()
      .subscribe( (data:Usuario[]) => {
        // this.cargando = false;
        for (let i = 0; i < data.length; i++) {
          if (data[i].tipo == 2) {
            this.medicos.push(data[i]);
          }
        }
      });
  }

  // ---------- Doughnut ----------
  public doughnutChartLabels:string[] = ['Hoy', 'En curso'];
  public doughnutChartData:number[] = [this.consultashoy, this.consultastotal];
  public doughnutChartType:string = 'doughnut';
 
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
