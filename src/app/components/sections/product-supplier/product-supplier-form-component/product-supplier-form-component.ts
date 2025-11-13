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

@Component({
  selector: 'app-product-supplier-form-component',
  imports: [
    ProductDropdownSelect,
    SupplierDropdownSelect,
    ReactiveFormsModule
  ],
  templateUrl: './product-supplier-form-component.html',
  styleUrl: './product-supplier-form-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSupplierFormComponent {

  productService = inject(ProductService);
  supplierService = inject(SupplierService);
  productSupplierService = inject(ProductSupplierService);
  formBuilder = inject(FormBuilder)

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
  })

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
        alert(`${err.error}`);
      }
    })
  }

  getSuppliers() {
    this.supplierService.getAllSuppliersAsList().subscribe({
      next: (suppliers) =>  { this.supplierList.set(suppliers) },
      error: (err) => {
        this.supplierList.set([]);
        alert(`${err.error}`);
      }
    })
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
    }

    console.log(productSupplierData);

    this.productSupplierService.createProductSupplier(productSupplierData).subscribe(
      {
        next: () => {
          this.productSupplierForm.reset();
        },
        error: (err) => {
          alert(`${err.error}`);
          this.productSupplierForm.reset();
        }
      }
    );

  }

  updateProductSupplier(){
    const productSupplierData: UpdateProductSupplier  = {

      cost: this.productSupplierForm.get("cost")?.value!,
      profitMargin: this.productSupplierForm.get("profitMargin")?.value!,
    }

    const idProductSupplier = Number(this.productSupplierToModify()?.idProductSupplier!)

    this.productSupplierService.updateProductSupplier(idProductSupplier, productSupplierData).subscribe(
      {
        next: () => {
          this.productSupplierForm.reset()
        },
        error: (err) => {
          alert(`${err.error}`);
        }
      }

    )

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
