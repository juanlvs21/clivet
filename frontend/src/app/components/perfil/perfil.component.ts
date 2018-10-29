import { Component, OnInit } from '@angular/core';
import { ClivetService } from '../../services/clivet.service';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  tipo:string = ""

  usuario = {
    contra: '',
    repetir: ''
  }

  cambiando:boolean = false;
  noCoinciden:boolean = false;
  contaGuardada:boolean = false;

  constructor( public clivet:ClivetService) { }

  ngOnInit() {
    this.mostrarTipo()
  }

  mostrarTipo(){
    if (this.clivet.usuario.tipo == 1) {
      this.tipo = "Administrador"
    }
    if (this.clivet.usuario.tipo == 2) {
      this.tipo = "Médico"
    }
    if (this.clivet.usuario.tipo == 3) {
      this.tipo = "Secretario"
    }
  }

  cambiarContra(){    
    this.cambiando = true
    this.noCoinciden = false
    this.contaGuardada = false
    if (this.usuario.contra == this.usuario.repetir) {
      let pass = crypto.SHA512(this.usuario.contra).toString()
      this.clivet.updateContra(this.clivet.id_user, pass)
        .subscribe( () => {
          this.cambiando = false
          this.usuario.contra = ''
          this.usuario.repetir = ''
          this.contaGuardada = true
          setTimeout( () => {
            this.contaGuardada = false
          },3000)
        }) 
    }else{
      this.noCoinciden = true
      this.cambiando = false
    }
  }

}
