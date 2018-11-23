// pages/home/home.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config.js')

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
    movie1: {
      avator: '/images/p2517753454.jpg',
      comment: '徐妍 给你推荐了一部电影',
    },
    comment: null,
  },

  // 获取影片详情
  getMovie(id) {
    qcloud.request({
      url: config.service.movieDetail + id,
      success: result => {
        this.setData({
          movie: result.data.data[0]
        })
      },
      fail: result => {
        console.log('error!')
      }
    })
  },

  // 获取第一条评论
  getCommentList(id) {
    qcloud.request({
      url: config.service.commentList + id,
      success: result => {
        if (result.data.data.length > 0) {
          this.setData({
            comment: result.data.data[0]
          })
        } else {
          this.setData({
            comment: {id: -1} 
          })
        }
      },
      fail: result => {
        console.log('error!')
      }
    })
  },

  toList() {
    wx.navigateTo({
      url: '/pages/movie-list/movie-list',
    })
  },

  toUser() {
    wx.navigateTo({
      url: '/pages/user/user',
    })
  },

  // 点击影片
  bindMovie(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/movie-detail/movie-detail?id=' + id,
    })
  },
  
  // 点击评论
  bindComment(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/comment-detail/comment-detail?id=' + id
    })
  },

  // 点击空评论
  bindComment0 () {
    let id = this.data.movie.id
    app.globalData.commentMovie = this.data.movie.id
    wx.showModal({
      title: '撰写影评',
      content: '请选择想要发布的影评形式',
      showCancel: true,
      cancelText: '音频',
      cancelColor: 'green',
      confirmText: '文字',
      confirmColor: '',
      success: function (res) {
        if (res.confirm) {
          app.globalData.commentType = 0;
          wx.navigateTo({
            url: '/pages/comment-write/comment-write?id=' + id,
          })
        } else if (res.cancel) {
          app.globalData.commentType = 1;
          wx.navigateTo({
            url: '/pages/comment-write/comment-write?id=' + id,
          })
        }
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) { },
    })
  },

  // 获取某一条收藏信息
  getStarDetail(comment_id) {
    let user = app.globalData.user
    let commentId = comment_id
    qcloud.request({
      url: config.service.starDetail,
      method: 'PUT',
      data: {
        user: user,
        comment_id: commentId
      },
      success: result => {
        console.log(result.data.data[0])
        let starId = result.data.data[0].id
        qcloud.request({
          url: config.service.starCancel,
          method: 'PUT',
          data: {
            star_id: starId
          },
          success: result => {
            console.log(result)
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = Math.floor(Math.random() * 15 + 1)
    this.getMovie(id)
    this.getCommentList(id)
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
    var id = Math.floor(Math.random() * 15 + 1)
    this.getMovie(id)
    this.getCommentList(id)
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