import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaAlumnosComponent } from './materia-alumnos.component';

describe('MateriaAlumnosComponent', () => {
  let component: MateriaAlumnosComponent;
  let fixture: ComponentFixture<MateriaAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MateriaAlumnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriaAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
