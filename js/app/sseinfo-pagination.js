/**
 * sseinfo-pagination
 * 分页
 * @version  1.0.1
 * @project SSEINFO opensseinfo site
 * @author tonyxiao@sse.com.cn
 * @copyright: SSE INFONET LTD reserve all rights
 **/
define([], function() {

    /*---分页---*/
    function sseinfo_Pagination(options) {
        var opts = {
            listContainer: '.sseinfo-lists',
            pcPageContainer: '.pagination', //分页输出ID选择器
            mobilePageContainer: '.mobile-pagination .pager', //分页输出ID选择器
            headerKeep: 1, //头部预留页码数量 headerKeep + footerKeep 必须为偶数
            footerKeep: 1, //尾部预留页码数量 headerKeep + footerKeep 必须为偶数
            pageLength: 7, //页码显示数量,必须为奇数
            disable: 'disabled', //不能点击class
            active: 'active', //标签选中class
            pageType: 'WCM', //分页类型
            ajaxType: 'post', //请求类型
            isStatic: false,
            ajaxData: function() {}, //异步请求
            ajaxDataType: 'html' //数据类型
        };
        $.extend(opts, options || {});
        this.$listContainer = $(opts.listContainer); //数据输出选择器
        this.$pcPageContainer = $(opts.pcPageContainer);
        this.$mobilePageContainer = $(opts.mobilePageContainer);
        this.$pageContainer = $(opts.pcPageContainer + ',' + opts.mobilePageContainer);
        this.pageCount = $("#createPage").attr("PAGE_COUNT");
        this.pageIndex = $("#createPage").attr("PAGE_INDEX");
        this.dataUrl = $('#createPage').attr("PAGE_NAME") + ".htm"; //数据URL
        this.option = opts;
        this.initEvents();
    };
    sseinfo_Pagination.prototype.initEvents = function() { //初始化事件绑定
        var self = this;
        //绑定点击事件
        if (!self.option.isStatic) {
            self.$pageContainer.on('click', 'a:not(.' + self.option.active + ')', function() {
                var page = $(this).attr("data-page");
				var thisVal = $(this).text();                             //  判断是否为输入页面直接跳转，如果是，则传入需要跳转的值;
				if(thisVal=="GO"){                     
					page = $(".pagination-page-input").val();
					if(page==""||page==null){	
						return false;
					}
				}			
                if (page != undefined && page != '...') {
                    self.pageIndex = page;
                    self.initDom();
                }
            });
        }
    };
    sseinfo_Pagination.prototype.initDom = function() { //初始化分页内容
        var self = this;
        if (self.option.pageType == 'WCM') {
            // if (self.pageCount == 1) {
            //     self.$pageContainer.hide();
            // } else {
            //     self.$pageContainer.show();
            // }
            if (!self.option.isStatic) {
                self._getData();
            }
        } else {
            var results = self.ajaxData();
            if (results != null) {
                self.pageIndex = results.pageIndex;
                self.pageCount = results.pageCount;
            }
        }
        self._createPage();
    };
    sseinfo_Pagination.prototype._createPage = function() {//创建页码
        var self = this;
        var total_page = parseInt(self.pageCount); //总页数
        if (self.option.isStatic) { //判断处理WCM当前页面
            if (self.pageIndex == 0) {
                self.pageIndex = 1;
            } else {
                self.pageIndex++;
            }
        }
        if (self.option.ajaxDataType == 'xml') { //判断处理WCM当前页面
            if (self.pageIndex == 0) {
                self.pageIndex = 1;
            }
        }
        if(total_page == 1){
            self.$pcPageContainer.html("");
            self.$mobilePageContainer.html(""); //手机分页
            return false;
        }
        var current_page = parseInt(self.pageIndex), //当前页数
            pager_length = self.option.pageLength, //不包next 和 prev 必须为奇数
            header_length = self.option.headerKeep, //头部预留页码
            tailer_length = self.option.footerKeep, //尾部预留页码
            //header_length + tailer_length 必须为偶数
            main_length = pager_length - header_length - tailer_length; //必须为奇数
        if (total_page < current_page) { //总页数不能小于当前页数
            return false;
        }
        var pc_shtml = '';
        var dotLi = pageNum({
            active: false,
            num: '...'
        });
        //判断总页数是不是小于 分页的长度，若小于则直接显示
        if (total_page <= pager_length) {
            for (var i = 1; i <= total_page; i++) {
                var opts = {
                    active: (current_page == i),
                    num: i
                };
                pc_shtml += pageNum(opts);
            }
        } else { //如果总页数大于分页长度，则为一下函数
            //先计算中心偏移量
            var offset = (pager_length - 1) / 2;
            //分三种情况，第一种左边没有...
            if (current_page <= offset + 1) {
                var tailer = '';
                //前header_length + main_length 个直接输出之后加一个...然后输出倒数的    tailer_length 个
                for (var i = 1; i <= header_length + main_length; i++) {
                    var opts = {
                        active: (current_page == i),
                        num: i
                    };
                    pc_shtml += pageNum(opts);
                }
                pc_shtml += dotLi;
                for (var i = total_page; i > total_page - tailer_length; i--) {
                    var opts = {
                        active: false,
                        num: i
                    };
                    tailer = pageNum(opts) + tailer;
                }
                pc_shtml += tailer;
            } else if (current_page >= total_page - offset) { //第二种情况是右边没有...
                var tailer = '';
                for (var i = 1; i <= header_length; i++) {
                    var opts = {
                        active: false,
                        num: i
                    };
                    pc_shtml += pageNum(opts);
                }
                if (total_page != (pager_length + 1)) {
                    pc_shtml += dotLi;
                }
                //后tailer_length + main_length 个直接输出之前加一个...然后拼接 最前面的 header_length 个
                for (var i = total_page; i >= total_page - main_length - 1; i--) {
                    var opts = {
                        active: (current_page == i),
                        num: i
                    };
                    tailer = pageNum(opts) + tailer;
                }
                pc_shtml += tailer;
            } else { //最后一种情况，两边都有...
                var header = '',
                    tailer = '';
                //首先处理头部
                for (var i = 1; i <= header_length; i++) {
                    var opts = {
                        active: false,
                        num: i
                    };
                    header += pageNum(opts);
                }
                header += dotLi;
                //处理尾巴
                for (var i = total_page; i > total_page - tailer_length; i--) {
                    var opts = {
                        active: false,
                        num: i
                    };
                    tailer = pageNum(opts) + tailer;
                }
                tailer = dotLi + tailer;
                //处理中间
                //计算main的中心点
                var offset_m = (main_length - 1) / 2,
                    partA = '',
                    partB = '',
                    i = current_page,
                    j = current_page,
                    counter = (parseInt(current_page) + parseInt(offset_m));
                for (; i <= counter; i++, j--) {
                    if (i != j) {
                        var opts = {
                            active: false,
                            num: j
                        };
                        partA = pageNum(opts) + partA;
                    }
                    var opts = {
                        active: (i == j),
                        num: i
                    };
                    partB += pageNum(opts);
                }
                //拼接
                pc_shtml = header + partA + partB + tailer;
            }
        }
        var disabledClass = '';
        if (current_page == 1) {
            disabledClass = self.option.disable;
        }
        var prevNum = current_page == 1 ? current_page : (current_page - 1);
        var prev = '<li class="' + disabledClass + '"><a href="javascript:;" aria-label="Previous" data-page="' + prevNum + '"><span aria-hidden="true">上一页</span></a></li>';
        var mobilePrev = '<li class="previous"><a href="javascript:;" class="' + disabledClass + '" data-page="' + prevNum + '">上一页</a></li>';
        disabledClass = '';
        if (current_page == total_page) {
            disabledClass = self.option.disable;
        }
        var nextNum = current_page == total_page ? current_page : (current_page + 1);
        var next = '<li class="' + disabledClass + '"><a href="javascript:;" aria-label="Next" data-page="' + nextNum + '"><span aria-hidden="true">下一页</span></a></li>';
        var mobileNext = '<li class="next"><a href="javascript:;" class="' + disabledClass + '" data-page="' + nextNum + '">下一页</a></li>';
		var pcRightOne = '<div class="pagination-page-right">';
		var pcAllNum = '<p>共<span class="pagination-page-span">'+total_page+'</span>页</p>';
		var pcJump = '<p class="pagination-page-p">转到第<input class="pagination-page-input">页</p>';
		var pcGo = '<a class="pagination-page-go" data-page="6">GO</a>';
		var pcRightTwo = '</div>';
        pc_shtml = prev + pc_shtml + next + pcRightOne + pcAllNum + pcJump + pcGo + pcRightTwo;

        function pageNum(opts) {
            var active = opts.active ? self.option.active : '';
            if(opts.num == '...'){
                active += ' ellipsis';
            }
            return '<li class="' + active + '"><a href="javascript:;" data-page="' + opts.num + '">' + opts.num + '</a></li>';
        }
        self.$pcPageContainer.html(pc_shtml);
        self.$mobilePageContainer.html(mobilePrev + mobileNext); //手机分页
    };
    //请求数据" style="display:none" ="20"  ="1" PAGE_NAME='/aboutus/mediacenter/hotandd/data' PAGE_EXT='htm' ></div>
    sseinfo_Pagination.prototype._getData = function() {
        var self = this;
        var xmlData = null;
        $.ajax({
            type: self.option.ajaxType,
            dataType: self.option.ajaxDataType,
            url: self._makeUrl(),
            success: function(xml) {
                xml = '<div>' + xml + '</div>';
                xmlData = $(xml).find(self.option.listContainer);
                self.pageIndex = $(xml).find("#createPage").attr("PAGE_INDEX");
                self.pageCount = $(xml).find("#createPage").attr("PAGE_COUNT");
                self.$listContainer.html(xmlData.html()); //数据的填充
            },
            error: function(xml) {
                xmlData = null;
            }
        });
    };
    //计算分页URL值
    sseinfo_Pagination.prototype._makeUrl = function() {
        var self = this;
        var _dataUrl = self.dataUrl;
        var _pageIndex = self.pageIndex;
        _dataUrl = _dataUrl.replace(".htm", '_' + _pageIndex + '.htm');
        if (_pageIndex > 1) {
            _dataUrl = _dataUrl.replace(_dataUrl.substring(_dataUrl.lastIndexOf("_")), '_' + _pageIndex + '.htm');
        } else {
            _dataUrl = _dataUrl.replace(_dataUrl.substring(_dataUrl.lastIndexOf("_")), '.htm');
        }
        return _dataUrl;
    };
    return sseinfo_Pagination;
});
