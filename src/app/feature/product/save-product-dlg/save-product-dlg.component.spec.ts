import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveProductDlgComponent } from './save-product-dlg.component';

describe('SaveProductDlgComponent', () => {
  let component: SaveProductDlgComponent;
  let fixture: ComponentFixture<SaveProductDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveProductDlgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveProductDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
