/**
 * Created by Damon on 2018/4/9.
 */
define(['mui'],function (mui) {
  mui('.mui-scroll-wrapper').scroll({
    indicators: false, //是否显示滚动条
  });

// 获取拼接地址封装
function getSearch(key) {
  var search = location.search;
  //console.log(search);
  var str = decodeURI(search);
  str = str.slice(1);
  var arr = str.split('&');
  var obj ={};
  arr.forEach(function (v,i) {
    var key = v.split('=')[0];
    var value = v.split('=')[1];
    obj[key] = value;
  })
  return obj[key];
}
  return getSearch;
})
