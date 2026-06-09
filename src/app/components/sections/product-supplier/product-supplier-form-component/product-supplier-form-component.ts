import {ChangeDetectionStrategy, Component, effect, inject, input, output, signal} from '@angular/core';
import {ProductDropdownSelect} from '../../../reusable/product-dropdown-select/product-dropdown-select';
import {ProductService} from '../../../../services/product-service';
import {SupplierService} from '../../../../services/supplier-service';
import {Product} from '../../../../interfaces/product';
import {Supplier} from '../../../../interfaces/supplier/supplier';
import {SupplierDropdownSelect} from '../../../reusable/supplier-dropdown-select/supplier-dropdown-select';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {CreateProductSupplier} from '../../../../interfaces/product-supplier/create-product-supplier';
import {ProductSupplierService} from '../../../../services/product-supplier-service';
import {ResponseProductSupplier} from '../../../../interfaces/product-supplier/response-product-supplier';
import {UpdateProductSupplier} from '../../../../interfaces/product-supplier/update-product-supplier';
import {FieldError} from '../../../../directives/field-error';
import {FieldErrorBorder} from '../../../../directives/field-error-border';
import { ModalService } from '../../../../services/modal-service';
import { ModalNotification } from '../../../reusable/modal-notification/modal-notification';
import {Router} from '@angular/router';
import { ReturnService } from '../../../../services/return-service';

@Component({
  selector: 'app-product-supplier-form-component',
  imports: [
    ProductDropdownSelect,
    SupplierDropdownSelect,
    ReactiveFormsModule,
    FieldError,
    FieldErrorBorder
  ],
  templateUrl: './product-supplier-form-component.html',
  styleUrl: './product-supplier-form-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSupplierFormComponent {

  productService = inject(ProductService);
  supplierService = inject(SupplierService);
  productSupplierService = inject(ProductSupplierService);
  formBuilder = inject(FormBuilder);
  modal_service = inject(ModalService)
  return_service = inject(ReturnService)
  router = inject(Router);

  supplierList = signal<Supplier[]>([]);
  productsList = signal<Product[]>([]);

  productSupplierToModify = input<Partial<ResponseProductSupplier>>();
  isEditing = input.required<boolean>();

  productSupplierForm = this.formBuilder.group({
    product: this.formBuilder.control<number | null>(null),
    supplier: this.formBuilder.control<number | null>(null),
    cost: this.formBuilder.nonNullable.control<number>(0, [Validators.required, Validators.min(0.1)]),
    price: this.formBuilder.control<number>(0)
  });

  constructor() {

    this.getSuppliers();
    this.getProducts();

    effect(() => {
      if (this.productSupplierToModify()){
        this.productSupplierForm.get("supplier")?.patchValue(this.productSupplierToModify()?.idSupplier!)
        this.productSupplierForm.get("product")?.patchValue(this.productSupplierToModify()?.idProduct!)
        this.productSupplierForm.get("cost")?.patchValue(this.productSupplierToModify()?.cost!)
      }
    });

  }

  getProducts() {
    this.productService.getEnabledProducts().subscribe({
      next: (products) =>  { this.productsList.set(products) },
      error: (err) => {
        this.productsList.set([]);

        throw err;

      }
    });
  }

  getSuppliers() {
    this.supplierService.getAllSuppliersAsList().subscribe({
      next: (suppliers) =>  { this.supplierList.set(suppliers) },
      error: (err) => {
        this.supplierList.set([]);
        throw err
      }
    });
  }

  submit(){
    if(this.productSupplierToModify() === undefined){
      this.createProductSupplier();
    } else {
      this.updateProductSupplier();
    }
  }


  createProductSupplier() {

    const selectedProductId = this.productSupplierForm.get("product")?.value!;
    const selectedProduct = this.productsList().find(product => product.idProduct === this.productSupplierForm.get("product")?.value!);

    const productSupplierData: CreateProductSupplier  = {

      idProduct: selectedProductId,
      idSupplier: this.productSupplierForm.get('supplier')?.value!,
      cost: this.productSupplierForm.get("cost")?.value!,

      profitMargin: Number(Number(selectedProduct?.profitMargin ?? 0).toFixed(2)),
    };

    this.productSupplierService.createProductSupplier(productSupplierData).subscribe(
      {
        next: () => {
          this.productSupplierForm.reset();

          this.modal_service.showModal(ModalNotification, {
            title: "¡Relación cargada exitosamente!"
          })
        },
        error: (e) => {

          this.productSupplierForm.reset();
          throw e;
        }
      }
    );

  }

  updateProductSupplier(){
    const productSupplierData: UpdateProductSupplier  = {

      cost: this.productSupplierForm.get("cost")?.value!,
      profitMargin: Number(Number(this.productSupplierToModify()?.profitMargin ?? 0).toFixed(2)),
    };

    const idProductSupplier = Number(this.productSupplierToModify()?.idProductSupplier!)

    this.productSupplierService.updateProductSupplier(idProductSupplier, productSupplierData).subscribe(
      {
        next: () => {
          this.productSupplierForm.reset();

          this.modal_service.showModal(ModalNotification, {
            title: "¡Relación modificada exitosamente!"
          })?.subscribe({
            next: () => {
              this.goBack();
            }
          })
        },
        error: (e) => {
          throw e
        }
      }

    );

  }

  isDropDownInvalid():boolean{
    const product = this.productSupplierForm.get("product")?.value!;
    const supplier = this.productSupplierForm.get("supplier")?.value!;

    return product === null || supplier === null || isNaN(product) || isNaN(supplier);

  }

  isFormInvalid(){

    return this.isDropDownInvalid() || this.productSupplierForm.invalid;

  }

  goBack(){
    this.return_service.goBack()
  }

}
