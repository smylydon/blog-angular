import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment.dev';
import {
  baseUrlInterceptor,
  BASE_API_URL,
} from './app/misc/base-url.interceptor';
import { metaReducers } from './app/misc/debug.metareducer';

import { appRoutes } from './app/app.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { provideEffects } from '@ngrx/effects';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideEffects([]),
    provideStore(
      {},
      {
        metaReducers: !environment.production ? metaReducers : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    !environment.production
      ? provideStoreDevtools({
          maxAge: 25, // Retains last 25 states
          logOnly: environment.production, // Restrict extension to log-only mode
          connectInZone: true,
        })
      : [],
    { provide: BASE_API_URL, useFactory: () => environment },
    provideHttpClient(withInterceptors([baseUrlInterceptor])),
  ],
}).catch((err) => console.error(err));
