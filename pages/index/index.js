// pages/index/index.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasLogin: true,
    searchType: 0,
    searchText: '',
    nomore: false,
    userInfo: {},
    showLogin: true,
    showSignup: false,
    showTips:false,
    tips: '',
    countDownNum: 60,
    showCountDown: false,
    timer: '',
    loginway: 'password',
    loginShowPassword: true,
    signupPhone: '',
    signupCode: '',
    signupPassword: '',
    signupPasswordAgain: '',
    loginPhone: '',
    loginPassword: '',
    loginCode: '',
    cardList:[],
    page: 1,
    size: 10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.setData({
      hasLogin: app.globalData.hasLogin
    })
    this.fetchData(1, this.data.size);
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
    this.fetchData(1, this.data.size);
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.fetchData(this.data.page, this.data.size);
  },

  fetchData(page, size) {
    if(this.data.nomore){
      return
    }
    var that = this;
    var searchText = this.data.searchText;
    var searchType = this.data.searchType;

    wx.request({
      url: 'https://www.suishouji.net/index.php?c=tag&a=gettags',
      data: {
        page: page,
        size: size,
        search_text: searchText,
        search_type: searchType
      },
      header: {
        'content-type': 'application/json',
        'aid': app.globalData.token
      },
      success: function (res) {
        if (res.data.list === null || res.data.list.length === 0){
          that.setData({
            nomore: true
          })
          if(page === 1){
            that.setData({
              cardList: []
            })
          }
          return
        }

        // res.data.list.map((item) => {
        //   item.datetime = app.formatStamp(Number(item['createtime']) * 1000 , '/');
        //   return item;
        // })

        if(page === 1){
          that.setData({
            cardList: res.data.list,
            nomore: false
          })
        }else{
          console.log('list',res.data.list);
          that.setData({
            cardList: that.data.cardList.concat(res.data.list)
          })
        }
        that.data.page++;
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  // 设置显示的tab
  setActive: function (e) {
    // 获取当前点击的index
    var index = e.target.dataset.index;
    // 初始化动画数据
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out',
      delay: 0
    })
    // 距离左边位置
    animation.left((index * 250) + 'rpx').step()
    // 设置动画
    this.setData({
      animationData: animation.export()
    })
    // 设置对应class
    this.setData({
      searchType: index,
      nomore: false,
      page: 1
    })
    this.fetchData(1, this.data.size)
  },

  gotoQuestion: function (e) {
    console.log(e)
    //var res = this.checklogin();
    //if (res) {
      let id = e.target.dataset.id;
      wx.navigateTo({
        url: "/pages/index/question/index?id=" + id
      })
    //}
  },
  
  startSearch(e){
    this.data.nomore = ''
    let value = e.detail.value
    this.setData({
      searchText: value
    })
    this.fetchData(1, 20)
  },

  cancelSearch(e){
    console.log('cancelSearch',e);
    this.setData({
      searchText: '',
      nomore: false
    })
    this.fetchData(1, 20)
  }
})