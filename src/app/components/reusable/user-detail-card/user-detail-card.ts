import {ChangeDetectionStrategy, Component, input} from '@angular/core';

@Component({
  selector: 'app-user-detail-card',
  imports: [],
  templateUrl: './user-detail-card.html',
  styleUrl: './user-detail-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailCard {
  icon = input<string | undefined>('');
  title = input.required<string | undefined>();
  value = input<string | undefined>('');
  useProjection = input<boolean>(false); // esto es para poder controlar el color de la etiqueta de estado
}
