/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://puazbmrk.qcloud.la';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
      host,

      // 登录地址，用于建立会话
      loginUrl: `${host}/weapp/login`,

      // 测试的请求地址，用于测试会话
      requestUrl: `${host}/weapp/user`,

      // 测试的信道服务地址
      tunnelUrl: `${host}/weapp/tunnel`,

      // 上传图片接口
      uploadUrl: `${host}/weapp/upload`,

      // 获取影片列表
      movieList: `${host}/weapp/list`,

      // 获取影片详情
      movieDetail: `${host}/weapp/detail/`,

      // 获取评论列表
      commentList: `${host}/weapp/comment/`,

      // 获取评论详情
      commentDetail: `${host}/weapp/commentdetail/`,

      // 获取收藏列表
      starList: `${host}/weapp/star/`,

      // 收藏影评
      addComment: `${host}/weapp/star`,

      // 添加影评
      commentAdd: `${host}/weapp/commentadd`,
      
      // 获取发布列表
      commentPush: `${host}/weapp/pushlist/`,

      // 取消收藏
      starCancel: `${host}/weapp/starcancel`,

      // 获取某一条收藏
      starDetail: `${host}/weapp/stardetail`,
    }
};

module.exports = config;
