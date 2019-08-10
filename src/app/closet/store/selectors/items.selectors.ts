import {createSelector} from '@ngrx/store';
import {clothesAdapter} from '../reducers/items.reducer';
import {getClothesState} from '../reducers/feature.reducers';

export const getClosetState = createSelector(
  getClothesState,
  state => state.closet
);

export const getAllCloset = createSelector(
  getClosetState,
  state => clothesAdapter.getSelectors().selectAll(state)
);

export const getSelectedCloset = createSelector(
  getClosetState,
  state => state.clothes
)
