// 引入路由组件
import HomeIndexVue from '@/views/Home/HomeIndex.vue';
import LoginIndexVue from '@/views/Login/LoginIndex.vue';
import SearchIndexVue from '@/views/Search/SearchIndex.vue';
import RegisterIndexVue from '@/views/Register/RegisterIndex.vue';
import DetailIndexVue from '@/views/Detail/index.vue';
import AddCartSuccess from '@/views/AddCartSuccess/index.vue'
export default [{
        path: '/addCartSuccess',
        name: 'AddCartSuccess',
        component: AddCartSuccess,
        meta: { isShown: false },
    },
    {
        path: '/home',
        component: HomeIndexVue,
        meta: {
            isShown: true,
            // 路由方法解决三级导航展示
            // isShoppingShown: true
        },
    },
    {
        path: '/login',
        component: LoginIndexVue,
        meta: { isShown: false },
    },
    {
        path: '/register',
        component: RegisterIndexVue,
        meta: { isShown: true },
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: SearchIndexVue,
        meta: { isShown: true },
    },
    {
        // name: 'detail/:skuId?',
        path: '/detail/:skuId?',
        component: DetailIndexVue,
    },
    // 重定向
    {
        path: '*',
        // component: HomeIndexVue
        redirect: '/home'
    }
]