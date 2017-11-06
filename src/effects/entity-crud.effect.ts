import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { actionCreators } from 'ngrx-normalizr';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { schema } from 'normalizr';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { createActions } from '../actions/index';
import { PayloadAction } from '../classes/payload-action';

/**
 * Factory class for creating typed "CRUD" effects.
 */
export class EntityCrudEffect<T> {
	/** The `ngrx-normalizr` actions */
	private normalizrActions: any;
	/** The `ngrx-normalizr-crud` actions */
	private entityActions: any;

	/**
   * Constructs a new class of a typed `CrudEffectFactory`.
   * @param actions$ The actions observable of an `ngrx-store`
   * @param entitySchema The `normalizr` schema to create effects for
   */
	constructor(
		protected actions$: Actions,
		protected entitySchema: schema.Entity
	) {
		this.entityActions = createActions<T>(this.entitySchema);
		this.normalizrActions = actionCreators<T>(this.entitySchema);
	}

	/**
   * Create a typed split effect
   */
	private createEffect<T>(
		actionType: string,
		actionHandler: (action: Action) => Observable<T>,
		successActionCreator: (result: T) => [Action, Action],
		errorActionCreator: (error: any) => Action
	): Observable<Action> {
		return this.actions$.ofType(actionType).switchMap((action: Action) =>
			actionHandler(action)
				.mergeMap((result: T) => successActionCreator(result))
				.catch((error: any) => of(errorActionCreator(error)))
		);
	}

	/**
   * Create an effect which will listen to the `SEARCH` typed action and
   * perform the given action handler. The result will be dispatched to
   * an `ngrx-normalizr AddData` action and a `SearchComplete` action
   * with the handler result as payload. 'SearchComplete' is dispatched
   * with an empty array if any error occurs.
   * @param actionHandler The handler to call for searching entities
   */
	createSearchEffect(
		actionHandler: (action: PayloadAction<any>) => Observable<T[]>
	) {
		return this.createEffect<T[]>(
			this.entityActions.SEARCH,
			actionHandler,
			(result: T[]) => [
				this.normalizrActions.addData(
					Array.isArray(result) ? result : [result]
				),
				new this.entityActions.SearchComplete(result)
			],
			(error: any) => new this.entityActions.SearchComplete([])
		);
	}

	/**
   * Create an effect which will listen to the `CREATE` typed action and
   * perform the given action handler. The result will be dispatched to
   * an `ngrx-normalizr AddData` action and a `CreateSuccess` action
   * with the handler result as payload. 'CreateFail' is dispatched
   * with the error argument of the observables catch handler.
   * @param actionHandler The handler to call for creating entities
   */
	createCreateEffect(
		actionHandler: (action: PayloadAction<T>) => Observable<T>
	) {
		return this.createEffect<T>(
			this.entityActions.CREATE,
			actionHandler,
			(result: T) => [
				this.normalizrActions.addData(
					Array.isArray(result) ? result : [result]
				),
				new this.entityActions.CreateSuccess(result)
			],
			(error: any) => new this.entityActions.CreateFail(error)
		);
	}

	/**
   * Create an effect which will listen to the `UPDATE` typed action and
   * perform the given action handler. The result will be dispatched to
   * an `ngrx-normalizr AddData` action and an `UpdateSuccess` action
   * with the handler result as payload. 'UpdateFail' is dispatched
   * with the error argument of the observables catch handler.
   * @param actionHandler The handler to call for creating entities
   */
	createUpdateEffect(
		actionHandler: (action: PayloadAction<T>) => Observable<T>
	) {
		return this.createEffect<T>(
			this.entityActions.UPDATE,
			actionHandler,
			(result: T) => [
				this.normalizrActions.addData(
					Array.isArray(result) ? result : [result]
				),
				new this.entityActions.UpdateSuccess(result)
			],
			(error: any) => new this.entityActions.UpdateFail(error)
		);
	}

	/**
   * Create an effect which will listen to the `DELETE` typed action and
   * perform the given action handler. The result will be dispatched to
   * an `ngrx-normalizr RemoveData` action and an `DeleteSuccess` action
   * with the handler result as payload. 'DeleteFail' is dispatched
   * with the error argument of the observables catch handler.
   * @param actionHandler The handler to call for deleting an entity
   */
	createDeleteEffect(
		actionHandler: (action: PayloadAction<string>) => Observable<string>
	) {
		return this.createEffect<string>(
			this.entityActions.DELETE,
			actionHandler,
			(result: string) => [
				this.normalizrActions.removeData(result),
				new this.entityActions.DeleteSuccess(result)
			],
			(error: any) => new this.entityActions.DeleteFail(error)
		);
	}
}
