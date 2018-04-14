/**
 * Created by Damon on 2018/4/10.
 */
require(['mui','zepto','common','template'],function (mui,$,getSearch,template) {

  console.log(getSearch);

  $('.lt_search input').val(getSearch('key'));

  //1.渲染页面
  var currentPage = 1;
  var pageSize = 4;
  function render (callback) {
    //$('.lt_product').html('<div class="loading"></div>')
    var params = {};
    params.proName = $('.lt_search input').val();
    params.page=currentPage;
    params.pageSize = pageSize;

    var $current = $('.lt_sort .current');
    if($current.length > 0){
      var sortName = $current.data('type');
      var value = $current.find('i').hasClass('fa-angle-down') ? 2:1;
      params[sortName] = value;
    }
    //console.log(params);
    setTimeout(function () {
      $.ajax({
        url:'/product/queryProduct',
        data:params,
        success:function (info) {
          console.log(info);
          callback(info);
        }
      })
    },500)

  }
//  下拉刷新
  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        callback :function(){
          currentPage = 1;
          render(function(info){
            $('.lt_product').html(template('searchTmp',info));
            // 刷新成功后停止下拉刷新
            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
            //重新启用上拉加载功能
            //mui('.mui-scroll-wrapper').pullRefresh().enablePullupToRefresh();
            mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
          });
        }
      },
      up:{
        callback :function(){
          currentPage++;
          render(function (info) {
            if(info.data.length>0){
              $('.lt_product').append(template('searchTmp',info));

              mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
            }else{
              //没有数据，提示用户没有更多数据
              mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
            }
          });
        }
      }
    }
  });
//  2.点击搜索框 根据关键字渲染页面
  $('.btn_search').on('click',function () {
    //重新刷新页面
    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
    //获取存储在浏览器中的json字符串
    var history = localStorage.getItem('search_list');
    //把json字符串转换成数组
    var arr = JSON.parse(history);
    //获取关键字
    var key = $('.lt_search input').val();
    //储存在浏览器中的数据不能超过十条
    if(arr.length >=10){
      arr.pop();
    }
    //不储存重复的关键字
    var index = arr.indexOf(key);
    if(index !== -1){
      arr.splice(index,1);
    }
    arr.unshift(key);
    localStorage.setItem('search_list',JSON.stringify(arr));
  })
//  3.排序
  $('.lt_sort a[data-type]').on('tap',function () {
    if($(this).hasClass('current')){
    //  切换图标的类名
      $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
    }else {
    //  切换高亮
      $(this).addClass('current').siblings().removeClass('current');
      $('.lt_sort a i').removeClass('fa-angle-up').addClass('fa-angle-down');
    }
    //重新刷新页面
    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
  })
})