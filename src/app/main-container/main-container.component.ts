import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  CharacterAddEditComponent,
  CharacterCardComponent,
} from './components';
import { GlobalStore } from '@app/store/global.store';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [CharacterCardComponent, CharacterAddEditComponent],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainContainerComponent {
  readonly store = inject(GlobalStore);
}
