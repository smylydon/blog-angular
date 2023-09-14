import { Route } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@features').then((m) => m.featuresRoutes),
  },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' },
];
