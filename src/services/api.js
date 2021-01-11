import axios from 'axios';
// BaseUrl: https://free.currconv.com/api/v7/
// convert?q=USD_PHP&compact=ultra&apiKey=27ec126542f85043b769

const api = axios.create({
baseURL:'https://free.currconv.com/api/v7'
});

export default api;