$(function ($) {
  'use strict';
  var inviteCode = $.getInviteCode()
  // 正则
  let phoneRules = /^1[3456789]\d{9}$/ 
  let emailRules = /^[A-Za-z\d]+[A-Za-z\d\-_\.]*@([A-Za-z\d]+[A-Za-z\d\-]*\.)+[A-Za-z]{2,4}$/;
  function register(name){
    let href
    let key = phoneRules.test(name) ? 'phone' : 'email'
    if (inviteCode ){
      href = 'https://www.skyee360.com/signUp/register.html?inviteCode='+ inviteCode +'&'+ key +'=' + name
    }else{
      href = 'https://www.skyee360.com/signUp/register.html?'+ key +'=' + name
    }
    window.open(href, '_blank')
  }
   // 注册
   $("#top_form").submit(function (e) {
    e.preventDefault()
    let email = $('#top_userName').val()
    if (!phoneRules.test(email) && !emailRules.test(email)) {
      $.message('请输入有效手机号/邮箱')
      return
    }
    register(email)
  });
  $("#bootom_form").submit(function (e) {
    e.preventDefault()
    let email = $('#bottom_userName').val()
    if (!phoneRules.test(email) && !emailRules.test(email)) {
      $.message('请输入有效手机号/邮箱')
      return
    }
    register(email)
  });
  new Swiper('.swiper-container', {
    slidesPerView: 1,
    loop: false,
    autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });


  var swiper = new Swiper('.swiper-container-1', {
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
})

