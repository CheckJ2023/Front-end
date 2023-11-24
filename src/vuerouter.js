
// 2. import 元件
import {createRouter,createWebHistory } from 'vue-router'
import Login from './pages/Login.vue'
import Faq from './pages/Faq.vue'
import Prod from './pages/Prod.vue'
import List from './pages/List.vue'
import Member from './pages/Member.vue'


// 3. 跳轉元件畫面
const routes = [
        { 
                path: '/', 
                component:Login, 
        },
        { 
                path: '/faq.html', 
                component: Faq,
        },
        { 
                path: '/prod.html', 
                component: Prod,
        },
        { 
                path: '/list.html', 
                component: List,
        },
        { 
                path: '/member.html', 
                component: Member,
        },

]

// 4. 建立 vue-router 物件
const router = createRouter({
        history:createWebHistory(),
        routes, 
})

// 5. 將router物件export給main.js使用

export default {
        router
}