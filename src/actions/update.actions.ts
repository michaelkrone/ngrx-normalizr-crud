import { ActionNameFactory } from '../classes/action-name-factory';
import { PayloadAction } from '../classes/payload-action';

/**
 * Interface for update action names
 */
export interface UpdateActionNames {
	/**
   * Defining the type of the `UPDATE` action type
   */
	UPDATE: string;

	/**
   * Defining the type of the `UPDATE_SUCCESS` action type
   */
	UPDATE_SUCCESS: string;

	/**
   * Defining the type of the `UPDATE_FAIL` action type
   */
	UPDATE_FAIL: string;
}

/**
 * Interface for `createUpdateActions` return type
 */
export interface UpdateActions<T> extends UpdateActionNames {
	/**
   * Type of the `Update` action
   */
	Update: new (payload: T) => PayloadAction<T>;

	/**
   * Type of the `UpdateSuccess` action
   */
	UpdateSuccess: new (payload: T) => PayloadAction<T>;

	/**
   * Type of the `UpdateFail` action
   */
	UpdateFail: new (payload?: any) => PayloadAction<any>;
}

/**
 * Action name constants
 */
export const UpdateActionNames: UpdateActionNames = {
	/**
   * Value of the `UPDATE` action type
   */
	UPDATE: 'Update',

	/**
   * Value of the `UPDATE_SUCCESS` action type
   */
	UPDATE_SUCCESS: 'Update Success',

	/**
   * Value of the `UPDATE_FAIL` action type
   */
	UPDATE_FAIL: 'Update Fail'
};

/**
 * Action class and type factory function for "update" actions. Returns an object of
 * action classes and type strings. This actions are handled by the `NormalizedEntityState`
 * reducer and the effects created by the `CrudEffectsFactory`.
 * @param ns The namespace to use for creating action type constants
 */
export function createUpdateActions<T>(ns: string): UpdateActions<T> {
	const UPDATE = ActionNameFactory.getActionName(UpdateActionNames.UPDATE, ns);
	const UPDATE_SUCCESS = ActionNameFactory.getActionName(
		UpdateActionNames.UPDATE_SUCCESS,
		ns
	);
	const UPDATE_FAIL = ActionNameFactory.getActionName(
		UpdateActionNames.UPDATE_FAIL,
		ns
	);

	class Update implements PayloadAction<T> {
		readonly type = UPDATE;
		constructor(public payload: T) {}
	}

	class UpdateSuccess implements PayloadAction<T> {
		readonly type = UPDATE_SUCCESS;
		constructor(public payload: T) {}
	}

	class UpdateFail implements PayloadAction<any> {
		readonly type = UPDATE_SUCCESS;
		constructor(public payload: any | undefined) {}
	}

	return {
		Update,
		UPDATE,
		UpdateSuccess,
		UPDATE_SUCCESS,
		UpdateFail,
		UPDATE_FAIL
	};
}
