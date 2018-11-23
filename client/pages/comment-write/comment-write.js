// pages/comment-write/comment-write.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config.js')

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
    content: '',
    avatar: app.globalData.avatar,
    username: app.globalData.username,
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

  // 撰写评论
  onInputDesc(event) {
    this.setData({
      content: event.detail.value.trim()
    })
    app.globalData.commentText = event.detail.value.trim()
  },

  // 预览影评
  previewComment() {
    wx.navigateTo({
      url: '/pages/comment-preview/comment-preview?id=' + 4,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMovie(app.globalData.commentMovie)
    this.setData({
      commentType: app.globalData.commentType
    })
    var that = this;
    this.recorderManager = wx.getRecorderManager();
    this.recorderManager.onError(function () {
      that.tip("录音失败！")
    });
    this.recorderManager.onStop(function (res) {
      that.setData({
        src: res.tempFilePath
      })
      that.tip("录音完成！")
      setTimeout(function () {
        console.log(res.tempFilePath);
        wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: res.tempFilePath,
          name: 'file',
          header: {
            'content-type': 'multipart/form-data'
          },
          success: function (res) {
            console.log(res.data)
            let data = JSON.parse(res.data)
            console.log(data.data.imgUrl)
            app.globalData.commentPath = data.data.imgUrl
          },
          fail: function (res) {
            console.log(res);
            wx.showModal({
              title: '提示',
              content: "网络请求失败，请确保网络是否正常",
              showCancel: false,
              success: function (res) {
              }
            });
          }
        });
      }, 1000)
    });

    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onError((res) => {
      that.tip("播放录音失败！")
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
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
    var src = this.data.src;
    if (src == '') {
      this.tip("请先录音！")
      return;
    }
    this.innerAudioContext.src = this.data.src;
    this.innerAudioContext.play()
  }
})