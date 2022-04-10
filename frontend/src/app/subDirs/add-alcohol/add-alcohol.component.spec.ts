import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlcoholComponent } from './add-alcohol.component';

describe('AddAlcoholComponent', () => {
  let component: AddAlcoholComponent;
  let fixture: ComponentFixture<AddAlcoholComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAlcoholComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAlcoholComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
