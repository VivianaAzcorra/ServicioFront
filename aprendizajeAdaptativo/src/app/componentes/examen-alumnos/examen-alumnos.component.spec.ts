import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenAlumnosComponent } from './examen-alumnos.component';

describe('ExamenAlumnosComponent', () => {
  let component: ExamenAlumnosComponent;
  let fixture: ComponentFixture<ExamenAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenAlumnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
