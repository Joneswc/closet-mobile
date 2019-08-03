import {Clothes} from '../../../model/clothes.model';
import {Action, createReducer, on} from '@ngrx/store';
import {createItem, DeleteItem, selectClothes, unselectClothes, UpdateItem} from '../actions/items.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';

export const clothesAdapter = createEntityAdapter<Clothes>({
  // selectId: clothes => clothes.id, // seleciona id dado a entidade
  sortComparer: (a: Clothes, b: Clothes) => a.name.localeCompare(b.name),
})

export interface ClosetState extends EntityState<Clothes> {
  // closet: Clothes[];
  clothes?: Clothes;
}

// linhas 17 a 22, só pra começar com algum valor
const pog = [
  {id: 1, name: 'Boné'},
  {id: 2, name: 'Camiseta'},
  {id: 3, name: 'Calça Jeans'},
  {id: 4, name: 'Meia'},
]
const initialState = clothesAdapter.addAll(pog, clothesAdapter.getInitialState());

// const initialState = clothesAdapter.getInitialState();

const reducer = createReducer(
  initialState,
  on(selectClothes, (state, {clothes}) => ({...state, clothes})  ),
  on(unselectClothes, (state: ClosetState) => {
    const {clothes, ...rest} = state;
    return rest;
  }),
  on(createItem, (state, {clothes}) => clothesAdapter.addOne(clothes, state) ),
  on(UpdateItem, (state, {clothes}) =>
    clothesAdapter.updateOne({id: clothes.id, changes: clothes}, state)
  ),
  on(DeleteItem, (state, {id}) => clothesAdapter.removeOne(id, state))
);

export function reducerCloset(state: ClosetState, action: Action) {
  return reducer(state, action);
}
