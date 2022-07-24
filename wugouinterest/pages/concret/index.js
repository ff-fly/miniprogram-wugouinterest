// pages/concret/index.js
const createRecycleContext = require('miniprogram-recycle-view')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    selectedValue: 'benxi',
    ctx: undefined,
    dataList: [],
    items: [{
        value: 'benxi',
        name: '等额本息',
        checked: 'true'
      },
      {
        value: 'benjin',
        name: '等额本金'
      }
    ],
    inputLl: 7.42,
    inputQs: 60,
    inputRepay: 1000000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("concrete page load")
    this.ctx = createRecycleContext({
      id: 'recycleId',
      dataKey: 'recycleList',
      page: this,
      itemSize: { // 这个参数也可以直接传下面定义的this.itemSizeFunc函数
        width: rpx2px(750),
        height: rpx2px(50)
      }
    })
    this.calConcret()
  },

  calConcret: function () {
    var inputLilv = this.data.inputLl
    var inputQishu = this.data.inputQs
    //正浮点数
    const floatRegex = /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/
    //非负整数
    const numberRegex = /^\d+$/
    if (!(numberRegex.test(inputLilv)) && !(floatRegex.test(inputLilv))) {
      wx.showToast({
        title: '请输入有效费率',
        icon: 'error'
      })
      return
    }
    const zhengshuRegex = /^[1-9]\d*$/
    if (!(zhengshuRegex.test(inputQishu)) || inputQishu <= 0) {
      wx.showToast({
        title: '请输入有效期数',
        icon: 'error'
      })
      return
    }

    console.log('calResult, inputLilv, inputQishu ', inputLilv, inputQishu)

    var selectedType = this.data.selectedValue
    if (selectedType == 'benxi')
      this.calBenxiConcret()
    else if (selectedType == 'benjin')
      this.calBenjinConcret()
  },

  calBenxiConcret: function () {
    var inputLilv = parseFloat(this.data.inputLl)
    var qishu = parseInt(this.data.inputQs)
    var repay = parseFloat(this.data.inputRepay)
    var monthLv = parseFloat(inputLilv) / 12 / 100

    var c = Math.pow((monthLv + 1), qishu)
    var monthRepay = repay * monthLv * c / (c - 1)

    let list = []
    var hasRepayBenjin = 0
    for (let i = 1; i <= qishu; i++) {
      var lixi = (repay - hasRepayBenjin) * monthLv
      var benjin = monthRepay - lixi
      hasRepayBenjin = hasRepayBenjin + benjin
      list.push({
        qishu: i,
        mrepay: monthRepay.toFixed(2),
        mbenjin: benjin.toFixed(2),
        mlixi: lixi.toFixed(2),
        mLeftBenjin: (repay - hasRepayBenjin).toFixed(2)
      })
      // console.log('calBenxiConcret qishu:' + i + ',mrepay:' + monthRepay + ',mbenjin:' + benjin + ',lixi:' + lixi + ',leftbenjin:' + (repay - hasRepayBenjin))
    }

    this.ctx.append(list)
    console.log('calBenxiConcret end')
  },

  calBenjinConcret: function () {
    console.log('calBenjinConcret')
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

  bindLilvInput(e) {
    this.setData({
      inputLl: e.detail.value
    })
    console.log('input lilv:' + this.data.inputLl)
  },

  bindQishuInput(e) {
    this.setData({
      inputQs: e.detail.value
    })
    console.log('input qishu:' + this.data.inputQs)
  },

  bindRepayInput(e) {
    this.setData({
      inputRepay: e.detail.value
    })
    console.log('input repay:' + this.data.inputRepay)
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
    console.log("concrete page unLoad")
    this.ctx.destroy()
    this.ctx = null
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

function rpx2px(rpx) {
  return (rpx / 750) * wx.getSystemInfoSync().windowWidth
}