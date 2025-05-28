import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CustomerService } from '../../../core/services/customer.service';
import { CustomerDocType } from '../../../core/interfaces/customer';
import { FormValidator } from '../../../shared/utils/form-validator.util';

@Component({
  selector: 'app-save-customer-dlg',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './save-customer-dlg.component.html',
  styleUrl: './save-customer-dlg.component.scss'
})
export class SaveCustomerDlgComponent {
  customerForm = new FormGroup<any>({});
  formValidator!: FormValidator;
  private fb = inject(FormBuilder);
  private customerService = inject(CustomerService);
  private dialogRef = inject(MatDialogRef<SaveCustomerDlgComponent>)
  data = inject(MAT_DIALOG_DATA);

  documentType = CustomerDocType;

  ngOnInit(): void {
    this.initCustomerForm();
    console.log('Customer data:', this.data);
  }

  saveCustomer(): void {
    console.log('Customer form:', this.customerForm.value);
    if (this.data) {
      // Actualizar datos del cliente
      this.customerService.update(this.data.id, this.customerForm.value).subscribe(res => {
        if (res.status && res.data) {
          console.log('Update customer:', res);
          this.dialogRef.close(res.data);
        }
      })
    } else {
      // Registrar un nuevo cliente
      this.customerService.create(this.customerForm.value).subscribe(res => {
        if (res.status && res.data) {
          console.log('New customer:', res);
          this.dialogRef.close(res.data);
        }
      })
    }
  }

  private initCustomerForm(): void {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      documentType: [CustomerDocType.DNI, [Validators.required]],
      documentNumber: ['', [Validators.required]]
    });

    this.formValidator = new FormValidator(this.customerForm);

    if (this.data) {
      this.customerForm.patchValue(this.data);
    }
  }
}
