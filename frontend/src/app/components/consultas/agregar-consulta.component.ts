import { Component, OnInit } from '@angular/core';
import { ClivetService } from '../../services/clivet.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Consulta } from '../../interfaces/consulta.interface';
import { Mascota } from '../../interfaces/mascota.interface';
import { Medico } from '../../interfaces/medico.interface';

@Component({
  selector: 'app-agregar-consulta',
  templateUrl: './agregar-consulta.component.html',
  styles: []
})
export class AgregarConsultaComponent implements OnInit {

  consultas:Consulta[] = [];
  consultasFecha:Consulta[] = [];
  mascotas:Mascota[] = [];
  medicos:Medico[] = [];

  consulta = {
    fecha:"",
    hora: "",
    estado: "Activa",
    descripcion: "",
    mascota:"",
    medico:""
  }

  cargando:boolean = false;
  guardando:boolean = false;
  buscandoConsultas:boolean = false;
  limiteConsultas:boolean = false;

  cantidadConsultas:number = 0;

  fecha:string = "";
  
  constructor( private clivet:ClivetService, private router:Router) { }

  ngOnInit() {
    this.getConsultas();
    this.getDate();
  }
  // ----- FECHA ------
  getDate(){
    let f = new Date()
    this.fecha = f.getFullYear()+"-"+(f.getMonth() +1)+"-"+f.getDate()
  }

  // ----- CONSULTAS -----
  getConsultas(){
    this.cargando = true;
    this.clivet.getConsultas()
      .subscribe( (data:Consulta[]) => {
        // this.cargando = false;
        this.consultas = data;
        this.getMascotas();
        this.getMedicos();
      });
  }  
  
  getConsultasFecha(){
    this.buscandoConsultas = true;
    this.limiteConsultas = false;
    this.clivet.getConsultasFecha(this.consulta.fecha)
      .subscribe( (data:Consulta[]) => {
        this.cantidadConsultas = data.length;
        this.buscandoConsultas = false;
        console.log(this.cantidadConsultas)
        if (this.cantidadConsultas >= 5) {
          this.limiteConsultas = true;
        }
      }); 
  }

  addConsulta(consulta:NgForm){
    this.guardando = true;
    this.clivet.nuevaConsulta(consulta.value)
      .subscribe( data => {
        console.log("Consulta registrada");
        this.getConsultas();
        this.guardando = false;
        this.router.navigate(['/consultas']);
      },
      error => {
        console.error('Error al agregar nueva consulta: '+error);
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
        // this.cargando = false;
        this.medicos = data;
        this.cargando = false;
      });
  }
}
