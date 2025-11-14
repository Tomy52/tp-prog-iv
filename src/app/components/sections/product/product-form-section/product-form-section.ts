import {ChangeDetectionStrategy, Component, inject, input, OnInit} from '@angular/core';
import {ProductService} from '../../../../services/product-service';
import {Product} from '../../../../interfaces/product';
import {ProductFormComponent} from '../product-form-component/product-form-component';

@Component({
  selector: 'app-product-form-section',
  imports: [
    ProductFormComponent
  ],
  templateUrl: './product-form-section.html',
  styleUrl: './product-form-section.css'
})
export class ProductFormSection implements OnInit {
  productService = inject(ProductService);

  id = input<string>();

  productObject?: Partial<Product>;

  ngOnInit() {
    if (this.id()) {
      const id = Number(this.id()!);
      this.productService.getProductById(id).subscribe({
        next: (prod) => this.productObject = prod,
        error: () => console.error("El id no es válido")
      });
    }
  }
}
