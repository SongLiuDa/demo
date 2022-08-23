$(function ($) {
  'use strict';
  var inviteCode = $.getInviteCode()
  function register(name){
    let href
    if ($.isMobile()){
      if (inviteCode  ){
        href = 'https://www.skyee360.com/signUp/register.html?inviteCode='+ inviteCode 
      }else{
        href = 'https://www.skyee360.com/signUp/register.html'
      }
    }else{
      if (inviteCode){
        href = 'https://client.skyee360.com/Account/AddEmail?inviteCode='+ inviteCode
      }else{
        href = 'https://client.skyee360.com/Account/AddEmail'
      } 
    }
    window.open(href, '_blank')
  }
  $('#register1').click( function(){
    register()
  })
  $('#register2').click( function(){
    register()
  })
})