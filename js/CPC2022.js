$(function ($) {
  'use strict';
 
  var inviteCode = $.getInviteCode()
  // 正则
  let RULE
  if( $.isMobile() ){
    RULE = /^1[3456789]\d{9}$/
    $('#top_userName').attr({'placeholder':'输入手机号注册，即可享受优惠'})
    $('#bottom_userName').attr({'placeholder':'输入手机号注册，即可享受优惠'})
  }else{
    RULE = /^[A-Za-z\d]+[A-Za-z\d\-_\.]*@([A-Za-z\d]+[A-Za-z\d\-]*\.)+[A-Za-z]{2,4}$/;
    $('#top_userName').attr({'placeholder':'输入邮箱注册，即可享受优惠'})
    $('#bottom_userName').attr({'placeholder':'输入邮箱注册，即可享受优惠'})
  }
  function register(name){
    let href
    if ($.isMobile()){
      if (inviteCode ){
        href = 'https://www.skyee360.com/signUp/register.html?inviteCode='+ inviteCode +'&phone=' + name
      }else{
        href = 'https://www.skyee360.com/signUp/register.html?phone=' + name
      }
    }else{
      if (inviteCode){
        href = 'https://business.skyee360.com/client/register?ininviteCode='+ inviteCode +'&email=' + name
      }else{
        href = 'https://business.skyee360.com/client/register?email='+ name
      } 
    }
    window.open(href, '_blank')
  }
   // 注册
   $("#top_form").submit(function (e) {
    e.preventDefault()
    let email = $('#top_userName').val()
    if (!RULE.test(email)) {
      $.message('请输入有效户名')
      return
    }
    register(email)
  });
  $("#bootom_form").submit(function (e) {
    e.preventDefault()
    let email = $('#bottom_userName').val()
    if (!RULE.test(email)) {
      $.message('请输入有效户名')
      return
    }
    register(email)
  });
  'use strict';
  // 主流电商平台滚动
  $('#logo_view').liMarquee({
    drag: false,
  });
  // 他们的优选滚动
  $('#options_menu').liMarquee({
    drag: false,
  });
  // 了解我们轮播高亮
  let index = 0
  setInterval(function () {
    $('.product_item').each(function (i) {
      $(this).removeClass("active")
      if (i === index) {
        $(this).addClass('active')
      }
    })
    if (index >= 4) {
      index = 0
    } else {
      index++
    }
  }, 2000)
  new Swiper('.swiper-container', {
    slidesPerView: 1,
    loop: false,
    autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      992: {
        slidesPerView: 3,
        spaceBetween: 110,
      },
    },
  });
})

