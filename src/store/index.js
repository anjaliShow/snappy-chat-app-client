import { createStore, compose, combineReducers, applyMiddleware } from "redux";

import ThunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({});

const middleware = [ThunkMiddleware];

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware)
    // window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_()
  )
);

export default store;
