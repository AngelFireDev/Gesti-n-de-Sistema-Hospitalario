import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Paciente } from '../../../models/pacientes';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PacienteService } from '../../../services/pacientesService';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../dialog';

@Component({
  selector: 'app-pacientes-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pacientesEdit.component.html',
  styleUrls: ['./pacientesEdit.component.css']
})
export class PacientesEditComponent implements OnInit {
  form: FormGroup;
  pacienteId!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private dialog: MatDialog,
  ) {
    this.form = this.fb.group({
      documento: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tipo_sangre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.pacienteId = Number(this.route.snapshot.paramMap.get('id'));

    this.pacienteService.getPacienteById(this.pacienteId).subscribe(paciente => {
      this.form.patchValue({
        id: paciente.id ,
        documento: paciente.documento,
        nombre: paciente.nombre,
        apellido: paciente.apellido,
        fecha_nacimiento: paciente.fecha_nacimiento,
        genero: paciente.genero,
        telefono: paciente.telefono,
        direccion: paciente.direccion,
        email: paciente.email,
        tipo_sangre: paciente.tipo_sangre
      });
    });
  }

  guardarPaciente() {
    if (this.form.invalid) return;

    const pacienteActualizado: Paciente = {
      id : 0,
    documento: this.form.value.documento,
    nombre: this.form.value.nombre,
    apellido: this.form.value.apellido,
    fecha_nacimiento: this.form.value.fechaNacimiento,
    genero: this.form.value.genero,
    telefono: this.form.value.telefono,
    direccion: this.form.value.direccion,
    email: this.form.value.email,
    tipo_sangre: this.form.value.tipoSangre,
    edad: 0,
    diagnostico: "",
    };
    this.pacienteService.updatePaciente(this.pacienteId, pacienteActualizado).subscribe({
      next: () => {
        this.dialog.open(SuccessDialogComponent).afterClosed().subscribe(() => {
        this.router.navigate(['/pacientes']).then(() => {
          window.location.reload()
        }); 
      });
      },
      error: (err) => {
    console.error('Error al crear paciente:', err);
  }
});
  }


  cancelar() {
    this.router.navigate(['/pacientes']);
  }
}
