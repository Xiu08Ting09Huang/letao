/**
 * Created by Damon on 2018/4/12.
 */
//<script src="lib/mui/js/mui.js"></script>
//  <script src="lib/zepto/zepto.min.js"></script>
//  <script src="lib/artTemplate/template-web.js"></script>
//  <script src="js/common.js"></script>
require(['mui','zepto','common','template'],function (mui,$,getSearch,template) {

  $('[type="button"]').on('click',function () {
    var username = $('[name="username"]').val().trim();
    var password = $('[name="password"]').val().trim();
    console.log(username);
    if(!username){
      mui.toast('请输入用户名');
      return
    }
    if(!password){
      mui.toast('密码不能为空');
      return false;
    }
    $.ajax({
      url:'/user/login',
      data:{
        username:username,
        password:password,
      },
      type:'post',
      success:function (info) {
        console.log(info);
        if(info.error){
          mui.toast('用户名或者密码错误');
          return;
        }
        if(info.success){
          var search = location.search;
          if(search.indexOf('retUrl') != -1){
            search = search.replace('?retUrl=','');
            location.href=search;
          }else{
            location.href='user.html';
          }


        }
      }
    })
  })


})