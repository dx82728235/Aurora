import axios from 'axios'
import { ElMessageBox } from 'element-plus';

const API = axios.create({
  timeout: 5000, // 请求超时时间
  baseURL: 'http://localhost:8085',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
// 添加请求拦截器
API.interceptors.request.use(config => {
  console.log(config)
  return config
})
// 添加响应拦截器
API.interceptors.response.use(response => {
  console.log(response)
  return response.data
}, error => {
  console.log('Response: error', error)
  const msg = error.Message !== undefined ? error.Message : ''
  ElMessageBox(msg)
  return Promise.reject(error)
})

export default API;
