$(function ($) {
  'use strict';
  let index = 0
  setInterval(function () {
    $('.light_item').each(function (i) {
      if (i === index) {
        $(this).addClass('active').siblings().removeClass("active")
        return false
      }
    })
    if (index >= 5) {
      index = 0
    } else {
      index++
    }
  }, 2000)
})