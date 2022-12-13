import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UnidadesService } from 'src/app/servicios/unidadesServices/unidades.service';
import { PreguntaService } from 'src/app/servicios/preguntaService/pregunta.service';
import { TemaInterface } from 'src/app/interfaces/tema-interface';
import { UnidadInterface } from 'src/app/interfaces/unidad-interface';
import { PreguntaInterface } from 'src/app/interfaces/pregunta-interface';

@Component({
  selector: 'app-crear-pregunta',
  templateUrl: './crear-pregunta.component.html',
  styleUrls: ['./crear-pregunta.component.css']
})
export class CrearPreguntaComponent implements OnInit {


  constructor(private formBuilder: FormBuilder,
    private preguntaService: PreguntaService,
    private service: UnidadesService,
    private router: Router,
    private route: ActivatedRoute) { 
      this.route.paramMap.subscribe(params => {
        if (params.has("idAsignatura")){
          this.service.getUnidadesByAsignatura(params.get("idAsignatura")).subscribe(
            data=>{
              this.unidad = <UnidadInterface[]> data
              this.tema = <TemaInterface[]> []
              this.idAsignatura = params.get("idAsignatura")
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
                  const id = <PreguntaInterface[]>data2
                  this.preguntaId = id.length + 2
                }
              )
            }
          )
        }
      }) 
    }

  //Se declara el formGroup para guardar los datos
  examen!: FormGroup;
  unidad: UnidadInterface[] = <UnidadInterface[]>[]
  tema: TemaInterface[] = <TemaInterface[]>[]
  
  //Parte para selecionar unidad y tema
  /*unidad: Array<any> = [
    { nombre: 'unidad 1: Suma y Resta', id: 0 },
    { nombre: 'unidad 2: Division Y Multiplicación', id: 1 },
  ];*/

  /*tema: Array<any> = [
    { nombre: 'tema 1: Suma', unidadid: 0, id: 0 },
    { nombre: 'tema 2: Resta', unidadid: 0, id: 1 },
    { nombre: 'tema 1: Division', unidadid: 1, id: 0 },
    { nombre: 'tema 2: Multiplicación', unidadid: 1, id: 1 },
  ];*/

  isChecked = true
  temas: TemaInterface[] = <TemaInterface[]>[];
  //Son justos y necesarios
  unidadID: any;
  temaid:any
  //La forma en la que se generan los id es con la longitud del array + 1 por lo que hay que cambiarlo xd
  preguntaId: any
  idAsignatura: any
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
          this.temaid = this.tema[i].idTema
          this.temas.push(this.tema[i]);
        }
      }
    }
  }
  //roytuts.com/cascading-or-dependent-dropdown-using-angular/

  //Se inicializa la pagina generando un formulario vacio
  ngOnInit(): void {
    this.examen = new FormGroup({
      reactivos: new FormArray([
        this.crearReactivo()
      ])
    })
  }

  //Se construye el formulario para los reactivos
  crearReactivo(): FormGroup {
    return this.formBuilder.group({
      contenido: new FormControl(""),
      procedimiento: new FormControl(true),
      nivel: new FormControl(0),
      correcto: new FormControl(0),
      respuestas: new FormArray([
        this.crearRespuestas(),
        this.crearRespuestas(),
        this.crearRespuestas(),
        this.crearRespuestas()
      ]),
      
    })
  }

  //boton para crear un reactivo
  agregarReactivo() {
    const reactivos = this.examen.get('reactivos') as FormArray
    reactivos.push(this.crearReactivo());
  }

  //se utiliza para obtener la posicion del reactivo
  getReactivo(form: any) {
    return form.controls.reactivos.controls
  }


  //Se construye el formulario para los reactivos
  crearRespuestas(): FormGroup {
    return this.formBuilder.group({
      contenido: new FormControl(""),
    })
  }

  //boton para crear una nueva respuesta

  //se obtine la posicion de la respuesta dentro del reactivo
  getRespuesta(form: any) {
    return form.controls.respuestas.controls

  }

  //Creo que no se utiliza más xd
  eliminarUnidad(i: any) {
    const unidad = this.examen.get('unidades') as FormArray;
    unidad.removeAt(i);
  }

  
  //Creo que no se utiliza más xd
  eliminarTema(i: any, j: any) {
    const tema = (this.examen.get('unidades') as FormArray).controls[i].get('temas') as FormArray;
    tema.removeAt(j);
  }

  //Este si xd, es oara eliminar un reattivo
  eliminarReactivo(i: any) {
    const reactivos = this.examen.get('reactivos') as FormArray;
    reactivos.removeAt(i);
  }

  //Se usa para eliminar una respuesta
  eliminarRespuesta(i: any, j: any) {
    const respuesta = (this.examen.get('reactivos') as FormArray).controls[i].get('respuestas') as FormArray;
    respuesta.removeAt(j);
  }

  checked(form: any){
    this.isChecked = !this.isChecked
    form.controls['procedimiento'].setValue(this.isChecked)
    this.isChecked = !this.isChecked
  }

  //Aqui es para mandar para la base de dato que no esta implementada xd
  async mandar(){
    let form: PreguntaInterface = <PreguntaInterface>{}
    let res: {idReactivo: string, orden: number, idRespuesta: string, respuestaString: string, idsigreactivo: string} = <any>{}
    let i: number 
    for (let reactivo of this.getReactivo(this.examen)) {
      i=0
      form.idtema = this.temaid
      form.idunidad = this.unidadID
      form.idreactivo = this.preguntaId.toString()
      this.preguntaId++
      form.correcto = reactivo.controls['correcto'].value
      form.pregunta = reactivo.controls['contenido'].value
      form.dificultad = reactivo.controls['nivel'].value
      form.requiereProcedimiento = reactivo.controls['procedimiento'].value
      console.log(form);
      
      await this.preguntaService.postPregunta(form).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      )
      for (let respuesta of this.getRespuesta(reactivo)){
        res.idReactivo = form.idreactivo
        res.orden = i
        res.respuestaString =  respuesta.controls['contenido'].value
        res.idsigreactivo = '1'
        res.idRespuesta = form.idreactivo + '-' + i.toString()
        i++
        console.log(res);
        await this.preguntaService.postRespuesta(res).subscribe(
          (resp) => console.log(resp),
          (err) => console.log(err)
        )
      }
    }
    
  }

  linkVerPreguntas(idAsignatura: any){
    this.router.navigate(["/"+idAsignatura, 'materia', 'ver'])
  }

}
