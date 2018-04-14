/**
 * Created by Damon on 2018/4/9.
 */
//<script src="lib/mui/js/mui.js"></script>
//  <script src="lib/zepto/zepto.min.js"></script>
//  <script src="lib/artTemplate/template-web.js"></script>
//  <script src="js/common.js"></script>
require(['mui','zepto','common','template'],function (mui,$,getSearch) {

  //获得slider插件对象
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
  });
})
