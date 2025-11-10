import {Component, inject, input} from '@angular/core';
import {Router} from '@angular/router';
import { AllowViewUser } from '../../../directives/allow-view-user';
import {Product} from '../../../interfaces/product';
import {ProductService} from '../../../services/product-service';
import {ProductStatus} from '../../../interfaces/productStatus';

@Component({
  selector: 'app-product-list-card',
  imports: [AllowViewUser],
  templateUrl: './product-list-card.html',
  styleUrl: './product-list-card.css'
})
export class ProductListCard {
  productInfo = input.required<Product>();
  productService = inject(ProductService);
  router = inject(Router);


  deleteProduct() {
    this.productService.deleteProduct(this.productInfo().idProduct).subscribe({
      next: () => window.location.reload(),
      error: () => console.error('Error borrando el producto')
    });
  }

  updateProduct() {
    this.router.navigate(['/form-products', this.productInfo().idProduct]);
  }

  protected readonly ProductStatus = ProductStatus;
}
