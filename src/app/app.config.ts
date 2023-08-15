import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { navReducer } from './shared/store/nav/nav.reducer';
import { headerComponentReducer } from './shared/store/header';
import { provideEffects } from '@ngrx/effects';
import { friendsListReducer } from './shared/store/friends-list';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    provideState({ name: 'nav', reducer: navReducer }),
    provideState({ name: 'header', reducer: headerComponentReducer }),
    provideState({ name: 'friendsList', reducer: friendsListReducer }),
    provideAnimations(),
    provideEffects(),
  ],
};
