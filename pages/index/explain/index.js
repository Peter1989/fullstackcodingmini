// pages/index/question/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    answerList: {},
    nomore: false,
    page: 1,
    cardList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!options.answers) return;
    let answers = options.answers;
    // let answers = {
    //   6: "0",
    //   7: "0",
    //   8: ["0", "1"]
    // }
    this.data.answerList = JSON.parse(answers);
    this.fetchAns(answers)
  },

  fetchAns(answers){
    var that = this
    wx.request({
      url: 'https://www.suishouji.net/index.php?c=question&a=answerquestions',
      data: {
        answer: answers
      },
      header: {
        'content-type': 'application/json',
        'aid': app.globalData.token
      },
      success: function (res) {
        if (res.data.list === null || res.data.list.length === 0) {
          that.setData({
            nomore: true
          })
          if (page === 1) {
            that.setData({
              cardList: []
            })
          }
          return
        }

        res.data.list.map((item) => {
          item.ansopts = JSON.parse(item.ansopts)
          item.answer = JSON.parse(item.answer)
          return item;
        })
        console.log('list', res.data.list)
        // if (page === 1) {
          that.setData({
            cardList: res.data.list
          })
        // } else {
        //   console.log('list', res.data.list);
        //   that.setData({
        //     cardList: that.data.cardList.concat(res.data.list)
        //   })
        // }
        // that.data.page++;
      },
      fail: function (res) {
        console.log(res)
      }
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
    // var that = this;
    // wx.request({
    //   url: 'https://www.funyang.top/minipro/user/getlikedme',
    //   data: {},
    //   header: {
    //     'content-type': 'application/json',
    //     'aid': app.globalData.token
    //   },
    //   success: function (res) {
    //     if (res.data.success) {
    //       that.setData({
    //         friendsList: res.data.data
    //       })
    //     }
    //   },
    //   fail: function (res) {
    //     console.log(res)
    //   }
    // })
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
    return {
      title: '闲暇时间消化零散知识，线上互撩的随身忆了解一下？',
      path: '/pages/index/index',
      imageUrl: 'https://7465-test-940daf-1257680529.tcb.qcloud.la/demo1.png?sign=03800fadb75c68f5bfda19d44619ef3d&t=1538741837'
    }
  },
  gotoquestion: function (e) {
    var qid = e.currentTarget.dataset.qid;
    wx.navigateTo({
      url: '/pages/mine/addcard/index?qid=' + qid + '&isdetail=' + true
    })
  },
  gotouser: function (e) {
    var uid = e.currentTarget.dataset.uid;
    wx.navigateTo({
      url: "/pages/profile/index?uid=" + uid
    })
  }
})