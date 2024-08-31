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
      if (this.characterForm().valid) {
        const character = {
          ...(this.id() ? { id: String(Date.now()) } : {}),
          ...this.characterForm().value
        }

        const methodToUse = this.id() ? "updateCharacter" : "addCharacter";

        this.store[methodToUse](character)

        this.characterForm().reset()
      }
    }
  }
}
