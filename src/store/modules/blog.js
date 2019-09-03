import { createAction, handleActions } from 'redux-actions';

const ADD_ITEM = 'ADD_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';

export const add_item = createAction(ADD_ITEM);
export const update_item = createAction(UPDATE_ITEM, value => value);
export const delete_item = createAction(DELETE_ITEM);

const initialState = {
    child_index: 2,
    subject: '',
    content: '',
    child_blog_list: [
        {index:1, subject:'subject1', content:'content1', status:false, child_blog_list:[], child_index: 0},
        {index:2, subject:'subject2', content:'content2', status:false, child_blog_list:[], child_index: 0},
    ]
};

export default handleActions({
    [ADD_ITEM]: (state, { payload: parent_index }) => { 
        console.log("ADD_ITEM: ", parent_index)
        if (parent_index === 0) {
            const result = {child_index: state.child_index + 1, subject : '', content : '', 
                child_blog_list: state.child_blog_list.concat({index: state.child_index + 1, subject:state.subject, content:state.content, status:false, child_blog_list:[]})}
            console.log(result)
            return result
        } else {
            let result = state.child_blog_list;
            let aaa = getUpdatedObject(result, {method: 'add', blog:{index: parent_index}});
            console.log(aaa, result)
            return {...state, child_index: state.child_index + 1, child_blog_list: result};
        }
    },
    [UPDATE_ITEM]: (state, {payload: item}) => {
        console.log("UPDATE_ITEM:", item)
        if (item['index'] === 0) {
            const result = {...state, ...item}
            return result
        } else {
            let result = state.child_blog_list;
            let aaa = getUpdatedObject(result, {method: 'update', blog:item});
            console.log(aaa, result)
            return {...state, child_index: state.child_index + 1, child_blog_list: result};
        }
    },
    [DELETE_ITEM]: (state, {payload: index}) => {
        let result = state.child_blog_list;
        console.log(index);
        let aaa = getUpdatedObject(result, {method: 'delete', blog:{index: index}});
        console.log(aaa, result)
        return {...state, child_index: state.child_index + 1, child_blog_list: result};
    }
}, initialState);

function getUpdatedObject(theObject, data) {
    //data example:
    //{method:'add', blog:{index:1, subject:'subject1', content:'content1', status:false, child_blog_list:[]}}
    //{method:'update', blog:{index:1, subject:'subject1'}}
    //{method:'update', blog:{index:1, status:true}}
    //{method:'delete', blog:{index:1}
    let result = false;
    if(theObject instanceof Array) {
        for(var i = 0; i < theObject.length; i++) {
            result = getUpdatedObject(theObject[i], data)
            if (result) {
                if (data.method === 'delete' && theObject[i].index === data.blog.index) {
                    theObject.splice(i, 1);
                }
                break;
            }   
        }
    }
    else
    {
        for(var prop in theObject) {
            if(prop === 'index') {
                if(theObject[prop] === data.blog.index) {
                    //here!!!!!!!!!!!!!!!!!!!!!!!!!
                    if (data.method === 'update') {
                        for (var prop1 in data.blog) {
                            theObject[prop1] = data.blog[prop1]
                        }
                    } else if (data.method === 'add') {
                        theObject.child_index ++;
                        theObject.child_blog_list = theObject.child_blog_list.concat({index: theObject.index + '-' + theObject.child_index, subject:'', content:'', status:true, child_blog_list:[], child_index:0})
                    }

                    return true;
                }
            }
            if(theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
                result = getUpdatedObject(theObject[prop], data)
                if (result) {
                    theObject.child_index ++;
                    break;
                }
            } 
        }
    }
    return result;
}