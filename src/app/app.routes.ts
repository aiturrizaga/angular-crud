import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { ProductHomeComponent } from './feature/product/product-home/product-home.component';
import { CustomerHomeComponent } from './feature/customer/customer-home/customer-home.component';
import { OrderHomeComponent } from './feature/order/order-home/order-home.component';
import { SaveOrderComponent } from './feature/order/save-order/save-order.component';
import { LoginComponent } from './feature/auth/login/login.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: LoginComponent
    },
    {
        path: 'console',
        component: AdminLayoutComponent,
        children: [
            {
                path: 'products',
                title: 'Productos',
                component: ProductHomeComponent
            },
            {
                path: 'customers',
                title: 'Clientes',
                component: CustomerHomeComponent
            },
            {
                path: 'orders',
                title: 'Ventas',
                component: OrderHomeComponent
            },
            {
                path: 'orders/:id',
                title: 'Detalle de venta',
                component: SaveOrderComponent
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'products'
            }
        ]
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'auth'
    }
];
