import {Component, input} from '@angular/core';
import {Supplier} from '../../../../interfaces/supplier/supplier';

@Component({
  selector: 'app-supplier-table-list',
  imports: [],
  templateUrl: './supplier-table-list.html',
  styleUrl: './supplier-table-list.css'
})
export class SupplierTableList {
  suppliers = input.required<Supplier>();

}
