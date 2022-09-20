import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const setUser = createAction( '[User Auth] setUser', props<{ user: User }>() );
export const unSetUser = createAction( '[User Auth] unSetUser');