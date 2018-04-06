/**
 * Created by Damon on 2018/4/6.
 */
// 配置禁用小圆环
NProgress.configure({ showSpinner: false });
//jquery的全局事件需要给document注册（固定写法）
$(document).ajaxStart(function () {
  NProgress.start();
});
$(document).ajaxStop(function () {
  setTimeout(function () {
    NProgress.done();
  },1000)
})

$(function () {
//  一级菜单显示隐藏
  $('.category').on('click',function () {
    $(this).next().slideToggle();
  })
//  点击菜单，侧边栏滑动隐藏
  $('.icon-menu').on('click',function () {
    //console.log("hh");
    $('.aside').toggleClass('hideMenu');
    $('.main').toggleClass('hideMenu');
  })
//  点击退出，模态框显示
  $('.icon-logOut').on('click',function () {
    //console.log("hh");
    $('#logOut').modal('show');
  })
  // 点击确认 退出
  $('#logoutBtn').on('click',function () {
    $.ajax({
      url:'/employee/employeeLogout',
      dataType:'json',
      type:'get',
      success:function (info) {
        if(info.success){
          location.href='login.html'
        }
      }
    })
  })
//  点击a切换背景
  $('.aside_nav a').on('click',function () {
    $(this).addClass('current');
    $()
  })
})
