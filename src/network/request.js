import axios from 'axios'

export function request(config) {
  const instance = axios.create({
      baseURL: "/api",
      timeout: 5000,
      withCredentials:true
    })
    //axios拦截器
  instance.interceptors.request.use(config => {

    return config
  }, err => {

  })

  //响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {

  })
 
  //发烧网络请求
  return instance(config)
}



