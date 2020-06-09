import * as actionTypes from '../Actions/actionTypes';
import {updateObject} from '../../Shared/Utility';


const initialState={
    token:null,
    userId:null,
    error:null,
    loading:false,
    authRedirectPath :'/'
}


const logout = (state,action)=>{
    return updateObject(state,{token:null,userId:null});
}
const loginStart = (state,action)=>{
    return updateObject(state,{error:null,loading:true});
}
const loginSucess = (state,action)=>{
    return updateObject(state,{
        token:action.idToken,
        userId:action.userId,
        error:null,
        loading:false
    })
};

const loginFail =(state,action)=>{

    return updateObject(state,{
        error:action.error,
        loading:false
    });
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.LOGIN_START:
            return loginStart(state,action);
        case actionTypes.LOGIN_SUCCESS:
            return loginSucess(state,action);
        case actionTypes.LOGIN_FAIL:
            return loginFail(state,action);
        case actionTypes.LOGOUT:
            return logout(state,action);
        default :
            return state;
    }
};

export default reducer;

