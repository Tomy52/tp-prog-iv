import { ChangeDetectionStrategy, Component, effect, inject, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SupplierSearchData } from '../../../interfaces/component-logic/supplier-search-data';

@Component({
  selector: 'app-supplier-search-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './supplier-search-bar.html',
  styleUrl: './supplier-search-bar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierSearchBar implements OnChanges {
  form_builder = inject(FormBuilder)
  form_sig = output<SupplierSearchData>();
  disabled = input.required<boolean>()

  form = this.form_builder.group({
    name: ['']
  })


  submit()
  {
    const form_values = this.form.value;
    console.log(form_values)

    const values:SupplierSearchData = {
      name: form_values.name!
    }

    this.form_sig.emit(values)
  }

  ngOnChanges(): void {
    this.disabled() ? this.form.disable() : this.form.enable()
  }

}
