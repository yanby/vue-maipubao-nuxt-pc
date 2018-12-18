import axios from 'axios' //引入axios模块
import {Message,Loading} from 'element-ui'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://api.youpuglobal.com';
// axios.defaults.baseURL = 'http://test-api-mpb.yingshangchina.com';
// axios.defaults.baseURL = 'http://192.168.1.209:8200';


if(typeof window !== "undefined"){
  // /http request 拦截器
  axios.interceptors.request.use(
    config => {
      if (localStorage.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers["access-token"]  = localStorage.token;
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    });

//http response 拦截器
  axios.interceptors.response.use(
    response => {
      if(response.data.code == 201){
        // localStorage.clear();
        this.$message("请先登录")
        router.replace({
          path:"login",
          query: {redirect: router.currentRoute.fullPath}
        })
      }else if(response.data.code == 202){
        // localStorage.clear();
        this.$message("登录超时，请重新登录")
        router.replace({
          path: 'login',
          query: {redirect: router.currentRoute.fullPath}
        })
      }
      return response;
    },
    error => {
      return Promise.reject(error)   // 返回接口返回的错误信息
    });
}


export default axios;
