import {Component, forwardRef, inject} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {SupplierService} from '../../../services/supplier-service';
import {toSignal} from '@angular/core/rxjs-interop';
import { Supplier } from '../../../interfaces/supplier/supplier';

@Component({
  selector: 'app-supplier-dropdown-select',
  imports: [ReactiveFormsModule],
  templateUrl: './supplier-dropdown-select.html',
  styleUrl: './supplier-dropdown-select.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SupplierDropdownSelect),
      multi: true
    }
  ]
})
export class SupplierDropdownSelect implements ControlValueAccessor {
  suppliers_service = inject(SupplierService);

  //suppliers = toSignal(this.suppliers_service.getAllSuppliersAsList());

  value: Supplier | null = null;

  onChange: any = () => {};
  onTouch: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  /*
  handleChange(event: Event): void {
    const target = event.target as HTMLSelectElement
    const selectedSupp = this.suppliers()?.find(
      p => p.id.toString() === target.value
    );

    console.log(selectedSupp)
    this.value = selectedSupp || null
    this.onChange(this.value)
  }*/




  id?:number;
  writeValue(input: number) {
    this.id = input;
  }
}
