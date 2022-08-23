/**
 * ajax二次封装
 * @param {String} param.url 地址
 * @param {String} param.type 类型
 * @param {Object} param.data 参数
 * @param {Function} success 成功回调
 * @param {Function} error 失败回调
 */
const BASE_URL = 'https://global.skyee360.com/api/v1/'
const ajax = function (param, success, error) {
  $.ajax({
    url: BASE_URL + param.url,
    headers:{
      'X-Language':'ZH'
    },
    contentType: param.contentType || 'application/x-www-form-urlencoded',
    type: param.type || 'get',
    data: param.data,
    success: function (res) {
      let newRes = {
        data: res.body
      }
      if( res.meta.ack === 'false' ){
        error(res)
      }else{
        success(newRes);
      }
    },
    error: function (err) {
      error(err)
    },
  });
}