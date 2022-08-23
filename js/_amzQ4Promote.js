$(function ($) {
  'use strict';
  var inviteCode = undefined
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
  getInvitationCode()
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
        href = 'https://client.skyee360.com/Account/AddEmail?inviteCode='+ inviteCode +'&email=' + name
      }else{
        href = 'https://client.skyee360.com/Account/AddEmail?email='+ name
      } 
    }
    window.open(href, '_blank')
  }
  $('[id="vcc_register"]').each(function(){
    $(this).bind("click", function() {
        register()
    });
  })
})