// pages/comment-list/comment-list.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config.js')

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList: []
  },

  // 获取评论列表
  getCommentList (id) {
    qcloud.request({
      url: config.service.commentList + id,
      success: result => {
        console.log(result)
        this.setData({
          commentList: result.data.data
        })
      },
      fail: result => {
        console.log('error!')
      }
    })
  },

  // 查看评论详情
  commentDetail(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/comment-detail/comment-detail?id=' + id
    })
  },

  // 点击空评论
  bindComment0() {
    let id = this.data.movie_id
    app.globalData.commentMovie = this.data.movie_id
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      movie_id: options.id
    })
    this.getCommentList(options.id)
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
    this.getCommentList(this.data.movie_id)
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