import {Component, effect, inject, input, output, WritableSignal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Supplier} from '../../../../interfaces/supplier/supplier';
import {Address} from '../../../../interfaces/supplier/address';
import {FieldError} from '../../../../directives/field-error';
import {FieldErrorBorder} from '../../../../directives/field-error-border';

@Component({
  selector: 'app-supplier-form-component',
  imports: [ReactiveFormsModule, FieldError, FieldErrorBorder],
  templateUrl: './supplier-form-component.html',
  styleUrl: './supplier-form-component.css'
})
export class SupplierFormComponent {
  form_builder = inject(FormBuilder);

  data_sig = output<Partial<Supplier>>();
  modified_supplier = input<Partial<Supplier>>();

  form = this.form_builder.group({
    companyName: ['', [Validators.required, Validators.minLength(3)]],
    cuit: ['', [Validators.required, Validators.pattern("^(20|23|27|30|33)([0-9]{9}|-[0-9]{8}-[0-9]{1})$")]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})?\d{8}$/)]],
    street: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    number: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(5), Validators.pattern("\\d+")]],
    city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑ \s]+$")]]
  });

  constructor() {
    effect(() => this.setValuesForForm(this.modified_supplier()));
  }

  tellToBeDone() {
    const supplier = this.makeObjectFromForm();
    this.data_sig.emit(supplier);
    this.resetForm();
  }

  makeObjectFromForm() {
    const values = this.form.value;

    const address: Partial<Address> = {
      street: values.street!,
      number: values.number!,
      city: values.city!
    };

    const supplier: Partial<Supplier> = {
      companyName: values.companyName!,
      cuit: values.cuit!,
      email: values.email!,
      phoneNumber: values.phone!,
      address: address
    };

    return supplier;
  }

  isValid() {
    return this.form.valid;
  }

  resetForm() {
    this.form.reset();
    this.form.markAsUntouched();
  };


  setValuesForForm(mod_sup: Partial<Supplier> | undefined) {
    if (mod_sup) {
      this.form.setValue(
        {
          companyName: mod_sup.companyName!,
          cuit: mod_sup.cuit!,
          email: mod_sup.email!,
          phone: mod_sup.phoneNumber!,
          street: mod_sup.address?.street!,
          number: mod_sup.address?.number!,
          city: mod_sup.address?.city!
        }
      )
    }
  }


}
