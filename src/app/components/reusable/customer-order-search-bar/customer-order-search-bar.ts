import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OrderStatus } from '../../../interfaces/orders/order-status';
import { EnumMappingService } from '../../../services/enum-mapping-service';

@Component({
  selector: 'app-customer-order-search-bar',
  imports: [],
  templateUrl: './customer-order-search-bar.html',
  styleUrl: './customer-order-search-bar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerOrderSearchBar {
  mapping_service = inject(EnumMappingService)

  getAllOptions()
  {
    return this.mapping_service.createList(OrderStatus)
  }
}
