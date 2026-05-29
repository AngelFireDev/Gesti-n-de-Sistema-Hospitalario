import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Paciente } from '../../../models/pacientes';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PacienteService } from '../../../services/pacientesService';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../dialog';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private dialog: MatDialog,
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      rol: ['', Validators.required],
    });
  }

  guardarUsuario() {
   
  }
}
