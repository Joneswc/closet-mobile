import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Clothes} from '../../../model/clothes.model';
import {Action, select, Store} from '@ngrx/store';
import {ClothesState} from '../../store/reducers/global.reducer';
import {getSelectedCloset} from '../../store/selectors/items.selectors';

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.scss']
})
export class ClothesComponent implements OnInit {

  closet$: Observable<Clothes>; // coloca dolar em variáveis observable

  constructor(private store: Store<ClothesState>) { }

  ngOnInit() {
    this.closet$ = this.store.pipe(select(getSelectedCloset));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

}
