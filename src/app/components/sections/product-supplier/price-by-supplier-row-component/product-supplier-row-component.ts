import {ChangeDetectionStrategy, Component, inject, input, output} from '@angular/core';
import {ResponsePriceSupplier} from '../../../../interfaces/product-supplier/response-price-supplier';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ProductSupplierService} from "../../../../services/product-supplier-service";

@Component({
  selector: 'tr[app-price-by-supplier-row-component]',
  imports: [
    RouterLink
  ],
  templateUrl: './product-supplier-row-component.html',
  styleUrl: './product-supplier-row-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSupplierRowComponent {

  rowDeleted = output<boolean>();
  productSupplierService= inject(ProductSupplierService)

  productPrice = input.required<ResponsePriceSupplier>();
  productSupplierId = input.required<number | undefined>();

  deleteProductSupplier() {
    const id = this.productSupplierId();

    if (id !== undefined) {
      this.productSupplierService.deleteProductSupplier(id).subscribe({
        complete: () => {
          this.rowDeleted.emit(true);
        }
      })


    }
  }

}
