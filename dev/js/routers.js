import store from './vuex/store'
import * as types from './vuex/title-types'
export default function (Vue,router){
    router.map({
        /* 登录页面 */
        '/login': {
            name: 'login',
            component: resolve => {
                require(['./views/login.vue'], res => {
                    resolve(res)
                })
            }
        },
        /* 忘记密码页面 */
        '/forget-password': {
            name: 'forget-password',
            component: resolve => {
                require(['./views/config/forget-password.vue'], res => {
                    resolve(res)
                })
            }
        },
        /* 主容器 */
        '/index':{
            router_type:'index',
            name:'index',
            component: (resolve)=>{
                require(['./views/app.vue'],resolve)
            },
            subRoutes:{
                /* 欢迎页面 */
                'home': {
                    name: 'home',
                    router_type:[{link:'home',text:'数据总览'}],
                    router_tile:'数据总览',
                    component: (resolve) => {
                        require(['./views/home.vue'], resolve)
                    }
                },
                'user-management': {
                    name: 'user-management',
                    router_type:[
                        {link:'user-management',text:'用户管理'}
                    ],
                    router_tile:'用户管理',
                    component: (resolve) => {
                        require(['./views/config/user-config.vue'], resolve)
                    }
                },
                /* 密码设置页面 */
                'password-config': {
                    name: 'password-config',
                    router_type:[
                        {link:'password-config',text:'密码设置'}
                    ],
                    router_tile:'密码设置',
                    component: (resolve) => {
                        require(['./views/config/password-config.vue'], resolve)
                    }
                },
                /* 用户设置页面 */
                'user-config': {
                    name: 'user-config',
                    router_type:[
                        {link:'user-config',text:'用户设置'}
                    ],
                    router_tile:'用户设置',
                    component: (resolve) => {
                        require(['./views/config/user-config.vue'], resolve)
                    }
                },
                /* 分支行设置页面 */
	            'branch-bank': {
		            name: 'branch-bank',
                    router_type:[
                        {link:'branch-bank',text:'分支行设置'}
                    ],
                    router_tile:'分支行设置',
		            component: (resolve) => {
			            require(['./views/config/branch-bank.vue'], resolve)
		            }
	            },
            }
        },
        /* 404路由 */
        '*': {
            name:'404',
            component: ()=>{
                router.go({ name: 'login'})
            }
        }
    })

    router.beforeEach(transition =>{
        if(!sessionStorage.getItem('loginList')&&transition.to.name!=='forget-password'){
            router.go({ name: 'login'});
        }
        transition.next()
    })
    
    router.afterEach(transition =>{
        store.dispatch(types.CHANGE_TITLE, transition.to);
        if(back_json.num==0){
            back_json.isback=true;
        }
        else{
            back_json.isback=false;
            back_json.num=0;
            localStorage.removeItem(transition.to.path);
        }
    })
}