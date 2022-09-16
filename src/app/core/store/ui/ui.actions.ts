import { createAction } from '@ngrx/store';

export const isLoading    = createAction('[UI Auth] isLoading');
export const stopLoading  = createAction('[UI Auth] stopLoading');