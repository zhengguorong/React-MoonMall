/*!
 *
 * 服务URL
 * 基于豆瓣Open API的图书、音乐、电影服务
 * 如果https://api.douban.com/v2/都保持不变，则可以将其设置为BaseURL
 */

module.exports = {
    mall_home_getRecommendItem: 'http://www.limesoftware.cn:3000/moonMall-gateway/item/getRecommendItem',
    mall_home_getCategory: 'http://www.limesoftware.cn:3000/moonMall-gateway/category/getCategory',
    mall_detail_getInfo: 'http://www.limesoftware.cn:3000/moonMall-gateway/item/findById',
    mall_detail_getComment:'http://www.limesoftware.cn:3000/moonMall-gateway/comment/getCommentPageByItemId',
    mall_productlist_getList:'http://www.limesoftware.cn:3000/moonMall-gateway/category/getAllItemCategoryPage',
    mall_cart_getList:'http://www.limesoftware.cn:3000/moonMall-gateway/cart/getCart'
};

