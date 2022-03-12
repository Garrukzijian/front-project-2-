import axios from 'axios'
import qs from "qs"

//  添加请求拦截器
axios.interceptors.request.use(function(config){

    const{method,data} = config
    if(method.toLowerCase()==='post' && typeof data ==="object"){
       config.data =  qs.stringify(data)
    }
    return config
});

axios.interceptors.response.use(function(response){
    return response.data;
},function(error){
    alert('fail1'+error.message)
    return new Promise(()=>{})
});


export default axios