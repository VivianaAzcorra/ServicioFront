import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { ResponseInterface } from 'src/app/interfaces/response-interface';
import { TemaInterface } from 'src/app/interfaces/tema-interface';
import { UnidadInterface } from 'src/app/interfaces/unidad-interface';

@Injectable({
  providedIn: 'root'
})
export class UnidadesService {

  constructor(private http:HttpClient) { }

  url = "http://localhost:8080/v1/"

  getUnidadesByAsignatura(idAsignatura: any){
    return this.http.get(this.url+"unidad/asignatura/"+idAsignatura)
  }

  getTemasByUnidades(idUnidad:any){
    return this.http.get(this.url+"tema/unidad/"+idUnidad)
  }

  getAllTemas(){
    return this.http.get(this.url+"tema")
  }

  getAllUnidades(){
    return this.http.get(this.url+"unidad")
  }

  postUnidades(form: UnidadInterface){
    const unidad = new FormData()
    unidad.append('idUnidad', form.idUnidades)
    unidad.append('nombreUnidad', form.nombreUnidad)
    unidad.append('descUnidad', form.descUnidad)
    unidad.append('idAsignatura', form.idAsignatura)
    return this.http.post<ResponseInterface>(this.url+"unidad", unidad)
  }

  postTemas(form: TemaInterface){
    const tema = new FormData()
    tema.append('idTema', form.idTema)
    tema.append('nombreTema', form.nombreTema)
    tema.append('descTema', form.descTema)
    tema.append('idUnidad', form.idUnidad)
    return this.http.post<ResponseInterface>(this.url+"tema", tema)
  }

  putUnidades(form: UnidadInterface){
    const unidad = new FormData()
    unidad.append('idUnidad', form.idUnidades)
    unidad.append('nombreUnidad', form.nombreUnidad)
    unidad.append('descUnidad', form.descUnidad)
    unidad.append('idAsignatura', form.idAsignatura)
    return this.http.put(this.url+"unidad/"+form.idUnidades, unidad)
  }

  putTemas(form: TemaInterface){
    const tema = new FormData()
    tema.append('idTema', form.idTema)
    tema.append('nombreTema', form.nombreTema)
    tema.append('descTema', form.descTema)
    tema.append('idUnidad', form.idUnidad)
    return this.http.put<ResponseInterface>(this.url+"tema/"+form.idTema, tema)
  }

}
