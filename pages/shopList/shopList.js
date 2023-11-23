// pages/shopList/shopList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query: {},
    shopList: [],
    pageNum: 1,
    pageSize: 10,
    total: 0,
    isLoading: false
  },

  // 获取九宫格商铺的详细数据列表
  getShopList(cb) {
    // 节流,避免数据重复请求
    this.setData({
      isLoading: true
    })
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.request({
      url: `https://applet-base-api-t.itheima.net/categories/${this.data.query.id}/shops`,
      method: 'GET',
      data: {
        _page: this.data.pageNum,
        _limit: this.data.pageSize
      },
      success: (res) => {
        this.setData({
          shopList: [...this.data.shopList, ...res.data],
          total: +res.header['X-Total-Count']
        })
      },
      complete: () => {
        wx.hideLoading()
        this.setData({
          isLoading: false
        })
        // 下拉刷新后关闭刷新样式
        cb && cb()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      query: options
    })
    this.getShopList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.query.name,
    })
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
    this.setData({
      pageNum: 1,
      shopList: [],
      total: 0
    })
    this.getShopList(() => wx.stopPullDownRefresh())
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 数据加载完成提示
    if(this.data.pageNum * this.data.pageSize >= this.data.total) {
      wx.showToast({
        title: '数据加载完成',
        icon: 'none'
      })
      return
    }
    if (this.data.isLoading) return
    this.setData({
      pageNum: this.data.pageNum + 1
    })
    this.getShopList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})