import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClivetService } from '../../services/clivet.service';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = {
    usuario: "",
    contra: ""
  }

  login:boolean = false;
  error:boolean = false;

  constructor( private clivet:ClivetService, private router:Router ) {}

  ngOnInit() {
    this.loadScripts();
  }

  sesion(){
    this.login = true
    this.error = false;
    let duser = {
      usuario: this.usuario.usuario,
      contra: crypto.SHA512(this.usuario.contra).toString()
    }
    let user = btoa(JSON.stringify(duser))
    this.clivet.getUsuario(user)
      .subscribe( (data:any) => {
        if(data == undefined){
          this.login = false;
          this.error = true;
          this.usuario.usuario = ""
          this.usuario.contra = ""
          console.error("Usuario no encontrado")  
        }else{
          localStorage.setItem("token_user", user);
          this.clivet.usuario = data;
          this.clivet.token = user;
          // this.clivet.tipo_usuario = data.tipo;
          this.login = false;
          if (this.clivet.token != "") {
            this.router.navigate(['/inicio']);
          }
        }
      });
  }

  loadScripts() {
    const dynamicScripts = [
      'assets/libs/jquery/jquery.min.js',
      'assets/libs/bootstrap/js/bootstrap.bundle.min.js',
      'assets/libs/particles/particles.js',
      'assets/libs/particles/particulas.js'
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
