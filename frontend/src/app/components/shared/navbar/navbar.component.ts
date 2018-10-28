import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClivetService } from '../../../services/clivet.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public clivet:ClivetService, private router:Router ) {}

  ngOnInit() {
  }

  salir(){
    if (confirm('¿Desea cerrar sesión?')) {
      this.clivet.id_user = "";
      localStorage.clear();
      this.router.navigate(['/sesion']);
    }else{
      return;
    }
  }
}
