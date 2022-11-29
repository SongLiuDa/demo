$(function ($) {
  'use strict';
  $(".modal [type=checkbox]").click(function () {
    $(this).parent().toggleClass('is-checkbox')
  })
  $(".modal .el-checkbox__inner").click(function () {
    if ( $('#check').is(":checked") ){
      $("#check").prop("checked", false)
    }else{
      $("#check").prop("checked", true)
    }
    $(this).parent().toggleClass('is-checkbox')
  })
  // 获取客户id
  function getCustId(){
    var custId 
    var pStr = window.location.search.split('?')[1] || ''
    var pMap = pStr.split('&')
    $.each(pMap, function (i, item) {
      var itemList = item.split('=')
      if (itemList[0] === 'custId') {
        custId = itemList[1]
      }
    })
    return custId
  }
  var phone_rule = /^1[3456789]\d{9}$/
  $('.modal-footer .btn-primary').click( function(){
    var contacts = $('#contacts').val()
    var phone = $('#phone').val()
    var check = $('#check').is(":checked")
    if ( !contacts ){
      $.message('请输入联系人')
      return
    }
    if ( !phone ){
      $.message('请输入手机号')
      return
    }
    if ( !phone_rule.test(phone) ){
      $.message('请输入有效手机号')
      return
    }
    if( !check ){
      $.message('请同意协议')
      return
    }
    let param = {
      url: 'ClientSpecial',
      basUrl: BUSINESS_BASE_URL,
      type:'post',
      data: JSON.stringify({
        custId: getCustId(),
        insureServiceProvider: 1, // 中国人保
        contacts: contacts, // 联系人
        contactNumber: phone, // 手机
      })
    }
    ajax(param, function success(res) {
      // console.log('分享',res);
      $('.modal').addClass('is-submit')
    }, function error(err) {
      console.log(err);
      // alert('失败')
    })
  })
  $('#modal').on('hidden.bs.modal', function () {
    $('#contacts').val('')
    $('#phone').val('')
    $("#check").prop("checked", false).parent().removeClass('is-checkbox')
    $('.modal').removeClass('is-submit')
  })
})