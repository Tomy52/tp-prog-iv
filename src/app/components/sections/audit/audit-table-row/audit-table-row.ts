import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {AuditLog} from '../../../../interfaces/audit/audit-log';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'tr[app-audit-table-row]',
  imports: [DatePipe],
  templateUrl: './audit-table-row.html',
  styleUrl: './audit-table-row.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditTableRow {
  log = input.required<AuditLog>();

  public prettifyCategory(rawCat: string): string {
    const categories: Record<string, string> = {
      ADDRESS: "Dirección",
      CREDENTIAL: "Credencial",
      PRODUCT: "Producto",
      SUPPLIER: "Proveedor",
      PRODUCT_SUPPLIER: "Producto - proveedor",
      USER: "Usuario"
    };

    return categories[rawCat] || "";
  }
}
