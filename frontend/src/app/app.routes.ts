import { Routes, CanActivate } from '@angular/router';
import { ClivetService } from './services/clivet.service';

import { InicioComponent } from './components/inicio/inicio.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { MascotaComponent } from './components/mascota/mascota.component';
import { NuevoClienteComponent } from './components/nuevo-cliente/nuevo-cliente.component';
import { AgregarMascotaComponent } from './components/agregar-mascota/agregar-mascota.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { Error404Component } from './components/shared/error404/error404.component';
import { LoginComponent } from './components/login/login.component';
import { VacunasComponent } from './components/mascota/vacunas.component';
import { ConsultasMascotaComponent } from './components/mascota/consultas-mascota.component';
import { AgregarConsultaComponent } from './components/consultas/agregar-consulta.component';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { ConsultaVacunasComponent } from './components/consulta/consulta-vacunas.component';
import { ConsultaHistoriaComponent } from './components/consulta/consulta-historia.component';

export const ROUTES: Routes = [
    { path: 'sesion', component: LoginComponent},
    { path: 'inicio', component: InicioComponent, canActivate:[ ClivetService ] },
    { path: 'error404', component: Error404Component},
    { path: 'clientes', component: ClientesComponent, canActivate:[ ClivetService ] },
    { path: 'clientes/nuevo', component: NuevoClienteComponent, canActivate:[ ClivetService ] },
    { path: 'cliente/:id', component: ClienteComponent, canActivate:[ ClivetService ] },
    { path: 'cliente/mascotas/agregar/:id', component: AgregarMascotaComponent, canActivate:[ ClivetService ] },
    { path: 'consultas', component: ConsultasComponent, canActivate:[ ClivetService ] },
    { path: 'consultas/nueva', component: AgregarConsultaComponent, canActivate:[ ClivetService ] },
    { path: 'consulta/:id', component: ConsultaComponent, canActivate:[ ClivetService ] },
    { path: 'consulta/:id_consulta/vacunas/:id_mascota', component: ConsultaVacunasComponent, canActivate:[ ClivetService ] },
    { path: 'consulta/:id_consulta/historia/:id_mascota', component: ConsultaHistoriaComponent, canActivate:[ ClivetService ] },
    { path: 'mascota/:id', component: MascotaComponent, canActivate:[ ClivetService ] },
    { path: 'mascota/:id/vacunas', component: VacunasComponent, canActivate:[ ClivetService ] },
    { path: 'mascota/:id/consultas', component: ConsultasMascotaComponent , canActivate:[ ClivetService ] },
    { path: '', pathMatch: 'full', redirectTo: 'inicio'},
    { path: '**', pathMatch: 'full', redirectTo: 'error404'}
];
