/**
 * Created by Damon on 2018/4/6.
 */

$(function () {
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:'用户名不能为空'
          },
          stringLength:{
            min:2,
            max:10,
            message:'用户名长度必须在6到10之间'
          },
          callback:{
            message:'用户名不存在'
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:'密码不能为空'
          },
          stringLength:{
            min:6,
            max:18,
            message:'密码长度必须在6到18之间'
          },
          callback:{
            message:'密码错误'
          }
        }
      }
    }
  });
  $('[type = "reset"]').on('click',function () {
    //console.log('hhh');
    $('#form').data('bootstrapValidator').resetForm('true');
  })

  $('#form').on('success.form.bv',function (e) {
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      data:$('#form').serialize(),
      dataType:'json',
      success:function (info) {
        console.log(info);

        if(info.success){
          location.href='index.html'
        };
        if(info.error === 1000){
          $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback')
        }
        if(info.error === 1001){
          $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback')
        }
      }
    })
  })


})
