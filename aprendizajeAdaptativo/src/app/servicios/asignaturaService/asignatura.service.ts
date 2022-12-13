import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ResponseInterface } from 'src/app/interfaces/response-interface';
import { AsignaturaInterface } from 'src/app/interfaces/asignatura-interface';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  constructor(private http:HttpClient) { }
  //Cuando se implementen los usuario cambiar este metodo para obtenerlo por id de profesor :3
  getAsignatura(){
    let url = "http://localhost:8080/v1/asignatura"
    return this.http.get(url);
  }

  getAsignaturaByProfesor(idProfesor: any){
    let url = "http://localhost:8080/v1/asignatura/profesor/"
    return this.http.get(url+idProfesor);
  }

  getAsignaturaById(id: any){
    let url = "http://localhost:8080/v1/asignatura/"
    return this.http.get(url+id)
  }

  postAsignatura(asignaturaForm: FormGroup):Observable<ResponseInterface>{
    const asignatura = new FormData()
    asignatura.append('idAsignatura', asignaturaForm.controls['idAsignatura'].value)
    asignatura.append('nombreAsignatura', asignaturaForm.controls['nombreAsignatura'].value)
    asignatura.append('idProfesor', asignaturaForm.controls['idProfesor'].value)
    asignatura.append('descAsignatura', asignaturaForm.controls['descAsignatura'].value)
    console.log("llegue")
    console.log(asignatura)
    let url = "http://localhost:8080/v1/asignatura"
    return this.http.post<ResponseInterface>(url, asignatura)
  }

  putAsignatura(asignaturaForm: AsignaturaInterface){
    const asignatura = new FormData()
    asignatura.append('idAsignatura', asignaturaForm.idAsignatura)
    asignatura.append('nombreAsignatura', asignaturaForm.nombreAsignatura)
    asignatura.append('descAsignatura', asignaturaForm.descAsignatura)
    asignatura.append('idProfesor', asignaturaForm.idProfesor)
    let url = "http://localhost:8080/v1/asignatura/"
    return this.http.put(url+asignaturaForm.idAsignatura, asignatura)
  }

}
