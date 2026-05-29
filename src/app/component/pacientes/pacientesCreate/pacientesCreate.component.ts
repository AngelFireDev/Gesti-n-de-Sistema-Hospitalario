import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Paciente } from '../../../models/pacientes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pacientes-create',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pacientesCreate.component.html',
  styleUrls: ['./pacientesCreate.component.css']
})
export class PacientesCreateComponent {
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
