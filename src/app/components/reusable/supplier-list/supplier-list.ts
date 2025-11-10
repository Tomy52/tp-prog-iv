import {Component, input} from '@angular/core';
import {Supplier} from '../../../interfaces/supplier/supplier';
import {SupplierListCard} from '../supplier-list-card/supplier-list-card';

@Component({
  selector: 'app-supplier-list',
  imports: [
    SupplierListCard
  ],
  templateUrl: './supplier-list.html',
  styleUrl: './supplier-list.css'
})
export class SupplierList {
  suppliers = input.required<Supplier[]>();
}
