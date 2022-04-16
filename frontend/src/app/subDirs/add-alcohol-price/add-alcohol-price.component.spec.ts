import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlcoholPriceComponent } from './add-alcohol-price.component';

describe('AddAlcoholPriceComponent', () => {
  let component: AddAlcoholPriceComponent;
  let fixture: ComponentFixture<AddAlcoholPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAlcoholPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAlcoholPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
