import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PacientesEditComponent } from './pacientesEdit.component';

describe('Lista', () => {
  let component: PacientesEditComponent;
  let fixture: ComponentFixture<PacientesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacientesEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PacientesEditComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
