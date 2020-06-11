import * as actionTypes from '../Actions/actionTypes';
//import {updateObject} from '../../Shared/Utility';

const initialState={
    activeState:'posts'
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.CHANGE_ACTIVE_STATE:
            return{
                ...state,
                activeState:action.ActiveState
            };
        default:
            return state;
    }
}

export default reducer;