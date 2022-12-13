import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PreguntaInterface } from 'src/app/interfaces/pregunta-interface';
@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  constructor(private http:HttpClient) { }

  url = "http://localhost:8080/v1/"

  getPreguntas(){
    return this.http.get(this.url+'reactivo')
  }

  postPregunta(form: PreguntaInterface){
    const pregunta = new FormData()
    pregunta.append('idTema', form.idtema)
    pregunta.append('idUnidad', form.idunidad) 
    pregunta.append('idReactivo', form.idreactivo)
    pregunta.append('pregunta', form.pregunta)
    pregunta.append('dificultad', form.dificultad.toString())
    pregunta.append('requiereProcedimiento', Boolean(form.requiereProcedimiento).toString())
    pregunta.append('correcto', form.correcto.toString())
    return this.http.post(this.url+'reactivo', pregunta)
  }

  putPregunta(form: PreguntaInterface){
    const pregunta = new FormData() 
    pregunta.append('idReactivo', form.idreactivo)
    pregunta.append('pregunta', form.pregunta)
    pregunta.append('dificultad', form.dificultad.toString())
    pregunta.append('requiereProcedimiento', Boolean(form.requiereProcedimiento).toString())
    pregunta.append('correcto', form.correcto.toString())
    return this.http.put(this.url+'reactivo/'+form.idreactivo, pregunta)
  }

  postRespuesta(form: {idReactivo: string, orden: number, idRespuesta: string, respuestaString: string, idsigreactivo: string}){
    const respuesta = new FormData()
    respuesta.append('idReactivo', form.idReactivo)
    respuesta.append('orden', form.orden.toString())
    respuesta.append('idRespuesta', form.idRespuesta)
    respuesta.append('respuestaString', form.respuestaString)
    respuesta.append('idsigreactivo', form.idsigreactivo)
    return this.http.post(this.url+'respuesta', respuesta)
  } 

  putRespuesta(form: {idReactivo: string, orden: number, idRespuesta: string, respuestaString: string, idsigreactivo: string}){
    const respuesta = new FormData()
    respuesta.append('idReactivo', form.idReactivo)
    respuesta.append('respuestaString', form.respuestaString)
    respuesta.append('idsigreactivo', form.idsigreactivo)
    return this.http.put(this.url+'respuesta/'+form.idRespuesta, respuesta)
  }
}
