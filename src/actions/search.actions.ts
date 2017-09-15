import { ActionNameFactory } from '../classes/action-name-factory';
import { PayloadAction } from '../classes/payload-action';

/**
 * Interface for search action names
 */
export interface SearchActionNames {
	/**
   * Defining the type of the `SEARCH` action type
   */
	SEARCH: string;

	/**
   * Defining the type of the `SEARCH_COMPLETE` action type
   */
	SEARCH_COMPLETE: string;

	/**
   * Defining the type of the `LOAD` action type
   */
	LOAD: string;

	/**
   * Defining the type of the `SELECT` action type
   */
	SELECT: string;
}

/**
 * Interface for `createSearchActions` return type
 */
export interface SearchActions<T> extends SearchActionNames {
	/**
   * Type of the `Search` action
   */
	Search: new (payload?: any) => PayloadAction<any>;

	/**
   * Type of the `SearchComplete` action
   */
	SearchComplete: new (payload: T[]) => PayloadAction<T[]>;

	/**
   * Type of the `Load` action
   */
	Load: new (payload: T) => PayloadAction<T>;

	/**
   * Type of the `Select` action
   */
	Select: new (payload: string) => PayloadAction<string>;
}

/**
 * Action name constants
 */
export const SearchActionNames: SearchActionNames = {
	/**
   * Value of the `SEARCH` action type
   */
	SEARCH: 'Search',

	/**
   * Value of the `SEARCH_COMPLETE` action type
   */
	SEARCH_COMPLETE: 'Search Complete',

	/**
   * Value of the `LOAD` action type
   */
	LOAD: 'Load',

	/**
   * Value of the `SELECT` action type
   */
	SELECT: 'Select'
};

/**
 * Action class and type factory function for "search" actions. Returns an object of
 * action classes and type strings. This actions are handled by the `NormalizedEntityState`
 * reducer and the effects created by the `CrudEffectsFactory`.
 * @param ns The namespace to use for creating action type constants
 */
export function createSearchActions<T>(ns: string): SearchActions<T> {
	const SEARCH = ActionNameFactory.getActionName(SearchActionNames.SEARCH, ns);
	const SEARCH_COMPLETE = ActionNameFactory.getActionName(
		SearchActionNames.SEARCH_COMPLETE,
		ns
	);
	const LOAD = ActionNameFactory.getActionName(SearchActionNames.LOAD, ns);
	const SELECT = ActionNameFactory.getActionName(SearchActionNames.SELECT, ns);

	class Search implements PayloadAction<any> {
		readonly type = SEARCH;
		constructor(public payload: any | undefined) {}
	}

	class SearchComplete implements PayloadAction<T[]> {
		readonly type = SEARCH_COMPLETE;
		constructor(public payload: T[]) {}
	}

	class Load implements PayloadAction<T> {
		readonly type = LOAD;
		constructor(public payload: T) {}
	}

	class Select implements PayloadAction<string> {
		readonly type = SELECT;
		constructor(public payload: string) {}
	}

	return {
		Search,
		SEARCH,
		SearchComplete,
		SEARCH_COMPLETE,
		Load,
		LOAD,
		Select,
		SELECT
	};
}
