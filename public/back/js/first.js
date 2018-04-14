/**
 * Created by Damon on 2018/4/7.
 */
//<script src="lib/jquery/jquery.js"></script>
//  <script src="lib/bootstrap/js/bootstrap.js"></script>
//  <script src="lib/bootstrap-validator/js/bootstrapValidator.js"></script>
//  <script src="lib/bootstrap-paginator/bootstrap-paginator.js"></script>
//  <script src="lib/artTemplate/template-web.js"></script>
//  <script src="lib/nprogress/nprogress.js"></script>
//  <script src="js/common.js"></script>
require(['jquery','template','bootstrap','bootstrapValidator','bootstrapPaginator','common'],function ($,template) {
  var currentPage = 1;
  var pageSize = 5;
  //1 渲染页面
  render();
  function render(){
    $.ajax({
      url:'/category/queryTopCategoryPaging',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function (info) {
        console.log(info);
        $('.lt_content tbody').html(template('firstTmp',info))
      //  分页
        $('#paginator').bootstrapPaginator({
          //设置版本号
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          itemTexts: function(type, page, current) { //修改显示文字
            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              case "page":
                return page;
            }
          },
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }

        })
      }
    })

  }

// 2  模态框
  $('#addBtn').on('click',function () {
    $('#addModal').modal('show');
  })

//  3 通过校验插件, 添加校验功能
  $('#form').bootstrapValidator({
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:'请输入一级分类名称'
          }
        }
      }
    }
  })


  // 4 注册表单校验成功事件
  $('#form').on('success.form.bv',function (e) {
    e.preventDefault();
    $.ajax({
      url:'/category/addTopCategory',
      type:'POST',
      data:$('#form').serialize(),
      success:function (info) {
        //console.log(info);
        if(info.success){
          // 关闭模态框
          $('#addModal').modal('hide');
          currentPage = 1;
          //重新渲染页面
          render();
          // 重置表单校验状态和 表单内容
          // 传 true 不仅可以重置 状态, 还可以重置内容
          $('#form').data('bootstrapValidator').resetForm(true)
        }
      }
    })
  })




})
