import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

import { UnidadesService } from 'src/app/servicios/unidadesServices/unidades.service';
import { PreguntaService } from 'src/app/servicios/preguntaService/pregunta.service';
import { TemaInterface } from 'src/app/interfaces/tema-interface';
import { UnidadInterface } from 'src/app/interfaces/unidad-interface';
import { PreguntaInterface } from 'src/app/interfaces/pregunta-interface';
import { RespuestaInterface } from 'src/app/interfaces/pregunta-interface';
import { ReactivoInterface } from 'src/app/interfaces/reactivo-interface';

@Component({
  selector: 'app-ver-preguntas',
  templateUrl: './ver-preguntas.component.html',
  styleUrls: ['./ver-preguntas.component.css'],
})
export class VerPreguntasComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private preguntaService: PreguntaService,
    private service: UnidadesService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has("idAsignatura")){
        this.service.getUnidadesByAsignatura(params.get("idAsignatura")).subscribe(
          data=>{
            this.unidad = <UnidadInterface[]> data;
            this.idAsignatura = params.get("idAsignatura")
            this.tema = <TemaInterface[]> []
            for (let i = 0; i < this.unidad.length; i++) {
              this.service.getTemasByUnidades(this.unidad[i].idUnidades).subscribe(
                data1=>{
                  const arr = <TemaInterface[]> data1
                  for (let j = 0; j < arr.length; j++) {
                    this.tema.push(arr[j])
                  }
                }
              )
            }
            this.preguntaService.getPreguntas().subscribe(
              data2=>{
                this.pregunta = <PreguntaInterface[]>data2
              }
            )
          }
        )
      }
    }) 
   }

  //Para obtener los datos.
/*
  unidad: Array<any> = [
    { nombre: 'unidad 1: Suma y Resta', id: 0 },
    { nombre: 'unidad 2: Division Y Multiplicación', id: 1 },
  ];

  tema: Array<any> = [
    { nombre: 'tema 1: Suma', unidadid: 0, id: 0 },
    { nombre: 'tema 2: Resta', unidadid: 0, id: 1 },
    { nombre: 'tema 1: Division', unidadid: 1, id: 0 },
    { nombre: 'tema 2: Multiplicación', unidadid: 1, id: 1 },
  ];

  pregunta: Array<any> = [
    {
      contenido: 'Este es el contenido de la pregunta',
      dificultad: 1,
      procedimiento: true,
      unidadid: 0,
      temaid: 0,
      correcto: 2,
      respuestas: ['respuesta a', 'respuesta b', 'respuesta c', 'respuesta d'],
    },
    {
      contenido: 'Este es el contenido de otra pregunta',
      dificultad: 2,
      procedimiento: false,
      unidadid: 0,
      temaid: 0,
      correcto: 2,
      respuestas: [
        'esta no es la respuesta',
        'es la siguente',
        'es esta la correcta',
        'te pasaste',
      ],
    },
    {
      contenido: 'Cual es el primer pokemon',
      dificultad: 1,
      procedimiento: true,
      unidadid: 0,
      temaid: 1,
      correcto: 0,
      respuestas: ['Bulbasaur', 'Mew', 'Arceus', 'Ryhorn'],
    },
    {
      contenido: 'De que color es el caballo blanco',
      dificultad: 1,
      procedimiento: true,
      unidadid: 0,
      temaid: 1,
      correcto: 2,
      respuestas: ['Negro', 'Amarillo', 'Blanco', 'Cafe'],
    },
    {
      contenido: '2 + 2',
      dificultad: 1,
      procedimiento: true,
      unidadid: 1,
      temaid: 0,
      correcto: 3,
      respuestas: ['1', '2', '3', '4'],
    },
    {
      contenido: '2x + 3x',
      dificultad: 1,
      procedimiento: true,
      unidadid: 1,
      temaid: 0,
      correcto: 2,
      respuestas: ['x', '-x', '5x', '-5x'],
    },
    {
      contenido: 'Best girl de hololive EN',
      dificultad: 1,
      procedimiento: true,
      unidadid: 1,
      temaid: 1,
      correcto: 0,
      respuestas: ['Ina', 'Mumei', 'Gura', 'Cali'],
    },
  ];*/

  unidad: UnidadInterface[] = <UnidadInterface[]>[]
  tema: TemaInterface[] = <TemaInterface[]>[]
  pregunta: PreguntaInterface[] = <PreguntaInterface[]>[]

  idAsignatura: any = ''
  isCollapsed = true;
  //Temas y unidades es para los cambios en el select
  temas: TemaInterface[] = <TemaInterface[]>[];
  preguntas: PreguntaInterface[] = <PreguntaInterface[]>[];
  //Son justos y necesarios
  unidadID: any;
  temaID: any;
  closeResult = '';

  //Para los cambios del select
  cambiarUnidad(e: any) {
    this.unidadID = null;
    this.temas = [];
    
    for (let i = 0; i < this.unidad.length; i++) {
      if (this.unidad[i].nombreUnidad == e.target.value) {
        this.unidadID = this.unidad[i].idUnidades;
      }
    }

    if (this.unidadID != null) {
      for (let i = 0; i < this.tema.length; i++) {
        if (this.tema[i].idUnidad == this.unidadID) {
          this.temas.push(this.tema[i]);
        }
      }
    }
  }

  cambiarTema(e: any) {
    this.temaID = null;
    this.preguntas = [];

    for (let i = 0; i < this.temas.length; i++) {
      if (this.temas[i].nombreTema == e.target.value) {
        this.temaID = this.temas[i].idTema;
      }
    }
    if (this.temaID != null) {
      for (let i = 0; i < this.pregunta.length; i++) {
        if (
          this.pregunta[i].idunidad == this.unidadID &&
          this.pregunta[i].idtema == this.temaID
        ) {
          this.preguntas.push(this.pregunta[i]);
        }
      }
      console.log(this.preguntas)
    }
  }
  //this.preguntas = this.unidad.find((undad: any) => undad.id == this.selectedUnidad).temas.find((tma: any) => tma.id == tema.target.value).preguntas;
  //this.cities = this.Countries.find((cntry: any) => cntry.name == this.selectedCountry).states.find((stat: any) => stat.name == state.target.value).cities;

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  //actualiza lo datos y recarga la página
  async save(pregunta: PreguntaInterface) {
    console.log(pregunta);
    this.preguntaService.putPregunta(pregunta).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    )
    let res: {idReactivo: string, orden: number, idRespuesta: string, respuestaString: string, idsigreactivo: string} = <any>{}
    for (let i = 0; i<pregunta.listOfRespuestas.length; i++){
      res.idReactivo = pregunta.idreactivo
      res.orden = i
      res.respuestaString =  pregunta.listOfRespuestas[i].respuesta
      res.idsigreactivo = '1'
      res.idRespuesta = pregunta.idreactivo + '-' + i.toString()
      console.log(res);
      await this.preguntaService.putRespuesta(res).subscribe(
        (resp) => console.log(resp),
        (err) => console.log(err)
      )
    }
    //window.location.reload();
  }

  linkCrearPreguntas(idAsignatura: any){
    this.router.navigate(["/"+idAsignatura, 'materia', 'crear'])
  }
}
