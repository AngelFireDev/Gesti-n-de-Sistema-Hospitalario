import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface DialogData {
  titulo: string;
  mensaje: string;
  icono: string;
  color: string;
}

@Component({
  selector: 'app-success-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="dialog-header" [style.background-color]="data.color">
      <mat-icon class="icon">{{data.icono}}</mat-icon>
      <h2 class="title">{{data.titulo}}</h2>
    </div>

    <mat-dialog-content class="mat-typography">
      <p>{{data.mensaje}}</p>
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
      color: white;
      padding: 12px;
    }
    .icon {
      margin-right: 8px;
    }
    .title {
      margin: 0;
      font-weight: bold;
    }
  `]
})
export class SuccessDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<SuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  cerrar() {
    this.dialogRef.close();
  }
}
