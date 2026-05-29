import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { PacientesListComponent } from './component/pacientes/pacientesList/pacientesList.component';
import { PacientesCreateComponent } from './component/pacientes/pacientesCreate/pacientesCreate.component';
import { PacientesEditComponent } from './component/pacientes/pacientesEdit/pacientesEdit.component';
import { LoginComponent } from './component/users/login/login.component';
import { RegisterComponent } from './component/users/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegisterComponent},
  { path: 'pacientes', component: PacientesListComponent },
  { path: 'pacientes/create', component: PacientesCreateComponent },
  { path: 'pacientes/edit/:id', component: PacientesEditComponent }
];
