import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Importando HTTP
import { HttpClientModule } from '@angular/common/http';

// Importar Rutas
import { ROUTES } from "./app.routes";

// Chartjs
import { ChartsModule } from 'ng2-charts';

// Importar Componentes
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { MascotasComponent } from './components/mascotas/mascotas.component';
import { MascotaComponent } from './components/mascota/mascota.component';
import { HistoriaComponent } from './components/historia/historia.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
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

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavbarComponent,
    ClientesComponent,
    MascotasComponent,
    MascotaComponent,
    HistoriaComponent,
    ConsultasComponent,
    NuevoClienteComponent,
    AgregarMascotaComponent,
    ClienteComponent,
    Error404Component,
    LoginComponent,
    VacunasComponent,
    ConsultasMascotaComponent,
    AgregarConsultaComponent,
    ConsultaComponent,
    ConsultaVacunasComponent,
    ConsultaHistoriaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    RouterModule.forRoot( ROUTES )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
