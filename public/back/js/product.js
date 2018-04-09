/**
 * Created by Damon on 2018/4/9.
 */

$(function(){
  var currentPage = 1;
  var pageSize = 5;
  var picArr = [];
  //1.渲染页面
  render();
  function render(){
    $.ajax({
      url:'/product/queryProductDetailList',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info);
        $('.lt_content tbody').html(template('productTmp',info));
        $('#paginator').bootstrapPaginator({
          //设置版本号
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          //设置分页标签的文本
          itemTexts:function (type,page,current) {
            switch (type){
              case 'prev':
                return '上一页';
              case 'next':
                return '下一页';
              case 'first':
                return '首页';
              case 'last':
                return '尾页';
              case 'page':
                return page;
            }
          },
          //设置分页标签的提示文本
          tooltipTitles:function (type,page,current) {
            switch (type){
              case 'prev':
                return '上一页';
              case 'next':
                return '下一页';
              case 'first':
                return '首页';
              case 'last':
                return '尾页';
              case 'page':
                return "前往第"+page+"页";
            }

          },
          //设置分页标签提示文本样式是否使用bootstrap的默认样式
          useBootstrapTooltip:true,
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        })
      }
    })
  }
//2.显示模态框
  $('#addBtn').on('click',function () {
    $('#addModal').modal('show');
  //  发送ajax请求渲染二级分类的下拉菜单
    $.ajax({
      url:'/category/querySecondCategoryPaging',
      data:{
        page:1,
        pageSize:100
      },
      success:function (info) {
        $('.dropdown-menu').html(template('modalTmp',info));
      }
    })
  })
//  3.图片显示
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      if(picArr.length >= 3){
        picArr.pop();
        $('#imgBox img:last-of-type').remove();
      }
      console.log(picArr);
      picArr.unshift(data.result);
      var picAddr = data.result.picAddr;
      $('#imgBox').prepend(' <img src="'+picAddr+'" width="100" alt="">');
      if(picArr.length === 3){
        //啊如果上传了三张图片后。手动校验成功状态
        $('#form').data('bootstrapValidator').updateStatus('picStatu','VALID');
      }

    }
  });

//  4.表单校验
  $('#form').bootstrapValidator({
    excluded: [],
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //3. 指定校验字段
    fields:{
      brandId:{
        validators:{
          notEmpty:{
            message:'请选择二级分类'
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:'请输入商品名称'
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:'请输入商品描述'
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:'请输入商品库存'
          },
          //正则校验
          regexp:{
            regexp: /^[1-9]\d*$/,
            message: '请输入有效的商品库存'
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:'请输入商品尺码'
          },
          regexp:{
            regexp: /^\d{2}-\d{2}$/,
            message: '请输入一个合法的尺码, 例如 32-44'
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:'请输入商品原价'
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:'请输入商品价格'
          }
        }
      },
      picStatu:{
        validators:{
          notEmpty:{
            message:'请上传 3 张图片'
          }
        }
      }
    }
    })

//  5.点击二级分类改变文本
  $('.dropdown-menu').on('click','a',function () {
    var txt = $(this).text();
    var id = $(this).data('id');
    $('[name="brandId"]').val(id);
    $('.txt').text(txt);
    $('#form').data('bootstrapValidator').updateStatus('brandId','VALID');
  })
//  6.表单校验成功
  $('#form').on('success.form.bv',function (e) {
    e.preventDefault;
    var paramsStr = $('#form').serialize();


    paramsStr += 'picName1='+picArr[0].picName+'&picAddr1='+picArr[0].picAddr;
    paramsStr += 'picName2='+picArr[1].picName+'&picAddr2='+picArr[1].picAddr;
    paramsStr += 'picName3='+picArr[2].picName+'&picAddr3='+picArr[2].picAddr;
    $.ajax({
      url:'/product/addProduct',
      type:'post',
      data:paramsStr,
      success:function (info) {
        if(info.success){
        //  模态框隐藏
          $('#addModal').modal('hide');
          currentPage = 1;
          render();
          $('#form').data('bootstrapValidator').resetForm(true);
        //  重置二级下拉菜单文本
          $('.txt').text(请选择二级分类);
        //  重置图片
          $('#imgBox img').remove();
        }
      }
    })

  })

})
