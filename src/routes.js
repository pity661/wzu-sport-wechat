import HomePage from './views/HomePage.vue'
import HelpCenterPage from './views/HelpCenterPage.vue'


let routes = [
    {
        path: '/home',
        component: HomePage,
        name: '',
        hidden: true
    },
    {
        path: '/help',
        component: HelpCenterPage,
        name: '',
        hidden: true
    },
    {
        path: '/',
        redirect: { path: '/index.html' },
        hidden: true
    }
];

export default routes;
