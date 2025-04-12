import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/interfaces/product';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-home',
  imports: [
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './product-home.component.html',
  styleUrl: './product-home.component.scss'
})
export class ProductHomeComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'description', 'currency', 'price', 'estado'];
  dataSource: Product[] = [];

  productService = inject(ProductService);

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.productService.getAll().subscribe(res => {
      console.log('Api response:', res.data);
      this.dataSource = res.data;
    })
  }
}
