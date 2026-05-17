import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'publish',
    loadComponent: () =>
      import('./features/publish/publish-daily.component').then(
        (m) => m.PublishDailyComponent
      ),
  },
];
