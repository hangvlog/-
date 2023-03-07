// 引入插件
import Vue from 'vue';
import VueRouter from 'vue-router';
// 引入路由配置信息
import routes from './routes';
import store from '@/store';
// 使用插件
Vue.use(VueRouter);



// 重写push|replace
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, resolve, reject) {
    // 如果成功与失败的回调函数都传了
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    // 如果成功与失败的回调函数都传了
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}

// 配置路由
const router = new VueRouter({
    // mode: 'history',
    routes,
    // 滚动行为，参考vue官网
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})

router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token
    if (token) {
        if (to.name == 'login') {
            alert('您已经登录了，不能再次进入登录页面，请退出登录')
            // 仓库是否有用户信息
            let name = store.state.user.userInfo ? store.state.user.userInfo.name : undefined
            // console.log(name)
            if (!name) {
                // alert('Please enter')
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (err) {
                    // token过期-》移除token 重定向登录页面
                    await store.dispatch('logOut')
                    // to.name = 'login'
                    next('/login')
                }
            }
            else {
                next(false)
            }
        } else {
            next()
        }
    } else {
        // next('/login')
        let toPath = to.path
        if (toPath.indexOf('trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1) {
            next('/login')
        } else {
            next()
        }
    }
})
// if (to.name == 'login') {
//     console.log(store);
//     // alert('login')
//     if (token) {
//         alert('您已经登录了，不能再次进入登录页面，请退出登录')
//         // 仓库是否有用户信息
//         let name = store.state.user.userInfo ? store.state.user.userInfo.name : undefined
//         // console.log(name)
//         if (!name) {
//             // alert('Please enter')
//             try {
//                 await store.dispatch('getUserInfo')
//                 next()
//             } catch (err) {
//                 // token过期-》移除token 重定向登录页面
//                 await store.dispatch('logOut')
//                 // to.name = 'login'
//                 next('/login')
//             }
//         }
//         else {
//             next(false)
//         }
//     } else {
//         next()
//     }
// } else {
//     // next()
//     if (token) {
//         let toPath = to.path
//         if (toPath.indexOf('trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1) {
//             next('/login')
//         } else {
//             next()
//         }
//     }else{

//     }

// }
// console.log(store);
// next();
// })
export default router