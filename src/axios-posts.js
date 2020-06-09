import axios from 'axios';

const instance = axios.create({
    baseURL:'https://blog-post-d6727.firebaseio.com/'
});

export default instance;