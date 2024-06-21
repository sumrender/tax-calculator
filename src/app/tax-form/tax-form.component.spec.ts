import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TaxFormComponent } from './tax-form.component';
import { TaxCalculationModalComponent } from '../tax-calculation-modal/tax-calculation-modal.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ErrorIconComponent } from '../error-icon/error-icon.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';

describe('TaxFormComponent', () => {
  let component: TaxFormComponent;
  let fixture: ComponentFixture<TaxFormComponent>;
  let dialogSpy: jasmine.Spy;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        ErrorIconComponent
      ],
      declarations: [TaxFormComponent],
      providers: [
        {
          provide: MatDialog,
          useValue: {
            open: jasmine.createSpy('open')
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxFormComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    dialogSpy = dialog.open as jasmine.Spy;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when all fields are filled correctly', () => {
    component.taxForm.setValue({
      grossAnnualIncome: 1000000,
      extraIncome: 200000,
      deductions: 100000,
      age: '<40'
    });
    expect(component.taxForm.valid).toBeTrue();
  });

  it('should have an invalid form when required fields are empty', () => {
    component.taxForm.setValue({
      grossAnnualIncome: null,
      extraIncome: null,
      deductions: null,
      age: null
    });
    expect(component.taxForm.valid).toBeFalse();
  });

  it('should display error messages when form is invalid', () => {
    component.taxForm.setValue({
      grossAnnualIncome: null,
      extraIncome: null,
      deductions: null,
      age: null
    });
    fixture.detectChanges();

    const grossAnnualIncomeError: DebugElement = fixture.debugElement.query(By.css('mat-error'));
    expect(grossAnnualIncomeError).toBeTruthy();
  });

  it('should calculate tax correctly for age <40', () => {
    component.taxForm.setValue({
      grossAnnualIncome: 4000000,
      extraIncome: 0,
      deductions: 0,
      age: '<40'
    });

    component.onSubmit();
    const expectedTaxableIncome = 4000000;
    const expectedTax = 0.3 * (4000000 - 800000);

    expect(dialogSpy).toHaveBeenCalledWith(TaxCalculationModalComponent, {
      data: { taxableIncome: expectedTaxableIncome, tax: expectedTax }
    });
  });

  it('should calculate tax correctly for age >=40 & <60', () => {
    component.taxForm.setValue({
      grossAnnualIncome: 4000000,
      extraIncome: 0,
      deductions: 0,
      age: '>=40&<60'
    });

    component.onSubmit();
    const expectedTaxableIncome = 4000000;
    const expectedTax = 0.4 * (4000000 - 800000);

    expect(dialogSpy).toHaveBeenCalledWith(TaxCalculationModalComponent, {
      data: { taxableIncome: expectedTaxableIncome, tax: expectedTax }
    });
  });

  it('should calculate tax correctly for age >=60', () => {
    component.taxForm.setValue({
      grossAnnualIncome: 4000000,
      extraIncome: 0,
      deductions: 0,
      age: '>=60'
    });

    component.onSubmit();
    const expectedTaxableIncome = 4000000;
    const expectedTax = 0.1 * (4000000 - 800000);

    expect(dialogSpy).toHaveBeenCalledWith(TaxCalculationModalComponent, {
      data: { taxableIncome: expectedTaxableIncome, tax: expectedTax }
    });
  });

  it('should not calculate tax if taxable income is less than or equal to 800000', () => {
    component.taxForm.setValue({
      grossAnnualIncome: 700000,
      extraIncome: 100000,
      deductions: 0,
      age: '<40'
    });

    component.onSubmit();
    const expectedTaxableIncome = 800000;
    const expectedTax = 0;

    expect(dialogSpy).toHaveBeenCalledWith(TaxCalculationModalComponent, {
      data: { taxableIncome: expectedTaxableIncome, tax: expectedTax }
    });
  });

  it('should disable the submit button if the form is invalid', () => {
    component.taxForm.setValue({
      grossAnnualIncome: null,
      extraIncome: null,
      deductions: null,
      age: null
    });
    fixture.detectChanges();

    const submitButton: HTMLButtonElement = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(submitButton.disabled).toBeTrue();
  });

  it('should enable the submit button if the form is valid', () => {
    component.taxForm.setValue({
      grossAnnualIncome: 1000000,
      extraIncome: 200000,
      deductions: 100000,
      age: '<40'
    });
    fixture.detectChanges();

    const submitButton: HTMLButtonElement = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(submitButton.disabled).toBeFalse();
  });
});
