import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Cliente } from '../interfaces/cliente.interface';
import { Mascota } from '../interfaces/mascota.interface';
import { Detalle } from '../interfaces/detalle.interface';
import { Vacuna } from '../interfaces/vacuna.interface';
import { Consulta } from '../interfaces/consulta.interface';

@Injectable({
  providedIn: 'root'
})
export class ClivetService {

  usuario = {};
  id_user:string = ""

  url = 'http://localhost:3000/';

  constructor( private http:HttpClient, private router:Router  ) {
    if(localStorage.getItem("id_user") == null){
      this.id_user = "";
    }else{
      this.id_user = localStorage.getItem("id_user");
    }  
  }

  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot){
  
    if(this.id_user != ""){
      return true;
    }else{
      // alert("Error de seguridad - Debe iniciar sesión");
      this.router.navigate(['/sesion']);
      return false;
    }
  }

// ---------- USUARIOS ----------
getUsuario<Data>(usuario: string): Observable<any> {
  const url = `${this.url}usuario/${usuario}`;
  return this.http.get<any[]>(url)
    .pipe(
      map(clusters => clusters[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
      }));
}

// ---------- CLIENTE -----------
  getClientes(){
    return this.http.get(`${this.url}clientes`);
  } 
  
  getCliente<Data>(id: number): Observable<any> {
    const url = `${this.url}clientes/${id}`;
    return this.http.get<any[]>(url)
      .pipe(
        map(clusters => clusters[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
        }));
  }

  nuevoCliente (cliente: Cliente): Observable<Cliente> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Cliente>(this.url+'clientes', cliente, httpOptions).pipe(
      tap((cliente: Cliente) => console.log(`Cliente registrado w/ id=${cliente.ci}`))
    );
  }
  
  deleteCliente(id:number){
    let body = JSON.stringify( id );

    let url = `${this.url}clientes/eliminar/${id}`;

    return this.http.put( url , body)
      .pipe(
        map( res => {
          console.log(res);
          return res;
        })
      );
  }

  // ---------- MASCOTA -----------
  getMascotas(){
      return this.http.get(`${this.url}mascotas`);
  }   
  
  getMascotasCliente( id:number ){
      return this.http.get(`${this.url}mascotas/cliente/${id}`);
  }
  
  getMascota<Data>(id: number): Observable<any> {
    const url = `${this.url}mascotas/${id}`;
    return this.http.get<any[]>(url)
      .pipe(
        map(clusters => clusters[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
        }));
  }
  
  nuevaMascota (mascota: Mascota): Observable<Mascota> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Mascota>(this.url+'mascotas', mascota, httpOptions).pipe(
      tap((mascota: Mascota) => console.log(`Mascota registrada w/ id=${mascota.nombre}`))
    );
  }

  deleteMascota(id:number){
    let body = JSON.stringify( id );

    let url = `${this.url}mascota/eliminar/${id}`;

    return this.http.put( url , body)
      .pipe(
        map( res => {
          console.log(res);
          return res;
        })
      );
  }

  // ---------- DETALLES -----------
  getDetalle(id:number){
    return this.http.get(`${this.url}detalles/${id}`);
  } 

  nuevoDetalle (detalle: Detalle): Observable<Detalle> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Detalle>(this.url+'detalles', detalle, httpOptions).pipe(
      tap((detalle: Detalle) => console.log(`Detalle registrado w/ id=${detalle.id_historia}`))
    );
  }

  deleteDetalle(id:number){
    let body = JSON.stringify( id );
    let url = `${this.url}detalles/eliminar/${id}`;
    return this.http.put( url , body)
      .pipe(
        map( res => {
          console.log(res);
          return res;
        })
      );
  }
  
  // ---------- VACUNAS -----------
  getVacunas(id:number){
    return this.http.get(`${this.url}vacunas/${id}`);
  } 

  deleteVacunas(id:number){
    return this.http.delete(`${this.url}vacuna/${id}`)
      .pipe(
        map( res => {
          return res;
        })
      );
  }

  nuevaVacuna(vacuna:Vacuna): Observable<Vacuna> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Vacuna>(this.url+'vacuna', vacuna, httpOptions).pipe(
      tap((vacuna: Vacuna) => console.log(`Vacuna registrada w/ id=${vacuna.nombre}`))
    );
  }

  // ---------- CONSULTAS -----------
  getConsultas(){
    return this.http.get(`${this.url}consultas`);
  }   

  getConsulta<Data>(id: number): Observable<any> {
    const url = `${this.url}consulta/${id}`;
    return this.http.get<any[]>(url)
      .pipe(
        map(clusters => clusters[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
        }));
  }

  getConsultasFecha(fecha:string){
    return this.http.get(`${this.url}consultas/${fecha}`);
  } 
  
  consultasPasadas(fecha:string){
    let body = JSON.stringify( fecha );

    let url = `${this.url}consultas/pasadas/${fecha}`;

    return this.http.put( url , body)
      .pipe(
        map( res => {
          console.log(res);
          return res;
        })
      );
  }

  nuevaConsulta(consulta: Consulta): Observable<Consulta> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Consulta>(this.url+'consulta', consulta, httpOptions).pipe(
      tap((consulta: Consulta) => console.log(`Consulta registrado w/ id=${consulta.id}`))
    );
  }

  deleteConsulta(id:number){
    let body = JSON.stringify( id );

    let url = `${this.url}consulta/eliminar/${id}`;

    return this.http.put( url , body)
      .pipe(
        map( res => {
          console.log(res);
          return res;
        })
      );
  }

  // ---------- MEDICOS -----------
  getMedicos(){
    return this.http.get(`${this.url}medicos`);
  }   
}

// https://www.uno-de-piera.com/httpclient-angular-5/