import {observable, action} from 'mobx-miniprogram'

export const store = observable({
  sum: 1,
  activeIndex: 0,
  updateActiveIndex: action(function(e) {
    this.activeIndex = e
  }),
  updateSum: action(function() {
    this.sum = this.sum + 1
  })
})