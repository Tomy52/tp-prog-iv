import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { FailedProductsResp } from '../../../interfaces/csv-update/failed-products-resp';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-failed-products-component',
  imports: [],
  templateUrl: './failed-products-component.html',
  styleUrl: './failed-products-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FailedProductsComponent {
  failed_product_resp = signal<FailedProductsResp|undefined>(undefined);
  show_err = signal<boolean>(false);
  showing = signal<boolean>(false);
  dialog_data = inject(DIALOG_DATA)
  
  constructor()
  {
    this.failed_product_resp.set(this.dialog_data.resp)
    
    if(this.failed_product_resp()?.nonAffectedProducts[0])
      {
        this.show_err.update(() => true)
      }
  }


  changeShowing()
  {
    this.showing.update(() => !this.showing())
  }

  private dialogRef = inject(DialogRef, {optional: true})
  protected closeModal() {
    this.dialogRef?.close()
  }

}
