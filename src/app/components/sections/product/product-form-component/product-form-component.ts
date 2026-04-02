import {ChangeDetectionStrategy, Component, effect, inject, input, output, signal, WritableSignal} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductService} from '../../../../services/product-service';
import {ProductStatus} from '../../../../interfaces/productStatus';
import {Product} from '../../../../interfaces/product';
import {FieldError} from '../../../../directives/field-error';
import {FieldErrorBorder} from '../../../../directives/field-error-border';
import { ModalService } from '../../../../services/modal-service';
import { ModalNotification } from '../../../reusable/modal-notification/modal-notification';

@Component({
  selector: 'app-product-form-component',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FieldError,
    FieldErrorBorder
  ],
  templateUrl: './product-form-component.html',
  styleUrl: './product-form-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  productService: ProductService = inject(ProductService);
  modal_service: ModalService = inject(ModalService);

  modifiedProduct = input<Partial<Product>>();

  productForm = this.formBuilder.group({
    name: this.formBuilder.nonNullable.control('',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    status: this.formBuilder.nonNullable.control(ProductStatus.Enabled)
  });

  constructor() {
    effect(() => {
      if (this.modifiedProduct()) {
        this.productForm.get('name')?.patchValue(this.modifiedProduct()?.name ?? '');
        this.productForm.get('status')?.patchValue(this.modifiedProduct()?.status ?? ProductStatus.Enabled);
      }
    });
  }

  submit() {
    let ok_option = 'Si'
    const modal_promise = this.modal_service.showModal(ModalNotification,{
      title: "¿Está seguro de que desea continuar?",
      options: [ok_option, 'No']
    })

    modal_promise?.subscribe((value) => {
      
      if (ok_option == value) {
        if (this.modifiedProduct() == undefined) {
          this.addProduct();
        } else {
          this.updateProduct();
        }


      }
    })


  }

  addProduct() {
    const formInfo = this.productForm.value;
    const product = {
      name: formInfo.name,
      status: ProductStatus.Enabled
    };

    this.productService.addProduct(product).subscribe(
      {
        next: () => {

          this.modal_service.showModal(ModalNotification, {
            title: "¡Carga exitosa!"
          }, false)

          this.productForm.markAsPristine();
          this.productForm.reset();
        },
        error: (err) => {

          this.modal_service.showModal(ModalNotification, {
            title: "No se pudo completar la carga del producto"
          }, false)
        }
      }
    );
  }

  updateProduct() {
    const formInfo = this.productForm.value;
    const product = this.modifiedProduct();

    const updatedProduct = {
      idProduct: product?.idProduct,
      name: formInfo.name,
      status: formInfo.status
    };

    this.productService.modifyProduct(updatedProduct).subscribe({
      next: () => {
          
        this.modal_service.showModal(ModalNotification, {
          title: "¡Modificación exitosa!"
        }, false)

      },
      error: (err) => {
        this.modal_service.showModal(ModalNotification, {
          title: "No se pudo completar la modificación del producto"
        }, false)

      }
    });
  }


  protected readonly productStatusEnum = ProductStatus;
}
