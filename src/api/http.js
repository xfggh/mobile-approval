import axios from 'axios'
import { Toast } from 'vant'

// 拦截器
axios.interceptors.request.use(
    config => {
        if(config.method.toUpperCase() === 'GET'){
            config.data = true;
        }
        config.headers = {
            'Content-Type': 'text/plain'
        };
        config.baseURL = 'http://'+ localStorage.getItem('NCUrl') +':'+ localStorage.getItem('NCPort') +'/uapws/rest/yellowpeach';
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(response => {
    return response;
}, error => {
    Toast(error.toString());
})

export default function http(url = '', params={}, type='GET'){

    // 定义 promise 对象
    let promise;

    // 返回 promise 对象
    return new Promise((resolve, reject) => {
        // 发送 GET 请求
        if('GET' === type.toUpperCase(type)){
            promise = axios.get(url, {
                params: params
            })
        }

        // 发送 POST 请求
        if('POST' === type.toUpperCase(type)){
            promise = axios.post(url, params,);
        }

        // 返回请求的结果
        promise.then((response)=>{
            if(response){
                resolve(response.data);
            }
        }).catch(error=>{
            reject(error);
        })

    })
}