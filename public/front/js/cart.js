/**
 * Created by Damon on 2018/4/12.
 */
//


require(['mui','zepto','common','template'],function (mui,$,getSearch,template) {
  function render() {
    $.ajax({
      url: '/cart/queryCart',
      success: function (info) {
        //console.log(info);
        if (info.error) {
          location.href = 'login.html?retUrl=' + location.href;
        }
        $('.mui-table-view').html(template('cartTmp', {list: info}))
        mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
      }
    })
  }

  //下拉刷新
  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        callback: function () {
          render();
        }
      }
    }
  });
//  点击删除按钮，删除单条数据
  $('.lt_main').on('tap', '.btn_delete', function () {
    var id = $(this).data('id');
    mui.confirm('你是否要删除这商品？', '温馨提示', ['取消', '确认'], function (e) {
      if (e.index == 1) {
        //  发送ajax请求
        $.ajax({
          url: '/cart/deleteCart',
          data: {id: [id]},
          success: function (info) {
            if (info.success) {
              //重新加载下拉刷新
              mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
            }
          }
        })
      }
    })

  });
//  点击编辑按钮，编辑信息
  $('.lt_main').on('tap', '.btn_edit', function () {
    var data = this.dataset;
    console.log(data);
    var htmlStr = template('editTmp',data);
    htmlStr = htmlStr.replace(/\n/g,'');
    var id = $(this).data('id');
    mui.confirm(htmlStr, '编辑商品', ['取消', '确认'], function (e){
      if(e.index == 1){
        var size = $('.lt_size span.current').text();
        var num = $('[type="number"]').val();
      //  发送ajax请求
        $.ajax({
          url:'/cart/updateCart',
          data:{
            id:id,
            size:size,
            num:num
          },
          type:'post',
          success:function (info) {
            console.log(info);
            if(info.success){
              //重新加载下拉刷新
              mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
            }
          }
        })

      }
    })
    //初始化数量计数
    mui('.mui-numbox').numbox()
  })
  //切换尺码
  $('body').on('click','.lt_size span',function () {
    $(this).addClass('current').siblings().removeClass('current');
  })


//  计价
  $('.mui-table-view').on('change','.ck',function () {
    var total = 0;
    $('input:checked').each(function (i,v) {
      var price = $(this).data('price');
      var num = $(this).data('num');
      total+=price * num;
    })
    $('.total').text(total.toFixed(2));

  })

})