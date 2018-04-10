/**
 * Created by Damon on 2018/4/10.
 */
$(function () {
  //获得slider插件对象
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
  });
  var id = getSearch('productId');
  $.ajax({
    url:'/product/queryProductDetail',
    data:{
      id:id
    },
    success:function (info) {
      console.log(info);
    }
  })
})