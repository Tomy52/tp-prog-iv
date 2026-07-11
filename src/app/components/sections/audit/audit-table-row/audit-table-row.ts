import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {AuditLog} from '../../../../interfaces/audit/audit-log';
import {DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'tr[app-audit-table-row]',
  imports: [DatePipe, RouterLink],
  templateUrl: './audit-table-row.html',
  styleUrls: ['./audit-table-row.css', '../../user/users-table-row/users-table-row.css'],
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
      PRODUCT_SUPPLIER: "Producto - Proveedor",
      USER: "Usuario"
    };

    return categories[rawCat] || "";
  }
}
