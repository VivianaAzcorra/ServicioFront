import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ResponseInterface } from 'src/app/interfaces/response-interface';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  constructor(private http: HttpClient) { }

  getProfesor() {
    let url = " http://localhost:8080/v1/profesor"
    return this.http.get(url)
  }

  getProfesorById(id: any) {
    let url = " http://localhost:8080/v1/profesor/"
    return this.http.get(url + id)
  }

  postProfesor(profesorForm: FormGroup): Observable<ResponseInterface> {
    const profesor = new FormData()
    profesor.append('idProfesor', profesorForm.controls['idProfesor'].value)
    profesor.append('correo', profesorForm.controls['correo'].value)
    profesor.append('nombre', profesorForm.controls['nombre'].value)
    profesor.append('apellidoPaterno', profesorForm.controls['apellidoPaterno'].value)
    profesor.append('apellidoMaterno', profesorForm.controls['apellidoMaterno'].value)
    profesor.append('contrasenia', profesorForm.controls['contrasenia'].value)
    profesor.append('esSuperUser', profesorForm.controls['superuser'].value)
    let url = " http://localhost:8080/v1/profesor"
    return this.http.post<ResponseInterface>(url, profesor)
  }
}
