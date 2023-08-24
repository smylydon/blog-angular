import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { FeaturesModule } from './../../libs/features/src/lib/features.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./../../libs/features/src/lib/features.module').then(
        (m) => m.FeaturesModule
      ),
  },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [
    FeaturesModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule],
})
export class RoutingModule {}
