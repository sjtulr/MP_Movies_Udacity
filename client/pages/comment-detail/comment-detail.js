// pages/comment-detail/comment-detail.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config.js')

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment: {},
    movie: {},
    starId: 0,
    publishStatus: 0,
  },

  // 获取评论详情
  getCommentDetail (id) {
    qcloud.request({
      url: config.service.commentDetail + id,
      success: result => {
        console.log(result)
        if (result.data.data[0].user === app.globalData.user) {
          this.setData({
            publishStatus: 1,
          })
        }
        this.setData({
          comment: result.data.data[0]
        })
        this.getMovie(result.data.data[0].movie_id)
        this.getStarDetail(result.data.data[0].id)
      },
      fail: result => {
        console.log('error!')
      }
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
        if (result.data.data.length > 0) {
          this.setData({
            starId: result.data.data[0].id
          })
        } else {
          this.setData({
            starId: 0
          })
        }
      }
    })
  },

  // 取消收藏
  starCancel () {
    qcloud.request({
      url: config.service.starCancel,
      method: 'PUT',
      data: {
        star_id: this.data.starId
      },
      success: result => {
        this.getCommentDetail(this.data.commentId)
      }
    })
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

  // 收藏影评
  starComment() {
    let id = this.data.comment.id
    qcloud.request({
      url: config.service.addComment,
      method: 'PUT',
      data: {
        user: 'sjtulr',
        comment_id: id
      },
      success: result => {
        wx:wx.showToast({
          title: '已添加收藏',
        })
        this.getCommentDetail(this.data.commentId)
      }
    })
  },

  // 撰写影评
  addComment () {
    let id = this.data.comment.movie_id
    app.globalData.commentMovie = this.data.comment.movie_id
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

  toList() {
    wx.navigateTo({
      url: '/pages/home/home'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCommentDetail(options.id)
    this.setData({
      commentId: options.id
    })
    var that = this
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
    var src = this.data.comment.voice;
    console.log(src)
    if (src == '') {
      this.tip("请先录音！")
      return;
    }
    this.innerAudioContext.src = this.data.comment.voice;
    this.innerAudioContext.play()
  }
})