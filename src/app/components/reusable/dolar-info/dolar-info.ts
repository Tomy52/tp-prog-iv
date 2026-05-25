import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DolarService } from '../../../services/dolar-service';
import { DolarPrice } from '../../../interfaces/component-logic/dolar-price';
import { EnumMappingService } from '../../../services/enum-mapping-service';
import { EnumMap } from '../../../interfaces/component-logic/enum-map';
import { DolarEnum } from '../../../interfaces/dolar/dolar-enum';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dolar-info',
  imports: [ReactiveFormsModule],
  templateUrl: './dolar-info.html',
  styleUrl: './dolar-info.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DolarInfo {
  dolar_service = inject(DolarService)
  dolar_info = signal<DolarPrice|undefined>(undefined);
  searching = signal<boolean>(true);
  success = signal<boolean>(true);

  enum_mapper = inject(EnumMappingService)
  enum_options = signal<EnumMap[]>([])

  form_builder = inject(FormBuilder)
  form = this.form_builder.group({
    exchange: ['oficial']
  })

  constructor()
  {
    this.enum_options.set(this.enum_mapper.createList(DolarEnum))
    this.searchDolarData()
  }


  searchDolarData(value?:string)
  {
    this.searching.set(true);
    this.dolar_service.getDolarInfoFromBackend(value).subscribe({
      next: (dolarPrice) => {
        this.dolar_info.set(dolarPrice)
      },
      error: () => {
        this.success.set(false);
      },
      complete: () => this.searching.set(false)
    })
  }

  onChange(event:any)
  {
    this.searchDolarData(event.target.value)    
  }

}
