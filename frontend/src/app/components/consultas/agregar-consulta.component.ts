import { Component, OnInit } from '@angular/core';
import { ClivetService } from '../../services/clivet.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Consulta } from '../../interfaces/consulta.interface';
import { Mascota } from '../../interfaces/mascota.interface';
import { Usuario } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-agregar-consulta',
  templateUrl: './agregar-consulta.component.html',
  styles: []
})
export class AgregarConsultaComponent implements OnInit {

  consultas:Consulta[] = [];
  consultasFecha:Consulta[] = [];
  mascotas:Mascota[] = [];
  medicos:Usuario[] = [];

  consulta = {
    fecha:"",
    hora: "",
    finalizada: 0,
    descripcion: "",
    mascota:0,
    medico:""
  }

  cargando:boolean = false;
  guardando:boolean = false;
  buscandoConsultas:boolean = false;
  limiteConsultas:boolean = false;
  verificandohora:boolean = false;
  horapasada:boolean = false;
  fueradehorario:boolean = false;
  unaconsultapordia:boolean = false;
  verificandoConsultaPorDia:boolean = false

  cantidadConsultas:number = 0;

  fecha:string = "";
  hora:string = "";
  
  constructor( private clivet:ClivetService, private router:Router) { }

  ngOnInit() {
    this.getConsultas();
    this.getDate();
  }

  // ----- FECHA ------
  getDate(){
    let f = new Date()
    this.fecha = f.getFullYear()+"-"+(f.getMonth() +1)+"-"+f.getDate()
    this.hora = ("0"+f.getHours()).slice(-2)+":"+f.getMinutes(); 
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
    this.verificarHora()
    this.buscandoConsultas = true;
    this.limiteConsultas = false;
    this.unaconsultapordia = false
    this.clivet.getConsultasFecha(this.consulta.fecha)
      .subscribe( (data:Consulta[]) => {
        this.cantidadConsultas = data.length;
        this.buscandoConsultas = false;
        if (this.cantidadConsultas >= 5) {
          this.limiteConsultas = true;
        }
        for (let i = 0; i < data.length; i++) {
          if (data[i].id_mascota == this.consulta.mascota) {
            this.unaconsultapordia = true
          }
        }       
      }); 
  }

  unaConsultaPorDia(){
    this.verificandoConsultaPorDia = true
    this.unaconsultapordia = false
    this.clivet.getConsultasFecha(this.consulta.fecha)
      .subscribe( (data:Consulta[]) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].id_mascota == this.consulta.mascota) {
            this.unaconsultapordia = true
          }
        }       
        this.verificandoConsultaPorDia = false
      }); 
  }

  verificarHora(){
    this.horapasada = false;
    this.fueradehorario = false;
    this.verificandohora = true;

    console.log(this.hora)

    if (this.consulta.fecha == this.fecha) {
      if(this.consulta.hora < this.hora){
        this.horapasada = true;
      }
    }

    if (this.consulta.hora < "09:00") {
      this.fueradehorario = true;
    }    
    if (this.consulta.hora > "17:00") {
      this.fueradehorario = true;
    }

    this.verificandohora = false;
    // for (let i = 0; i < this.consultas.length; i++) {
    //   let fc = this.consultas[i].fecha.split("T") 
    //   if(this.consultas[i].fecha == fc[0]){

    //   }
    // }
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
    this.medicos = []
    this.clivet.getUsuarios()
      .subscribe( (data:Usuario[]) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].tipo == 2) {
            this.medicos.push(data[i])
          }
        }
        this.cargando = false;
      });
  }
}
