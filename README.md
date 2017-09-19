# WIP: ngrx-normalizr-crud

[![Build Status](https://travis-ci.org/michaelkrone/ngrx-normalizr-crud.svg?branch=master)](https://travis-ci.org/michaelkrone/ngrx-normalizr-crud)
![AOT compatible](https://img.shields.io/badge/aot-compatible-blue.svg)

> Actions, effects, reducers, selectors and guards for [ngrx-normalizr](https://github.com/michaelkrone/ngrx-normalizr).

This package provides a set of Actions, effects, reducers, selectors and guards for using [ngrx-normalizr](https://github.com/michaelkrone/ngrx-normalizr)
entity states.

## Installation
To install this package:
```sh
yarn add ngrx-normalizr-crud
npm i ngrx-normalizr-crud
```

### Peer dependencies
*ngrx-normalizr-crud* uses `@ngrx/store` and `ngrx-normalizer` as peer dependencies, so you need to install them if not present already:

```sh
yarn add @ngrx/store ngrx-normalizer
npm i @ngrx/store ngrx-normalizer
```
## Usage
Also refer to the [Typedoc documentation](https://michaelkrone.github.io/ngrx-normalizr-crud/).

##### reducer.ts
```javascript
import { createReducer, NormalizedEntityState, initialEntityState } from 'ngrx-normalizr-crud';

const entityReducer = createReducer(userSchema);

export function reducer(
	state: NormalizedEntityState = initialEntityState,
	action: any
) {
  // do any reducer logic for your state or in this case
  // simply return the result of the entity reducer
	return entityReducer(state, action);
}
```

##### selectors
```javascript
import { createSelectors } from 'ngrx-normalizr-crud';
import { User, userSchema } from '../classes/user';

// create an entity state selector
const featureSelector = createFeatureSelector<State>('users');
const getUserEntityState = createSelector(
  featureSelector,
  (state: State) => state.userEntity
);

export const entitySelectors = {
  // pass the entity state selector
  ...createSelectors<User>(userSchema, getUserEntityState)
};
```
##### actions.ts
```javascript
import { createActions } from 'ngrx-normalizr-crud';
import { User, userSchema } from '../classes/user';

export const actions = createActions<User>(userSchema);
```

##### effects.ts
```javascript
import { EntityCrudEffect } from 'ngrx-normalizr-crud';
import { User, userSchema } from '../classes/user';

@Injectable()
export class UserCrudEffects extends EntityCrudEffect<User> {

  constructor(private actions$: Actions, private http: HttpClient) {
    super(actions$, userSchema);
  }

  // use createSearchEffect, createUpdateEffect ...
  @Effect()
	searchEffect$ = this.createSearchEffect(
    action => this.http.get('/users')
	);

  // ...
}
```

## State properties
```
loading: boolean;
selectedId: string;
query: any;
error: any;
```

## Selectors
```
getSelectedId: MemoizedSelector<object, NormalizedEntityState['selectedId']>;
getLoading: MemoizedSelector<object, NormalizedEntityState['loading']>;
getIds: MemoizedSelector<object, NormalizedEntityState['selectedId'][]>;
getQuery: MemoizedSelector<object, NormalizedEntityState['query']>;
getError: MemoizedSelector<object, NormalizedEntityState['error']>;
getEntities: MemoizedSelector<{}, T[]>;
getSelectedEntity: MemoizedSelector<any, T>;
```
## Meta

Michael Krone – [@DevDig](https://twitter.com/DevDig) – michael.krone@outlook.com

Distributed under the MIT license. See [``LICENSE``](https://github.com/michaelkrone/ngrx-normalizr-crud/blob/master/LICENSE) for more information.

[https://github.com/michaelkrone/ngrx-normalizr](https://github.com/michaelkrone/ngrx-normalizr-crud)

## Contributing

1. Fork it (<https://github.com/michaelkrone/ngrx-normalizr-crud>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new [Pull Request](https://github.com/michaelkrone/ngrx-normalizr-crud/compare?expand=1)
