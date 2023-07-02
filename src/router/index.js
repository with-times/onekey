import {createRouter, createWebHashHistory,} from 'vue-router'

import Home from '../view/index/Index.vue'
import User from '../view/auth/UserInfo.vue'
import Web from "../view/index/Web.vue";
import Feed from "../view/index/Feed.vue"
import About from "../view/index/About.vue"
import Link from "../view/index/Link.vue"
import {UserStore} from "../store/index.js";

const routes = [
    {
        path: '/',
        component: Home,
        name: 'index',
        meta: {
            title: '与时同行-首页'
        }

    }, {
        path: '/user',
        component: User,
        name: 'user',
        meta: {
            title: '与时同行-用户',
            requiresAuth: true
        }

    }, {
        path: '/website/:num',
        component: Web,
        name: 'web',
        meta: {
            title: '与时同行-网站'
        }
    }, {
        path: '/feed',
        component: Feed,
        name: 'feed',
        meta: {
            title: '与时同行-订阅'
        }
    }, {
        path: '/link',
        component: Link,
        name: 'link'
    }, {
        path: '/about',
        component: About,
        name: 'about',
        meta: {
            title: '与时同行-关于'
        }
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    linkActiveClass: 'uk-active',
    scrollBehavior(to, from, savedPosition) {
        return {top: 0}
    }
})

router.beforeEach(async (to, from, next) => {
    const userStore = UserStore()
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if (!userStore.isLogin && requiresAuth) {
        next({name: 'index'})
    } else {
        next()
    }

})


export default router


