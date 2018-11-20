// pages/home/home.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config.js')

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
    comment: {}
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
        this.setData({
          comment: result.data.data[0]
        })
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
  
  bindComment(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/comment-detail/comment-detail?id=' + id
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