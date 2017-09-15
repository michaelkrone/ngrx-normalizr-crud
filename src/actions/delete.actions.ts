import { ActionNameFactory } from '../classes/action-name-factory';
import { PayloadAction } from '../classes/payload-action';

/**
 * Interface for delete action names
 */
export interface EntityDeleteActionNames {
	/**
   * Defining the type of the `DELETE` action type
   */
	DELETE: string;

	/**
   * Defining the type of the `DELETE_SUCCESS` action type
   */
	DELETE_SUCCESS: string;

	/**
   * Defining the type of the `DELETE_FAIL` action type
   */
	DELETE_FAIL: string;
}

/**
 * Interface for `createDeleteActions` return type
 */
export interface DeleteActions extends EntityDeleteActionNames {
	/**
   * Type of the `Delete` action
   */
	Delete: new (payload: string) => PayloadAction<string>;

	/**
   * Type of the `DeleteSuccess` action
   */
	DeleteSuccess: new (payload: any) => PayloadAction<any>;

	/**
   * Type of the `DeleteFail` action
   */
	DeleteFail: new (payload?: any) => PayloadAction<any>;
}

/**
 * Action name constants
 */
export const DeleteActionNames: EntityDeleteActionNames = {
	/**
   * Value of the `DELETE` action type
   */
	DELETE: 'Delete',

	/**
   * Value of the `DELETE_SUCCESS` action type
   */
	DELETE_SUCCESS: 'Delete Success',

	/**
   * Value of the `DELETE_FAIL` action type
   */
	DELETE_FAIL: 'Delete Fail'
};

/**
 * Action class and type factory function for "delete" actions. Returns an object of
 * action classes and type strings. This actions are handled by the `NormalizedEntityState`
 * reducer and the effects created by the `CrudEffectsFactory`.
 * @param ns The namespace to use for creating action type constants
 */
export function createDeleteActions(ns: string): DeleteActions {
	const DELETE = ActionNameFactory.getActionName(DeleteActionNames.DELETE, ns);
	const DELETE_SUCCESS = ActionNameFactory.getActionName(
		DeleteActionNames.DELETE_SUCCESS,
		ns
	);
	const DELETE_FAIL = ActionNameFactory.getActionName(
		DeleteActionNames.DELETE_FAIL,
		ns
	);

	class Delete implements PayloadAction<string> {
		readonly type = DELETE;
		constructor(public payload: string) {}
	}

	class DeleteSuccess implements PayloadAction<any> {
		readonly type = DELETE_SUCCESS;
		constructor(public payload: any | undefined) {}
	}

	class DeleteFail implements PayloadAction<any> {
		readonly type = DELETE_SUCCESS;
		constructor(public payload: any | undefined) {}
	}
	return {
		Delete,
		DELETE,
		DeleteSuccess,
		DELETE_SUCCESS,
		DeleteFail,
		DELETE_FAIL
	};
}
