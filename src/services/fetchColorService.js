import {axiosWithAuth} from '../helpers/axiosWithAuth';

const fetchColorService = () => {
    return axiosWithAuth().get('http://localhost:5000/api/colors');
}

export default fetchColorService;