$(function ($) {
  'use strict';
  function isMobile() {
    var userAgentInfo = navigator.userAgent;

    var mobileAgents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];

    var mobile_flag = false;

    //根据userAgent判断是否是手机
    for (var v = 0; v < mobileAgents.length; v++) {
      if (userAgentInfo.indexOf(mobileAgents[v]) > 0) {
        mobile_flag = true;
        break;
      }
    }
    var screen_width = window.screen.width;
    var screen_height = window.screen.height;

    //根据屏幕分辨率判断是否是手机
    if (screen_width < 500 && screen_height < 800) {
      mobile_flag = true;
    }

    return mobile_flag;
  }
  $('#scroll_arrow').on('click', function () {
    let service_sec_top = $('#arrow_objective').offset().top
    $('html,body').animate({ scrollTop: service_sec_top }, 800);
  });

  // 电商平台无限滚动
  $('#logo_view').liMarquee({
    drag: false,
  });
  // let offsetTop = $('#footer_float').offset().top - $(window).height()
 
  /* 测算表单 */
  $("#compute_form").find('.form_group').each(function () {
    let that = this
    $(this).find('input').focus(function (e) {
      $(that).removeClass('error')
    })
  })
  // 输入格式化
  function formatNum() {
    let _v = $(this).val().replace(/[^\d]/g, '')
    $(this).val(_v)
  }
  $('#stores_num').on('input', formatNum)
  $('#credit_scale').on('input', formatNum)
  $('#rate').on('input',
    function () {
      var _v = $(this).val().replace(/[^\d\.]/g, '')
      _v = _v.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
      $(this).val(_v)
    })
  function checkEmpty(id) {
    let that = $(id)
    let v = that.val();
    let parent = that.parents('.form_group')
    if (!v) {
      parent.addClass('error')
      return false
    } else {
      parent.removeClass('error')
      return true
    }
  }
  /**
 * @description: 格式化金额
 * @param {string} s [金额]
 * @param {number} n [保留小数位]
 * @return {string}
 */
  function formatMoney(s, n) {
    if (!s) return '0.00'
    n = 2
    var minus = ''
    s = s.toString()
    if (s < 0) {
      s = s.replace(/\-/, '')
      minus = '-'
    }
    s = parseFloat((s + '').replace(/[^\d\.]/g, '')).toFixed(n) + ''
    const l = s.split('.')[0].split('').reverse()
    const r = s.split('.')[1]
    let t = ''
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
    }
    return `${minus}${t.split('').reverse().join('')}${n > 0 ? '.' + r : ''}`
  }
  // 检查手机格式
  function checkPhone() {
    let that = $('#phone')
    let v = that.val();
    let parent = that.parents('.form_group')
    if (!v) {
      that.next('.form_item_error').text('不能为空')
      parent.addClass('error')
      return false
    } else if (!/^1[345789]\d{9}$/.test(v)) {
      that.next('.form_item_error').text('请输入正确的联系方式')
      parent.addClass('error')
      return false
    } else {
      parent.removeClass('error')
      return true
    }
  }
  // 测算结果插入页面
  let memberList = [
    { txt: '尊享会员', fee: 3888, limitT: "800万0费率额度", limiM: 800 },
    { txt: '荣耀会员', fee: 8888, limitT: "2000万0费率额度", limiM: 2000 },
    { txt: '超凡会员', fee: 16888, limitT: "全年0费率" },
  ]
  function computeSesults(money, rate) {
    let sign_num = 0
    let sign_list = []
    let _money = money * 10000
    let _rate = rate / 100
    let fixedRate = 0.2
    let _fixedRate = 0.2 / 100
    let _handlingFee = _rate * _money // 元
    let _html = '<div class="result_inner">'
    let _ul = '<ul class="result_menu">'
    $.each(memberList, function (index, item) {
      // 超出额度
      let overQuota
      if (item.limiM) {
        if (money > item.limiM) {
          overQuota = (money - item.limiM) * _fixedRate * 10000
        } else {
          overQuota = 0
        }
      } else {
        overQuota = 0
      }
      // 一年手续费
      let memberFee = overQuota + item.fee
      // 费用节省
      let save = _handlingFee - memberFee
      sign_list.push({
        title: item.txt,
        save: save,
      })
      if (save <= 0) {
        sign_num++
      }
      let _i = index + 1
      _ul += '<li class="result_item">'
      _ul += '<div class="item_tit f14 bold">'
      _ul += '' + _i + '、购买“' + item.txt + '”，一年节省￥' + formatMoney(save / 10000) + '万人民币！'
      _ul += '</div>'
      _ul += '<p class="f14 item_tip">'
      _ul += '“' + item.txt + '”年费￥' + item.fee + '，' + item.limitT
      if (money > item.limiM && item.limiM) {
        _ul += '<p class="f14 item_tip">'
        _ul += '超出额度按' + fixedRate + '%费率收取：（' + money + '万 - ' + item.limiM + '万）* ' + fixedRate + '% = ￥' + formatMoney(overQuota) + '人民币'
        _ul += '</p>'
      }
      _ul += '<p class="f14 item_tip">'
      _ul += '一年的手续费：' + formatMoney(memberFee) + '￥人民币'
      _ul += '</p>'
      _ul += '</li>'
    })
    sign_list = sign_list.reduce((i1, i2) => {
      return i1.save > i2.save ? i1 : i2
    })
    // heaer
    let _header = '<div class="result_header">'
    _header += '<div class="good_icon"><img src="./images/member/good.png" alt=""></div>'
    _header += '<div class="recommended_plan f16">'
    _header += '<p>'
    if (sign_num < 3) {
      _header += '推荐方案：购买”' + sign_list.title + '“，一年节省'
      _header += '<span class="money">￥' + formatMoney(sign_list.save / 10000) + '万 </span>人民币!'
    } else {
      _header += '推荐方案：目前费率适合企业'
    }
    _header += '</p>'
    _header += '<a href="javascript:;" class="toggle f14" id="toggle">测算结果</a>'
    _header += '</div>'
    _header += '</div>'
    _html += _header
    // body
    _html += '<div class="result_body dn">'
    _html += '<div class="tit">'
    _html += '<p class="f14 bold">现状：' + money + '万人民币交易规模，费率' + rate + '%，一年的手续费：￥' + formatMoney(_handlingFee) + ' 人民币</p>'
    _html += '</div>'
    if (sign_num < 3) {
      _html += _ul
    } else {
      _html += '<p class="suitable_tip f14">'
      _html += '企业目前发展规模仍有空间，Skyee建议可尝试开通更多电商平台入驻扩展经营规模，Skyee将为您提供优质跨境电商平台入驻通道，助力企业货通全球。'
      _html += '</p>'
    }
    _html += '</div>'
    _html += '</div>'
    $('#coumute_result').html(_html)
    $('#compute_btn').text('重新测算')

  }
  $('#stores_num').blur(function () {
    checkEmpty('#stores_num')
  })
  $('#credit_scale').blur(function () {
    checkEmpty('#credit_scale')
  })
  $('#rate').blur(function () {
    checkEmpty('#rate')
  })
  $('#user_name').blur(function () {
    checkEmpty('#user_name')
  })
  $('#phone').blur(checkPhone)

  // 测算表单提交
  $("#compute_form").submit(function (e) {
    e.preventDefault()
    let stores_num = $('#stores_num').val()
    let credit_scale = $('#credit_scale').val()
    let rate = $('#rate').val()
    let user_name = $('#user_name').val()
    let phone = $('#phone').val()
    if (!stores_num || !credit_scale || !rate || !user_name || !checkPhone()) {
      $('#stores_num').blur()
      $('#credit_scale').blur()
      $('#rate').blur()
      $('#user_name').blur()
      $('#phone').blur()
      // $.message('提交信息不能为空')
      return
    }
    $('#compute_form .my_button').loadingOpen()

    let param = {
      url: 'WebConsult',
      type: 'post',
      data: {
        platform: 2, // 1印度站,2中文站
        consultType: 4,
        content: '店铺数：' + stores_num + '，年GMV(万人民币)：' + credit_scale + '，当前收款费率：' + rate,
        name: user_name,
        mobilePhone: phone
      }
    }
    param.data = JSON.stringify(param.data)
    ajax(param, function success(res) {
      if (res.data === 'success') {
        $.message('提交成功')
        computeSesults(credit_scale, rate)
        // 切换测算结果
        $('#toggle').click(function () {
          $('.result_body').slideToggle('fast')
        })
      }
      $('#compute_form .my_button').loadingClose()
    }, function error(err) {
      // console.log(err);
      let mes = err.body.message
      $.message(mes)
      $('#compute_form .my_button').loadingClose()
    })
  })

  function initSwiper() {
    // swiper
    new Swiper('.membership_card_swiper', {
      slidesPerView: 1,
      loop: false,
      autoplay: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        1220: {
          slidesPerView: 4,
          spaceBetween: 41,
        },
        930: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });
    let windowW = $(window).width();
    if (windowW < 992) {
      $('.membership_card_swiper').removeClass('swiper-no-swiping')
      $('.membership_card_swiper').find('.card_item_wraaper').each(function () {
        $(this).removeClass('current')
      })
    } else {
      let _index = 0
      // 交易规模自动轮播
      let times = setInterval(function () {
        $('.membership_card_swiper .card_item_wraaper').each(function (i) {
          if (i === _index) {
            $(this).addClass('current').siblings().removeClass("current")
            $('.processBar_content').find('.process_inner').removeClass().addClass(function () {
              return 'line' + _index + ' process_inner'
            })
            $('.processBar').each(function (i) {
              if (i === _index) {
                $(this).addClass('current').siblings().removeClass("current")
              }
            })
            return false
          }
        })
        if (_index >= 3) {
          _index = 0
        } else {
          _index++
        }
      }, 3000)
      // 
      $('.membership_card_swiper').addClass('swiper-no-swiping')
      $('.membership_card_swiper').find('.card_item_wraaper').first().addClass('current')

      $('.membership_card_swiper').find('.card_item_wraaper').each(function (index, ele) {
        $(ele).click(function () {
          _index = index
          $(this).addClass('current').siblings().removeClass("current")
          $('.processBar_content').find('.process_inner').removeClass().addClass(function () {
            return 'line' + index + ' process_inner'
          })
          $('.processBar').each(function (i) {
            if (i === index) {
              $(this).addClass('current').siblings().removeClass("current")
            }
          })
        })
      })
    }
  }
  initSwiper()
  $(window).on('resize', $.throttle(initSwiper, 16.7))
})
