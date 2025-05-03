import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Customer, SaveCustomer } from '../interfaces/customer';
import { ApiResponse } from '../interfaces/api-response';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private http = inject(HttpClient);

    getAll() {
      return this.http.get<ApiResponse<Customer[]>>(`${environment.api}/v1/customers?active=true`);
    }
  
    create(request: SaveCustomer) {
      return this.http.post<ApiResponse<Customer>>(`${environment.api}/v1/customers`, request);
    }
  
    update(id: number, request: SaveCustomer) {
      return this.http.put<ApiResponse<Customer>>(`${environment.api}/v1/customers/${id}`, request);
    }
}
