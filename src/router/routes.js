// 引入路由组件
import HomeIndexVue from '@/views/Home/HomeIndex.vue';
import LoginIndexVue from '@/views/Login/index.vue';
import SearchIndexVue from '@/views/Search/SearchIndex.vue';
import RegisterIndexVue from '@/views/Register/index.vue';
import DetailIndexVue from '@/views/Detail/index.vue';
import AddCartSuccess from '@/views/AddCartSuccess/index.vue'
import ShopCart from '@/views/ShopCart/index.vue';
import Trade from '@/views/Trade/index.vue';

export default [
    {
        name: 'trade',
        path: '/trade',
        component: Trade,
        meta: { isShown: false },
    },
    {
        name: 'ShopCart',
        path: '/shopCart',
        component: ShopCart,
        meta: { isShown: true },
    },
    {
        name: 'AddCartSuccess',
        path: '/addCartSuccess',
        component: AddCartSuccess,
        meta: { isShown: true },
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
        name: 'login',
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
        name: 'detail',
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