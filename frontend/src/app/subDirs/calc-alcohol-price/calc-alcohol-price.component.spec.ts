import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcAlcoholPriceComponent } from './calc-alcohol-price.component';

describe('CalcAlcoholPriceComponent', () => {
  let component: CalcAlcoholPriceComponent;
  let fixture: ComponentFixture<CalcAlcoholPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcAlcoholPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcAlcoholPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
