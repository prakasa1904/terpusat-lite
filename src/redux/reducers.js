import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import app from './modules/app';

export default combineReducers({ app, router: routing });
