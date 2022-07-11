// pages/feilv/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputFl: '',
    finalResult: 0,
    selectedValue: 'benxi',
    items: [{
        value: 'benxi',
        name: '等额本息',
        checked: 'true'
      },
      {
        value: 'benjin',
        name: '等额本金'
      }
    ]
  },

  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
      if (items[i].checked == true) {
        this.setData({
          selectedValue: items[i].value
        })
      }
    }
  },

  bindFeilvInput(e) {
    this.setData({
      inputFl: e.detail.value
    })
    console.log('input feilv:' + this.data.inputFl)
  },

  calResult(e) {
    var inputValue = this.data.inputFl
    const numberRegex = /^\d+(.\d+)?$/
    if (!(numberRegex.test(inputValue))) {
      wx.showToast({
        title: '请输入有效值',
        icon: 'error'
      })
      return
    }

    var selectedType = this.data.selectedValue
    var result = 0
    if (selectedType == 'benxi')
      result = this.calBenxi()
    else if (selectedType == 'benjin')
      result = this.calBenjin()

    console.log('calResult=', result)
  },

  calBenxi: function() {
    return 10
  },

  calBenjin: function() {
    return 20
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