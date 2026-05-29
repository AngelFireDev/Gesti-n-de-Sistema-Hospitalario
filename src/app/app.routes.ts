import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { PacientesListComponent } from './component/pacientes/pacientesList/pacientesList.component';
import { PacientesCreateComponent } from './component/pacientes/pacientesCreate/pacientesCreate.component';
import { PacientesEditComponent } from './component/pacientes/pacientesEdit/pacientesEdit.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'pacientes', component: PacientesListComponent },
  { path: 'pacientes/create', component: PacientesCreateComponent },
  { path: 'pacientes/edit', component: PacientesEditComponent }
];
