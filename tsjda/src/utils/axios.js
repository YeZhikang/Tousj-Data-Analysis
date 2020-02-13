import axios from 'axios'
import qs from 'qs'

// 创建 axios 实例 开发域名
const service = axios.create({
  baseURL: 'http://172.31.231.91/khsrv/',
  timeout: 6000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

//配置url
switch(process.env.NODE_ENV){
  case "production":
    service.defaults.baseURL = "http://121.43.155.100:8081/";
    break;
  case "development":
    service.defaults.baseURL = "http://127.0.0.1:5000";
    break;
  default:
    service.defaults.baseURL = "http://127.0.0.1:5000"
}

//配置相应拦截器
service.interceptors.response.use((res)=>{
  //一般只要把返回数据拿出来即可。避免每次都取数据要点data
  return res.data
},err=>{
  let {response}=err
  if(response){//有结果
    switch(response.status){
      case 401://请求需要验证
        break;
      case 403://一般为token session过期，服务器拒绝
        localStorage.removeItem(token)
        break;
      case 404:   //找不到页面
        break;
      default:
        return
    }

  }else{//服务器没返回
    if(!window.navigator.onLine){
      //断网处理  配置断网页面
      return
    }
    return Promise.reject(err)
  }
});

export default service

