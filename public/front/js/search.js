/**
 * Created by Damon on 2018/4/10.
 */

require(['mui','zepto','common','template'],function (mui,$,getSearch,template) {
//  获取存储本地的数据
  function getHistory() {
    var history = localStorage.getItem('search_list') || '[]';
    var arr = JSON.parse(history);
    return arr
  }

  function render() {
    var arr = getHistory();
    //渲染页面
    $('.history').html(template('searchTmp', {arr: arr}))
  }

  render();

//  2.点击×删除单条数据
  $('.history').on('click', '.btn_delete', function () {
    var that = this
    mui.confirm('确定要删除记录?', '温馨提示', ['取消', '确认'], function (e) {
      if (e.index == 1) {
        var index = $(that).data('index');
        var arr = getHistory();
        arr.splice(index, 1);
        localStorage.setItem('search_list', JSON.stringify(arr));
        render();
      }
    })

  })
//  3.点击清空历史按钮
  $('.history').on('click', '.btn_empty', function () {
    mui.confirm('确定要清空历史记录?', '温馨提示', ['取消', '确认'], function (e) {
      if (e.index == 1) {
        localStorage.removeItem('search_list');
        render();
      }
    })
  })
//  4.点击搜索功能添加搜索
  $('.lt_search button').on('click', function () {
    var key = $('.lt_search input').val().trim();
    if (key == '') {
      mui.toast('请输入关键字');
      return false;
    }
    var arr = getHistory();
    //arr长度大于10，删除最后一个
    if (arr.length >= 10) {
      arr.pop();
    }
    //arr里面有重复的，删掉重复
    var index = arr.indexOf(key);
    if (index !== -1) {
      arr.splice(index, 1);
    }
    arr.unshift(key);
    localStorage.setItem('search_list', JSON.stringify(arr));
    render();
    $('.lt_search input').val('');
    location.href = "searchList.html?key=" + key;

  })


})