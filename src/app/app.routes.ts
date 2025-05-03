import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { ProductHomeComponent } from './feature/product/product-home/product-home.component';
import { CustomerHomeComponent } from './feature/customer/customer-home/customer-home.component';

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
                path: '',
                pathMatch: 'full',
                redirectTo: 'products'
            }
        ]
    }
];
