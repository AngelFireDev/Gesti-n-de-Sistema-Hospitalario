import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Paciente } from '../../../models/pacientes';
import { CommonModule } from '@angular/common';
import { PacienteService } from '../../../services/pacientesService';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../dialog';

@Component({
  selector: 'app-pacientes-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pacientesCreate.component.html',
  styleUrls: ['./pacientesCreate.component.css'],
})
export class PacientesCreateComponent {
  form: FormGroup;

  constructor(
    private router: Router,
    private pacienteService: PacienteService,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.form = this.fb.group({
      documento: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      telefono: [''],
      direccion: [''],
      email: ['', [Validators.email]],
      tipo_sangre: ['', Validators.required],
    });
  }

  guardarPaciente() {
    const nuevoPaciente: Paciente = {
      id: 0,
      documento: this.form.value.documento,
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      fecha_nacimiento: this.form.value.fecha_nacimiento,
      genero: this.form.value.genero,
      telefono: this.form.value.telefono,
      direccion: this.form.value.direccion,
      email: this.form.value.email,
      tipo_sangre: this.form.value.tipo_sangre,
    };
    this.pacienteService.createPacientes(nuevoPaciente).subscribe({
      next: () => {
        this.dialog
          .open(SuccessDialogComponent, {
            data: {
              titulo: 'Paciente guardado',
              mensaje: 'El paciente se guardó exitosamente en la base de datos.',
              icono: 'check_circle',
              color: '#4caf50',
            },
          })
          .afterClosed()
          .subscribe(() => {
            this.router.navigate(['/pacientes']).then(() => {
              window.location.reload();
            });
          });
      },
      error: (err) => {
        console.error('Error al crear paciente:', err);
      },
    });
  }
  
  cancelar() {
    this.router.navigate(['/pacientes']);
  }
}
