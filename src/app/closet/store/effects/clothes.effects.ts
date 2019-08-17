import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Clothes} from '../../model/clothes.model';
import {catchError, concatMap, exhaustMap, map, switchMap} from 'rxjs/operators';
import {updateClothesList, UpdateItem, DeleteItem, createItem} from '../actions/items.actions';
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

  deleteClothes$ = createEffect( () => this.action$.pipe(
    ofType(DeleteItem),
    exhaustMap( (action) =>
      from( this.firestore.doc(`clothes/${action.id}`).delete() ).pipe(
        concatMap( () => from( [
          navigateTo( {commands: ['core', 'layout', 'closet']} ),
          showSnackBar( {message: `Item excluído`, config: {}} )
        ]) ),
        catchError( () => of(showSnackBar(
          {message: `Ops, something goes wrong`, config: {
              duration: 5000
            }} )
        ) )
      )
    ),
    ));

  addNewClothes$ = createEffect( () => this.action$.pipe(
    ofType(createItem),
    exhaustMap( (action) => from( this.firestore.doc( `clothes/${this.createId()}` ).set({
      id: this.anotherId,
      name: action.clothes.name
    })).pipe(
      concatMap( () => from( [
        navigateTo({commands: ['core', 'layout', 'closet']}),
        showSnackBar( {message: `new item ${action.clothes.name} was added`, config: {}} )
      ]) ),
      catchError( () => of(showSnackBar(
        {message: `Ops, something goes wrong`, config: {
            duration: 5000
          }} )
      ) )
    )
    ),
  ) );

  constructor(private action$: Actions, private firestore: AngularFirestore) {}

  anotherId: string;
  private createId() {
    this.anotherId = this.firestore.createId();
    return this.anotherId;
  }

}
