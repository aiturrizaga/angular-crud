import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../interfaces/api-response';
import { Order, SaveOrder, SaveOrderDetail } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  selectedOrder: Order | null = null;

  getAll() {
    return this.http.get<ApiResponse<Order[]>>(`${environment.api}/v1/orders?active=true&state=CREATED`);
  }

  create(request: SaveOrder) {
    return this.http.post<ApiResponse<Order>>(`${environment.api}/v1/orders`, request);
  }

  getById(orderId: number) {
    return this.http.get<ApiResponse<Order>>(`${environment.api}/v1/orders/${orderId}`);
  }

  addDetail(orderId: number, request: SaveOrderDetail) {
    return this.http.post<ApiResponse<Order>>(`${environment.api}/v1/orders/${orderId}/details`, request);
  }

  removeDetail(orderId: number, detailId: number) {
    return this.http.delete<ApiResponse<Order>>(`${environment.api}/v1/orders/${orderId}/details/${detailId}`);
  }

}
