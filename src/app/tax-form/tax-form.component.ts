import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TaxCalculationModalComponent } from '../tax-calculation-modal/tax-calculation-modal.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorIconComponent } from '../error-icon/error-icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tax-form',
  templateUrl: './tax-form.component.html',
  styleUrls: ['./tax-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, ReactiveFormsModule, MatDialogModule, ErrorIconComponent
  ]
})
export class TaxFormComponent {
  taxForm: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.taxForm = this.fb.group({
      grossAnnualIncome: [null, [Validators.required, Validators.min(0)]],
      extraIncome: [null, [Validators.required, Validators.min(0)]],
      deductions: [null, [Validators.required, Validators.min(0)]],
      age: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.taxForm.valid) {
      const { grossAnnualIncome, extraIncome, deductions, age } = this.taxForm.value;
      const taxableIncome = grossAnnualIncome + extraIncome - deductions;
      let taxRate = 0;

      if (age === '<40') {
        taxRate = 0.3;
      } else if (age === '>=40&<60') {
        taxRate = 0.4;
      } else if (age === '>=60') {
        taxRate = 0.1;
      }

      const tax = taxableIncome > 800000 ? taxRate * (taxableIncome - 800000) : 0;

      console.log('taxRate: ', taxRate);
      console.log('taxable income: ', taxableIncome);
      console.log('tax: ', tax);

      this.dialog.open(TaxCalculationModalComponent, {
        data: {
          taxableIncome,
          tax
        }
      });
    }
  }
}
