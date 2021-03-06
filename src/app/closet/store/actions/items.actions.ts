import {createAction, props} from '@ngrx/store';
import {Clothes} from '../../model/clothes.model';

export const updateClothesList = createAction(
  '[Closet] Update clothes list',
  props<{clothes: Clothes[]}>(),
);

export const selectClothes = createAction(
  '[Closet] Select clothes',
  props<{clothes: Clothes}>()
);

export const unselectClothes = createAction(
  '[Closet] Unselect clothes'
)

export const createItem = createAction(
  '[Closet] Create clothes',
  props<{clothes: Clothes}>()
);

export const UpdateItem = createAction(
  '[Closet] Update clothes',
  props<{clothes: Clothes}>()
)

export const DeleteItem = createAction(
  '[Closet] Delete clothes',
  // props<{id: number}>()
  props<{id: string}>()
);
