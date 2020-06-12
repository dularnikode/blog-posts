import * as actionTypes from './actionTypes';
import axios from 'axios';
export const loginStart = () =>{
    return {
        type:actionTypes.LOGIN_START
    };
};

export const loginSuccess=(idToken,userId)=>{
    return {
        type:actionTypes.LOGIN_SUCCESS,
        idToken:idToken,
        userId:userId
    };
};

export const loginFail=(error)=>{
    return {
        type:actionTypes.LOGIN_FAIL,
        error:error
    };
};

export const logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type:actionTypes.LOGOUT
    }
};

export const checkLoginTimeout=(expirationTime)=>{
    return dispatch=>{
        setTimeout(()=>{        
            dispatch(logout());
        },expirationTime*1000);
    }
}

export const login=(email,password)=>{
    return dispatch =>{
        dispatch(loginStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        };

        const url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD_EX_2mlQiXSteqNxe6fPjEfsECnAlNkc';
        axios.post(url,authData)
        .then(response=>{
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn*1000);
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('userId',response.data.localId);
            dispatch(loginSuccess(response.data.idToken,response.data.localId));
            dispatch(checkLoginTimeout(response.data.expiresIn));
        })
        .catch(err=>{
            console.dir(err);
            dispatch(loginFail(err.response.data.error));
        }
        );
    };
};

export const relogAfterRefresh=(token,userId)=>{
    return dispatch =>{ dispatch(loginSuccess(token,userId))};
}

export const authCheckState=() => {
    return dispatch =>{
        const token=localStorage.getItem('token');
        if(!token) {
            dispatch(logout());
        }else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                dispatch(logout());
            }else {
                const userId =localStorage.getItem('userId');
                dispatch(loginSuccess(token,userId));
                dispatch(checkLoginTimeout((expirationDate.getTime()-new Date().getTime()) / 1000));
            }
        }
    };
};







