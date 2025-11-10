import {ChangeDetectionStrategy, Component, computed, inject, input, OnInit, signal} from '@angular/core';
import {ProductSupplierFormComponent} from '../product-supplier-form-component/product-supplier-form-component';
import {Router} from '@angular/router';
import {ProductSupplierService} from '../../../../services/product-supplier-service';
import {ResponseProductSupplier} from '../../../../interfaces/product-supplier/response-product-supplier';

@Component({
  selector: 'app-product-supplier-form-section',
  imports: [
    ProductSupplierFormComponent
  ],
  templateUrl: './product-supplier-form-section.html',
  styleUrl: './product-supplier-form-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSupplierFormSection implements OnInit {

  productSupplierService = inject(ProductSupplierService);
  router = inject(Router);

  id = input<string>();

  productSupplierResponse = signal<Partial<ResponseProductSupplier | undefined>>(undefined);

  isEditing = computed<boolean>(
    () => { return this.id() != undefined; })


  ngOnInit(): void {
    if (this.id()) {
      const id = this.id();
      this.productSupplierService.getProductSupplierById(id!).subscribe(
        {
          next: (response) => this.productSupplierResponse.set(response),
          error: (err) => {
            alert(`Algo anda mal -> ${err.error}`);
          }
        }
      );
    }

  }



}
