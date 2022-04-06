import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcoholSmallComponent } from './alcohol-small.component';

describe('AlcoholSmallComponent', () => {
  let component: AlcoholSmallComponent;
  let fixture: ComponentFixture<AlcoholSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlcoholSmallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlcoholSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
