import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Form, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UnidadesService } from 'src/app/servicios/unidadesServices/unidades.service';
import { PreguntaService } from 'src/app/servicios/preguntaService/pregunta.service';
import { ExamenService } from 'src/app/servicios/examen/examen.service';
import { TemaInterface } from 'src/app/interfaces/tema-interface';
import { UnidadInterface } from 'src/app/interfaces/unidad-interface';
import { PreguntaInterface, RespuestaInterface } from 'src/app/interfaces/pregunta-interface';
import { ExamenInterface } from 'src/app/interfaces/examen-interface';
import { ReactivoInterface } from 'src/app/interfaces/reactivo-interface';


@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private preguntaService: PreguntaService,
    private service: UnidadesService,
    private examenService: ExamenService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params1 => {
      if (params1.has("idExamen")) {
        this.flag = !this.flag
        this.examenService.getExamenById(params1.get("idExamen")).subscribe(
          data4 => {
            this.examenEdit = <ExamenInterface>data4
            this.idExamen = this.examenEdit.idExamen
            this.route.paramMap.subscribe(params => {
              if (params.has("idAsignatura")) {
                this.service.getUnidadesByAsignatura(params.get("idAsignatura")).subscribe(
                  data => {
                    this.unidades = <UnidadInterface[]>data
                    this.tema = <TemaInterface[]>[]
                    this.idAsignatura = params.get("idAsignatura")
                    for (let i = 0; i < this.unidades.length; i++) {
                      this.service.getTemasByUnidades(this.unidades[i].idUnidades).subscribe(
                        data1 => {
                          const arr = <TemaInterface[]>data1
                          for (let j = 0; j < arr.length; j++) {
                            this.tema.push(arr[j])
                          }
                        }
                      )
                    }
                    this.preguntaService.getPreguntas().subscribe(
                      data2 => {
                        this.pregunta = <PreguntaInterface[]>data2
                        this.preguntaId = this.pregunta.length + 1
                        this.contruirExamen()
                      }
                    )
                    //metodo para constriur examen
                  }
                )
              }
            })
          }
        )
      } else {
        this.route.paramMap.subscribe(params => {
          if (params.has("idAsignatura")) {
            this.service.getUnidadesByAsignatura(params.get("idAsignatura")).subscribe(
              data => {
                this.unidades = <UnidadInterface[]>data
                this.tema = <TemaInterface[]>[]
                this.idAsignatura = params.get("idAsignatura")
                for (let i = 0; i < this.unidades.length; i++) {
                  this.service.getTemasByUnidades(this.unidades[i].idUnidades).subscribe(
                    data1 => {
                      const arr = <TemaInterface[]>data1
                      for (let j = 0; j < arr.length; j++) {
                        this.tema.push(arr[j])
                      }
                    }
                  )
                }
                this.preguntaService.getPreguntas().subscribe(
                  data2 => {
                    this.pregunta = <PreguntaInterface[]>data2
                    this.preguntaId = this.pregunta.length + 1
                  }
                )
                this.examenService.getExamenes().subscribe(
                  data3 => {
                    const arr = <ExamenInterface[]>data3
                    this.idExamen = arr.length + 1
                  }
                )
              }
            )
          }
        })
      }
    })
  }

  examen!: FormGroup;
  examenEdit: ExamenInterface = <ExamenInterface>{}
  unidades: UnidadInterface[] = <UnidadInterface[]>[]
  tema: TemaInterface[] = <TemaInterface[]>[]
  pregunta: PreguntaInterface[] = <PreguntaInterface[]>[]
  preguntaSiguiente: PreguntaInterface[] = <PreguntaInterface[]>[]
  //para los scroll (temporales)
  temas: TemaInterface[] = <TemaInterface[]>[]
  preguntas: PreguntaInterface[] = <PreguntaInterface[]>[]
  respuestas: RespuestaInterface[] = <RespuestaInterface[]>[]
  //Son justos y necesarios
  unidadID: any
  temaID: any
  correcto: any
  idAsignatura: any
  preguntaId: any
  //La forma en la que se generan los id es con la longitud del array + 1 por lo que hay que cambiarlo xd
  idExamen: any
  flag = false

  ngOnInit(): void {
    this.crearExamen()
    /*this.examen = new FormGroup({
      nombre: new FormControl(""),
      tiempo: new FormControl(0),
      unidades: new FormArray([
        this.crearUnidad()
      ])
    })*/
  }

  crearExamen(): void {
    this.examen = new FormGroup({
      nombre: new FormControl(""),
      tiempo: new FormControl(0),
      unidades: new FormArray([
        this.crearUnidad()
      ])
    })
  }

  crearUnidad(): FormGroup {
    return this.formBuilder.group({
      contenido: new FormControl(""),
      id: new FormControl(""),
      temas: new FormArray([
        this.crearTema()
      ])
    })
  }

  agregarUnidad() {
    const unidades = this.examen.get('unidades') as FormArray;
    unidades.push(this.crearUnidad());
  }

  getUnidad(form: any) {
    return form.controls.unidades.controls
  }

  crearTema(): FormGroup {
    return this.formBuilder.group({
      contenido: new FormControl(""),
      id: new FormControl(""),
      unidadId: new FormControl(""),
      reactivos: new FormArray([
        this.crearReactivo()
      ])
    })
  }

  agregarTema(i: any) {
    const tema = (this.examen.get('unidades') as FormArray).controls[i].get('temas') as FormArray;
    tema.push(this.crearTema())
  }

  getTema(form: any) {
    return form.controls.temas.controls
  }


  crearReactivo(): FormGroup {
    return this.formBuilder.group({
      id: new FormControl(""),
      contenido: new FormControl(""),
      nivel: new FormControl(""),
      ra: new FormControl(""),
      procedimiento: new FormControl(""),
      preguntaCritica: new FormControl(""),
      correcto: new FormControl(""),
      unidadId: new FormControl(""),
      temaId: new FormControl(""),
      respuestas: new FormArray([
        this.crearRespuestas(),
        this.crearRespuestas(),
        this.crearRespuestas(),
        this.crearRespuestas()
      ])
    })
  }

  agregarReactivo(i: any, j: any) {
    const reactivos = ((this.examen.get('unidades') as FormArray).controls[i].get('temas') as FormArray).controls[j].get('reactivos') as FormArray;
    reactivos.push(this.crearReactivo());
  }

  getReactivo(form: any) {
    return form.controls.reactivos.controls
  }


  //aqui se genera la seccion para generar respuesta no se que es lo que falla

  crearRespuestas(): FormGroup {
    return this.formBuilder.group({
      id: new FormControl(""),
      contenido: new FormControl(""),
      preguntaSiguiente: new FormControl(""),
    })
  }

  agregarRespuesta(i: any, j: any, k: any) {
    const respuesta = (((this.examen.get('unidades') as FormArray).controls[i].get('temas') as FormArray).controls[j].get('reactivos') as FormArray).controls[k].get('respuestas') as FormArray;
    respuesta.push(this.crearRespuestas());
  }

  getRespuesta(form: any) {
    return form.controls.respuestas.controls
  }



  eliminarUnidad(i: any, form: any) {
    const unidad = this.examen.get('unidades') as FormArray;
    unidad.removeAt(i);
    this.preguntaSiguiente = Object.values(this.preguntaSiguiente).filter(pregunta => pregunta.idunidad != form.controls['id'].value)
  }

  eliminarTema(i: any, j: any, form: any) {
    const tema = (this.examen.get('unidades') as FormArray).controls[i].get('temas') as FormArray;
    tema.removeAt(j);
    console.log(form.controls['contenido'].value)
    this.preguntaSiguiente = Object.values(this.preguntaSiguiente).filter(pregunta => pregunta.idtema != form.controls['id'].value)
  }

  eliminarReactivo(i: any, j: any, k: any, form:any) {
    const reactivos = ((this.examen.get('unidades') as FormArray).controls[i].get('temas') as FormArray).controls[j].get('reactivos') as FormArray;
    reactivos.removeAt(k);
    this.preguntaSiguiente = Object.values(this.preguntaSiguiente).filter(pregunta => pregunta.idreactivo != form.controls['id'].value)
  }

  eliminarRespuesta(i: any, j: any, k: any, l: any) {
    const respuesta = (((this.examen.get('unidades') as FormArray).controls[i].get('temas') as FormArray).controls[j].get('reactivos') as FormArray).controls[k].get('respuestas') as FormArray;
    respuesta.removeAt(l);
  }

  cambiarUnidad(e: any, form: any) {
    this.unidadID = null;
    this.temas = [];
    for (let i = 0; i < this.unidades.length; i++) {
      if (this.unidades[i].nombreUnidad == e.target.value) {
        this.unidadID = this.unidades[i].idUnidades;
        this.unidadExamen(form, i);
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

  cambiarTema(e: any, form: any) {
    this.temaID = null;
    this.preguntas = [];
    for (let i = 0; i < this.tema.length; i++) {
      if (this.tema[i].nombreTema == e.target.value) {
        this.temaID = this.tema[i].idTema;
        this.temaExamen(form, i)
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
    }
  }

  cambiarPregunta(e: any, form: any) {
    this.respuestas = [];
    this.correcto = null;
    for (let i = 0; i < this.preguntas.length; i++) {
      if (this.preguntas[i].pregunta == e.target.value) {
        this.respuestas = this.preguntas[i].listOfRespuestas;
        this.prguntaExamen(form, i);
        this.preguntaSiguiente.push(this.preguntas[i])
      }
    }
  }

  cambiarPreSig(e: any, form: any){
    for (let i = 0; i < this.preguntaSiguiente.length; i++) {
      if (this.preguntaSiguiente[i].idreactivo==e.target.value) {
        form.controls['preguntaSiguiente'].setValue(this.preguntaSiguiente[i].idreactivo)
        console.log(form.controls['preguntaSiguiente'].value);
      };
    }
  }
  //this.form.controls['campo'].setValue(valor)
  //trear el form con la funcion getTemas()
  unidadExamen(form: any, i: any) {
    form.controls['contenido'].setValue(this.unidades[i].nombreUnidad);
    form.controls["id"].setValue(this.unidades[i].idUnidades)
  }

  temaExamen(form: any, i: any) {
    form.controls['contenido'].setValue(this.tema[i].nombreTema);
    form.controls['id'].setValue(this.tema[i].idTema);
    form.controls['unidadId'].setValue(this.tema[i].idUnidad);
  }

  prguntaExamen(form: any, i: any) {
    form.controls['id'].setValue(this.preguntas[i].idreactivo);
    form.controls['contenido'].setValue(this.preguntas[i].pregunta);
    form.controls['nivel'].setValue(this.preguntas[i].dificultad);
    form.controls['procedimiento'].setValue(this.preguntas[i].requiereProcedimiento);
    //form.controls['ra'].setValue();//aun no se como llenarlo
    //form.controls['preguntaCritica'].setValue();//aun no se como llenarlo
    form.controls['unidadId'].setValue(this.preguntas[i].idunidad);
    form.controls['temaId'].setValue(this.preguntas[i].idtema);
    form.controls['correcto'].setValue(this.preguntas[i].correcto);
    let j = 0;
    for (let respuestas of this.getRespuesta(form)) {
      respuestas.controls['id'].setValue(this.respuestas[j].idrespuesta)
      respuestas.controls['contenido'].setValue(this.respuestas[j].respuesta)
      j++
    };
  }

  respuestaExamen(form: any, j: any) {
    form.controls['contenido'].setValue(this.respuestas[j].respuesta);
  }

  async mandar() {
    let reacForm: { idExamen: string, idReactivo: string, orden: number } = <any>{}
    let examenForm: { idExamen: string, nombre: string, descripcion: string, idAsignatura: string, tiempo: number, } = <any>{}
    let preSig: {idReactivo: string, orden: number, idRespuesta: string, respuestaString: string, idsigreactivo: string} = <any>{}
    examenForm.idExamen = this.idExamen.toString()
    examenForm.nombre = this.examen.controls['nombre'].value
    examenForm.descripcion = 'una descripcion'
    examenForm.idAsignatura = this.idAsignatura
    examenForm.tiempo = this.examen.controls['tiempo'].value
    console.log(examenForm)
    if (this.flag) {
      await this.eliminarReactivoExamen()
      await this.examenService.putExamen(examenForm).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      )
      let i = 0
      for (let unidad of this.getUnidad(this.examen)) {
        for (let tema of this.getTema(unidad)) {
          for (let reactivo of this.getReactivo(tema)) {
            reacForm.idExamen = this.idExamen.toString()
            reacForm.idReactivo = reactivo.controls['id'].value
            reacForm.orden = i
            i++
            console.log(reacForm)
            this.examenService.postReativoExamen(reacForm).subscribe(
              (res) => console.log(res),
              (err) => console.log(err)
            )
            for(let respuesta of this.getRespuesta(reactivo)){
              preSig.idsigreactivo = respuesta.controls['preguntaSiguiente'].value
              preSig.idReactivo = respuesta.controls['id'].value
              preSig.respuestaString = respuesta.controls['contenido'].value
              console.log(preSig)
              this.preguntaService.putRespuesta(preSig).subscribe(
                (res) => console.log(res),
                (err) => console.log(err)
              )
            }
          }
        }
      }
    }else{
      await this.examenService.postExamen(examenForm).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      )
      let i = 0
      for (let unidad of this.getUnidad(this.examen)) {
        for (let tema of this.getTema(unidad)) {
          for (let reactivo of this.getReactivo(tema)) {
            reacForm.idExamen = this.idExamen.toString()
            reacForm.idReactivo = reactivo.controls['id'].value
            reacForm.orden = i
            i++
            console.log(reacForm)
            this.examenService.postReativoExamen(reacForm).subscribe(
              (res) => console.log(res),
              (err) => console.log(err)
            )
            for(let respuesta of this.getRespuesta(reactivo)){
              preSig.idsigreactivo = respuesta.controls['preguntaSiguiente'].value
              preSig.idReactivo = respuesta.controls['id'].value
              preSig.respuestaString = respuesta.controls['contenido'].value
              console.log(preSig)
              this.preguntaService.putRespuesta(preSig).subscribe(
                (res) => console.log(res),
                (err) => console.log(err)
              )
            }
          }
        }
      }
    }
  }

  contruirExamen() {
    let reactivoFiltro: PreguntaInterface[] = []
    let reactivo: PreguntaInterface[] = []
    for (let i = 0; i < this.examenEdit.listOfReactivos.length; i++) {
      reactivoFiltro = Object.values(this.pregunta).filter(rectivo => rectivo.idreactivo == this.examenEdit.listOfReactivos[i].idreactivo)
      reactivo.push(reactivoFiltro[0])
    }
    let unidadesFaltantes: PreguntaInterface[] = reactivo.filter(rectivo => rectivo.idunidad != reactivo[0].idunidad)
    let unidadesConstruir: PreguntaInterface[] = reactivo.filter(rectivo => rectivo.idunidad == reactivo[0].idunidad)
    reactivo = []
    let u = 0
    while (unidadesConstruir.length > 0) {
      if (u != 0) {
        this.agregarUnidad()
      }
      let temasFaltantes: PreguntaInterface[] = unidadesConstruir.filter(rectivo => rectivo.idtema != unidadesConstruir[0].idtema)
      let temasConstruir: PreguntaInterface[] = unidadesConstruir.filter(rectivo => rectivo.idtema == unidadesConstruir[0].idtema)
      let t = 0
      while (temasConstruir.length > 0) {
        if (t != 0) {
          this.agregarTema(u)
        }
        for (let i = 0; i < temasConstruir.length; i++) {
          if (i != 0) {
            this.agregarReactivo(u, t)
          }
          console.log(temasConstruir[i])
          reactivo.push(temasConstruir[i])
        }
        temasConstruir = temasFaltantes.filter(rectivo => rectivo.idtema == temasFaltantes[0].idtema)
        temasFaltantes = temasFaltantes.filter(rectivo => rectivo.idtema != temasFaltantes[0].idtema)
        t++
      }
      unidadesConstruir = unidadesFaltantes.filter(rectivo => rectivo.idunidad == unidadesFaltantes[0].idunidad)
      unidadesFaltantes = unidadesFaltantes.filter(rectivo => rectivo.idunidad != unidadesFaltantes[0].idunidad)
      u++
    }
    this.examen.controls['nombre'].setValue(this.examenEdit.nombre)
    this.examen.controls['tiempo'].setValue(this.examenEdit.tiempo)
    let r = 0
    for (let unidad of this.getUnidad(this.examen)) {
      unidad.controls['contenido'].setValue(reactivo[r].unidad)
      unidad.controls["id"].setValue(reactivo[r].idunidad)
      for (let tema of this.getTema(unidad)) {
        tema.controls['contenido'].setValue(reactivo[r].tema)
        tema.controls["id"].setValue(reactivo[r].idtema)
        tema.controls['unidadId'].setValue(reactivo[r].idunidad)
        for (let pregunta of this.getReactivo(tema)) {
          pregunta.controls['id'].setValue(reactivo[r].idreactivo);
          pregunta.controls['contenido'].setValue(reactivo[r].pregunta);
          pregunta.controls['nivel'].setValue(reactivo[r].dificultad);
          pregunta.controls['procedimiento'].setValue(reactivo[r].requiereProcedimiento);
          //pregunta.controls['ra'].setValue();//aun no se como llenarlo
          //pregunta.controls['preguntaCritica'].setValue();//aun no se como llenarlo
          pregunta.controls['unidadId'].setValue(reactivo[r].idunidad);
          pregunta.controls['temaId'].setValue(reactivo[r].idtema);
          pregunta.controls['correcto'].setValue(reactivo[r].correcto);
          this.preguntaSiguiente.push(reactivo[r])
          let j = 0;
          for (let respuestas of this.getRespuesta(pregunta)) {
            respuestas.controls['id'].setValue(reactivo[r].listOfRespuestas[j].idrespuesta);
            respuestas.controls['contenido'].setValue(reactivo[r].listOfRespuestas[j].respuesta);
            respuestas.controls['preguntaSiguiente'].setValue(reactivo[r].listOfRespuestas[j].idsigreactivo);
            j++
          };
          r++
        }
      }
    }

  }

  async eliminarReactivoExamen() {
    for (let i = 0; i < this.examenEdit.listOfReactivos.length; i++) {
      await this.examenService.eliminarReactivoExamen(this.examenEdit.listOfReactivos[i].idreactivo, this.idExamen).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      )
    }
  }


}





