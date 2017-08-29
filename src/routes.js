import HomePage from './views/HomePage.vue'
let routes = [
    {
        path: '/home',
        component: HomePage,
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
