/**
 * Created by Damon on 2018/4/7.
 */

//<script src="lib/jquery/jquery.js"></script>
//  <script src="lib/bootstrap/js/bootstrap.js"></script>
//  <script src="lib/bootstrap-validator/js/bootstrapValidator.js"></script>
//  <script src="lib/nprogress/nprogress.js"></script>
//  <script src="lib/artTemplate/template-web.js"></script>
//  <script src="lib/bootstrap-paginator/bootstrap-paginator.js"></script>
//  <script src="js/common.js"></script>
require(['jquery','template','bootstrap','bootstrapValidator','bootstrapPaginator','common'],function ($,template) {
  var currentPage = 1;
  var pageSize = 5;
  render();
  // 渲染封装
  function render() {
    $.ajax({
      url: '/user/queryUser',
      type: 'get',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info);
        $('.lt_content tbody').html(template('userTmp', info))
        //  分页
        $('#pagintor').bootstrapPaginator({
          //设置版本号
          bootstrapMajorVersion: 3,
          //当前的页数
          currentPage: info.page,
          // 总页数
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render()
          }

        })
      }
    })
  }

//  模态框
  $('.lt_content tbody').on('click', 'button', function () {
    $('#userModal').modal('show');
    var id = $(this).parent().data('id');
    var isDelete = $(this).hasClass('btn-success') ? 1 : 0
    // 点击 确认
    $('#submitBtn').off().on('click', function () {
      // 发出ajax请求
      $.ajax({
        url:'/user/updateUser',
        type:'post',
        data:{
          id:id,
          isDelete:isDelete
        },
        success:function (info) {
          if(info.success){
            //关闭模态框
            $('#userModal').modal('hide');
          //  重新渲染页面
            render();
          }
        }
      })


    })
  })

})
