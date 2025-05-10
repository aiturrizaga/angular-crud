import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CustomerService } from '../../../core/services/customer.service';
import { Customer } from '../../../core/interfaces/customer';
import { MatTableModule } from '@angular/material/table';
import { OrderDetail } from '../../../core/interfaces/order';
import { OrderService } from '../../../core/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddOrderDetailComponent } from '../add-order-detail/add-order-detail.component';

@Component({
  selector: 'app-save-order',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    ReactiveFormsModule
  ],
  templateUrl: './save-order.component.html',
  styleUrl: './save-order.component.scss'
})
export class SaveOrderComponent implements OnInit {
  id: any;
  customers: Customer[] = [];
  orderDetails: OrderDetail[] = [];
  columns: string[] = ['id', 'product', 'quantity', 'price', 'total', 'action'];
  orderForm = new FormGroup<any>({});
  private fb = inject(FormBuilder);
  private customerService = inject(CustomerService);
  private orderService = inject(OrderService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getCustomers();
    this.initOrderForm();

    this.route.params.subscribe(param => {
      this.id = param['id'];
      this.getOrderDetails();
    });
  }

  createOrder(): void {
    this.orderService.create(this.orderForm.value).subscribe(res => {
      if (res && res.data) {
        this.router.navigate(['/orders', res.data.id]).then();
      }
    });
  }

  openAddDetailDlg(): void {
    const dialogRef = this.dialog.open(AddOrderDetailComponent, {
      data: {
        orderId: this.id
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getOrderDetails();
      }
    })
  }

  private getOrderDetails(): void {
    this.orderService.getById(this.id).subscribe(res => {
      if (res && res.data) {
        this.orderDetails = res.data.details;
      }
    })
  }

  private getCustomers(): void {
    this.customerService.getAll().subscribe(res => {
      if (res && res.data) {
        this.customers = res.data;
      }
    })
  }

  private initOrderForm(): void {
    this.orderForm = this.fb.group({
      customerId: ['', [Validators.required]],
      saleDate: ['']
    })

    if (this.id && this.id !== 'save') {
      this.orderForm.patchValue({
        customerId: this.orderService.selectedOrder?.customer.id,
        saleDate: this.orderService.selectedOrder?.saleDate
      })
    }
  }

}
