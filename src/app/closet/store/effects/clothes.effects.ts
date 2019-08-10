import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Clothes} from '../../model/clothes.model';
import {catchError, concatMap, exhaustMap, map, switchMap} from 'rxjs/operators';
import {updateClothesList, UpdateItem} from '../actions/items.actions';
import {config, from, of} from 'rxjs';
import {navigateTo} from '../../../store/actions/app.actions';
import {showSnackBar} from '../../../core/store/actions/core.actions';

@Injectable()
export class ClothesEffects {

  updateClothesList$ = createEffect(
    () => this.firestore.collection<Clothes>('clothes').valueChanges()
                                                    .pipe( map( clothes => updateClothesList( { clothes } ) ) ));

  updateClothes$ = createEffect( () => this.action$.pipe(
    ofType(UpdateItem),
    exhaustMap((action) =>
      from( this.firestore.doc(`clothes/${action.clothes.id}`).set(action.clothes) ).pipe(
        concatMap( () => from( [
          navigateTo( {commands: ['core', 'layout', 'closet']} ),
          showSnackBar( {message: `${action.clothes.name} updated`, config: {}} )
        ]) ),
        catchError( () => of(showSnackBar(
          {message: `Ops, something goes wrong`, config: {
            duration: 5000
            }} )
        ) )
      )
    ),
  ));

  constructor(private action$: Actions, private firestore: AngularFirestore) {}

}
