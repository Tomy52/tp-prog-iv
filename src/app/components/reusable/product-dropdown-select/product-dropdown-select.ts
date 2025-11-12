import {ChangeDetectionStrategy, Component, forwardRef, input, signal} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {Product} from '../../../interfaces/product';

const select_value_accessor = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ProductDropdownSelect),
  multi: true,
};

@Component({
  selector: 'app-product-dropdown-select',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './product-dropdown-select.html',
  styleUrl: './product-dropdown-select.css',
  providers: [select_value_accessor],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDropdownSelect implements ControlValueAccessor {
  products = input.required<Product[]>();

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
    this.value.set(Number(event.target.value));
    this.onChange(Number(event.target.value));
  }


  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
