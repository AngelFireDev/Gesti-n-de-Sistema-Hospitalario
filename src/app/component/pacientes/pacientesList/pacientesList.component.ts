import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, Routes } from '@angular/router';
import { PacienteService } from '../../../services/pacientesService';
import { Paciente } from '../../../services/pacientesService';

@Component({
  selector: 'app-pacientes-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pacientesList.component.html',
  styleUrls: ['./pacientesList.component.css']
})
export class PacientesListComponent implements OnInit {
  pacientes: Paciente[] = [];

  constructor
  (
    private pacienteService: PacienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarPacientes();
  }

  crearPaciente() {
    this.router.navigate(['pacientes/create'])
  }

  cargarPacientes() {
    this.pacienteService.getPacientes().subscribe(data => {
      this.pacientes = data;
    });
  }

  editarPaciente(paciente: Paciente) {
    this.router.navigate(['pacientes/edit'])
  }

  eliminarPaciente(id: number) {
    this.pacienteService.eliminarPaciente(id).subscribe(() => {
      this.cargarPacientes(); 
    });
  }
}
