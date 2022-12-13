import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AsignaturaService } from 'src/app/servicios/asignaturaService/asignatura.service';
import { AsignaturaInterface } from 'src/app/interfaces/asignatura-interface';
import { ExamenService } from 'src/app/servicios/examen/examen.service';
import { ExamenInterface } from 'src/app/interfaces/examen-interface';


@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {

  constructor(
    private asignatura: AsignaturaService,
    private examen: ExamenService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has("idAsignatura")){
        this.asignatura.getAsignaturaById(params.get("idAsignatura")).subscribe(
          data=>{
            this.materia = <AsignaturaInterface> data;
          }
        )
        this.examen.getExamenByAsignatura(params.get("idAsignatura")).subscribe(
          data1=>{
            this.examenes = <ExamenInterface[]> data1
          }
        )
      }
    })
  }

  materia: AsignaturaInterface = <AsignaturaInterface>{}
  examenes: ExamenInterface[] = <ExamenInterface[]>[]
  //nombreMateria = "Geometria Analitica"

  /*examenes: Array<any> = [
    { nombre: 'Geometria Analitica G-1', id: '1234', presentados: 15, asignados: 30, disponible: true },
    { nombre: 'Geometria Analitica G-2', id: '1123', presentados: 23, asignados: 25, disponible: false},
  ];*/

  linkUnidades(idAsignatura: any){
    this.router.navigate(["/"+idAsignatura, 'materia', 'unidades'])
  }

  linkVerPreguntas(idAsignatura: any){
    this.router.navigate(["/"+idAsignatura, 'materia', 'ver'])
  }

  linkExamen(idAsignatura: any){
    this.router.navigate(["/"+idAsignatura, 'materia', 'examen'])
  }

  editarExamen(idAsignatura: any, idExamen:any){
    this.router.navigate(["/"+idAsignatura, 'materia', idExamen, 'examen'])
  }
}
