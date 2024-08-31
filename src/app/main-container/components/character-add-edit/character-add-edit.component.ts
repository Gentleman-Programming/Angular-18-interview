import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  Signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomInputComponent } from '@app/components/custom-input';
import { Character, emptyCharacter } from '@app/models';
import { GlobalStore } from '@app/store';

interface CharacterForm {
  name: FormControl<string>;
  image: FormControl<string>;
}

@Component({
  selector: 'app-character-add-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CustomInputComponent],
  templateUrl: './character-add-edit.component.html',
  styleUrls: ['./character-add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterAddEditComponent {
  id = input.required<number>();

  readonly store = inject(GlobalStore);

  characterToEdit = computed(
    () => this.store.getCharacter(Number(this.id())) ?? emptyCharacter,
  );

  characterForm: Signal<FormGroup> = computed(
    () =>
      new FormGroup<CharacterForm>({
        name: new FormControl(this.characterToEdit().name, {
          nonNullable: true,
          validators: [Validators.required],
        }),
        image: new FormControl(this.characterToEdit().image, {
          nonNullable: true,
          validators: [Validators.required],
        }),
      }),
  );

  onSubmit(): void {
    if (this.characterForm().valid) {
      if (this.id()) {
        const updatedCharacter: Character = {
          ...this.characterForm().value,
        };

        this.store.updateCharacter({
          ...this.characterToEdit(),
          ...updatedCharacter,
        });
      } else {
        const newCharacter: Character = {
          id: Date.now(),
          ...this.characterForm().value,
        };

        this.store.addCharacter(newCharacter);
      }

      this.characterForm().reset();
    }
  }
}
