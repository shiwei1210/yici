/**
 * sseinfo-control
 * 与cms配合使用的控件  --列表分页、
 * @version  1.0.1
 * @project SSEINFO opensseinfo site
 * @author tonyxiao@sse.com.cn
 * @copyright: SSE INFONET LTD reserve all rights
 **/
define(['sseinfo-pagination'], function(sseinfo_Pagination) {
    var control = {};
    control.listPage = function() { //列表分页
        if($('.js_listPage').length>0){
            var pageList = new sseinfo_Pagination({
                listContainer: '.js_listPage',
                headerKeep: 1, //头部预留页码数量 headerKeep + footerKeep 必须为偶数
                footerKeep: 1, //尾部预留页码数量 headerKeep + footerKeep 必须为偶数
                pageLength: 7, //页码显示数量,必须为奇数
                pageType: 'WCM' //分页类型
            });
            pageList.initDom();
        }
    };
    return control;
});
