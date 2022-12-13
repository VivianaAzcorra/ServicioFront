import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ExamenService {

  constructor(private http:HttpClient) { }

  url = "http://localhost:8080/v1/"

  getExamenes(){
    return this.http.get(this.url+"examen")
  }

  getExamenByAsignatura(id:any){
    return this.http.get(this.url+"examen/asignatura/"+id)
  }

  getExamenById(id: any){
    return this.http.get(this.url+"examen/"+id)
  }

  postExamen(form: {idExamen: string, nombre: string, descripcion: string, idAsignatura: string, tiempo: number}){
    const examen = new FormData()
    examen.append('idExamen', form.idExamen)
    examen.append('nombre', form.nombre)
    examen.append('descripcion', form.descripcion)
    examen.append('idAsignatura', form.idAsignatura)
    examen.append('tiempo', form.tiempo.toString())
    return this.http.post(this.url+'examen', examen)
  }

  putExamen(form: {idExamen: string, nombre: string, descripcion: string, idAsignatura: string, tiempo: number}){
    const examen = new FormData()
    examen.append('idExamen', form.idExamen)
    examen.append('nombre', form.nombre)
    examen.append('descripcion', form.descripcion)
    examen.append('idAsignatura', form.idAsignatura)
    examen.append('tiempo', form.tiempo.toString())
    return this.http.put(this.url+'examen/'+ form.idExamen, examen)
  }

  postReativoExamen(form: {idExamen: string, idReactivo:string, orden: number}){
    const reacExa = new FormData()
    reacExa.append('idExamen', form.idExamen)
    reacExa.append('idReactivo', form.idReactivo)
    reacExa.append('orden', form.orden.toString())
    return this.http.post(this.url+'examen/asigReactivo', reacExa)
  }
  
  eliminarReactivoExamen(idReactivo: any, idExamen: any){
    return this.http.delete(this.url+"reactivo/"+idReactivo+"/examen/"+idExamen)
  }

}
