import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';


const toggle_value_accessor = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SwitchWithText),
  multi: true,
};

@Component({
  selector: 'app-switch-with-text',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './switch-with-text.html',
  styleUrl: './switch-with-text.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [toggle_value_accessor]
})
export class SwitchWithText {
  on_text = input.required<string>();
  off_text = input.required<string>();

  value = signal<boolean>(false);
  disabled:boolean = false;

  writeValue(input: boolean)
  {
    this.value.set(input)
  }

  onChange: (value: boolean) => void = () => {};
  onTouch: () => void = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  changeValue(event:any)
  {
    let checked = event.target.checked;
    console.log(checked);
    this.value.set(checked)
    this.onChange(checked)
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
