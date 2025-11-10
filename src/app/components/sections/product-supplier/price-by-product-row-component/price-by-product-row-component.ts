import {ChangeDetectionStrategy, Component, inject, input, output} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ResponsePriceProduct} from '../../../../interfaces/product-supplier/response-price-product';
import {ProductSupplierService} from '../../../../services/product-supplier-service';

@Component({
  selector: 'tr[app-price-by-product-row-component]',
  imports: [
    RouterLink
  ],
  templateUrl: './price-by-product-row-component.html',
  styleUrl: './price-by-product-row-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriceByProductRowComponent {

  productSupplierService = inject(ProductSupplierService)

  productPrice = input.required<ResponsePriceProduct>();
  productSupplierId = input.required<number | undefined>();

  rowDeleted = output<boolean>();

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
