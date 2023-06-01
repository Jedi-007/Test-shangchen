import App from './App'

//导入网络请求的包
import {$http} from '@escook/request-miniprogram'
uni.$http = $http

$http.baseUrl = 'https://api-hmugo-web.itheima.net'



//请求拦截器
$http.beforeRequest = function(options){
	
	uni.showLoading({
		title:'Data loading....'
	})
}
//响应拦截器
$http.afterRequest = function(){
	uni.hideLoading()
}

//数据请求失败的封装
uni.$showMsg = function(title = 'data loading failed' , duration = 1500){
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}



// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif