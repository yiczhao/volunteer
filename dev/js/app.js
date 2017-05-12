
/* eslint-disable no-unused-vars */
import scss from 'scss'
/* eslint-enable no-unused-vars */
import VueRouter from 'vue-router'
import { proxy_mock } from './config/index'
import components from './components/index'
import ksComponents from './KsComponents'
import directives from './directives/index'
import filters from './filters/index'
import common_model from './ajax/common/commom_model'
import routers from './routers'
import interceptor from './middlewares/interceptor'
import API from './ajax/api.js'
Object.keys(components).forEach(k => {
    var a = Vue.component(k, components[k]);
})
// *** 引入filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
// *** 引入directive
Object.keys(directives).forEach(k => Vue.directive(k, directives[k]));
Vue.use(API)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(ksComponents)
Vue.use(common_model)
proxy_mock(Vue)

// *** 实例化VueRouter
let router = new VueRouter({
    hashbang: true,
    history: false,
    saveScrollPosition: true,
    transitionOnLoad: true
})
routers(Vue, router)
let app = Vue.extend({})
router.start(app,'#app')
Vue.use(interceptor,router)
Vue.config.debug = true;



