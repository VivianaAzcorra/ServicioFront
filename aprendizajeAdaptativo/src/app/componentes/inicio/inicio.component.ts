import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'; 
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { AsignaturaService } from 'src/app/servicios/asignaturaService/asignatura.service';
import { AsignaturaInterface } from 'src/app/interfaces/asignatura-interface';
import { ProfesorService } from 'src/app/servicios/profesorService/profesor.service';
import { ProfesorInterface } from 'src/app/interfaces/profesor-interface';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
 
  //La forma en la que se generan los id es con la longitud del array + 1 por lo que hay que cambiarlo xd
  idProfesor: any = "";
  idAsig: any = "";
  usuario: any;
  materias: AsignaturaInterface[] = <AsignaturaInterface[]>{};
  materiaActual: AsignaturaInterface = <AsignaturaInterface>{}
  todasAsignaturas: AsignaturaInterface[] = <AsignaturaInterface[]>{};
  idTotalProf: any = "";
  currentProfesor: ProfesorInterface[] = <ProfesorInterface[]>{};
  flag: boolean = false;
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private asignatura: AsignaturaService,
    private asignaturas: AsignaturaService,
    private route: ActivatedRoute, 
    private profesores: ProfesorService) {
    }

  ngOnInit(): void {
    let sesion = localStorage.getItem("sesion")
    this.route.paramMap.subscribe(params => {
      if (params.has("idProfesor")){
        this.idProfesor = params.get("idProfesor")
        this.asignatura.getAsignaturaByProfesor(params.get("idProfesor")).subscribe(
          data=>{
            this.materias = <AsignaturaInterface[]> data;
          }
        )
        this.asignaturas.getAsignatura().subscribe(
          data2=>{
            const id = <AsignaturaInterface[]> data2
            this.idAsig = id.length + 1
          }
        )
        this.profesores.getProfesor().subscribe(
          data=>{
            
            const idProf = <ProfesorInterface[]> data
            this.idTotalProf = idProf.length + 1
            console.log("Profe = " + this.idTotalProf)
          }
          
        )
        this.profesores.getProfesor().subscribe(
          data4=>{
            this.currentProfesor = <ProfesorInterface[]> data4
            for(let i = 0; i < this.currentProfesor.length; i++){
              if(this.currentProfesor[i].idProfesor == this.idProfesor.toString()){
                this.flag = this.currentProfesor[i].esSuperUser
                console.log(this.flag)
              }
            }
          }
          
        )
      }
    })
  }

  //para mostrar los datos

  /*materias: Array<any> = [
    {nombre: 'Geometria Analitica', id: 'GA01'},
    {nombre: 'Algebra Lineal', id: 'AL01'}
  ]*/
  materia = new FormGroup({
    nombreAsignatura: new FormControl(""),
    idAsignatura: new FormControl(""),
    idProfesor: new FormControl(""),
    descAsignatura: new FormControl("una descripcion"),
  })
  closeResult = ''
  /*idProfesor = '1'*/

  profesor = new FormGroup({
    correo: new FormControl(""),
    nombre: new FormControl(""),
    apellidoPaterno: new FormControl(""),
    apellidoMaterno: new FormControl(""),
    contrasenia: new FormControl(""),
    idProfesor: new FormControl(""),
    superuser: new FormControl(""),
  })


  guardar(){
    var prof = this.idProfesor.toString()
    this.materia.controls["idProfesor"].setValue(prof)
    this.asignatura.postAsignatura(this.materia).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
      )
    window.location.reload()
  }

  guardarProf(){
    var idProf = this.idTotalProf.toString()
    this.profesor.controls["idProfesor"].setValue(idProf)
    this.profesores.postProfesor(this.profesor).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
      )
    window.location.reload()
  }

  mostrarCrear(){
    var flag: boolean = true
    console.log(this.currentProfesor.length)
    for(let i = 0; i < this.currentProfesor.length; i++){
      if(this.currentProfesor[i].idProfesor == this.idProfesor.toString()){
        flag = this.currentProfesor[i].esSuperUser
        console.log(flag)
      }
    }
    /*if(this.currentProfesor == true){
      flag = true
    }
    else{
      flag = false
    }*/
    return flag
  }

  
  generarId(){
    var id = this.idAsig.toString()
    console.log(id)
    this.materia.controls["idAsignatura"].setValue(id)
  }

  //cosas para el modal
  open(content: any) {
    this.generarId(); 
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-crear', size: 'lg' })
  }
  
  open1(editar: any, materia: AsignaturaInterface) {
    this.materiaActual.descAsignatura = materia.descAsignatura
    this.materiaActual.idAsignatura = materia.idAsignatura
    this.materiaActual.idProfesor = materia.idProfesor
    this.materiaActual.nombreAsignatura = materia.nombreAsignatura
    this.modalService
      .open(editar, { ariaLabelledBy: 'modal-editar', size: 'lg' })
  }

  actualizar(){
    this.materia.controls['idAsignatura'].setValue(this.materiaActual.idAsignatura)
    this.materia.controls['idProfesor'].setValue(this.materiaActual.idProfesor)
    this.materia.controls['descAsignatura'].setValue(this.materiaActual.descAsignatura)
    console.log(this.materia.value);
    this.asignatura.putAsignatura(this.materia.value).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
      )
      window.location.reload()
  }

  link(idAsignatura: any){
    this.router.navigate(["/"+idAsignatura, 'materia'])
  }
}
