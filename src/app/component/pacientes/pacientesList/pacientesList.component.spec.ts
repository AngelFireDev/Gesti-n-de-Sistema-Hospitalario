import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesListComponent } from './pacientesList.component';

describe('Lista', () => {
  let component: PacientesListComponent;
  let fixture: ComponentFixture<PacientesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacientesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PacientesListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
