import {ChangeDetectionStrategy, Component, inject, input, OnInit, output, ViewChild, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';

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
  
  components = input<any[]>();
  
  query_form = this.form_builder.group({
    query: ['']
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
        this.targetSpace.createComponent(element)
      });
    }
  }
}
  