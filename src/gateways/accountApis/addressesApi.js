import axios from 'axios'
export default axios.create({
    baseURL: 'http://node1.blackseachain.com:8080/api/node/address',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})