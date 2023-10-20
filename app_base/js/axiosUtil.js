// 拦截器中是否打印的信息是否包含非data数据
const showFullData = false
// 定义axios请求实例
let post

// 初始化axios请求实例
function initApi(method, url) {
  axios.defaults.withCredentials = true
  if (method && method.toLowerCase() === 'post') {
    post = axios.create({
      method: 'post',
      baseURL: url,
      responseType: 'json',
      withCredentials: true,
      headers: {'Cache-Control': 'no-cache', 'Content-Type': 'application/json'},
    })
    setInterceptor(post)
  }
}

// 添加拦截器
function setInterceptor(instance) {
  if (instance) {
    // 请求拦截器
    instance.interceptors.request.use(request => {
      try {
        logI('>>>>>>>>>>>>>>>>>>>>>>>>> axios request 请求发起(' + request.url + ')  START  <<<===')
        logI(request);
        logI('>>>>>>>>>>>>>>>>>>>>>>>>> axios request 请求发起(' + request.url + ')  END  <<<===')
      } catch (e) {
        logE(e)
      }
      return request
    })
    // 响应拦截器
    instance.interceptors.response.use(response => {
      try {
        logI('<<<<<<<<<<<<<<<<<<<<<<<<<  axios response 请求响应(' + response.config.url + ')  START  <<<===')
        if (showFullData) {
          logI(response);
        } else {
          logI(response.data);
        }
        logI('<<<<<<<<<<<<<<<<<<<<<<<<<  axios response 请求响应(' + response.config.url + ')  END  <<<=== ')
      } catch (e) {
        logE(e)
      }
      // 直接统一返回data，如果为空，返回固定错误response
      return response.data || {isSuc: false, msg: '请求失败，请稍后再试', data: null}
    }, error => {
      try {
        logI('<<<<<<<<<<<<<<<<<<<<<<<<<  axios 请求响应(' + error.config.url + ')  START <<<===')
        logI(error)
        logI('<<<<<<<<<<<<<<<<<<<<<<<<<  axios 请求响应(' + error.config.url + ')  END  <<<===')
      } catch (e) {
        logE(e)
      }
      return error
    })
  }
}