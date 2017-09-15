import { ActionNameFactory } from '../classes/action-name-factory';
import { PayloadAction } from '../classes/payload-action';

/**
 * Interface for create action names
 */
export interface EntityCreateActionNames {
	/**
   * Defining the type of the `CREATE` action type
   */
	CREATE: string;

	/**
   * Defining the type of the `CREATE_SUCCESS` action type
   */
	CREATE_SUCCESS: string;

	/**
   * Defining the type of the `CREATE_FAIL` action type
   */
	CREATE_FAIL: string;
}

/**
 * Interface for `createCreateActions` return type
 */
export interface CreateActions<T> extends EntityCreateActionNames {
	/**
   * Type of the `Create` action
   */
	Create: new (payload: T) => PayloadAction<T>;

	/**
   * Type of the `CreateSuccess` action
   */
	CreateSuccess: new (payload: T) => PayloadAction<T>;

	/**
   * Type of the `CreateFail` action
   */
	CreateFail: new (payload?: any) => PayloadAction<any>;
}

/**
 * Action name constants
 */
export const CreateActionNames: EntityCreateActionNames = {
	/**
   * Value of the `CREATE` action type
   */
	CREATE: 'Create',

	/**
   * Value of the `CREATE_SUCCESS` action type
   */
	CREATE_SUCCESS: 'Create Success',

	/**
   * Value of the `CREATE_FAIL` action type
   */
	CREATE_FAIL: 'Create Fail'
};

/**
 * Action class and type factory function for "create" actions. Returns an object of
 * action classes and type strings. This actions are handled by the `NormalizedEntityState`
 * reducer and the effects created by the `CrudEffectsFactory`.
 * @param ns The namespace to use for creating action type constants
 */
export function createCreateActions<T>(ns: string): CreateActions<T> {
	const CREATE = ActionNameFactory.getActionName(CreateActionNames.CREATE, ns);
	const CREATE_SUCCESS = ActionNameFactory.getActionName(
		CreateActionNames.CREATE_SUCCESS,
		ns
	);
	const CREATE_FAIL = ActionNameFactory.getActionName(
		CreateActionNames.CREATE_FAIL,
		ns
	);

	class Create implements PayloadAction<T> {
		readonly type = CREATE;
		constructor(public payload: T) {}
	}

	class CreateSuccess implements PayloadAction<T> {
		readonly type = CREATE_SUCCESS;
		constructor(public payload: T) {}
	}

	class CreateFail implements PayloadAction<any> {
		readonly type = CREATE_SUCCESS;
		constructor(public payload: any | undefined) {}
	}

	return {
		Create,
		CREATE,
		CreateSuccess,
		CREATE_SUCCESS,
		CreateFail,
		CREATE_FAIL
	};
}
