import axios from 'axios'

const client = axios.create({
  baseURL: 'http://cdc-react.herokuapp.com/api/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export default client