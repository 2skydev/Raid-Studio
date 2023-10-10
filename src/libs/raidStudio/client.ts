import axios from 'axios'

const raidStudioClient = axios.create({
  baseURL: '/api',
})

export default raidStudioClient
