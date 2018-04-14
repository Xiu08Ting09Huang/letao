/**
 * Created by Damon on 2018/4/12.
 */

require(['mui','zepto','common','template'],function (mui,$,getSearch,template) {
  //渲染用户信息
  $.ajax({
    url:'/user/queryUserMessage',
    success:function (info) {
      console.log(info);
      $('.mui-media').html(template('infoTmp',info));
    }
  })
//  点击退出，实现退出功能
  $('.btn_edit').on('click',function () {
    $.ajax({
      url:'/user/logout',
      success:function (info) {
        console.log(info);
        if(info.success){
          location.href='login.html';
        }
      }
    })
  })
})
