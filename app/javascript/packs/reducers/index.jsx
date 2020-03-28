import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import sections from './sections';

const rootReducer = combineReducers({ auth, sections, routing: routerReducer });

export default rootReducer;