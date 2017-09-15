import { actionCreators, NormalizeActionCreators } from 'ngrx-normalizr';

import { schema } from 'normalizr';

import { createCreateActions, CreateActions } from './create.actions';
import { createUpdateActions, UpdateActions } from './update.actions';
import { createDeleteActions, DeleteActions } from './delete.actions';
import { createSearchActions, SearchActions } from './search.actions';

/**
 * Interface for `createActions` return type
 */
export interface CrudEntityActions<T>
	extends SearchActions<T>,
		CreateActions<T>,
		UpdateActions<T>,
		DeleteActions,
		NormalizeActionCreators<T> {}

/**
 * Create "Search", "Create", "Update" and "Delete" actions and types for the given
 * schema.  This actions are handled by the  by the `NormalizedEntityState` reducer
 * and the effects created by the `CrudEffectsFactory`. Export these actions together
 * with custom state actions.
 *
 * For convinience the `ngrx-normalizr` addData`, `setData` and `removeData` action
 * creators are exported together with the CRUD actions.
 * @param entitySchema The schema to create CRUD actions for
 */
export function createActions<T>(
	entitySchema: schema.Entity
): CrudEntityActions<T> {
	const normalizrActions = actionCreators<T>(entitySchema);
	return {
		...createSearchActions<T>(entitySchema.key),
		...createUpdateActions<T>(entitySchema.key),
		...createDeleteActions(entitySchema.key),
		...createCreateActions<T>(entitySchema.key),
		addData: normalizrActions.addData,
		setData: normalizrActions.setData,
		removeData: normalizrActions.removeData
	};
}
