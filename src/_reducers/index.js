import {combineReducers} from 'redux';

import {alert} from './alert.reducer';
import {login} from './login.reducer';
import {users} from "./users.reducer";
import {questionCreate} from "./questionCreate.reducer";

const rootReducer = combineReducers({
    alert,
    login,
    users,
    questionCreate
});

export default rootReducer;