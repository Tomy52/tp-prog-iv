import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuditLog} from '../../../../interfaces/audit/audit-log';
import {AuditTableRow} from '../audit-table-row/audit-table-row';

@Component({
  selector: 'app-audit-table',
  imports: [CommonModule, AuditTableRow],
  templateUrl: './audit-table.html',
  styleUrl: './audit-table.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditTable {
  logs = input<AuditLog[]>();
}
