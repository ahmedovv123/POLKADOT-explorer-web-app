import axios from 'axios'

export default axios.create({
    baseURL: 'http://node1.blackseachain.com:8080/api/node/transactions',
    headers: {
        'Content-Type': 'application/json'
    }
})