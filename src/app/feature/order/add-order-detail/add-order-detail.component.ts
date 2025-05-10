import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/interfaces/product';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../../core/services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from '../../../core/interfaces/order';
import { FormValidator } from '../../../shared/utils/form-validator.util';

const CUSTOM_ERROR_MESSAGES = {
  product: {
    required: 'Selecciona el producto'
  },
  quantity: {
    required: 'Ingrese la cantidad'
  }
}

@Component({
  selector: 'app-add-order-detail',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-order-detail.component.html',
  styleUrl: './add-order-detail.component.scss'
})
export class AddOrderDetailComponent implements OnInit {
  productService = inject(ProductService);
  products: Product[] = [];
  form!: FormGroup;
  formValidator!: FormValidator;
  data = inject<{orderId: number}>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AddOrderDetailComponent>);
  private orderService = inject(OrderService);
  private snackbar = inject(MatSnackBar);

  ngOnInit(): void {
    this.initForm();
    this.getProducts();
  }

  getProducts() {
    this.productService.getAll().subscribe(res => {
      if (res && res.data) {
        this.products = res.data;
      }
    })
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.orderService.addDetail(this.data.orderId, this.form.value).subscribe(res => {
      if (res && res.data) {
        this.snackbar.open('Se agrego el producto', 'Cerrar', {duration: 2000});
        this.closeDlg(res.data);
      }
    })
  }

  initForm(): void {
    this.form = this.fb.group({
      product: [null, [Validators.required]],
      quantity: [1, [Validators.required, Validators.min(1), Validators.max(100)]]
    });

    this.formValidator = new FormValidator(this.form, CUSTOM_ERROR_MESSAGES);
  }

  closeDlg(res?: Order) {
    this.dialogRef.close(res);
  }

}
