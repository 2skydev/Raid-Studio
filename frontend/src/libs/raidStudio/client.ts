import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'

const raidStudioClient = axios.create({
  baseURL: '/api',
})

export default raidStudioClient
