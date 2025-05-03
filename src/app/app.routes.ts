import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { ProductHomeComponent } from './feature/product/product-home/product-home.component';
import { CustomerHomeComponent } from './feature/customer/customer-home/customer-home.component';
import { OrderHomeComponent } from './feature/order/order-home/order-home.component';
import { SaveOrderComponent } from './feature/order/save-order/save-order.component';

export const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: 'products',
                component: ProductHomeComponent
            },
            {
                path: 'customers',
                component: CustomerHomeComponent
            },
            {
                path: 'orders',
                component: OrderHomeComponent
            },
            {
                path: 'orders/:id',
                component: SaveOrderComponent
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'products'
            }
        ]
    }
];
