import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import sections from './sections';
import images from './images';
import sectionIdReducer from './sectionIdReducer';


const rootReducer = combineReducers({ auth, sections, images, sectionIdReducer, routing: routerReducer });

export default rootReducer;