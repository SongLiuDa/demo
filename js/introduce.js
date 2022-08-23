$(function ($) {
  'use strict';
  function isMobile (){
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }
  var inviteCode = undefined
  function getInvitationCode() {
    var pStr = window.location.search.split('?')[1] || ''
    var pMap = pStr.split('&')
    console.log(pMap);
    $.each(pMap, function (i, item) {
      var itemList = item.split('=')
      if (itemList[0] === 'inviteCode') {
        inviteCode = itemList[1]
      }
    })
  }
  getInvitationCode()
  // 正则
  let RULE
  if( isMobile() ){
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
    if (isMobile()){
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
  $('#login').click( function(){
    let href
    if (isMobile()){
      if (inviteCode ){
        href = 'https://www.skyee360.com/signUp/register.html?inviteCode='+ inviteCode
      }else{
        href = 'https://www.skyee360.com/signUp/register.html'
      }
    }else{
      if (inviteCode){
        href = 'https://business.skyee360.com/client/register?ininviteCode='+ inviteCode
      }else{
        href = 'https://business.skyee360.com/client/register'
      } 
    }
    window.open(href, '_blank')
  })
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
  // 主流电商平台滚动
  $('#logo_view').liMarquee({
    drag: false,
  });
  new Swiper('.aboutUs_swiper', {
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
  // 用户的信赖之选
  new Swiper('.product_swiper', {
    watchSlidesProgress: true, // 进度、进程
    slidesPerView: 1, // 容器同时显示的slides数量
    centeredSlides: true, // active slide居中
    loop: true, // 循环
    loopedSlides: 5, // 用到的loop个数
    // autoplay: true,
    grabCursor: true, // 手抓光标
    autoplay: {
      delay: 3000,
      disableOnInteraction: false, // 用户操作swiper之后，是否禁止autoplay。
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      1080: {  //当屏幕宽度大于等于768 
        slidesPerView: 'auto',
      },
    },
    on: {
      progress: function (progress) {
        for (let i = 0; i < this.slides.length; i++) {
          var slide = this.slides.eq(i);
          var slideProgress = this.slides[i].progress;
          let modify = 1;
          if (Math.abs(slideProgress) > 1) {
            modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
          }
          let translate = slideProgress * modify * 260 + 'px'; // 居中位移
          let scale = 1 - Math.abs(slideProgress) / 7;
          let zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
          slide.transform('translateX(' + translate + ') scale(' + scale + ')');
          slide.css('zIndex', zIndex);
          slide.css('opacity', 1);
          if (Math.abs(slideProgress) > 1) { //页面展示几个
            slide.css('opacity', 0);
          }
        }
      },
      setTransition: function (transition) {
        for (var i = 0; i < this.slides.length; i++) {
          var slide = this.slides.eq(i)
          slide.transition(transition);
        }
      }
    }
  })
})