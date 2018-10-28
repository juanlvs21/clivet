import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClivetService } from '../../services/clivet.service';
import { Usuario } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-usuarios-administrar',
  templateUrl: './usuarios-administrar.component.html',
  styles: []
})
export class UsuariosAdministrarComponent implements OnInit {

  usuarios:Usuario[];

  usuario = {
    ci: "",
    usuario: "",
    nombre: "",
    apellido: "",
    tipo: 0,
    contra: "12345"
  }

  cargando:boolean = false;
  eliminando:number = -1;
  agregar:boolean = false;

  constructor( private clivet:ClivetService, private router:Router ) {}

  ngOnInit() {
    this.loadScripts()
    this.getUsuarios()
  }

  getUsuarios(){
    this.cargando = true
    this.clivet.getUsuarios()
      .subscribe( (data:Usuario[]) => {
        this.usuarios = data;
        this.cargando = false;
      });
  }    
  
  deleteUsuario(id:number){
    this.eliminando = id
    if (confirm('¿Estas seguro que quieres eliminar este usuario?')) {
      this.clivet.deleteUsuario(id)
        .subscribe( () => {
          this.eliminando = -1;
          this.getUsuarios()
        })
    }else{
      this.eliminando = -1;
    }
  }

  guardar(){
    this.cargando = true;
    this.clivet.nuevoUsuario(this.usuario)
      .subscribe( data => {
        this.cargando = false;
        this.agregar = false;
        this.getUsuarios()
      },
      error => {
        console.error('Error al registrar nuevo Cliente: '+error);
        this.cargando = false;
        this.agregar = false;
      })
  }

  tarjetaregistrar(){
    this.agregar = true;
  }

  btnregresar(){
    this.agregar = false;
  }

  loadScripts() {
    const dynamicScripts = [
      'assets/libs/bootstrap/js/bootstrap.bundle.min.js',
      'assets/libs/datatables/jquery.dataTables.js',
      'assets/libs/datatables/dataTables.bootstrap4.js',
      'assets/libs/sb-admin/sb-admin-datatables.min.js'
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
