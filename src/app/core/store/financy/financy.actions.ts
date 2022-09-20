import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';

export const unsetRegisters  = createAction('[Financy] unsetRegisters');
export const setRegisters  = createAction('[Financy] setRegisters', props<{ items: IngresoEgreso[] }>() );