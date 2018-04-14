/**
 * Created by Damon on 2018/4/6.
 */
// 配置禁用小圆环
define(['nprogress','jquery','bootstrap'],function (NProgress,$) {
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
// 拦截设置
  if(location.href.indexOf('login.html')==-1){
    $.ajax({
      url:'/employee/checkRootLogin',
      type:'get',
      success:function (info) {
        console.log(info);
        if(info.error==400){
          location.href='login.html'
        }
      }
    })
  }


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

  });

})



