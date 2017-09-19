import { schema } from 'normalizr';

import { ActionNameFactory } from '../classes/action-name-factory';
import { SearchActionNames } from '../actions/search.actions';
import { CreateActionNames } from '../actions/create.actions';
import { UpdateActionNames } from '../actions/update.actions';
import { DeleteActionNames } from '../actions/delete.actions';

export interface NormalizedEntityState {
	loading: boolean;
	selectedId: string;
	query: any;
	error: any;
}

export const initialEntityState: NormalizedEntityState = {
	loading: false,
	selectedId: null,
	query: '',
	error: null
};

export function createReducer(
	entitySchema: schema.Entity,
	initialState: NormalizedEntityState = initialEntityState
) {
	const actionMap: any = Object.entries({
		...SearchActionNames,
		...CreateActionNames,
		...UpdateActionNames,
		...DeleteActionNames
	}).reduce((p, [key, value]) => {
		(p as { [key: string]: string })[key] = ActionNameFactory.getActionName(
			value,
			entitySchema.key
		);
		return p;
	}, {});

	return function entityStateReducer(
		state = initialState,
		action: any
	): NormalizedEntityState {
		switch (action.type) {
			case actionMap.LOAD: {
				return {
					...state,
					loading: true
				};
			}

			case actionMap.SELECT: {
				return {
					...state,
					selectedId: action.payload
				};
			}

			case actionMap.UPDATE: {
				return {
					...state,
					loading: true,
					error: false
				};
			}

			case actionMap.SEARCH: {
				const query = action.payload;

				if (query === '') {
					return {
						...state,
						loading: false,
						query
					};
				}

				return {
					...state,
					query,
					loading: true
				};
			}

			case actionMap.SEARCH_COMPLETE: {
				return {
					...state,
					loading: false
				};
			}

			case actionMap.CREATE_SUCCESS: {
				return {
					...state,
					loading: false,
					error: false
				};
			}

			case actionMap.UPDATE_SUCCESS: {
				return {
					...state,
					loading: false,
					error: false
				};
			}

			case actionMap.DELETE_SUCCESS: {
				let selectedId = state.selectedId;
				if (selectedId === action.payload) {
					selectedId = null;
				}
				return {
					...state,
					selectedId,
					loading: false,
					error: false
				};
			}

			case actionMap.CREATE_FAIL:
			case actionMap.DELETE_FAIL:
			case actionMap.UPDATE_FAIL: {
				return {
					...state,
					loading: false,
					error: action.payload
				};
			}

			default:
				return state;
		}
	};
}
