import {ChangeDetectionStrategy, Component, inject, input, OnInit, output, ViewChild, ViewContainerRef} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormControlName, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormBuilderComponent } from '../../../interfaces/component-logic/form-builder-component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-search-bar',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SearchBar {

  form_builder = inject(FormBuilder);
  disabled = input.required<boolean>();
  
  query_sig = output<string>();
  
  components = input<FormBuilderComponent[]>();
  
  query_form = this.form_builder.group({
    query: [''],
    extra_params: this.form_builder.array([])
  });

  @ViewChild('targetSpace', {read: ViewContainerRef}) targetSpace!:ViewContainerRef

  submit()
  {
    let query = this.query_form.value.query!;

    if(query == undefined)
    {
      query = '';
    }

    this.query_sig.emit(query);
  }



  ngAfterViewInit()
  {
    if(this.components())
    {
      this.components()!.forEach(element => {
        this.addParameter(element)
        

        // como podria hacer para que cree un componente poniendole la directiva de controlFormName?
        const component = this.targetSpace.createComponent(element.component)

      });
    }

    console.log(this.query_form.controls.extra_params.value)
  }

  getParameters()
  {
    return this.query_form.controls["extra_params"] as FormArray
  }

  addParameter(element: FormBuilderComponent)
  {
    const parameter = this.form_builder.group({
      value: [element.form_reference]
    })
    this.getParameters().push(parameter)
  }
}
  