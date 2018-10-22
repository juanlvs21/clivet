import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClivetService } from '../../services/clivet.service';

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

  constructor( private clivet:ClivetService, private router:Router ) {}

  ngOnInit() {
    this.loadScripts();
  }

  sesion(){
    this.login = true
    let user = JSON.stringify(this.usuario);
    this.clivet.getUsuario(user)
      .subscribe( (data:any) => {
        localStorage.setItem("id_user", data.id );
        this.clivet.usuario = data;
        this.clivet.id_user = data.id;
        this.login = false;
        if (this.clivet.id_user != "") {
          this.router.navigate(['/inicio']);
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
