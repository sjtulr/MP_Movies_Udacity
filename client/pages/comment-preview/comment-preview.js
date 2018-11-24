// pages/comment-preview/comment-preview.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config.js')

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
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

  // 重新编辑
  rewrite () {
    wx.navigateTo({
      url: '/pages/comment-write/comment-write?id=' + app.globalData.commentMovie,
    })
  },

  // 发布影评
  pushComment () {
    if (app.globalData.commentType === 0) {
      qcloud.request({
        url: config.service.commentAdd,
        method: 'PUT',
        data: {
          user: app.globalData.user,
          username: app.globalData.username,
          avatar: app.globalData.avatar,
          content: app.globalData.commentText,
          voice: '0',
          movie_id: app.globalData.commentMovie,
        },
        success: result => {
          wx.showModal({
            title: '提示',
            content: '影评发布成功！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                let id = app.globalData.commentMovie
                wx.navigateTo({
                  url: '/pages/movie-detail/movie-detail?id=' + id,
                })
              }
            },
            fail: function (res) {
              console.log(res)
            },
            complete: function (res) { },
          })
        }
      })
    } else if (app.globalData.commentType === 1) {
      qcloud.request({
        url: config.service.commentAdd,
        method: 'PUT',
        data: {
          user: app.globalData.user,
          username: app.globalData.username,
          avatar: app.globalData.avatar,
          content: '0',
          voice: app.globalData.commentPath,
          movie_id: app.globalData.commentMovie,
        },
        success: result => {
          console.log(result)
          wx.showModal({
            title: '提示',
            content: '发布影评成功！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                let id = app.globalData.commentMovie
                wx.navigateTo({
                  url: '/pages/movie-detail/movie-detail?id=' + id,
                })
              }
            },
            fail: function (res) {
              console.log(res)
            },
            complete: function (res) { },
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMovie(app.globalData.commentMovie)
    this.setData({
      commentType: app.globalData.commentType,
      commentText: app.globalData.commentText,
      commentPath: app.globalData.commentPath,
      avatar: app.globalData.avatar,
      username: app.globalData.username,
      user: app.globalData.user,
    })
    console.log(options.id)
    this.getMovie(app.globalData.commentMovie)
    this.setData({
      commentType: app.globalData.commentType
    })
    console.log(this.data.commentType)
    var that = this;
    this.recorderManager = wx.getRecorderManager();
    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onError((res) => {
      that.tip("播放录音失败！")
    })
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
  
  },

  //...........................录音部分

  /**
  * 提示
  */
  tip: function (msg) {
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false
    })
  }

  /**
   * 录制mp3音频
  */
  , startRecordMp3: function () {
    this.recorderManager.start({
      format: 'mp3'
    });
  }

  /**
   * 停止录音
   */
  , stopRecord: function () {
    this.recorderManager.stop()
  }

  /**
   * 播放录音
   */
  , playRecord: function () {
    var that = this;
    var src = this.data.commentPath;
    console.log(src)
    if (src == '') {
      this.tip("请先录音！")
      return;
    }
    this.innerAudioContext.src = this.data.commentPath;
    this.innerAudioContext.play()
  }
})