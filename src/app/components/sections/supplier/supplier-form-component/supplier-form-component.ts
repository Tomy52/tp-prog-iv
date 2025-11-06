import {Component, effect, inject, input, output, WritableSignal} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Supplier } from '../../../../interfaces/supplier/supplier';
import { Address } from '../../../../interfaces/supplier/address';

@Component({
  selector: 'app-supplier-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './supplier-form-component.html',
  styleUrl: './supplier-form-component.css'
})
export class SupplierFormComponent {
  form_builder = inject(FormBuilder);

  data_sig = output<Partial<Supplier>>();
  modified_supplier = input<Partial<Supplier>>();

  form = this.form_builder.group({
    companyName: ['Green Test',[Validators.required,Validators.minLength(3)]],
    cuit: ['23-11121111-9',[Validators.required,Validators.pattern("^(20|23|27|30|33)([0-9]{9}|-[0-9]{8}-[0-9]{1})$")]],
    email: ['test1@email.com',[Validators.required,Validators.email]],
    phone: ['1111111111',[Validators.required,Validators.pattern("^[0-9]{9,10}$")]],
    street: ['Calle 12',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
    number: ['123',[Validators.required,Validators.minLength(2),Validators.maxLength(5),Validators.pattern("\\d+")]],
<<<<<<< HEAD
    city: ['Ciudad',[Validators.required,Validators.minLength(3),Validators.maxLength(50),Validators.pattern("^[a-zA-Z\\s]*$")]]
=======
    city: ['Ciudad',[Validators.required,Validators.minLength(3),Validators.maxLength(50),Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑ \s]+$")]]
>>>>>>> 0b9db0a ((changes) improve supplier info readability and allow spaces in city name)
  });

  constructor() {
    effect(() => this.setValuesForForm(this.modified_supplier()));
  }

  tellToBeDone()
  {
    const supplier = this.makeObjectFromForm();
    this.data_sig.emit(supplier);
    this.resetForm();
  }

  makeObjectFromForm()
  {
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

  isValid()
  {
    return this.form.valid;
  }


  isFieldInvalid(field_name:string) : undefined | boolean
  {
    const field = this.form.get(field_name);


    if(field == undefined)
    {
      console.error(this.isFieldInvalid + ` Field ${field_name} doesn't exist!!!!!!!!!!!`);
      return;
    }


    return !field!.valid;
  }


  wasFieldTouched(field_name:string)
  {
    const field = this.form.get(field_name);

    if(field == undefined)
    {
      console.error(this.isFieldInvalid + ` Field ${field_name} doesn't exist!!!!!!!!!!!`);
      return;
    }

    return field!.touched;
  }

  resetForm() {
    this.form.reset();
    this.form.markAsUntouched();
  }

  showFieldWrong(field_name:string)
  {
    return this.isFieldInvalid(field_name) && this.wasFieldTouched(field_name);
  }


  setValuesForForm(mod_sup:Partial<Supplier> | undefined)
  {
    if(mod_sup)
    {
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
