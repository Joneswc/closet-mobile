import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Clothes} from '../../model/clothes.model';
import {Action} from '@ngrx/store';
import {unselectClothes, UpdateItem} from '../../store/actions/items.actions';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-clothes-detail',
  templateUrl: './clothes-detail.component.html',
  styleUrls: ['./clothes-detail.component.scss']
})
export class ClothesDetailComponent implements OnInit {

  @Input()
  set clothes(clothes: Clothes) {
    this.clothesForm.patchValue(clothes);
  }
  // @Input()
  // clothes: Clothes;

  @Output()
  actionEmitter = new EventEmitter<Action>();

  clothesForm = this.fb.group({
    id: [''],
    name: [''],
    // description: [''],
    // category: ['']
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  unselect() {
    this.actionEmitter.emit(unselectClothes());
  }

  update() {
    this.actionEmitter.emit(UpdateItem({clothes: this.clothesForm.value}));
  }
}
