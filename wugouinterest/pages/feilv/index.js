// pages/feilv/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputFl: 0,
    inputQs: 0,
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
    ],
    desc: "费率，最终利息总和除以本金得到的值，总费率除以借款年数即为年化费率，总费率除以借款月数即为月费率，一般来说相同数值的费率比利率要高，借款时务必弄清楚费率和利率的概念，可别被割韭菜了。"
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

  bindQishuInput(e) {
    this.setData({
      inputQs: e.detail.value
    })
    console.log('input qishu:' + this.data.inputQs)
  },

  calResult(e) {
    var inputFeilv = this.data.inputFl
    var inputQishu = this.data.inputQs
    //正浮点数
    const floatRegex = /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/
    //非负整数
    const numberRegex = /^\d+$/
    if (!(numberRegex.test(inputFeilv)) && !(floatRegex.test(inputFeilv))) {
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

    console.log('calResult, inputFeilv, inputQishu ', inputFeilv, inputQishu)

    var selectedType = this.data.selectedValue
    var result = 0
    if (inputFeilv <= 0) {
      result = 0
    } else {
      if (selectedType == 'benxi')
        result = this.calBenxi()
      else if (selectedType == 'benjin')
        result = this.calBenjin()
    }

    console.log('calResult=', result)
    this.setData({
      finalResult: result
    })
  },

  calBenxi: function () {
    var monthFl = parseFloat(this.data.inputFl) / 12 / 100
    var monthQishu = parseInt(this.data.inputQs)
    var c = (1 + monthFl * monthQishu) / monthQishu

    var mLvLeft = monthFl
    var mLvRight = monthFl

    while (true) {
      var b = Math.pow((mLvLeft + 1), monthQishu)
      var fx = (mLvLeft * b) / (b - 1) - c
      if (fx > 0) {
        mLvLeft = mLvLeft / 2
      } else if (fx == 0) {
        console.log('calBenxi last result is mLvLeft=', mLvLeft)
        return (mLvLeft * 12 * 100).toFixed(2)
      } else {
        console.log('calBenxi get mLvLeft=', mLvLeft)
        break
      }
    }

    while (true) {
      var b = Math.pow((mLvRight + 1), monthQishu)
      var fx = (mLvRight * b) / (b - 1) - c
      if (fx < 0) {
        mLvRight = mLvRight * 2
      } else if (fx == 0) {
        console.log('calBenxi last result is mLvRight=', mLvRight)
        return (mLvRight * 12 * 100).toFixed(2)
      } else {
        console.log('calBenxi get mLvRight=', mLvLeft)
        break
      }
    }

    var compareUnit = 0.000001
    var loopCount = 0
    while (true) {
      var mLvMid = (mLvLeft + mLvRight) / 2
      var b = Math.pow((mLvMid + 1), monthQishu)
      var fx = (mLvMid * b) / (b - 1) - c
      loopCount = loopCount + 1
      if (fx < 0) {
        mLvLeft = mLvMid
      } else if (fx == 0) {
        console.log('calBenxi last result is 1 mLvMid=', mLvMid, loopCount)
        return (mLvMid * 12 * 100).toFixed(2)
      } else {
        mLvRight = mLvMid
      }

      if (Math.abs(fx) <= compareUnit) {
        console.log('calBenxi last result is 2 mLvMid=', mLvMid, loopCount)
        return (mLvMid * 12 * 100).toFixed(2)
      }
    }
  },

  calBenjin: function () {
    var yearFl = parseInt(this.data.inputFl)
    var monthQishu = parseInt(this.data.inputQs)
    var a = yearFl / 12 * monthQishu * 24
    var b = monthQishu + 1
    var ret = (a / b).toFixed(2)
    console.log('calBenjin=', ret)
    return ret
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
  onUnload() {},

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