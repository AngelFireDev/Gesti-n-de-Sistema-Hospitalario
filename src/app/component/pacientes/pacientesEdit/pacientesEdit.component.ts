import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Paciente } from '../../../models/pacientes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pacientes-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pacientesEdit.component.html',
  styleUrls: ['./pacientesEdit.component.css']
})
export class PacientesEditComponent {
  paciente: Paciente = {
    id: 0,
    nombre: '',
    edad: 0,
    diagnostico: ''
  };

  constructor(private router: Router) {}

  guardarPaciente() {
    console.log('Paciente creado:', this.paciente);
    this.router.navigate(['/pacientes']); 
  }

  cancelar() {
    this.router.navigate(['/pacientes']);
  }
}
