import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {ProductDropdownSelect} from '../../../reusable/product-dropdown-select/product-dropdown-select';
import {ProductService} from '../../../../services/product-service';
import {ProductSupplierService} from '../../../../services/product-supplier-service';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Product} from '../../../../interfaces/product';
import {PriceByProductList} from '../../../../interfaces/product-supplier/price-by-product-list';
import {PriceByProductRowComponent} from '../price-by-product-row-component/price-by-product-row-component';

@Component({
  selector: 'app-price-list-by-product-component',
  imports: [
    ProductDropdownSelect,
    PriceByProductRowComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './price-list-by-product-component.html',
  styleUrl: './price-list-by-product-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriceListByProductComponent {

  productService = inject(ProductService);
  productSupplierService = inject(ProductSupplierService);
  formBuilder = inject(FormBuilder);

  productList = signal<Product[]>([]);
  priceByProductList = signal<Partial<PriceByProductList>>({});

  priceList = computed(
    ()=> this.priceByProductList().prices?.content)

  productForm = this.formBuilder.group({
    product: this.formBuilder.control<number|null>(null),
  })

  constructor() {
    this.getProducts();
  }

  getProducts(){
    this.productService.getActiveProducts().subscribe(products => {
      this.productList.set(products);
    })
  }

  getPricesByProductList(){

    const id = this.productForm.get("product")?.value;

    if (id){
      this.productSupplierService.getPricesByProduct(id).subscribe(
        (data) => {
          this.priceByProductList.set(data);
        })

    }

  }

  handleRowDeletion(success: boolean) {
    if(success){
      console.log("Row deleted successfully");
      this.getPricesByProductList();
    }
  }

}
