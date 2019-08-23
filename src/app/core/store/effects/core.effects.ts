import {Actions, createEffect, ofType} from '@ngrx/effects';
import {MatSnackBar} from '@angular/material';
import {tap} from 'rxjs/operators';
import {showSnackBar} from '../actions/core.actions';
import {Injectable} from '@angular/core';

@Injectable()
export class CoreEffects {

  showSnackBar$ = createEffect( () => this.actions$.pipe(
    ofType(showSnackBar),
    // delay(2000),
    tap( action => this.matSnackBar.open(action.message, null, {
      duration: 3000,
      ...action.config})
    )
  ), { dispatch: false } );

  constructor(private actions$: Actions, private matSnackBar: MatSnackBar ) {}
}
