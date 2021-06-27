import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-c8335-default-rtdb.firebaseio.com/'
});

export default instance;