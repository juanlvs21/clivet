import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClivetService } from '../../services/clivet.service';
import { Mascota } from '../../interfaces/mascota.interface';

@Component({
  selector: 'app-mascotas-administrar',
  templateUrl: './mascotas-administrar.component.html',
  styles: []
})
export class MascotasAdministrarComponent implements OnInit {

  mascotas:Mascota[];

  cargando:boolean = false;

  constructor( private clivet:ClivetService, private router:Router ) {}

  ngOnInit() {
    this.loadScripts()
    this.getMascotas()
  }

  getMascotas(){
    this.cargando = true
    this.clivet.getMascotasAdmin()
      .subscribe( (data:Mascota[]) => {
        this.mascotas = data;
        this.cargando = false;
      });
  }

  eliminarMascotas(){
    if (confirm('¿Está seguro que quiere eliminar los datos de forma permanente?')) {
      this.clivet.deleteMascotasAdmin()
        .subscribe( () => {
          this.eliminarDetalle()
          this.getMascotas()
          this.router.navigate(['/administrar'])
        })

    }
  }

  eliminarDetalle(){
    this.clivet.deleteDetallesAdmin()
      .subscribe( () => {
      })
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
