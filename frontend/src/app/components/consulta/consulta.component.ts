import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClivetService } from '../../services/clivet.service';
import { Mascota } from '../../interfaces/mascota.interface';
import { Consulta } from '../../interfaces/consulta.interface';
import { Vacunas } from '../../interfaces/vacunas.interface';
import { Detalle } from '../../interfaces/detalle.interface';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styles: []
})
export class ConsultaComponent implements OnInit {
  
  id:number;
  consulta:Consulta;
  mascota:Mascota;

  totalvacunas:number = 0;
  totaldetalles:number = 0;

  finalizando:boolean = false;
  fechaactual:boolean = false;

  fecha:string = ""
  hora:string = ""

  constructor(public clivet: ClivetService, private activatedRouted: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.getIp();
    this.getDate()
    this.getConsulta();
  }

  getIp(){
    this.activatedRouted.params.subscribe(params => {
      this.id = params['id'];
    })
  }

  // ----- FECHA ------
  getDate(){
    let f = new Date()
    this.fecha = f.getFullYear()+"-"+(f.getMonth() +1)+"-"+f.getDate()
    this.hora = f.getHours()+":"+f.getMinutes()+":"+f.getSeconds(); 
  }

  // ----- CONSULTA -----
  getConsulta(){
    this.fechaactual = false
    // this.cargando = true;
    this.clivet.getConsulta(this.id)
      .subscribe( (data:Consulta) => {
        // this.cargando = false;
        this.consulta = data;
        let fd = this.consulta.fecha.split("T") 
        if (fd[0] == this.fecha) {
          this.fechaactual = true
        }
        this.getMascota(this.consulta.id_mascota);
        this.getVacunas();  
        this.getDetalle();
      });
  }  

  finalizarConsulta(){
    if (confirm("¿Desea finalizar su consulta?")) {
      this.finalizando = true
      this.clivet.finalizarConsulta(this.id)
        .subscribe( () => {
          this.finalizando = true
            this.router.navigate(['/consultas']);
        })
    }
  }

  // ----- MASCOTA -----
  getMascota(id:number){
    this.clivet.getMascota(id)
      .subscribe((data: Mascota) => {
        this.mascota = data;
        console.log(this.mascota)
      });
  }

  // ----- VACUNAS -----
  getVacunas(){
    this.clivet.getVacunas(this.id)
      .subscribe((data: Vacunas[]) => {
        this.totalvacunas = data.length;
      });
  }

  // ----- DETALLES -----
  getDetalle(){
    this.clivet.getDetalle(this.id)
      .subscribe( (data:Detalle[]) => {
        this.totaldetalles = data.length;
      });
  }

}
