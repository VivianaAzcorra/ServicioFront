import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { UnidadesService } from 'src/app/servicios/unidadesServices/unidades.service';
import { TemaInterface } from 'src/app/interfaces/tema-interface';
import { UnidadInterface } from 'src/app/interfaces/unidad-interface';
import { importType } from '@angular/compiler/src/output/output_ast';
import { merge } from 'rxjs';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent implements OnInit {
  
  /*
  public unidades = [
    { id: '0', nombre: 'Unidad 1: El nombre de la unidad' },
    { id: '1', nombre: 'Unidad 2: El nombre de esta otra' },
    { id: '2', nombre: 'Unidad 3: El nombre de una más' },
    { id: '3', nombre: 'Unidad 4: El nombre de esta última' }
  ];*/
  
  
  /*public temas = [
    { id: '0', idUnidad: '0', nombre: 'Tema 1: El nombre del tema de la unidad 1' },
    { id: '1', idUnidad: '0', nombre: 'Tema 2: El nombre del otro tema de la unidad 1' },
    { id: '2', idUnidad: '1', nombre: 'Tema 1: El nombre del tema de la unidad 2' },
    { id: '3', idUnidad: '1', nombre: 'Tema 2: El nombre del otro tema de la unidad 2' },    
    { id: '4', idUnidad: '2', nombre: 'Tema 1: El nombre del tema de la unidad 3' },
    { id: '5', idUnidad: '2', nombre: 'Tema 2: El nombre del otro tema de la unidad 3' },    
    { id: '6', idUnidad: '3', nombre: 'Tema 1: El nombre del tema de la unidad 4' },
    { id: '7', idUnidad: '3', nombre: 'Tema 2: El nombre del otro tema de la unidad 4' }
  ];*/

  unidades: UnidadInterface[] = <UnidadInterface[]>[]
  temas: TemaInterface[] = <TemaInterface[]>[]

  idAsignatura: any = ''
  nuevaunidad: any = ''
  nuevotema: any = ''
  
  //La forma en la que se generan los id es con la longitud del array + 1 por lo que hay que cambiarlo xd
  idunidad: any = ''
  idtema: any = ''
  unidadselect: any = ''
  closeResult = ''
  nombreunidad:any = ''
  nombretema:any = ''
  unidadActual: UnidadInterface = <UnidadInterface>{}
  temaActual: TemaInterface = <TemaInterface>{}
  constructor(
    private modalService: NgbModal,
    private service: UnidadesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has("idAsignatura")){
        this.service.getUnidadesByAsignatura(params.get("idAsignatura")).subscribe(
          data=>{
            this.unidades = <UnidadInterface[]> data;
            this.idAsignatura = params.get("idAsignatura")
            this.temas = <TemaInterface[]> []
            for (let i = 0; i < this.unidades.length; i++) {
              this.service.getTemasByUnidades(this.unidades[i].idUnidades).subscribe(
                data1=>{
                  const arr = <TemaInterface[]> data1
                  for (let j = 0; j < arr.length; j++) {
                    this.temas.push(arr[j])
                  }
                }
              )
            }
            this.service.getAllTemas().subscribe(
              data2=>{
                const id = <TemaInterface[]> data2
                this.idtema = id.length + 1
                console.log(this.idtema)
              }
             )
             this.service.getAllUnidades().subscribe(
              data3=>{
                const id = <UnidadInterface[]>data3
                this.idunidad = id.length +1
                console.log(this.idunidad)
              }
             )
          }
        )
      }
    }) 
  }

  agregarUnidad() {
    if (this.nuevaunidad.length > 0) {
      var item:UnidadInterface = { idUnidades: this.idunidad.toString(), nombreUnidad: this.nuevaunidad, idAsignatura: this.idAsignatura,  descUnidad: "Algo"};
      this.service.postUnidades(item).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      )
      console.log(item)
      this.unidades.push(item)
      this.nuevaunidad = ''
      this.idunidad=this.idunidad + 1
    }
  }

  seleccionarUnidad(unidad_seleccionada: String){
    this.unidadselect = unidad_seleccionada
  }

  agregarTema(){
    if (this.nuevotema.length > 0) {
      var item:TemaInterface = { idTema: this.idtema.toString(), idUnidad: this.unidadselect, nombreTema: this.nuevotema, descTema: "Algo"};
      this.service.postTemas(item).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      )
      console.log(item)
      this.temas.push(item)
      this.nuevotema = ''
      this.idtema=this.idtema+1
    }
  }

  filtrarTemas(){
    return Object.values(this.temas).filter(tema => tema.idUnidad == this.unidadselect)
  }

  editarUnidad(){
    this.unidadActual.nombreUnidad = this.nombreunidad
    console.log(this.unidadActual);
    this.service.putUnidades(this.unidadActual).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
      )
  }

  editarTema(){
    this.temaActual.nombreTema = this.nombretema
    this.service.putTemas(this.temaActual).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
      )
  }

  linkVerPreguntas(idAsignatura: any){
    this.router.navigate(["/"+idAsignatura, 'materia', 'ver'])
  }

  openUnidad(unidadCont: any, id: any) {
    this.unidadActual = Object.values(this.unidades).filter(unidad => unidad.idUnidades == id)[0]
    this.nombreunidad = this.unidadActual.nombreUnidad
    this.modalService
      .open(unidadCont, { ariaLabelledBy: 'modal-unidad', size: 'lg' })
  }

  openTema(temaCont: any, id: any) {
    this.temaActual = Object.values(this.temas).filter(tema => tema.idTema == id)[0]
    this.nombretema = this.temaActual.nombreTema
    this.modalService
      .open(temaCont, { ariaLabelledBy: 'modal-tema', size: 'lg' })
  }


}
