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