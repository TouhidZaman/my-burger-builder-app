import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-react-burger-app-b9166.firebaseio.com'
})

instance.defaults.headers.common['Authorization'] = 'Touhid'

export default instance