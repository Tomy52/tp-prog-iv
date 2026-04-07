import {ChangeDetectionStrategy, Component, inject, signal, WritableSignal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductService} from '../../../../services/product-service';
import {Product} from '../../../../interfaces/product';
import {Subscription} from 'rxjs';
import {ProductDropdownSelect} from '../../../reusable/product-dropdown-select/product-dropdown-select';
import { ModalService } from '../../../../services/modal-service';
import { ModalNotification } from '../../../reusable/modal-notification/modal-notification';

@Component({
  selector: 'app-delete-product-form-component',
  imports: [
    ReactiveFormsModule,
    ProductDropdownSelect
  ],
  templateUrl: './delete-product-form-component.html',
  styleUrl: './delete-product-form-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteProductFormComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  productService: ProductService = inject(ProductService);
  modal_service: ModalService = inject(ModalService)

  products: WritableSignal<Product[]> = signal<Product[]>([]);
  


  constructor() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getEnabledProducts().subscribe(
      {
        next: (prodArr: Product[]) => this.products.set(prodArr),
        error: (err) => {
          this.products.set([]);
          throw err;
        }
      }
    );
  }

  deleteProductForm = this.formBuilder.group(
    {
      product: this.formBuilder.control<number | null>(null)
    }
  );


  deleteProduct(): Subscription | void {
    const formInfo = this.deleteProductForm.value;
    const idProduct = formInfo.product;

    // para que no se queje
    if (!idProduct) {
      return;
    }

    let option_ok = "Si"

    const modal_promise = this.modal_service.showModal(ModalNotification,{
      title: "¿Está seguro de dar de baja el producto?",
      options: [option_ok,"No"]
    })


    modal_promise?.subscribe((result) => {

      if (result == option_ok) {
        this.productService.deleteProduct(idProduct).subscribe(
          {
            next: () => {

              this.modal_service.showModal(ModalNotification, {
                title: "¡Cambio hecho exitosamente!"
              }, false)

              this.deleteProductForm.markAsPristine();
              this.deleteProductForm.reset();
              this.getProducts();
            },
            error: (err) => {
              throw err;
            }
          }
        );
      }

    })
  }

  formIsInvalid(): boolean {
    const product = this.deleteProductForm.value.product!;
    return product === null || isNaN(product);
  }
}
