import { Component, OnInit } from '@angular/core';
import { ClivetService } from '../../services/clivet.service';
import { Cliente } from '../../interfaces/cliente.interface';
import { Mascota } from '../../interfaces/mascota.interface';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes:Cliente[] = [];
  mascotas:Mascota[] = [];

  cargando:boolean = false;

  id_mascota:number;

  constructor( private clivet:ClivetService){}

  ngOnInit() {
    this.getClientes();
    this.getMascotas();
    this.loadScripts();
    this.cargando = true;
  }

  getClientes(){
    this.clivet.getClientes()
    .subscribe( (data:any) => {
      this.cargando = false;
      this.clientes = data;
    });
  }

  getMascotas(){
    this.clivet.getMascotas()
    .subscribe( (data:Mascota[]) => {
      this.cargando = false;
      this.mascotas = data;
    });
  }

  eliminarCliente(id:number){
    if (confirm("¿Desea eliminar este cliente?")) {
      this.clivet.deleteCliente(id) 
      .subscribe(response => {
        this.clivet.getMascotasCliente(id)
          .subscribe( (data:Mascota) => {
            this.clivet.deleteMascotaCliente(id)
              .subscribe( () => {
                // this.clivet.deleteDetallesMascota(this.id_mascota)
                  // .subscribe( () => {
                    console.log("Cliente Eliminado");
                    this.getClientes();
                    this.getMascotas();
                  // })
              })
          })
      });
    }
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

