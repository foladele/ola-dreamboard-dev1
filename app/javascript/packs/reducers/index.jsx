import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import sections from './sections';
import images from './images';


const rootReducer = combineReducers({ auth, sections, images, routing: routerReducer });

export default rootReducer;