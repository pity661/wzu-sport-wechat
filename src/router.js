import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from './views/HomePage.vue'
import HelpCenterPage from './views/HelpCenterPage.vue'

let routes = [
    {
        path: '/home',
        component: HomePage,
        name: '验证学籍信息',
        hidden: true
    },
    {
        path: '/help',
        component: HelpCenterPage,
        name: '帮助中心',
        hidden: true
    },
    {
        path: '/',
        redirect: { path: '/index.html' },
        hidden: true
    }
];

Vue.use(VueRouter)
const router = new VueRouter({
	routes
})

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.name) {
        document.title = to.name;
    }
    next();
})

export default router;
