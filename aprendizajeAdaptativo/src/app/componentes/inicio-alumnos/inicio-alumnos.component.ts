import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'; 
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-inicio-alumnos',
  templateUrl: './inicio-alumnos.component.html',
  styleUrls: ['./inicio-alumnos.component.css']
})
export class InicioAlumnosComponent implements OnInit {

  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
  }

  //para mostrar los datos
  usuario: any = "Sebastian Echeverria"
  materias: Array<any> = [
    {nombre: 'Geometria Analitica', id: 'GA01'},
    {nombre: 'Algebra Lineal', id: 'AL01'}
  ]
  codigoAsignatura: string = ''
  materiasnuevas: Array<any> = [
    {nombre: 'Matemáticas I', id: 'MAT01'},
    {nombre: 'Matemáticas II', id: 'MAT02'}
  ]

  materiasencontradas: Array<any> = [
  ]

  closeResult = ''

  //Para el formulario
  materia = this.formBuilder.group({
    nombre: ['']
  })

  buscar(){
    this.materiasencontradas = []
    if (this.codigoAsignatura.length > 0) {
      for (let i = 0; i < this.materiasnuevas.length; i++) {
        if (this.materiasnuevas[i].id == this.codigoAsignatura){
          this.materiasencontradas.push(this.materiasnuevas[i])
        }
      }
      
    }
  }

  agregarmateria(){
    this.materias.push(this.materiasencontradas[0])
    for (let i = 0; i < this.materiasnuevas.length; i++) {
      if (this.materiasnuevas[i].id == this.materiasencontradas[0].id){
        this.materiasnuevas.splice(i, 1)
        console.log(this.materiasnuevas);
        
      }
    }
    this.materiasencontradas=[]
    this.codigoAsignatura=''
  }

}
