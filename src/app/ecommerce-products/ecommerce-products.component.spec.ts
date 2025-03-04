import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceProductsComponent } from './ecommerce-products.component';

describe('EcommerceProductsComponent', () => {
  let component: EcommerceProductsComponent;
  let fixture: ComponentFixture<EcommerceProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EcommerceProductsComponent]
    });
    fixture = TestBed.createComponent(EcommerceProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
