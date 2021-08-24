import {createRouter, createWebHashHistory} from 'vue-router'
import LoginAndRegister from '../views/LoginAndRegister.vue'
import Main from '../views/Main.vue'
import Categories from '../views/Categories.vue'
import Statistic from '../views/Statistic.vue'
import * as firebase from "firebase";

const routes = [
    {
        path: '/',
        name: 'LoginAndRegister',
        meta: {layout: "home"},
        component: LoginAndRegister
    },
    {
        path: '/main',
        name: 'Profile',
        meta: {layout: "main", auth: true},
        component: Main,
    },
    {
        path: '/categories',
        name: 'categories',
        meta: {layout: "main", auth: true},
        component: Categories
    },
    {
        path: '/statistic',
        name: 'statistic',
        meta: {layout: "main", auth: true},
        component: Statistic
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const currentUser = firebase.default.auth().currentUser;
    const requireAuth = to.matched.some(record => record.meta.auth)

    if (requireAuth && !currentUser) {
        next('./?message=signin')
    } else {
        next()
    }
});
export default router
