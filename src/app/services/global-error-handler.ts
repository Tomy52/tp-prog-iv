import {ErrorHandler, inject, Injectable, NgZone, signal} from '@angular/core';
import {ErrorResponse} from '../interfaces/error/error-response';
import {HttpErrorResponse} from '@angular/common/http';
import { ModalService } from './modal-service';
import { ModalNotification } from '../components/reusable/modal-notification/modal-notification';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler{

  private zone = inject(NgZone)
  private modal_service = inject(ModalService)

  // este signal es para comunicarle a los componenetes que el error cambio, por ahora no tiene un uso, pero quizas
  // lo usemos cuando apliquemos los cambios con los modales para noticicaciones.
  errorData = signal<ErrorResponse | null>(null);

  handleError(error:any): void {
    const err = error.rejection || error;

    if (err instanceof HttpErrorResponse) {
      const apiError : ErrorResponse = err.error;

      this.zone.run( ()=> {
        // esta linea aca adentro es para emitir la signal
        this.errorData.set(apiError);

        this.modal_service.showModal(ModalNotification, {
          title: `${apiError.title} | Error: ${apiError.status}`,
          description: apiError.detail
        }, false)

      });

    } else {
      console.error(err.name, err.message);
    }



  }



}
