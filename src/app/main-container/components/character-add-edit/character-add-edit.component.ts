import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
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
  readonly store = inject(GlobalStore);
  clickOut = output<boolean>();

  characterForm: FormGroup = new FormGroup<CharacterForm>({
    name: new FormControl(this.store.characterToEdit().name, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    image: new FormControl(this.store.characterToEdit().image, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  onSubmit(): void {
    if (this.characterForm.valid) {
      if (this.store.characterToEdit()) {
        const updatedCharacter: Character = {
          ...this.characterForm.value,
        };
        this.store.updateCharacter({
          ...this.store.characterToEdit(),
          ...updatedCharacter,
        });
        this.store.editCharacter(emptyCharacter);
      } else {
        const newCharacter: Character = {
          id: Date.now(),
          ...this.characterForm.value,
        };
        this.store.addCharacter(newCharacter);
      }

      this.characterForm.reset();
      this.clickOut.emit(true);
    }
  }
}
