import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../interfaces/api-response';
import { Product, SaveProduct } from '../interfaces/product';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<ApiResponse<Product[]>>(`${environment.api}/v1/products?active=true`);
  }

  create(request: SaveProduct) {
    return this.http.post<ApiResponse<Product>>(`${environment.api}/v1/products`, request);
  }

  update(id: number, request: SaveProduct) {
    return this.http.put<ApiResponse<Product>>(`${environment.api}/v1/products/${id}`, request);
  }

  inactive(id: number) {
    return this.http.delete<ApiResponse<any>>(`${environment.api}/v1/products/${id}/inactive`);
  }

}
