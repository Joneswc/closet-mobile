import {Action, createReducer, on} from '@ngrx/store';
import {createItem, DeleteItem, selectClothes, unselectClothes, updateClothesList, UpdateItem} from '../actions/items.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {Clothes} from '../../model/clothes.model';

export const clothesAdapter = createEntityAdapter<Clothes>({
  // selectId: clothes => clothes.id, // seleciona id dado a entidade
  sortComparer: (a: Clothes, b: Clothes) => a.name.localeCompare(b.name),
})

export interface ClosetState extends EntityState<Clothes> {
  // closet: Clothes[];
  clothes?: Clothes;
}

// linhas 17 a 22, só pra começar com algum valor
// const pog = [
//   {id: 1, name: 'Boné'},
//   {id: 2, name: 'Camiseta'},
//   {id: 3, name: 'Calça Jeans'},
//   {id: 4, name: 'Meia'},
// ]

// const initialState = clothesAdapter.addAll(pog, clothesAdapter.getInitialState());

const initialState = clothesAdapter.getInitialState();

const reducer = createReducer(
  initialState,
  on(updateClothesList, (state, {clothes}) => clothesAdapter.addAll(clothes, state) ),
  on(selectClothes, (state, {clothes}) => ({...state, clothes})  ),
  on(unselectClothes, UpdateItem, (state: ClosetState) => {
    const {clothes, ...rest} = state;
    return rest;
  }),
  on(createItem, (state, {clothes}) => clothesAdapter.addOne(clothes, state) ),
  on(DeleteItem, (state, {id}) => clothesAdapter.removeOne(id, state))
);

export function reducerCloset(state: ClosetState, action: Action) {
  return reducer(state, action);
}
