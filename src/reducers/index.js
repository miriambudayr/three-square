import { combineReducers } from 'redux';
import instruments from './instruments';
import globalControls from './globalControls';
import palette from './palette';

export default combineReducers({ instruments, globalControls, palette });
