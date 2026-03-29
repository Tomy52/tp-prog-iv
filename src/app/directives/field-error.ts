import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  inject
} from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appFieldError]'
})
export class FieldError implements OnChanges {
  @Input('appFieldError') control: AbstractControl | null = null;

  errorElement = inject(ElementRef<HTMLElement>);
  sub = new Subscription();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['control']) {
      this.bindControl();
    }
  }

  bindControl(): void {
    this.sub = new Subscription();

    if (!this.control) {
      this.errorElement.nativeElement.textContent = '';
      return;
    }

    this.showError(this.control.errors, this.control.dirty, this.control.touched);
    this.sub.add(
      this.control.statusChanges.subscribe(() => {
        this.showError(this.control?.errors ?? null, this.control?.dirty, this.control?.touched);
      })
    );
  }

  showError(errors: ValidationErrors | null, dirty?: boolean, touched?: boolean): void {
    const show = errors && (dirty || touched);
    if (!show) {
      this.errorElement.nativeElement.textContent = '';
      return;
    }

    const firstError = Object.keys(errors)[0];
    this.errorElement.nativeElement.textContent = this.getErrorMessage(firstError, errors);
  }

  getErrorMessage(error: string, errors: ValidationErrors): string {
    const messages: Record<string, string> = {
      required: 'Este campo es obligatorio',
      minlength: `Debe contener como mínimo ${errors['minlength']?.requiredLength ?? ''} caracteres`,
      maxlength: `Debe contener como máximo ${errors['maxlength']?.requiredLength ?? ''} caracteres`,
      pattern: 'El formato ingresado no es válido',
      email: 'El correo ingresado no es válido'
    };

    return messages[error] ?? 'Valor inválido';
  }
}
