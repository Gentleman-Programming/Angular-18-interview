import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Character } from '@app/models';
import { GlobalStore } from '@app/store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterCardComponent {
  character = input.required<Character>();

  readonly store = inject(GlobalStore);

  removeCharacter(characterId: number) {
    this.store.removeCharacter(characterId);
  }
}
