import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { SaveCustomerDlgComponent } from '../save-customer-dlg/save-customer-dlg.component';
import { Customer } from '../../../core/interfaces/customer';
import { CustomerService } from '../../../core/services/customer.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-home',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './customer-home.component.html',
  styleUrl: './customer-home.component.scss'
})
export class CustomerHomeComponent {
  columns: string[] = ['name', 'lastname', 'documentType', 'documentNumber', 'state'];
  dataSource: Customer[] = [];

  customerService = inject(CustomerService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.customerService.getAll().subscribe(res => {
      console.log('Customer response:', res.data);
      this.dataSource = res.data;
    })
  }

  openCustomerDlg(customer?: Customer): void {
    const dialogRef = this.dialog.open(SaveCustomerDlgComponent, {
      width: '500px',
      data: customer
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getAll();
      }
    });
  }
}
