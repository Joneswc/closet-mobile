import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Clothes} from '../../model/clothes.model';
import {exhaustMap, map, switchMap} from 'rxjs/operators';
import {updateClothesList, UpdateItem} from '../actions/items.actions';

@Injectable()
export class ClothesEffects {

  updateClothesList$ = createEffect(
    () => this.firestore.collection<Clothes>('items').valueChanges()
                                                    .pipe( map( clothes => updateClothesList( { clothes } ) ) ));

  updateClothes$ = createEffect( () => this.action$.pipe(
    ofType(UpdateItem),
    exhaustMap(action =>
      this.firestore.doc(`clothes/${action.clothes.id}`).set(action.clothes)
    )
  ), {dispatch: false} );

  constructor(private action$: Actions, private firestore: AngularFirestore) {}

}

// switchMap() - vai trocar 1a execução pela segunda, mas vai jogar as duas no banco
// por isso, usar exhaustMap
