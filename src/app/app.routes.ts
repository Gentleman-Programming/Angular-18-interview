import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/characters',
    pathMatch: 'full',
  },
  {
    path: 'characters',
    loadComponent: () =>
      import('./main-container/main-container.component').then(
        (m) => m.MainContainerComponent,
      ),
  },
  {
    path: 'characters/:id',
    loadComponent: () =>
      import(
        './main-container/components/character-add-edit/character-add-edit.component'
      ).then((m) => m.CharacterAddEditComponent),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
