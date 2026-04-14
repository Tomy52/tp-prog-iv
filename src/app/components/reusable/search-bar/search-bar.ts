import {Component, forwardRef, input, signal} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import { Category } from '../../../interfaces/category';

const select_value_accessor = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SearchBar),
  multi: true,
};

@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
  providers: [select_value_accessor]
})
export class SearchBar implements ControlValueAccessor {
  value = signal<string|null>(null);
  disabled:boolean = false;


  writeValue(input: string | null) {
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
    this.value.set(event.target.value);
    this.onChange(event.target.value);
  }


  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
