import { ActionReducerMap } from '@ngrx/store';
import * as ui from './ui/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as financy from './financy/financy.reducer';


export interface AppState {
  ui: ui.State;
  user: auth.State;
  financy: financy.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  user: auth.authReducer,
  financy: financy.financyReducer
}