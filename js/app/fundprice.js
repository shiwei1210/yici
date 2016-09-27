$(function(){

var reg = new RegExp("(^|&)code_id=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            $('.js_code1').val(unescape(r[2]));
})