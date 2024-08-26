import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Character } from '../../models/character.model';
import {
  CharacterAddEditComponent,
  CharacterCardComponent,
} from './components';
import { GlobalStore } from '@app/store/global.store';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [AsyncPipe, CharacterCardComponent, CharacterAddEditComponent],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainContainerComponent {
  characterInfo: Record<string, Character> = {};
  logicNumber: number = 1;
  readonly store = inject(GlobalStore);

  constructor() {
    this.store.loadCharacters();
  }

  changeLogic(logicNumber: number) {
    this.logicNumber = logicNumber;
  }
}
