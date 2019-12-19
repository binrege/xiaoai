import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Login.vue')
    },


]

const isPro = process.env.NODE_ENV === 'production'
const router = new VueRouter({
        mode: isPro ? 'hash' : 'history',
        base: process.env.BASE_URL,
        routes
    })
    //进入路由之前,判断用户是否登录,未登录就只能去登录或注册界面
router.beforeEach((to, from, next) => {
    let users = JSON.parse(localStorage.getItem("users"))
    if (to.path === "/login" || to.path === "/register") {
        next()
    } else {
        users ? next() : next("/login")
    }

})
export default router