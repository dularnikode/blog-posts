import axios from './axios-posts';

export const deletePost=(authtoken,deleteId)=>{
   return axios.delete(`posts/${deleteId}.json?auth=${authtoken}`);
};

export const createPost=(authtoken,postData)=>{

    return axios.post(`/posts.json?auth=${authtoken}`,postData);
}

export const updatePost=(authtoken,updateId,updatedPost)=>{
    return axios.patch(`posts/${updateId}.json?auth=${authtoken}`,updatedPost)
}

export const loginToBlogPost=(authData)=>{
    const url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD_EX_2mlQiXSteqNxe6fPjEfsECnAlNkc';
    return axios.post(url,authData);
} 

export const fetchAllPosts=(authtoken,userId)=>{
    return axios.get(`/posts.json?auth=${authtoken}&orderBy="userId"&equalTo="${userId}"`)
}