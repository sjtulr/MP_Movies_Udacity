const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config.js')

var app = getApp()

// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList: [{
      id: 1,
      image: '/images/p2517753454.jpg',
      name: '复仇者联盟3：无限战争',
      avator: '/images/p2517753454.jpg',
      comment: '徐妍 给你推荐了一部电影',
      type: '动作'
    }, {
      id: 2,
      image: '/images/p2517753454.jpg',
      name: '复仇者联盟3：无限战争',
      avator: '/images/p2517753454.jpg',
      comment: '徐妍 给你推荐了一部电影',
      type: '动作'
    }, {
      id: 3,
      image: '/images/p2517753454.jpg',
      name: '复仇者联盟3：无限战争',
      avator: '/images/p2517753454.jpg',
      comment: '徐妍 给你推荐了一部电影',
      type: '动作'
    },
    ],
    commentList: [],
    starComment: [],
    pushComment: [],
  },

  // 获取收藏列表
  getStar(user) {
    var commentList = []
    var movieList = []
    var starList = []
    var that = this
    qcloud.request({
      url: config.service.starList + user,
      success: result => {
        let starList = result.data.data
        for(var i=0; i<starList.length; i++) {
          let id = starList[i].comment_id
          qcloud.request({
            url: config.service.commentDetail + id,
            success: result1 => {
              qcloud.request({
                url: config.service.movieDetail + result1.data.data[0].movie_id,
                success: result2 => {
                  var comment = {
                    comment_id: '',
                    movie_id: '',
                    avatar: '',
                    username: '',
                    movie_name: '',
                    movie_image: '',
                    content: '',
                    voice: '',
                  }
                  comment.comment_id = result1.data.data[0].id
                  comment.movie_id = result1.data.data[0].movie_id
                  comment.username = result1.data.data[0].username
                  comment.avatar = result1.data.data[0].avatar
                  comment.content = result1.data.data[0].content
                  comment.voice = result1.data.data[0].voice
                  comment.movie_name = result2.data.data[0].title
                  comment.movie_image = result2.data.data[0].image
                  commentList.push(comment)
                  that.setData ({
                    starComment: commentList
                  })
                },
                fail: result => {
                  console.log('error!')
                }
              })
            },
            fail: result => {
              console.log('error!')
            }
          })
        }
      },
      fail: result => {
        console.log('error!')
      }
    })
  },

  // 获取发布列表
  getPush(user) {
    var commentList = []
    var movieList = []
    var pushList = []
    var that = this
    qcloud.request({
      url: config.service.commentPush + user,
      success: result1 => {
        let pushList = result1.data.data
        for (var i = 0; i < pushList.length; i++) {
          let commentDetail = result1.data.data[i]
          qcloud.request({
            url: config.service.movieDetail + result1.data.data[i].movie_id,
            success: result2 => {
              var comment = {
                comment_id: '',
                movie_id: '',
                avatar: '',
                username: '',
                movie_name: '',
                movie_image: '',
                content: '',
                voice: '',
              }
              comment.comment_id = commentDetail.id
              comment.movie_id = commentDetail.movie_id
              comment.username = commentDetail.username
              comment.avatar = commentDetail.avatar
              comment.content = commentDetail.content
              comment.voice = commentDetail.voice
              comment.movie_name = result2.data.data[0].title
              comment.movie_image = result2.data.data[0].image
              commentList.push(comment)
              that.setData({
                pushComment: commentList
              })
            },
            fail: result => {
              console.log('error!')
            }
          })
        }
      },
      fail: result => {
        console.log('error!')
      }
    })
  },

  // 获取影评详情
  commentDetail(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/comment-detail/comment-detail?id=' + id
    })
  },

  toList () {
    wx.navigateTo({
      url: '/pages/home/home'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStar(app.globalData.user)
    this.getPush(app.globalData.user)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getStar(app.globalData.user)
    this.getPush(app.globalData.user)
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})