import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {AuditService} from '../../../../services/audit-service';
import {AuditDetailLog} from '../../../../interfaces/audit/audit-detail-log';
import {KeyValuePipe, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-audit-detail',
  imports: [
    KeyValuePipe,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './audit-detail.html',
  styleUrls: ['./audit-detail.css',
    '../audit-page/audit-page.css',
    '../audit-table/audit-table.css',
    '../audit-table-row/audit-table-row.css',
    '../../user/users-table-row/users-table-row.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditDetail {
  route = inject(ActivatedRoute);
  auditService = inject(AuditService);

  category = signal<string>('');
  revisionId = signal<string>('');

  detail = signal<AuditDetailLog | null>(null);
  loading = signal<boolean>(true);

  ngOnInit(): void {
    const categoryParam = this.route.snapshot.paramMap.get('category') || '';
    const revParam = this.route.snapshot.paramMap.get('rev') || '';

    this.category.set(categoryParam);
    this.revisionId.set(revParam);

    this.loadDetail();
  }

  private loadDetail(): void {
    this.loading.set(true);

    this.auditService.getAuditDetail(this.category(), this.revisionId())
      .subscribe({
        next: (data) => {
          this.detail.set(data);
        },
        error: (err) => {
          console.error('No se pudo cargar el detalle del registro: ', err);
          this.detail.set(null);
        },
        complete: () => {
          this.loading.set(false);
        }
      });
  }
}
