import {createRouter, createWebHistory} from 'vue-router'
import LoginAndRegister from '../views/LoginAndRegister.vue'
import Main from '../views/Main.vue'
import Categories from '../views/Categories.vue'
import Statistic from '../views/Statistic.vue'
import * as firebase from "firebase";
import Check from "../views/Check";

const routes = [
    {
        path: '/',
        name: 'LoginAndRegister',
        meta: {layout: "home"},
        component: LoginAndRegister
    },
    {
        path: '/main/:status',
        name: 'main',
        meta: {layout: "main", auth: true},
        component: Main,
    },
    {
        path: '/check',
        name: 'check',
        meta: {layout: "home", auth: true},
        component: Check,
    },
    {
        path: '/categories/:status',
        name: 'categories',
        meta: {layout: "main", auth: true},
        component: Categories
    },
    {
        path: '/statistic/:status',
        name: 'statistic',
        meta: {layout: "main", auth: true},
        component: Statistic
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
    mode: 'history',
    hasbang:false
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
