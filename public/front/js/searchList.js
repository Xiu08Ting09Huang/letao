/**
 * Created by Damon on 2018/4/10.
 */
$(function () {

 $('.lt_search input').val(getSearch('key'));

  //1.渲染页面
  render();
  function render () {
    $('.lt_product').html('<div class="loading"></div>')
    var params = {};
    params.proName = $('.lt_search input').val();
    params.page=1;
    params.pageSize = 100;

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
          $('.lt_product').html(template('searchTmp',info));
        }
      })
    },500)

  }
//  2.点击搜索框 根据关键字渲染页面
  $('.btn_search').on('click',function () {
    render();
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
  $('.lt_sort a[data-type]').on('click',function () {
    if($(this).hasClass('current')){
    //  切换图标的类名
      $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
    }else {
    //  切换高亮
      $(this).addClass('current').siblings().removeClass('current');
      $('.lt_sort a i').removeClass('fa-angle-up').addClass('fa-angle-down');
    }
    render();
  })
})