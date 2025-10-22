import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Supplier } from '../../../../interfaces/supplier';
import { Address } from '../../../../interfaces/address';

@Component({
  selector: 'app-supplier-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './supplier-form-component.html',
  styleUrl: './supplier-form-component.css'
})
export class SupplierFormComponent {
  form_builder = inject(FormBuilder)
  
  data_sig = output<Partial<Supplier>>();


  form = this.form_builder.group({
    companyName: ['test',[Validators.required]],
    cuit: ['aaa',[Validators.required]],
    email: ['zz',[Validators.required,Validators.email]],
    phone: ['z',[Validators.required]],
    street: ['xx',[Validators.required]],
    number: ['cc',[Validators.required]],
    city: ['vv',[Validators.required]]
  })


  tellToBeDone()
  {
    let supplier = this.makeObjectFromForm();
    this.data_sig.emit(supplier)
    this.resetForm()
  }

  makeObjectFromForm()
  {
    let values = this.form.value
    
    let address: Partial<Address> = {
      street: values.street!,
      number: values.number!,
      city: values.number!
    }

    let supplier: Partial<Supplier> = {
      companyName: values.companyName!,
      cuit: values.cuit!,
      email: values.email!,
      phoneNumber: values.phone!,
      address: address
    }
    
    return supplier;
  }

  isValid()
  {
    return this.form.valid
  }


  isFieldInvalid(field_name:string)
  {
    let field = this.form.get(field_name)


    if(field == undefined)
    {
      console.error(this.isFieldInvalid + ` Field ${field_name} doesn't exist!!!!!!!!!!!`)
      return
    }


    return !field!.valid
  }


  wasFieldTouched(field_name:string)
  {
    let field = this.form.get(field_name)

    if(field == undefined)
    {
      console.error(this.isFieldInvalid + ` Field ${field_name} doesn't exist!!!!!!!!!!!`)
      return
    }

    return field!.touched
  }

  resetForm() {
    this.form.reset()
    this.form.markAsUntouched()
  }



  
}
