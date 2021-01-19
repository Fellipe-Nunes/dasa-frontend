import axios from 'axios'
import { getToken } from './auth'

const clientHttp = axios.create({
    baseURL: process.env.NODE_ENV ==='development'
    ? `http://localhost:3001`
    : process.env.REACT_APP_API
})

clientHttp.defaults.headers['Content-Type'] = 'application/json'

if (getToken()) {
    clientHttp.defaults.headers['x-auth-token'] = getToken()
}


export {
    clientHttp
}
