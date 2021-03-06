// pages/movie-detail/movie-detatil.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config.js')

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: null,
    publishStatus: 0,
    myComment: {},
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

  // 获取评论列表
  getCommentList(id) {
    qcloud.request({
      url: config.service.commentList + id,
      success: result => {
        let list = result.data.data
        console.log(list)
        for (var i = 0; i < list.length; i++) {
          if (list[i].user === app.globalData.user) {
            let publishStatus = 1;
            this.setData({
              myComment: list[i],
              publishStatus: 1
            })
          }
        }
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

  // 我的影评
  // 查看评论详情
  commentDetail(event) {
    let id = this.data.myComment.id
    wx.navigateTo({
      url: '/pages/comment-detail/comment-detail?id=' + id
    })
  },

  // 撰写影评
  addComment() {
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMovie(options.id)
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