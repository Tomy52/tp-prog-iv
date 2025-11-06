import {Component, input} from '@angular/core';
import {Supplier} from '../../../interfaces/supplier/supplier';

@Component({
  selector: 'app-supplier-list-card',
  imports: [],
  templateUrl: './supplier-list-card.html',
  styleUrl: './supplier-list-card.css'
})
export class SupplierListCard {
  supplier_info = input.required<Supplier>();
}
