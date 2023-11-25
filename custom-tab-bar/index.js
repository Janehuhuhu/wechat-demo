// custom-tab-bar/index.js
import {storeBindingsBehavior} from 'mobx-miniprogram-bindings'
import {store} from '../store/store'

Component({
  options: {
    styleIsolation: 'shared'
  },

  behaviors: [storeBindingsBehavior],

  storeBindings: {
    store,
    fields: {
      active: 'activeIndex',
      sum: 'sum'
    },
    actions: {
      updateActiveIndex: 'updateActiveIndex'
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    // active: 0,
    tabBarList: [
      {
        "text": "首页",
        "pagePath": "/pages/home/index",
        "iconPath": "/images/tabs/home.png",
        "selectedIconPath": "/images/tabs/home-active.png"
      },
      {
        "text": "消息",
        "pagePath": "/pages/message/index",
        "iconPath": "/images/tabs/message.png",
        "selectedIconPath": "/images/tabs/message-active.png",
        "info": 1
      },
      {
        "text": "联系我们",
        "pagePath": "/pages/concact/index",
        "iconPath": "/images/tabs/contact.png",
        "selectedIconPath": "/images/tabs/contact-active.png"
      }
    ]
  },

  observers: {
    sum(val) {
      this.setData({
        'tabBarList[1].info': val
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      // event.detail 的值为当前选中项的索引
      // this.setData({ active: event.detail });
      this.updateActiveIndex(event.detail)
      wx.switchTab({
        url: this.data.tabBarList[event.detail].pagePath,
      })
    },
  }
})