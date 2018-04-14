/**
 * Created by Damon on 2018/4/8.
 */

require(['jquery','template','bootstrap','bootstrapValidator','bootstrapPaginator','common','jquery-ui/ui/widget','jqueryFileupload'],function ($,template) {
  var currentPage = 1;
  var pageSize = 5;
  //1 渲染页面
  render();
  function render() {
    $.ajax({
      url:'/category/querySecondCategoryPaging',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      type:'GET',
      success:function (info) {
        console.log(info);
        $('.lt_content tbody').html(template('secondTmp',info));
      //  分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          //修改分页显示文字
          itemTexts: function(type, page, current) {
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

// 2 点击添加分类
  $('#addBtn').on('click',function () {
    //模态框显示
    $('#addModal').modal('show');
    //请求ajax渲染一级分类
    $.ajax({
      url:'/category/queryTopCategoryPaging',
      data:{
        page:1,
        pageSize:100
      },
      type:'get',
      success:function (info) {
        console.log(info);
        $('.dropdown-menu').html(template('modalTmp',info))
      }
    })
  })
//  3.注册委托事件，改变一级分类文本
  $('.dropdown-menu').on('click','a',function () {
    var txt = $(this).text();
    var id = $(this).data('id');
    $('[name="categoryId"]').val(id);
    $('.txt').text(txt);
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
  })


// 4 图片预览
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      var picAddr = data.result.picAddr;
      $('#form img').attr('src',picAddr);
      $('[name="brandLogo"]').val(picAddr);
      $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  });

//  5、表单校验
  $('#form').bootstrapValidator({
    excluded: [],
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      //品牌名称
      brandName:{
        validators:{
          notEmpty:{
            message:'请输入二级菜单'
          }
        }
      },
      categoryId:{
        validators:{
          notEmpty:{
            message:'请选择一级分类'
          },
          stringLenght:{
            min:1,

          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:'请上传图片'
          }
        }
      }
    }
  })

// 6 注册校验成功事件, 通过 ajax 进行添加
  $('#form').on('success.form.bv',function (e) {
    e.preventDefault();
    $.ajax({
      url:'/category/addSecondCategory',
      type:'post',
      data:$('#form').serialize(),
      success:function (info) {
        if(info.success){
          //重新渲染
          currentPage = 1;
          render();
        //  隐藏模态框
          $('#addModal').modal('hide');
          // 重置input框
          $('#form').data('bootstrapValidator').resetForm(true);
        //  找到下拉菜单文本设置
          $('.txt').text('请选择一级分类');
        //  找到图片框重置
          $('#form img').attr('src','images/none.png');
        }
      }
    })
  })
})
