import {ChangeDetectionStrategy, Component, effect, inject, input, output, signal, WritableSignal} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductService} from '../../../../services/product-service';
import {ProductStatus} from '../../../../interfaces/productStatus';
import {Product} from '../../../../interfaces/product';
import {FieldError} from '../../../../directives/field-error';
import {FieldErrorBorder} from '../../../../directives/field-error-border';
import { ModalService } from '../../../../services/modal-service';
import { ModalNotification } from '../../../reusable/modal-notification/modal-notification';
import { CategoryDropdownSelect } from "../../../reusable/category-dropdown-select/category-dropdown-select";
import { CategoryService } from '../../../../services/category-service';
import { Category } from '../../../../interfaces/category';

@Component({
  selector: 'app-product-form-component',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FieldError,
    FieldErrorBorder,
    CategoryDropdownSelect
],
  templateUrl: './product-form-component.html',
  styleUrl: './product-form-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  productService: ProductService = inject(ProductService);
  modal_service: ModalService = inject(ModalService);
  category_service: CategoryService = inject(CategoryService)


  modifiedProduct = input<Partial<Product>>();
  categories: WritableSignal<Category[]> = signal<Category[]>([]);

  productForm = this.formBuilder.group({
    name: this.formBuilder.nonNullable.control('',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    status: this.formBuilder.nonNullable.control(ProductStatus.Enabled),
    stock: this.formBuilder.nonNullable.control(0 as Number, [Validators.required, Validators.min(0)]),
    profit: this.formBuilder.nonNullable.control(0 as Number, [Validators.required, Validators.min(0)]),
    category: this.formBuilder.nonNullable.control(null as unknown, [Validators.required])
  });

  constructor() {
    effect(() => {
      if (this.modifiedProduct()) {
        this.productForm.get('name')?.patchValue(this.modifiedProduct()?.name ?? '');
        this.productForm.get('status')?.patchValue(this.modifiedProduct()?.status ?? ProductStatus.Enabled);
        this.productForm.get('stock')?.patchValue(this.modifiedProduct()?.stock ?? 0)
        this.productForm.get('profit')?.patchValue(this.modifiedProduct()?.profitMargin ?? 0)
        this.productForm.get('category')?.patchValue(this.modifiedProduct()?.category?.id ?? undefined)
      }
    });

    this.getCategories()
  }

  getCategories() {
    this.category_service.getAllCategoriesAsAList().subscribe({
      next: (resp) => {
        console.log(resp)
        this.categories.set(resp);
      },
      error: (err) => {
        throw err;
      }
    })
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
      status: ProductStatus.Enabled,
      stock: formInfo.stock,
      profitMargin: formInfo.profit,
      idCategory: formInfo.category
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
          throw err
        }
      }
    );
  }

  updateProduct() {
    const formInfo = this.productForm.value
    
    const product = this.modifiedProduct();
    console.log(formInfo)
    const updatedProduct = {
      idProduct: product?.idProduct,
      name: formInfo.name,
      stock: formInfo.stock,
      profitMargin: formInfo.profit,
      status: formInfo.status,
      idCategory: formInfo.category
    };

    this.productService.modifyProduct(updatedProduct).subscribe({
      next: () => {
          
        this.modal_service.showModal(ModalNotification, {
          title: "¡Modificación exitosa!"
        }, false)

      },
      error: (err) => {
        throw err
      }
    });
  }


  protected readonly productStatusEnum = ProductStatus;
}
