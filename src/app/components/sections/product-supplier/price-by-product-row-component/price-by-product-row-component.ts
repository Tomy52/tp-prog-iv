import {ChangeDetectionStrategy, Component, effect, HostListener, inject, input, output, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ResponsePriceProduct} from '../../../../interfaces/product-supplier/response-price-product';
import {ProductSupplierService} from '../../../../services/product-supplier-service';
import {AllowViewUser} from '../../../../directives/allow-view-user';

@Component({
  selector: 'tr[app-price-by-product-row-component]',
  imports: [
    RouterLink,
    AllowViewUser
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

  private windowWidth = signal(window.innerWidth);
  isExpanded = signal<boolean>(false);

  constructor() {
    effect(() => {
      const width = this.windowWidth();
      if (width > 768 && this.isExpanded()) {
        this.isExpanded.set(false);
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.windowWidth.set((event.target as Window).innerWidth);
  }

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

  protected toggleDetails() {
    this.isExpanded.update(value => !value);
  }

}
