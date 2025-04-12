import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-save-product-dlg',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './save-product-dlg.component.html',
  styleUrl: './save-product-dlg.component.scss'
})
export class SaveProductDlgComponent implements OnInit {
  productForm = new FormGroup<any>({});
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private dialogRef = inject(MatDialogRef<SaveProductDlgComponent>)

  ngOnInit(): void {
    this.initProductForm();
  }

  saveProduct(): void {
    console.log('Form:', this.productForm.value);
    this.productService.create(this.productForm.value).subscribe(res => {
      if (res.status && res.data) {
        console.log('New product:', res);
        this.dialogRef.close(res.data);
      }
    })
  }

  private initProductForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      imageUrl: [''],
      currencyCode: ['PEN', [Validators.required]],
      price: [0, [Validators.required]]
    });
  }

}
