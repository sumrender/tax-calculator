import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaxFormComponent } from './tax-form/tax-form.component';
import { ErrorIconComponent } from './error-icon/error-icon.component';
import { TaxCalculationModalComponent } from './tax-calculation-modal/tax-calculation-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BrowserAnimationsModule, CommonModule, RouterOutlet, TaxFormComponent, ErrorIconComponent, TaxCalculationModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-app';
}
