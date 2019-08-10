import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Action, select, Store} from '@ngrx/store';
import {ClothesState} from '../../store/reducers/feature.reducer';
import {getSelectedCloset} from '../../store/selectors/items.selectors';
import {Clothes} from '../../model/clothes.model';

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
