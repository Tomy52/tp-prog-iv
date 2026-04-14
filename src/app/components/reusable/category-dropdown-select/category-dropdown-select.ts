import {Component, forwardRef, input, signal} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import { Category } from '../../../interfaces/category';

const select_value_accessor = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CategoryDropdownSelect),
  multi: true,
};

@Component({
  selector: 'app-category-dropdown-select',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './category-dropdown-select.html',
  styleUrl: './category-dropdown-select.css',
  providers: [select_value_accessor]
})
export class CategoryDropdownSelect implements ControlValueAccessor {
  categories = input.required<Category[]>();

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
