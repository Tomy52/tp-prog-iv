import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {Router} from '@angular/router';
import { AllowViewUser } from '../../../directives/allow-view-user';
import {Product} from '../../../interfaces/product';
import {ProductService} from '../../../services/product-service';
import {ProductStatus} from '../../../interfaces/productStatus';
import {NgClass} from '@angular/common';
import { ModalService } from '../../../services/modal-service';
import { ModalNotification } from '../modal-notification/modal-notification';

@Component({
  selector: 'app-product-list-card',
  imports: [AllowViewUser, NgClass],
  templateUrl: './product-list-card.html',
  styleUrl: './product-list-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListCard {
  productInfo = input.required<Product>();
  productService = inject(ProductService);
  router = inject(Router);
  modal_service = inject(ModalService)


  deleteProduct() {
    let ok_option = "Si"

    const modal = this.modal_service.showModal(ModalNotification, {
      title: `¿Realmente quiere dar de baja ${this.productInfo().name}?`,
      description: 'Tip: Esto eliminara todos los precios relacionados',
      options: [ok_option,"No"]
    })


    modal?.subscribe({
      next: (result) => {
        if(result == ok_option)
        {
          this.productService.deleteProduct(this.productInfo().idProduct).subscribe({
            next: () => window.location.reload(),
            error: (err) => {throw err}
          });
        }
      }
    })
  }

  updateProduct() {
    this.router.navigate(['/form-products', this.productInfo().idProduct]);
  }

  isDisabled() {
    return this.productInfo().status === ProductStatus.Disabled;
  }

  getPictureURL()
  {
    return this.productInfo().image_url != null ? this.productInfo().image_url : "/images/missing.png"
  }

  getPrice()
  {
    let text = "Precio venta: ";
    if(!this.productInfo().price) text = "No tiene precio de venta"
    if(this.productInfo().price) text += `$${this.productInfo().price}`


    return text
  }

  protected readonly ProductStatus = ProductStatus;
}
