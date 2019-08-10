import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Clothes} from '../../../model/clothes.model';
import {Action, select, Store} from '@ngrx/store';
import {ClothesState} from '../../store/reducers/feature.reducer';
import {getAllCloset} from '../../store/selectors/items.selectors';

@Component({
  selector: 'app-closet',
  templateUrl: './closet.component.html',
  styleUrls: ['./closet.component.scss']
})
export class ClosetComponent implements OnInit {

  closet$: Observable<Clothes[]>; // coloca dolar em variáveis observable

  constructor(private store: Store<ClothesState>) { }

  ngOnInit() {
    this.closet$ = this.store.pipe(select(getAllCloset));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

}
