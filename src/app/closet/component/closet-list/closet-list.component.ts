import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Action} from '@ngrx/store';
import {selectClothes} from '../../store/actions/items.actions';
import {Clothes} from '../../model/clothes.model';

@Component({
  selector: 'app-closet-list',
  templateUrl: './closet-list.component.html',
  styleUrls: ['./closet-list.component.scss']
})
export class ClosetListComponent implements OnInit {

  @Input()
  closet: Clothes[];

  @Output()
  actionEmitter = new EventEmitter<Action>();

  constructor() { }

  ngOnInit() {
  }

  select(clothes: Clothes) {
    this.actionEmitter.emit(selectClothes({clothes}));
  }

}
