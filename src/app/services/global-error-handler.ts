import {ErrorHandler, inject, Injectable, NgZone} from '@angular/core';
import {ErrorResponse} from '../interfaces/error/error-response';
import {HttpErrorResponse} from '@angular/common/http';
import { ModalService } from './modal-service';
import { ModalNotification } from '../components/reusable/modal-notification/modal-notification';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {

  private zone = inject(NgZone)
  private modal_service = inject(ModalService)

  handleError(error: any): void {
    const err = error.rejection || error;

    if (err instanceof HttpErrorResponse) {

      switch (err.status) {
        case 0:
          this.zone.run(() => {
            this.modal_service.showModal(ModalNotification, {
              title: 'Error de Red',
              description: 'No se puede procesar la solicitud. Intentelo mas tarde'
            }, false)
          });
          break;
        default:
          const apiError: ErrorResponse = err.error;

          this.zone.run(() => {
            this.modal_service.showModal(ModalNotification, {
              title: `${apiError.title}`,
              description: apiError.detail
            }, false)
          });
          break;
      }
    } else {
      console.error(err.name, err.message);
    }
  }
}
