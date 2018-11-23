//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
  onLaunch: function () {
      qcloud.setLoginUrl(config.service.loginUrl)
  },

  globalData: {
    avatar: 'https://movie-1256679302.cos.ap-shanghai.myqcloud.com/p2517753454.jpg',
    user: 'sjtulr',
    username: '李睿',
    commentMovie: 1, // 正在评论的影片id
    commentType: 0, // 评论形式，文字0，音频1
    commentText: '',
    commentPath: '',
  }
})