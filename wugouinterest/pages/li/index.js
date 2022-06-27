// pages/li/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      {value: 'M', name: '月息', checked: 'true'},
      {value: 'Y', name: '年息'},
      {value: 'D', name: '日息'}
    ],
    desc: "厘，中国大陆地区曾经使用的一个利率单位，根据所述为年利率、月利率或日利率，每厘分别为百分之一、千分之一或万分之一。每厘为十毫，十厘为一分。\n举例:\n年息四厘，即年利率为4%，本金1000元，每年利息为40元。\n月息三厘五毫，即月利率为3.5‰，本金1000元，每月利息为3.5元。\n日息一分二厘，即日利率为12‱，本金1000元，每日利息为1.2元。"
  },

  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }

    this.setData({
      items
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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