import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesCreateComponent } from './pacientesCreate.component';

describe('Lista', () => {
  let component: PacientesCreateComponent;
  let fixture: ComponentFixture<PacientesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacientesCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PacientesCreateComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
