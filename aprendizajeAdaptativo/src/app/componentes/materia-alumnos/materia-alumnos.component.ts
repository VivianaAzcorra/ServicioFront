import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-materia-alumnos',
  templateUrl: './materia-alumnos.component.html',
  styleUrls: ['./materia-alumnos.component.css']
})
export class MateriaAlumnosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  nombreMateria = "Geometria Analitica";
  

  examenes: Array<any> = [
    { nombre: 'Geometria Analitica G-3', id: '1235', disponible: '10/11/2022', duracion: '2:00 hrs' },
    { nombre: 'Geometria Analitica G-4', id: '1126', disponible: '10/11/2022', duracion: '1:30 hrs'},
  ];

  examenespresentados: Array<any> = [
    { nombre: 'Geometria Analitica G-1', id: '1234', presentado: '03/11/2022', calificacion: '82' },
    { nombre: 'Geometria Analitica G-2', id: '1123', presentado: '03/11/2022', calificacion: '91'},
  ];

}
