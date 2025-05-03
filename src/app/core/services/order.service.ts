import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../interfaces/api-response';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<ApiResponse<Order[]>>(`${environment.api}/v1/orders?active=true&state=CREATED`);
  }
}
