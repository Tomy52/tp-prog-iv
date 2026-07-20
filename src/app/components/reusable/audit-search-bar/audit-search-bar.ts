import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

export interface AuditSearchBarData {
  category: string | null;
  revisionType: number | null;
}

@Component({
  selector: 'app-audit-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './audit-search-bar.html',
  styleUrls: ['./audit-search-bar.css','../styles/search-bar-styles.css','../styles/select-style.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditSearchBar {
  private readonly form_builder = inject(FormBuilder);

  form_sig = output<AuditSearchBarData>();
  disabled = input.required<boolean>();

  form = this.form_builder.group({
    category: [null],
    revisionType: [null]
  });

  submit() {
    const form_values = this.form.value;

    const rawType = form_values.revisionType;
    const parsedType = (rawType !== null && rawType !== '' && !isNaN(Number(rawType)))
      ? Number(rawType)
      : null;

    const values: AuditSearchBarData = {
      category: form_values.category!,
      revisionType: parsedType
    };

    console.log(values);
    this.form_sig.emit(values);
  }
  ngOnChanges(): void {
    this.disabled() ? this.form.disable() : this.form.enable();
  }
}
