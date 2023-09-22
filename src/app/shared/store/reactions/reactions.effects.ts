import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ReactionsService } from 'src/app/core/services/reactions.service';
import { catchError, concatMap, map, of } from 'rxjs';

@Injectable()
export class ReactionsEffects {
  private actions$ = inject(Actions);
}
