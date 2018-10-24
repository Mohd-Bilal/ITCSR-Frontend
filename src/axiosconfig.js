import axios from 'axios'
window.axios = axios
window.axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': 'https://localhost:3000',
    'withCredentials': true
}