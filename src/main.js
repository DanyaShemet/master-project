// Vue sys
import { createApp } from 'vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Project libs and components
import Loader from '@/components/Loader'
import BigLoader from '@/components/BigLoader'
import messagePlugin from "./utils/message.plugin";
import Pagination from 'v-pagination-3';

// Firebase
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

// Css
import './assets/index.scss'
import 'materialize-css/dist/js/materialize.min'


// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyDXePZt_ckI-rKaH7dsog3Rz2_B2ja0LZ8",
    authDomain: "master-estimate-project.firebaseapp.com",
    databaseURL: "https://master-estimate-project-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "master-estimate-project",
    storageBucket: "master-estimate-project.appspot.com",
    messagingSenderId: "739844977960",
    appId: "1:739844977960:web:25e91c339c4f4040c2cc1d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let app;


// app.use(messagePlugin)

firebase.auth().onAuthStateChanged(()=>{
    if (!app){
        app = createApp(App)
        app.component('Loader', Loader)
        app.component('BigLoader', BigLoader)
        app.component('pagination', Pagination);
        app.use(messagePlugin)
        app.use(router)
        app.use(store)
        app.mount('#app')
    }
})






