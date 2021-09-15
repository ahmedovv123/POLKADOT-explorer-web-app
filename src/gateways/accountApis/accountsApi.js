import axios from 'axios'

export default axios.create({
    baseURL: 'http://node1.blackseachain.com:8080/api/node/accounts',
    headers: {
        'Content-Type': 'application/json'
    }
})