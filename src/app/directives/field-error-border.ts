import {Directive, ElementRef, inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Subscription} from 'rxjs';
import {AbstractControl, ValidationErrors} from '@angular/forms';

@Directive({
  selector: '[appFieldErrorBorder]'
})
export class FieldErrorBorder implements OnChanges{
  @Input('appFieldErrorBorder') control: AbstractControl | null = null;

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
      this.errorElement.nativeElement.classList.remove('error-border');
      return;
    }

    this.showErrorBorder(this.control.errors, this.control.dirty, this.control.touched);
    this.sub.add(
      this.control.statusChanges.subscribe(() => {
        this.showErrorBorder(this.control?.errors ?? null, this.control?.dirty, this.control?.touched);
      })
    );
  }

  showErrorBorder(errors: ValidationErrors | null, dirty?: boolean, touched?: boolean): void {
    const show = errors && (dirty || touched);
    if (!show) {
      this.errorElement.nativeElement.classList.remove('error-border');
      return;
    }

    this.errorElement.nativeElement.classList.add('error-border');
  }
}
