import store from '../vuex/store'
import * as types from '../vuex/mutation-types'
export default function install(Vue,router_proto) {
    Vue.http.options.emulateJSON = false;
    window.origin && (Vue.http.options.root = window.origin );
    Vue.http.interceptors.push({
        request (request) {
            if(request.url!='./transfer/activity_configure/api/v1/activity/list'&&request.url!='./transfer/activity_configure/api/v1/coupon/list'){
                store.dispatch(types.AJAX_REQUEST)
            };
            if(store.state.titles.titles=='活动管理'){
                store.dispatch(types.AJAX_REQUEST)
            }
            let bamtoken=(!!sessionStorage.getItem('loginList')) ? JSON.parse(sessionStorage.getItem('loginList')).token : null;
            request.headers['X-auth-Token'] =bamtoken;
            return request;
        },
        response (response) {
            if(response.request.url!='./transfer/activity_configure/api/v1/activity/list'&&response.request.url!='./transfer/activity_configure/api/v1/coupon/list'){
                store.dispatch(types.AJAX_RESPONSE);
            };
            if(store.state.titles.titles=='活动管理'){
                store.dispatch(types.AJAX_RESPONSE);
            }
            if(response.status===403){
                dialog('error',response.data.message);
            }
            else if(response.status===504){
                dialog('error','网络拥堵，请求超时，请稍后再试！');
            }
            else if(response.status===500){
                store.dispatch(types.AJAX_ERROR,500);
            }
            else if(response.status===404){
                store.dispatch(types.AJAX_ERROR,404);
            }
            else if(response.data.code===1){
                dialog('info',response.data.message)
            }
            else if(response.data.code === 50000){
                dialog('error','登录失效，请重新登录！');
                setTimeout(()=>{
                    router_proto.go({'name':'login'});
                },1000)
                return response;
            }
            else if(!response.ok){
                dialog('error','当前网络质量不佳，请刷新页面重试！');
            }
            else if(response.data.code !== 0&&response.data.code !== 10000){
                dialog('error',response.data.message||response.data.msg||response.data.codeDesc);
            }
            return response;
        }
    });
}