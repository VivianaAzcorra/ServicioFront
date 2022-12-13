import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPreguntasComponent } from './ver-preguntas.component';

describe('VerPreguntasComponent', () => {
  let component: VerPreguntasComponent;
  let fixture: ComponentFixture<VerPreguntasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerPreguntasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
