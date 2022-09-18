import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';
//whenever dispatchin an action, before action it hits middlewares(reducer)
const middleWares = [logger];//plugin na console.log

const composedEnhancers = compose(applyMiddleware(...middleWares));
                        //it is way for us to pass multiple functions
// REDUX STORE 
export const store = createStore(rootReducer, undefined, composedEnhancers);