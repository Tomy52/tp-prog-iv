import {Component, forwardRef, input, signal} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import { Supplier } from '../../../interfaces/supplier/supplier';

const select_value_accessor = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SupplierDropdownSelect),
  multi: true,
};

@Component({
  selector: 'app-supplier-dropdown-select',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './supplier-dropdown-select.html',
  styleUrl: './supplier-dropdown-select.css',
  providers: [select_value_accessor]
})
export class SupplierDropdownSelect implements ControlValueAccessor {
  suppliers = input.required<Supplier[]>();

  value = signal<number|null>(null);
  disabled:boolean = false;


  writeValue(input: number | null) {
    this.value.set(input);
  }

  onChange: (value: number | null) => void = () => {};
  onTouch: () => void = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  changeValue(event:any)
  {
    console.log(Number(event.target.value));
    this.value.set(Number(event.target.value));
    this.onChange(Number(event.target.value));
  }


  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
