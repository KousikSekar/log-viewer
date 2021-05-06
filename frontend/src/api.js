import axios from 'axios';

const baseURL = 'http://10.174.10.11:8787/logs/'

export const getLogsByServiceName = (service) => {
    return axios.get(baseURL + service)
}