import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbarCategoryComponent } from './searchbar-category.component';

describe('SearchbarCategoryComponent', () => {
  let component: SearchbarCategoryComponent;
  let fixture: ComponentFixture<SearchbarCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchbarCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchbarCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
