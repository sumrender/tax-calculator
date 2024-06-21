import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tax-calculation-modal',
  templateUrl: './tax-calculation-modal.component.html',
  styleUrls: ['./tax-calculation-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule]
})
export class TaxCalculationModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { taxableIncome: number, tax: number }) { }
}
