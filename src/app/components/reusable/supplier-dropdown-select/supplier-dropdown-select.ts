import {Component, inject, input} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {SupplierService} from '../../../services/supplier-service';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-supplier-dropdown-select',
  imports: [ReactiveFormsModule],
  templateUrl: './supplier-dropdown-select.html',
  styleUrl: './supplier-dropdown-select.css'
})
export class SupplierDropdownSelect {
  suppliers_service = inject(SupplierService);

  form_control_name = input.required<string>();
  suppliers = toSignal(this.suppliers_service.getAllSuppliersAsList());
}
