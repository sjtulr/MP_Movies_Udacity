// pages/movie-detail/movie-detatil.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: null
  },

  // 获取影片详情
  getMovie (id) {
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

  // 查看影评
  seeComment () {
    let id = this.data.movie.id
    wx.navigateTo({
      url: '/pages/comment-list/comment-list?id=' + id,
    })
  },

  // 添加影评
  addComment() {
    let id = this.data.movie.id
    wx.navigateTo({
      url: '/pages/comment-write/comment-write?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMovie(options.id)
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