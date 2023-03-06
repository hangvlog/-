// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
// module.exports = {
//     productionSourceMap: false,
//     // 关闭ESLINT校验工具
//     lintOnSave: false,
//     //   //配置代理跨域
//     devServer: {
//         proxy: {
//             "/api": {
//                 target: "http://gmall-h5-api.atguigu.cn",
//             },
//         },
//     },
// };
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    //关闭生产提示
    productionSourceMap: false,
    // 关闭ESLINT校验工具
    lintOnSave: false,
    devServer: {
        host: '0.0.0.0',
        // https:true,
        port: 8080,
        client: {
            webSocketURL: 'ws://0.0.0.0:8080/ws',
        },
        //配置代理跨域
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        proxy: {
            "/api": {
                target: "http://gmall-h5-api.atguigu.cn",
            },
        },
        // devServer: {
        // },
    },

    transpileDependencies: true
})