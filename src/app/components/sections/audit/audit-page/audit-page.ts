import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { AuditService } from '../../../../services/audit-service';
import {AuditLog} from '../../../../interfaces/audit/audit-log';
import { PageResponse } from '../../../../interfaces/other/page-response';
import {AuditSearchBar, AuditSearchBarData} from '../../../reusable/audit-search-bar/audit-search-bar';
import { AuditTable } from '../audit-table/audit-table';
import { PageButtons } from "../../../reusable/page-buttons/page-buttons";
import {ModalService} from '../../../../services/modal-service';
import {ModalNotification} from '../../../reusable/modal-notification/modal-notification';

@Component({
  selector: 'app-audit-page',
  standalone: true,
  imports: [
    AuditSearchBar,
    AuditTable,
    PageButtons
  ],
  templateUrl: './audit-page.html',
  styleUrl: './audit-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditPage {
  private readonly auditService = inject(AuditService);
  private readonly modalService = inject(ModalService);

  page = signal<number>(0);
  page_size: number;
  page_size_ops: number[] = [2, 5, 10, 25, 50];

  page_data: WritableSignal<PageResponse<AuditLog> | null>;
  searching: boolean = false;

  query: AuditSearchBarData = {
    category: null,
    revisionType: null
  };

  constructor() {
    this.page_size = Number(localStorage.getItem('pageSize')) || this.page_size_ops[0];
    this.page_data = signal(null);
    this.getLogs(this.query);
  }

  getLogs(query: AuditSearchBarData) {
    this.searching = true;

    const sort = 'revisionDate,desc';

    const category = (query.category && query.category !== 'null' && query.category.trim() !== '')
      ? query.category
      : undefined;

    const type = (
      query.revisionType !== null &&
      query.revisionType !== undefined &&
      !isNaN(query.revisionType) &&
      String(query.revisionType).trim() !== ''
    ) ? query.revisionType.toString() : undefined;

    this.auditService.getAuditLogs(this.page(), this.page_size, sort, category, type).subscribe({
      next: (response) => {
        this.page_data.set(response);
      },
      error: (err) => {
        this.searching = false;
        throw err;
      },
      complete: () => {
        this.searching = false;
      }
    });
  }

  goForward() {
    this.page.update((number) => number + 1);
    this.getLogs(this.query);
  }

  goBack() {
    this.page.update((number) => number - 1);
    this.getLogs(this.query);
  }

  resetPageCount() {
    this.page.set(0);
  }

  changePageSize(size: number) {
    this.page_size = size;
    localStorage.setItem('pageSize', size.toString());
    this.resetPageCount();
    this.getLogs(this.query);
  }

  searchByTerms(terms: AuditSearchBarData) {
    this.query = terms;
    this.resetPageCount();
    this.getLogs(terms);
  }

  openTipModal() {
    this.modalService.showModal(ModalNotification,{
      title: "Tip:",
      description: "Aquellas entradas de la tabla que compartan un mismo ID de movimiento," +
        " corresponden a operaciones que afectaron más" +
        " de un registro a la vez (por ejemplo: creación de usuarios)",
      options: ["Entendido"]
    });
  }
}
