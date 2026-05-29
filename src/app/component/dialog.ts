import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-success-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,MatIconModule],
  template: `
      <div class="dialog-header">
      <mat-icon class="icon-success">check_circle</mat-icon>
      <h2 class="title">Paciente guardado</h2>
    </div>

    <mat-dialog-content class="mat-typography">
      <p>El paciente se guardó exitosamente en la base de datos.</p>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-raised-button color="primary" (click)="cerrar()">
        <mat-icon>done</mat-icon> Aceptar
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-header {
      display: flex;
      align-items: center;
      background-color: #4caf50;
      color: white;
      padding: 12px;
    }
    .icon-success {
      margin-right: 8px;
    }
    .title {
      margin: 0;
      font-weight: bold;
    }
  `]
})
export class SuccessDialogComponent {
  constructor(private dialogRef: MatDialogRef<SuccessDialogComponent>) {}
  cerrar() {
    this.dialogRef.close();
  }
}