import {ClosetState, reducerCloset} from './items.reducer';
import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

export interface ClothesState {
  closet: ClosetState;
}

export const clothesReducer: ActionReducerMap<ClothesState> = {
  closet: reducerCloset
};

export const getClothesState = createFeatureSelector<ClothesState>(
  'clothes'
);
