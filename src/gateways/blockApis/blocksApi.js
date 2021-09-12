import axios from 'axios'
export default axios.create({
    baseURL: 'http://node1.blackseachain.com:8080/api/node/blocks',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})