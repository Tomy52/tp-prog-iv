import { ChangeDetectionStrategy, Component, inject, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { OrderStatus } from '../../../interfaces/orders/order-status';
import { EnumMappingService } from '../../../services/enum-mapping-service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CustomerOrderSearchData } from '../../../interfaces/component-logic/customer-order-search-data';

@Component({
  selector: 'app-customer-order-search-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './customer-order-search-bar.html',
  styleUrls: ['./customer-order-search-bar.css','../styles/search-bar-styles.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerOrderSearchBar implements OnChanges {
  mapping_service = inject(EnumMappingService)
  form_builder = inject(FormBuilder)
  disabled = input.required<boolean>()

  query_sig = output<CustomerOrderSearchData>();

  form = this.form_builder.group({
    status: ['']
  })

  submit()
  {
    const values = this.form.value;

    const query:CustomerOrderSearchData = {
      status: values.status!
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
