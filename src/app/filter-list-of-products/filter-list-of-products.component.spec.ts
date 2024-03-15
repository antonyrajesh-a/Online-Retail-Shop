import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterListOfProductsComponent } from './filter-list-of-products.component';

describe('FilterListOfProductsComponent', () => {
  let component: FilterListOfProductsComponent;
  let fixture: ComponentFixture<FilterListOfProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterListOfProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterListOfProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
