import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import salaReducer from './reducers/sala';

const reducers = combineReducers({
  sala: salaReducer,
});

const storeConfig = () => {
  // return createStore(reducers, compose(applyMiddleware(thunk)));
  return createStore(reducers);
};

export default storeConfig;
