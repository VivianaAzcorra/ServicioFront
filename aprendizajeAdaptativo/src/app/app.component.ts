import { Component, OnInit } from '@angular/core';
import { ExamenService } from './servicios/examen/examen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'aprendizajeAdaptativo';

  constructor( private ExamenService: ExamenService ){
    
  }

  ngOnInit(){
    ;
  }

}
