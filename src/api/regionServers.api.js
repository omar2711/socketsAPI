import axios from 'axios';

export const getRegionServers = () => {
    return axios.get('http://127.0.0.1:8000/api/v1/regionserver');
    }