import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: 
  [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form:FormGroup;

  constructor
  (
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      usuario:['',Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {

  }

}
