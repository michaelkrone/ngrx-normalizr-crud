import { Action } from '@ngrx/store';

/**
 * Interface for actions with a typed payload
 */
export interface PayloadAction<T> extends Action {
	readonly type: string;
	payload: T;
}
