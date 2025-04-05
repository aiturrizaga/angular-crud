import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../interfaces/api-response';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<ApiResponse<Product[]>>('https://ms-catalogue.onrender.com/v1/products');
  }

}
