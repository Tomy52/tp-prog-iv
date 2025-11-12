import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {ProductDropdownSelect} from '../../../reusable/product-dropdown-select/product-dropdown-select';
import {ProductService} from '../../../../services/product-service';
import {ProductSupplierService} from '../../../../services/product-supplier-service';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Product} from '../../../../interfaces/product';
import {PriceByProductList} from '../../../../interfaces/product-supplier/price-by-product-list';
import {PriceByProductRowComponent} from '../price-by-product-row-component/price-by-product-row-component';
import {AllowViewUser} from '../../../../directives/allow-view-user';
import {PageButtons} from '../../../reusable/page-buttons/page-buttons';

@Component({
  selector: 'app-price-list-by-product-component',
  imports: [
    ProductDropdownSelect,
    PriceByProductRowComponent,
    ReactiveFormsModule,
    FormsModule,
    AllowViewUser,
    PageButtons,
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
    product: [null as number | null, [Validators.required]]
  })

  page = signal<number>(0);
  pageSize:number;
  pageSizeOptions:number[] = [2,5,10];

  searching:boolean = false;

  constructor() {
    this.pageSize = Number(localStorage.getItem('pageSize')) || this.pageSizeOptions[0];
    this.getProducts();
  }

  getProducts(){
    this.searching = true
    this.productService.getEnabledProducts().subscribe({
      next: products =>  {
      this.productList.set(products);
      }, error: error => {
        alert(error.error);
      },
      complete: () => this.searching = false
    })
  }

  search()
  {
    this.resetPageCount();
    this.getPricesByProductList();
  }

  getPricesByProductList(){
    const id = this.productForm.get("product")?.value;

    this.searching = true;

    if (id){
      this.productSupplierService.getPricesByProduct(id,this.page(),this.pageSize).subscribe(
        (data) => {
          this.searching = false;
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

  goNextPage() // se podria desactivar el boton del formulario en caso de que sea la ultima pagina
  {
    this.page.update((number) => number + 1);
    this.getPricesByProductList();
  }

  goPreviewsPage()// se podria desactivar el boton del formulario en caso de que sea la primer pagina
  {
    this.page.update((number) => number - 1);
    this.getPricesByProductList();
  }

  resetPageCount()
  {
    this.page.set(0);
  }

  changePageSize(size: number) {
    this.pageSize = size;
    localStorage.setItem('pageSize',size.toString());
    this.resetPageCount();
    this.getPricesByProductList();
  }

}
