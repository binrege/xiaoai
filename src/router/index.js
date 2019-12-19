import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: Home,
        children: [{
            path: '/',
            name: 'index',
            component: () =>
                import ('../views/Index.vue')
        }]
    },
    {
        path: '/',
        component: Home,
        children: [{
            path: 'pagination',
            name: 'pagination',
            component: () =>
                import ('../views/Pagination.vue')
        }]
    },
    {
        path: '/',
        component: Home,
        children: [{
            path: 'tagPage',
            name: 'tagPage',
            component: () =>
                import ('../views/TagPage.vue')
        }]
    },
    {
        path: '/',
        component: Home,
        children: [{
            path: 'updatePic',
            name: 'updatePic',
            component: () =>
                import ('../views/UpdatePic.vue')
        }]
    },
    {
        path: '/',
        component: Home,
        children: [{
            path: 'published',
            name: 'published',
            component: () =>
                import ('../views/Published.vue')
        }]
    },
    {
        path: '/',
        component: Home,
        children: [{
            path: 'publish',
            name: 'publish',
            component: () =>
                import ('../views/Publish.vue')
        }]
    },
    {
        path: '/',
        component: Home,
        children: [{
            path: 'statics',
            name: 'statics',
            component: () =>
                import ('../views/Statics.vue')
        }]
    },
    {
        path: '/',
        component: Home,
        children: [{
            path: 'exportExcell',
            name: 'exportExcell',
            component: () =>
                import ('../views/ExportExcell.vue')
        }]
    },


    {
        path: '/about',
        name: 'about',
        component: () =>
            import ('../views/About.vue')
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