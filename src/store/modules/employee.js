import { createAction, handleActions } from 'redux-actions';

const SET_EMPLOYEE_INFO = 'SET_EMPLOYEE_INFO';
const RELOAD_EMPLOYEE_LIST = 'RELOAD_EMPLOYEE_LIST';
const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
const INSERT_EMPLOYEE = 'INSERT_EMPLOYEE';
const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';

export const set_info = createAction(SET_EMPLOYEE_INFO);
export const reload_list = createAction(RELOAD_EMPLOYEE_LIST);
export const delete_item = createAction(DELETE_EMPLOYEE);
export const add_item = createAction(INSERT_EMPLOYEE);
export const update_item = createAction(UPDATE_EMPLOYEE);

const initialState = {
    id: 0,
    employee_name: '',
    employee_salary: '',
    employee_age: '',
    profile_image: '',
    employee_list : []
};

export default handleActions({
    [SET_EMPLOYEE_INFO]: (state, { payload: new_employee_info }) => { 
        return {...state, ...new_employee_info}
    },
    [RELOAD_EMPLOYEE_LIST]: (state, {payload: new_employee_list}) => {
        return {...state, employee_list: new_employee_list}
    },
    [DELETE_EMPLOYEE]: (state, { payload: index }) => {
        const employee_list = state.employee_list;
        return {...state, employee_list: employee_list.filter(info => info.id !== index)}
    },
    [INSERT_EMPLOYEE]: (state, { payload: index }) => {
        return state
    },
    [UPDATE_EMPLOYEE]: (state, { payload: index }) => {
        return state
    }
}, initialState);


