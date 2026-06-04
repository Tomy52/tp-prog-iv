import {ChangeDetectionStrategy, Component, effect, HostListener, inject, input, output, signal} from '@angular/core';
import {ResponsePriceSupplier} from '../../../../interfaces/product-supplier/response-price-supplier';
import {RouterLink} from "@angular/router";
import {ProductSupplierService} from "../../../../services/product-supplier-service";
import {AllowViewUser} from '../../../../directives/allow-view-user';

@Component({
  selector: 'app-price-by-supplier-row-component',
  imports: [
    RouterLink,
    AllowViewUser
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
