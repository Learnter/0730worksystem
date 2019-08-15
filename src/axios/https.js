
import axios from 'axios';

axios.interceptors.request.use(config => { //请求拦截器
  // loading
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => { //响应拦截器
  return response
}, error => {
  if(error.response){
    if(error.response.status === 1003 || error.response.status === 1004 || error.response.status === 1006){
      router.replace({
        path: 'login',
        query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  return Promise.resolve(error.response)
})

function checkStatus (response) {

  // console.log(response);
  // loading
  // 如果http状态码正常，则直接返回数据
  // if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
  //   return response;
  //   // 如果不需要除了data之外的数据，可以直接 return response.data
  // }
  // // 异常状态下，把错误信息返回去
  // return {
  //   status: -404,
  //   msg: '网络异常'
  // }
  return response;
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  // if (res.status === -404) {
  //   alert(res.msg);
  // }     
  // if (res.data && (!res.data.data)) {
  //   alert(res.data.msg)
  // }
  return res;
}

export default {
  post (url,data,fileType) {
    //判断是否已经登录...
    let token;
    localStorage.getItem("user")? token = JSON.parse(localStorage.getItem("user")).token : token = '';

    return axios({
      method: 'post',
      baseURL: 'http://workorder.jiafuw.com/api.php/',
      // baseURL: 'http://rest.apizza.net/mock/3015d486900cc9aabd3fdeb31d961ec6/',
      url,
      data: data,
      timeout: 10000,
      headers: {
        'content-type':fileType ? fileType : 'application/json',
        'token':token
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get (url,params) {
     //判断是否已经登录...
    let token;
    localStorage.getItem("user")? token = JSON.parse(localStorage.getItem("user")).token : token = '';
    return axios({
      method: 'get',
      baseURL: 'http://workorder.jiafuw.com/api.php/',
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'content-type': 'application/json',
        'token':token
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}