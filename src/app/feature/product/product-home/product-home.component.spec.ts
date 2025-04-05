import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductHomeComponent } from './product-home.component';

describe('ProductHomeComponent', () => {
  let component: ProductHomeComponent;
  let fixture: ComponentFixture<ProductHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
