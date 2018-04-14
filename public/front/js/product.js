/**
 * Created by Damon on 2018/4/10.
 */
require(['mui','zepto','common','template'],function (mui,$,getSearch,template) {

  var id = getSearch('productId');
  $.ajax({
    url:'/product/queryProductDetail',
    data:{
      id:id
    },
    success:function (info) {
      console.log(info);
      $('.mui-scroll').html(template('productTmp',info))
      //获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
      });
      //动态添加的Numbox组件需要手动初始化
      mui('.mui-numbox').numbox()
    }
  })
  //注册委托事件选择尺码
  $('.lt_main ').on('click','.lt_size span',function () {
    $(this).addClass('current').siblings().removeClass('current');
  })
//  点击加入购物车，选好尺码，个数，加入到购入车
  $('.add_cart').on('click',function () {
    var size = $('.lt_size span.current').text();
    var num = $('.mui-numbox-input').val();
    if(!size){
      mui.toast('请选择尺码');
    }
  //  发送购物车ajax请求
    $.ajax({
      url:'/cart/addCart',
      type:'post',
      data:{
        productId:id,
        size:size,
        num:num
      },
      success:function (info) {
        console.log(info);
        if(info.error==400){
          location.href='login.html?retUrl='+location.href;
        }
        if(info.success){
          mui.confirm('商品添加成功','温馨提示',['继续浏览网页','去购物车'],function (e) {
            if(e.index == 1){
              location.href='cart.html';
            }
          })
        }
      }
    })
  })
})