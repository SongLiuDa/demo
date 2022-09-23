$(function ($) {
  'use strict';
  var inviteCode = $.getInviteCode() || 'cpc'
  var swiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    on: {
      slideChangeTransitionStart: function () {
        var that = this
        $('.tag_wrapper').find('.tag').each(function (i, title) {
          $(this).removeClass('active')
          if (that.realIndex === i) {
            $(this).addClass('active')
          }
        })
      },
    },
  });
  $('.tag_wrapper').find('.tag').each(function (index) {
    $(this).click(function () {
      swiper.slideToLoop(index, 300, true);
    })
  })
  // 查看产品细则
  $('#toProduct').click( function(){
    var top = $('#product').offset().top - 70
    $('html,body').animate({ scrollTop: top }, 300);
  })
  // 移动端注册
  $('.mobile_button').click( function(){
    var href = 'https://business.skyee360.com/client/register?ininviteCode='+ inviteCode
    window.open(href, '_blank')
  })
  // 移动端注册
  $('.button_reg').click( function(){
    var href = 'https://business.skyee360.com/client/register?ininviteCode='+ inviteCode
    window.open(href, '_blank')
  })
  // 注册
  $('[id="form"]').each( function(){
    $(this).submit(function (e) {
      e.preventDefault()
      var email = $(this).find('#userName').val()
      var email_rule = /^[A-Za-z\d]+[A-Za-z\d\-_\.]*@([A-Za-z\d]+[A-Za-z\d\-]*\.)+[A-Za-z]{2,4}$/;
      var phone_rule = /^1\d{10}$/
      if (!email_rule.test(email) && !phone_rule.test(email)) {
        $.message('请输入有效户名')
        return
      }
      // 默认邀请码
      console.log('$.getInviteCode()',$.getInviteCode());
      var href 
      if ( email_rule.test(email) ){
        href = 'https://business.skyee360.com/client/register?ininviteCode='+ inviteCode +'&email=' + email
      }else{
        href = 'https://business.skyee360.com/client/register?ininviteCode='+ inviteCode +'&phone=' + email
      }
      window.open(href, '_blank')
    });
  })
  // link轮播
  let index = 0
  setInterval(function () {
    $('.link_item').each(function (i) {
      if (i === index) {
        $(this).addClass('active').siblings().removeClass("active")
        return false
      }
    })
    if (index >= 2) {
      index = 0
    } else {
      index++
    }
  }, 2000)
})
