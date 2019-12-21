import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: "/index",
        redirect: '/'
    }, {
        path: "/home",
        redirect: '/',
        meta: {
            title: "首页"
        }
    },
    {
        path: '/',
        component: Home,
        children: [{
            path: '/',
            name: 'index',
            component: () =>
                import ('../views/Index.vue'),
            meta: {
                title: "首页"
            }
        }]
    },
    {
        path: '/',
        component: Home,
        children: [{
            path: 'pagination',
            name: 'pagination',
            component: () =>
                import ('../views/Pagination.vue'),
            meta: {
                title: "分页表格"
            }
        }]
    },
    {
        path: '/',
        component: Home,
        children: [{
            path: 'tagPage',
            name: 'tagPage',
            component: () =>
                import ('../views/TagPage.vue'),
            meta: {
                title: "标签"
            }
        }]
    },
    {
        path: '/',
        component: Home,
        children: [{
            path: 'updatePic',
            name: 'updatePic',
            component: () =>
                import ('../views/UpdatePic.vue'),
            meta: {
                title: "图片上传"
            }
        }]
    },
    {
        path: '/',
        component: Home,
        children: [{
            path: 'published',
            name: 'published',
            component: () =>
                import ('../views/Published.vue'),
            meta: {
                title: "文章"
            }
        }]
    },
    {
        path: '/',
        component: Home,
        children: [{
            path: 'publish',
            name: 'publish',
            component: () =>
                import ('../views/Publish.vue'),
            meta: {
                title: "发布文章"
            }
        }]
    },
    {
        path: '/',
        component: Home,
        children: [{
            path: 'details',
            name: 'details',
            component: () =>
                import ('../views/Details.vue'),
            meta: {
                title: "详情"
            }
        }]
    },
    {
        path: '/',
        component: Home,
        children: [{
            path: 'statics',
            name: 'statics',
            component: () =>
                import ('../views/Statics.vue'),
            meta: {
                title: "统计"
            }
        }]
    },
    {
        path: '/',
        component: Home,
        children: [{
            path: 'exportExcell',
            name: 'exportExcell',
            component: () =>
                import ('../views/ExportExcell.vue'),
            meta: {
                title: "导出数据"
            }
        }]
    },
    {
        path: '/',
        component: Home,
        children: [{
            path: 'exist',
            name: 'exist',
            component: () =>
                import ('../views/Exist.vue')
        }]
    },
    {
        path: '/',
        component: Home,
        children: [{
            path: 'check',
            name: 'check',
            component: () =>
                import ('../views/Check.vue'),
            meta: {
                title: "查看文章"
            }
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
            import ( /* webpackChunkName: "about" */ '../views/Login.vue'),
        meta: {
            title: "登录"
        }
    },
    {
        path: '*',
        name: 'error',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Error.vue'),
        meta: {
            title: "登录"
        }
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
    if (to.path === "/") {
        localStorage.setItem("ids", 0)
    } else if (to.path === "/pagination") {
        localStorage.setItem("ids", 1)
    } else if (to.path === "/tagPage") {
        localStorage.setItem("ids", 2)
    } else if (to.path === "/updatePic") {
        localStorage.setItem("ids", 3)
    } else if (to.path === "/published") {
        localStorage.setItem("ids", 4)
    } else if (to.path === "/publish") {
        localStorage.setItem("ids", 5)
    } else if (to.path === "/statics") {
        localStorage.setItem("ids", 6)
    } else if (to.path === "/exportExcell") {
        localStorage.setItem("ids", 7)
    } else if (to.path === "/exist") {
        localStorage.setItem("ids", 8)
    } else {
        localStorage.setItem("ids", 0)
    }
    let users = JSON.parse(localStorage.getItem("users"))
    if (to.path === "/login" || to.path === "/register") {
        next()
    } else {
        users ? next() : next("/login")
    }
    document.title = to.meta.title


})
export default router