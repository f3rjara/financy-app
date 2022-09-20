import { createReducer, on } from '@ngrx/store';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import * as financy  from './financy.actions'


export interface State {
  items: IngresoEgreso[]; 
}

export const initialState: State = { items: [] };

const _financyReducer = createReducer(
  initialState,
  on( financy.setRegisters, (state, { items }) => ( { ...state, items: [ ...items] })),
  on( financy.unsetRegisters, state => ( { ...state, items: [] }) ),
);

export function financyReducer( state, action ) {
    return _financyReducer( state, action );
}