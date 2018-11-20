// pages/comment-write/comment-write.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    recodePath: '',
    isRecode: false,
    product: {},
    commentValue: '',
    commentImages: [],
  },

  uploadImage(cb) {
    let commentImages = this.data.commentImages
    console.log(commentImages[0])

    wx.uploadFile({
      url: 'https://puazbmrk.qcloud.la/weapp/upload',
      filePath: commentImages[0],
      name: 'file',
      success: res => {
        console.log(res)
      },
      fail: () => {
        length--
      }
    })
  },

  chooseImage() {
    wx.chooseImage({
      count: 3,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {

        let commentImages = res.tempFilePaths

        this.setData({
          commentImages
        })
        console.log(commentImages)

      },
    })
  },

  play: function () {
    //播放声音文件  
    wx.playVoice({
      filePath: voice
    })
  },

  startRecode: function () {
    var s = this;
    wx.startRecord({
      success: function (res) {
        console.log(res);
        console.log("start");        
        var tempFilePath = res.tempFilePath;
        s.setData({ recodePath: tempFilePath, isRecode: true });
      },
      fail: function (res) {
        console.log("fail");
        console.log(res);
        //录音失败
      }
    });
  },

  endRecode: function () {//结束录音 
    var s = this;
    console.log("end");
    wx.stopRecord();
    s.setData({ isRecode: false });
    wx.showToast();
    setTimeout(function () {
      console.log(s.data.recodePath);
      wx.uploadFile({
        url: config.service.uploadUrl,
        filePath: s.data.recodePath,
        name: 'file',
        header: {
          'content-type': 'multipart/form-data'
        },
        success: function (res) {
          console.log(res)
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

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  }
})