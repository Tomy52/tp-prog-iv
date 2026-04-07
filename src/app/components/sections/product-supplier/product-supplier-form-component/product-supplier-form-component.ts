import {ChangeDetectionStrategy, Component, effect, inject, input, signal} from '@angular/core';
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

  supplierList = signal<Supplier[]>([]);
  productsList = signal<Product[]>([]);

  productSupplierToModify = input<Partial<ResponseProductSupplier>>();
  isEditing = input.required<boolean>();



  productSupplierForm = this.formBuilder.group({
    product: this.formBuilder.control<number | null>(null),
    supplier: this.formBuilder.control<number | null>(null),
    cost: this.formBuilder.nonNullable.control<number>(0, [Validators.required, Validators.min(0.1)]),
    profitMargin: this.formBuilder.nonNullable.control<number>(0, [Validators.required, Validators.min(0.1)]),
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
        this.productSupplierForm.get("profitMargin")?.patchValue(this.productSupplierToModify()?.profitMargin!)
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

    const productSupplierData: CreateProductSupplier  = {
      idProduct: this.productSupplierForm.get("product")?.value!,
      idSupplier: this.productSupplierForm.get('supplier')?.value!,
      cost: this.productSupplierForm.get("cost")?.value!,
      profitMargin: this.productSupplierForm.get("profitMargin")?.value!,
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
      profitMargin: this.productSupplierForm.get("profitMargin")?.value!,
    };

    const idProductSupplier = Number(this.productSupplierToModify()?.idProductSupplier!)

    this.productSupplierService.updateProductSupplier(idProductSupplier, productSupplierData).subscribe(
      {
        next: () => {
          this.productSupplierForm.reset();

          this.modal_service.showModal(ModalNotification, {
            title: "¡Relación modificada exitosamente!"
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

}
