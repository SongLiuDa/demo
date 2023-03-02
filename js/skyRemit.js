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
  let headerHeight = $('#header')[0].clientHeight
  $(document).scroll(function(){
    var offset= $(document).scrollTop()
    var opacity
    // if(offset <= 70){
      opacity = Math.min(offset, headerHeight) / headerHeight;
      $('#header').css({
        'background-color': 'rgba(255,255,255,' + opacity
      })
    // }
  })
})