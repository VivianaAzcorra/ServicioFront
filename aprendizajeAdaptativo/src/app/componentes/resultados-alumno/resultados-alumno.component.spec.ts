import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosAlumnoComponent } from './resultados-alumno.component';

describe('ResultadosAlumnoComponent', () => {
  let component: ResultadosAlumnoComponent;
  let fixture: ComponentFixture<ResultadosAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadosAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
