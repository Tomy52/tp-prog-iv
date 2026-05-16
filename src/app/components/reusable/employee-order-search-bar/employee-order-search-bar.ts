import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { EnumMappingService } from '../../../services/enum-mapping-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerOrderSearchData } from '../../../interfaces/component-logic/customer-order-search-data';
import { OrderStatus } from '../../../interfaces/orders/order-status';
import { EmployeeOrderSearchData } from '../../../interfaces/component-logic/employee-order-search-data';

@Component({
  selector: 'app-employee-order-search-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './employee-order-search-bar.html',
  styleUrl: './employee-order-search-bar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeOrderSearchBar {
  mapping_service = inject(EnumMappingService)
  form_builder = inject(FormBuilder)
  disabled = input.required<boolean>()

  query_sig = output<EmployeeOrderSearchData>();

  form = this.form_builder.group({
    status: [''],
    dni: ['',[Validators.maxLength(10)]]
  })

  submit()
  {
    const values = this.form.value;

    const query:EmployeeOrderSearchData = {
      status: values.status!,
      dni: values.dni!
    }


    this.query_sig.emit(query)
  }

  getAllOptions()
  {
    return this.mapping_service.createList(OrderStatus)
  }

  ngOnChanges(): void {
    this.disabled() ? this.form.disable() : this.form.enable()
  }
}
