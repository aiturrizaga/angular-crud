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

  downloadReport() {
    this.customerService.downloadReport().subscribe(res => {
      const blob = new Blob([res.body!], { type: res.body?.type });
      const contentDisposition = res.headers.get('Content-Disposition');
      let fileName = 'nombre_de_archivo';

      if (contentDisposition) {
        const matches = /filename="?([^"]+)"?/.exec(contentDisposition);
        if (matches?.[1]) {
          fileName = matches[1];
        }
      }

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(link.href);
    })
  }

}
