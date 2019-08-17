import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {catchError, exhaustMap, map, mapTo, switchMap, switchMapTo, tap} from 'rxjs/operators';
import {EMPTY, from, of} from 'rxjs';
import {signInEmail, signInGoogle, signout, signoutSuccess, updateUserInfo} from '../actions/auth.actions';
import {auth} from 'firebase/app';
import {showSnackBar} from '../actions/core.actions';
import {navigateTo} from '../../../store/actions/app.actions';

@Injectable()
export class AuthEffets {

  updateUserInfo$ = createEffect( () => this.authFire.user.pipe(
    tap( user => console.log(user) ),
    map( user => {
      if (user) {
        const {uid, displayName, email, phoneNumber, photoURL, providerId} = user;
        return updateUserInfo({user: {uid, displayName, email, phoneNumber, photoURL, providerId}});
      }
      return updateUserInfo({});
    } )
  ));

  signInEmail$ = createEffect( () => this.actions$.pipe(
    ofType(signInEmail),
    exhaustMap( ({email, password}) =>
      from( this.authFire.auth.signInWithEmailAndPassword(email, password)).pipe(
        mapTo( navigateTo({commands: ['core']}) ),
        catchError( (error: auth.Error) => of(showSnackBar({
          message: error.message,
          config: {
            duration: 5000
          }
        })) )
      )
    )),
    );

  signInGoogle$ = createEffect(() => this.actions$.pipe(
    ofType(signInGoogle),
    exhaustMap(() => from(
      this.authFire.auth.signInWithPopup(new auth.GoogleAuthProvider())
    ).pipe(
      mapTo( navigateTo({commands: ['core']}) ),
      catchError((error: auth.Error) => of(showSnackBar({
        message: error.message,
        config: {
          duration: 5000
        }
      })))
    )),
  ));

  signout$ = createEffect( () => this.actions$.pipe(
    ofType(signout),
    exhaustMap( () => from(
      this.authFire.auth.signOut()
    ) )
  ).pipe(
    mapTo(signoutSuccess()),
  ) );

  signOutSuccess$ = createEffect( () => this.actions$.pipe(
    ofType(signoutSuccess),
    mapTo( navigateTo({commands: ['core']}) ),
  ))

  constructor(private actions$: Actions, private authFire: AngularFireAuth) {
  }

}
