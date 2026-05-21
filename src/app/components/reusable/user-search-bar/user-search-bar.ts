import {ChangeDetectionStrategy, Component, inject, input, output} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserSearchBarData } from '../../../interfaces/component-logic/user-search-bar-data';

@Component({
  selector: 'app-user-search-bar',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './user-search-bar.html',
  styleUrls: ['./user-search-bar.css','../styles/search-bar-styles.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSearchBar {
  form_builder = inject(FormBuilder)
  form_sig = output<UserSearchBarData>();
  disabled = input.required<boolean>()

  form = this.form_builder.group({
    dni: [''],
    status: [null],
    role: [null]
  })


  submit()
  {
    const form_values = this.form.value;

  
    const values:UserSearchBarData = {
      dni: form_values.dni!,
      status: form_values.status!,
      role: form_values.role!
    }

    console.log(values)
    this.form_sig.emit(values)
    this.form.reset()
  }

  ngOnChanges(): void {
    this.disabled() ? this.form.disable() : this.form.enable()
  }
}
