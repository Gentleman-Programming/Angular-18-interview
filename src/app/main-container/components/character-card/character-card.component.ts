import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Character } from '@app/models';
import { GlobalStore } from '@app/store';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterCardComponent {
  character = input.required<Character>();
  clickOut = output<boolean>();

  readonly store = inject(GlobalStore);

  removeCharacter(characterId: number) {
    this.store.removeCharacter(characterId);
  }

  editCharacter() {
    this.store.editCharacter(this.character());
    this.clickOut.emit(true);
  }
}
