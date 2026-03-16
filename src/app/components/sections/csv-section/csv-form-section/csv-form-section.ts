import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CsvFormUploadComponent } from "../csv-form-update-component/csv-form-upload-component";

@Component({
  selector: 'app-csv-form-section',
  imports: [CsvFormUploadComponent],
  templateUrl: './csv-form-section.html',
  styleUrl: './csv-form-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CsvFormSection {

}
