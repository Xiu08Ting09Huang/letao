/**
 * Created by Damon on 2018/4/9.
 */

require(['mui','zepto','common','template'],function (mui,$,getSearch,template) {
  $.ajax({
    url:'/category/queryTopCategory',
    success:function (info) {
      //console.log(info);
      $('.lt_category_left ul').html(template('leftTmp',info));
      render(info.rows[0].id);
    }
  })
  function render (id) {
    $.ajax({
      url:'/category/querySecondCategory',
      data:{id:id},
      success:function (info) {
        $('.lt_category_right ul').html(template('rightTmp',info))
      }
    })
  }
  $('.lt_category_left').on('click','a',function () {
    var id = $(this).data('id');
    render(id);
    $(this).addClass('current').parent().siblings().find('a').removeClass('current');
  })
})