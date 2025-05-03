import { Component, inject, OnInit } from '@angular/core';
import { Order } from '../../../core/interfaces/order';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OrderService } from '../../../core/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-home',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './order-home.component.html',
  styleUrl: './order-home.component.scss'
})
export class OrderHomeComponent implements OnInit {
  columns: string[] = ['id', 'customer', 'saleDate', 'totalAmount', 'state'];
  dataSource: Order[] = [];

  private orderService = inject(OrderService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.getOrders();
  }

  navigateSaveOrder(row?: Order): void {
    const orderId = row?.id || 'save';
    if (row && orderId !== 'save') {
      this.orderService.selectedOrder = row;
    }
    this.router.navigate([orderId], {relativeTo: this.route}).then();
  }

  private getOrders(): void {
    this.orderService.getAll().subscribe(res => {
      if (res && res.data) {
        this.dataSource = res.data
      }
    })
  }

}
