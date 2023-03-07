import requests from "./request";
import mockRequests from "./mockAjax";

export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' });
export const reqGetBannerList = () => mockRequests({ url: '/banner', method: 'get' });
export const reqGetFloorList = () => mockRequests({ url: '/floor', method: 'get' });

// 搜索
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params });

// 商品详情
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })

//添加到购物车
export const reqAddToShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

// 购物车信息
export const reqCartList = () => requests({ url: `/cart/cartList`, method: 'get' })

// 删除商品
export const reqDeleteCart = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

// 获取验证码
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

//注册
export const reqSubmitRegister = (user) => requests({ url: `/user/passport/register`, method: 'post', data: user })

//登录
export const reqLogin = (user) => requests({ url: `/user/passport/login`, method: 'post', data: user })

//获取用户信息
export const reqUserInfo = (user) => requests({ url: `/user/passport/auth/getUserInfo`, method: 'get' })

//退出登录
export const reqLogOut = () => requests({ url: `/user/passport/logout`, method: 'get' })

//获取交易信息
export const reqGetUserAddressList = () => requests({ url: `/user/userAddress/auth/findUserAddressList`, method: 'get' })

//获取商品清单数据
export const reqShopInfo = () => requests({ url: `/order/auth/trade`, method: 'get' });

//提交订单
export const reqSubmitInfo = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data })