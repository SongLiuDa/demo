$(function ($) {
  'use strict';
  var inviteCode = undefined
  // 邀请码
  function getInvitationCode() {
    var pStr = window.location.search.split('?')[1] || ''
    var pMap = pStr.split('&')
    $.each(pMap, function (i, item) {
      var itemList = item.split('=')
      if (itemList[0] === 'inviteCode') {
        inviteCode = itemList[1]
      }
    })
  }
  function init(){
    getInvitationCode()
  }
  init()
  // 立即绑定 移动
  $('#mobileReg').click( function(){
    let href = ''
    if (inviteCode){
      href = 'https://www.skyee360.com/signUp/register.html?inviteCode=' + inviteCode
    }else{
      href = 'https://www.skyee360.com/signUp/register.html'
    }
    window.open(href, '_blank')
  })
  // 立即绑定 pc
  $('[id="pcReg"]').click( function(){
    let href = ''
    if (inviteCode){
      href = 'https://client.skyee360.com/Account/AddEmail?inviteCode=' + inviteCode
    }else{
      href = 'https://client.skyee360.com/Account/AddEmail'
    }
    window.open(href, '_blank')
  })
  // 进入官网
  function enterWebsite(){
    let href
    if (inviteCode){
      href = 'https://www.skyee360.com?inviteCode='+ inviteCode
    }else{
      href = 'https://www.skyee360.com'
    }
    window.open(href, '_blank')
  }
  $('[id="enter_website"]').click( function(){
    enterWebsite()
  })
})