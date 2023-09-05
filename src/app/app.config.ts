import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { navReducer } from './shared/store/nav/nav.reducer';
import { headerComponentReducer } from './shared/store/header';
import { provideEffects } from '@ngrx/effects';
import { friendsListReducer } from './shared/store/friends-list';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouter } from '@angular/router';
import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { provideToastr } from 'ngx-toastr';
import { UserEffects, userReducer } from './shared/store/user';
import { PostsEffects } from './shared/store/posts/posts.effects';
import { sharedReducer } from './shared/store/shared/shared.reducer';
import { postsReducer } from './shared/store/posts/posts.reducer';
import { commentsReducer } from './shared/store/comments';
import { CommentsEffects } from './shared/store/comments/comments.effects';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideToastr({
      preventDuplicates: true,
    }),
    provideStore(),
    provideState({ name: 'nav', reducer: navReducer }),
    provideState({ name: 'header', reducer: headerComponentReducer }),
    provideState({ name: 'friendsList', reducer: friendsListReducer }),
    provideState({ name: 'user', reducer: userReducer }),
    provideState({ name: 'posts', reducer: postsReducer }),
    provideState({ name: 'shared', reducer: sharedReducer }),
    provideState({ name: 'comments', reducer: commentsReducer }),
    provideAnimations(),
    provideEffects(UserEffects, PostsEffects, CommentsEffects),
    provideHttpClient(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    importProvidersFrom(CookieService),
  ],
};
