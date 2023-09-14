import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment.dev';
import { BaseUrlInterceptor } from './app/misc/base-url.interceptor';
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
        })
      : [],
    { provide: 'BASE_API_URL', useValue: environment.apiUrl },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    },
    importProvidersFrom(HttpClientModule),
  ],
}).catch((err) => console.error(err));
