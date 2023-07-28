// pages/api/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: ['事项 A', '事项 B', '事项 C'],
    inputValue: '',
    name: ''
  },

  handleInput(event) {
    this.setData(
      {
        inputValue: event.detail.value
      }
    )
  },

  add() {
    const newItems = [...this.data.items, this.data.inputValue]
    wx.setStorageSync('items', newItems);
    this.setData(
      {
        items: newItems
      }
    )
  },

  remove() {
    wx.clearStorageSync('items')
    this.setData(
      {
        items: []
      }
    )
  },

  handleGetUserInfo(event) {
    if (!event.detail.userInfo) return;
    console.log(event.detail.userInfo)
    this.setData({
      name: event.detail.userInfo.nickName
    });
  },

  back() {
    wx.navigateTo({
      url: '../other/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const itemArr = wx.getStorageSync('items') || []; 
    this.setData({ items: itemArr });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})