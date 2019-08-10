import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {createEffect} from '@ngrx/effects';
import {Clothes} from '../../model/clothes.model';
import {map} from 'rxjs/operators';
import {updateClothesList} from '../actions/items.actions';

@Injectable()
export class ClothesEffects {

  updateClothesList$ = createEffect( () => this.firestore.collection<Clothes>('items').valueChanges()
                                                    .pipe( map( clothes => updateClothesList( { clothes } ) ) ));

  constructor(private firestore: AngularFirestore) {}

}
