$(function ($) {
  'use strict';
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
