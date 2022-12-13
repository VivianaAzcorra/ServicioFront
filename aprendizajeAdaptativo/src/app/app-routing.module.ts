import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExamenComponent } from './componentes/examen/examen.component';
import { LoginComponent } from './componentes/login/login.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { CrearPreguntaComponent } from './componentes/crear-pregunta/crear-pregunta.component';
import { VerPreguntasComponent } from './componentes/ver-preguntas/ver-preguntas.component';
import { UnidadesComponent } from './componentes/unidades/unidades.component';
import { MateriaComponent } from './componentes/materia/materia.component';
import { InicioAlumnosComponent } from './componentes/inicio-alumnos/inicio-alumnos.component';
import { MateriaAlumnosComponent } from './componentes/materia-alumnos/materia-alumnos.component';
import { ExamenAlumnosComponent } from './componentes/examen-alumnos/examen-alumnos.component';
import { ResultadosAlumnoComponent } from './componentes/resultados-alumno/resultados-alumno.component';

const routes: Routes = [
  { path: 'examen', component: ExamenComponent },
  { path: ':idAsignatura/materia/examen', component: ExamenComponent },
  { path: ':idAsignatura/materia/:idExamen/examen', component: ExamenComponent },
  { path: '', component:LoginComponent},
  { path: ':idProfesor/inicio', component:InicioComponent},
  { path: 'crear', component:CrearPreguntaComponent },
  { path: ':idAsignatura/materia/crear', component:CrearPreguntaComponent },
  { path: 'ver', component:VerPreguntasComponent},
  { path: ':idAsignatura/materia/ver', component:VerPreguntasComponent},
  { path: 'unidades', component:UnidadesComponent},
  { path: ':idAsignatura/materia/unidades', component:UnidadesComponent},
  { path: 'materia', component:MateriaComponent},
  { path: ':idAsignatura/materia', component:MateriaComponent},

  { path: 'inicio-alumnos', component:InicioAlumnosComponent},
  { path: 'materia-alumnos', component:MateriaAlumnosComponent},
  { path: 'examen-alumnos', component:ExamenAlumnosComponent},
  { path: 'resultados-alumno', component:ResultadosAlumnoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
