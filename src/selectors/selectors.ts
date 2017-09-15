import { MemoizedSelector, createSelector } from '@ngrx/store';
import { createSchemaSelectors } from 'ngrx-normalizr';
import { schema } from 'normalizr';
import { NormalizedEntityState } from '../reducers/reducer';

export interface EntityStateSelectors<T> {
	getSelectedId: MemoizedSelector<object, NormalizedEntityState['selectedId']>;
	getLoading: MemoizedSelector<object, NormalizedEntityState['loading']>;
	getIds: MemoizedSelector<object, NormalizedEntityState['ids']>;
	getQuery: MemoizedSelector<object, NormalizedEntityState['query']>;
	getError: MemoizedSelector<object, NormalizedEntityState['error']>;
	getEntities: MemoizedSelector<{}, T[]>;
	getSelectedEntity: MemoizedSelector<any, T>;
}

export function createSelectors<T>(
	schema: schema.Entity,
	stateSelector: MemoizedSelector<object, NormalizedEntityState>
): EntityStateSelectors<T> {
	const schemaSelectors = createSchemaSelectors<T>(schema);
	const _getLoading = (state: NormalizedEntityState) => state.loading;
	const _getSelectedId = (state: NormalizedEntityState) => state.selectedId;
	const _getIds = (state: NormalizedEntityState) => state.ids;
	const _getQuery = (state: NormalizedEntityState) => state.query;
	const _getError = (state: NormalizedEntityState) => state.error;

	const getLoading = createSelector(stateSelector, _getLoading);
	const getSelectedId = createSelector(stateSelector, _getSelectedId);
	const getIds = createSelector(stateSelector, _getIds);
	const getQuery = createSelector(stateSelector, _getQuery);
	const getError = createSelector(stateSelector, _getError);
	const getEntities = schemaSelectors.getEntities;

	const getSelectedEntity = createSelector(
		schemaSelectors.getNormalizedEntities,
		getSelectedId,
		schemaSelectors.entityProjector
	);

	return {
		getLoading,
		getSelectedId,
		getIds,
		getQuery,
		getError,
		getEntities,
		getSelectedEntity
	};
}
