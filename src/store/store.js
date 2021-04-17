import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import newsReducer from '../reducers/news';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    news: newsReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
