$(function () {
  'use strict';
  jQuery.fn.extend({
    // 按钮请求loading开启
    loadingOpen: function () {
      $(this).css({ position: 'relative' });
      $(this).attr("disabled", true);
      let _html = '<div class="button_loading dn">';
      _html += '<span></span>'
      _html += '<span></span>'
      _html += '<span></span>'
      _html += '</div>'
      $(this).append(_html)
      $(".button_loading").fadeIn("normal");
    },
    // 按钮请求loading关闭
    loadingClose: function () {
      $(this).attr("disabled", false);
      $(".button_loading").fadeOut("fast", function () {
        $(this).find('.button_loading').remove()
      });
    }
  });
  let mes_timeout
  jQuery.extend({
    /**
     * 全局提示弹窗
     * @param {string} m 提示类容
     * @param {number} wait 弹窗间隔时间 默认2s   
     */
    message: function (m, wait) {
      let _wait = wait || 2000
      if (mes_timeout) return
      let innerHTML = '<div id="message_box"><p>' + m + '</p></div>';
      $('body').append(innerHTML)
      $("body").find('#message_box').fadeIn("normal");
      mes_timeout = setTimeout(function () {
        mes_timeout = null;
        $("body").find('#message_box').fadeOut('fast', function () {
          $(this).remove()
        })
      }, _wait);
    },
    /**
     * @description: 文本高亮
     * @param {string} str innerHTML字符串
     * @param {object} params 文本属性对象
     * @return [string] 修改后html字符串
     */
    highlight: function (str, params) {
      let reg = new RegExp(("(" + params.keys + ")"), "igm");
      let color = params.color || '#f00';
      let replacement = '<span style="color:' + color + ';">$1</span>'
      return str.replace(reg, replacement);
    },
    /**
     *  函数节流
     * @param {function} func 
     * @param {number} wait 
   */
    throttle: function (func, wait) {
      let timeout;
      return function () {
        if (!timeout) {
          timeout = setTimeout(function () {
            timeout = null;
            func();
          }, wait);
        }
      };
    },
    // 是否是移动端
    isMobile: function (){
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    },
    // 获取链接邀请码
    getInviteCode: function(){
      var inviteCode 
      var pStr = window.location.search.split('?')[1] || ''
      var pMap = pStr.split('&')
      $.each(pMap, function (i, item) {
        var itemList = item.split('=')
        if (itemList[0] === 'inviteCode') {
          inviteCode = itemList[1]
        }
      })
      return inviteCode
    }
  });
  let wow = new WOW({
    animateClass: 'animated',
    offset: 100
    // mobile: false // 是否移动端执行动画
  });
  wow.init();

  // 微信分享缩略图
  let param = {
    url: 'WxSignature',
    basUrl:'https://global.skyee360.com/api/v1/',
    data: {
      url: window.location.href
    }
  }
  ajax(param, function success(res) {
    // console.log('分享',res);
    let data = res.data
    wx.config({
      // debug: true, 
      appId: data.appId, // 必填，公众号的唯一标识
      timestamp: data.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.nonceStr, // 必填，生成签名的随机串
      signature: data.signature,// 必填，签名
      jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
    });
  }, function error(err) {
    console.log(err);
    // alert('失败')
  })
  let title = $('title').text()
  let description = $('meta[name="description"]').attr('content')
  let shareCofig = {
    title: title,
    desc: description,
    link: window.location.href,
    imgUrl: '../../images/share-logo.png'
  }
  wx.ready(function () {
    wx.updateAppMessageShareData(shareCofig)
    wx.updateTimelineShareData(shareCofig)
  })
  wx.error(function () {
    console.log('error');
  })
})