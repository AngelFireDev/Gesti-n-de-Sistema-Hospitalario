import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PacienteService } from '../../../services/pacientesService';
import { Paciente } from '../../../models/pacientes';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../dialog';

@Component({
  selector: 'app-pacientes-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pacientesList.component.html',
  styleUrls: ['./pacientesList.component.css'],
})
export class PacientesListComponent implements OnInit {
  pacientes: Paciente[] = [];

  constructor(
    private pacienteService: PacienteService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.cargarPacientes();
  }

  crearPaciente() {
    this.router.navigate(['pacientes/create']);
  }

  cargarPacientes() {
    this.pacienteService.getPacientes().subscribe((data) => {
      this.pacientes = [...data];
      this.cd.detectChanges();
    });
  }

  editarPaciente(paciente: Paciente) {
    this.router.navigate([`/pacientes/edit/${paciente.id}`]);
  }

  eliminarPaciente(id: number) {
    this.pacienteService.eliminarPaciente(id).subscribe({
      next: () => {
        this.dialog
          .open(SuccessDialogComponent, {
            data: {
              titulo: 'Paciente eliminado',
              mensaje: 'El paciente se elimino exitosamente en la base de datos.',
              icono: 'delete',
              color: '#f44336',
            },
          })
          .afterClosed()
          .subscribe(() => {
            this.cargarPacientes();
          });
      },
      error: (err) => {
        console.error('Error al eliminar el paciente', err);
      },
    });
  }
}
