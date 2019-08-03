import {createSelector} from '@ngrx/store';
import {getClothesState} from '../reducers/global.reducer';
import {clothesAdapter} from '../reducers/items.reducer';

export const getClosetState = createSelector(
  getClothesState,
  state => state.closet
);

export const getAllCloset = createSelector(
  getClosetState,
  state => clothesAdapter.getSelectors().selectAll(state)
);
