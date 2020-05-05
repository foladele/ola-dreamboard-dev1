import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import sections from './sections';
import images from './images';
import image from './image';
import sectionIdReducer from './sectionIdReducer';
import imageId from './imageId';
import textId from './textId';


const rootReducer = combineReducers({ auth, sections, images, image, imageId, textId, sectionIdReducer, routing: routerReducer });

export default rootReducer;