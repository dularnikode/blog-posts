import * as actionTypes from '../Actions/actionTypes';

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