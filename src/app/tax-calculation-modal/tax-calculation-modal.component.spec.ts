import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaxCalculationModalComponent } from './tax-calculation-modal.component';


describe('TaxCalculationModalComponent', () => {
  let component: TaxCalculationModalComponent;
  let fixture: ComponentFixture<TaxCalculationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxCalculationModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaxCalculationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
