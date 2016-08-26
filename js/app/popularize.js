define( function () {

    var popularize = {

        key: "VISITED_MENU",
        menuNumLmt:5,//显示栏目数目的上限
        articleNumLmt:10,//显示文章数目的上限
        menuLoggedNumLmt:11,// cookie 中存储的栏目数目上限
        delimiter:";",
        excludedMenu :"disclosure/listedinfo/announcement",//最新更新文章排除的栏目，披露-->最新公告
        setOption:function(menuNumber,articleNumber){
          this.menuNumLmt = menuNumber || this.menuNumLmt;
          this.articleNumLmt = articleNumber || this.articleNumLmt;
        },
        logVisitingMenu: function () {//记录当前访问的栏目

            var menuId =  window.col_id;
            var array = [];
            var loggedMenu = this.getLoggedMenu();
            if(loggedMenu.length >0){
                    array = JSON.parse(loggedMenu);
                    //console.log("before"+array.toString());
                    var index = array.indexOf(menuId);
                    if(index>-1){// if menu exists ,remove original one
                        array.splice(index,1);
                    }
                    array.push(menuId);//add the latest menu at the end of the array
                    if(array.length > this.menuLoggedNumLmt){//记录的栏目数达到最大值时移除最老的栏目
                        array.shift();
                    }
                    //console.log("after"+array.toString());
            }else{
                array.push(menuId);
            }
            this.setCookie(this.key,JSON.stringify(array));

        },
        getLoggedMenu: function () {
            return $.cookie(this.key) ? $.cookie(this.key) : "";
        },
        setCookie:function(k,v){

            $.cookie(k, v, { expires:7, path:'/'});
        },
        writeMenuToPage:function(tagMenuList){
            if(!tagMenuList){
                return;
            }
            var loggedMenu =  this.getLoggedMenu();
            if(loggedMenu && loggedMenu.length>0){

                var menuArray = JSON.parse(loggedMenu);
                var curMenuStr;
                var counter =0;
                var html = ' <div class="a-button">';
                while((curMenuStr = menuArray.pop()) != null && counter< this.menuNumLmt){
                    //console.log("......."+curMenuStr);
                    var curMenu = sseMenuObj.formatNode(curMenuStr);
                    html+="<a href='"+curMenu["href"]+"'><i class='arr-right'></i>"+curMenu["label"]+"</a>";
                    counter++;
                }
                html+='</div>';

                //console.log("html..."+html);
                $(tagMenuList).html("");
                $(tagMenuList).append(html);
            }
        },
        writeArticleToPage:function(tagArticleList){
            if(!tagArticleList){
                return;
            }


            var loggedMenu =  this.getLoggedMenu();
            var finalMenuArray = [];
            if(loggedMenu && loggedMenu.length>0){

                var menuArray = JSON.parse(loggedMenu);
                var curMenuStr;
                var counter =0;
                while((curMenuStr = menuArray.pop()) != null && counter< this.articleNumLmt){
                    //console.log("......."+curMenuStr);
                    var curMenu =   sseMenuObj.formatNode(curMenuStr);;
                    if(!curMenu || curMenu["href"].indexOf(this.excludedMenu) != -1){//如果当前是该排除的栏目 ，则跳过
                        continue;
                    }
                    var childrenNodes = sseMenuObj.getNodeChild();
                    //console.log("当前栏目:")
                    //console.dir(curMenu);
                    //console.log("当前栏目的子栏目:")
                    //console.dir(childrenNodes);
                    finalMenuArray.push(curMenuStr);//添加当前栏目
                    counter++;
                    if(childrenNodes && childrenNodes.length> 0){ //添加下面的全部子栏目
                        //finalMenuArray = finalMenuArray.concat(childrenNodes.split(";"));
                        for(var i = 0; i<childrenNodes.length;i++){
                            var curChildNode = childrenNodes[i];
                            if( !curChildNode || curChildNode["href"].indexOf(this.excludedMenu) != -1){
                                continue;
                            }
                            finalMenuArray.push(curChildNode["code"]);
                        }
                    }



                }
            }
            if(finalMenuArray.length > 0){
                var searchword="T_L cchannelcode T_E T_L"+ finalMenuArray.join("T_D") +"T_R T_R";
                //console.log("menu ids= "+finalMenuArray.toString());
                //console.log("searchword= "+searchword);

                //console.log("window.sseQueryURL = "+window.sseQueryURL);
                var queryURL = window.sseQueryURL || "http://query.sse.com/";
                //console.log("queryURL = "+queryURL);
                $.ajax({
                    url:queryURL+"search/getSearchResult.do?search=qwjs",
                    type:"POST",
                    dataType: "jsonp",
                    jsonp: "jsonCallBack",
                    data:{"searchword": searchword,"page":"1","orderby":"-CRELEASETIME","perpage":"10"},
                    cache : false,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function(json) {
                        //console.dir(json);
                        var articleList = json["data"];
                        if(articleList && articleList.length>0){
                            var html = '<div class="sse_list_1"><dl>';
                            for(var i=0; i < articleList.length;i++){
                                var article = articleList[i];
                                html+="<dd><a href='"+article["CURL"]+"'>"+article["CTITLE"]+"</a><span>"+article["CRELEASETIME"]+"</span></dd>";

                            }
                            html+='</dl></div>';
                            $(tagArticleList).html("");
                            $(tagArticleList).append(html);
                        }
                    },
                    error:function(){
                        //console.log("请求失败, url="+url);
                    }
                });
            }

        },
        process:function(){
            var tagMenuList = $("#latestMenuList");
            if($(tagMenuList).length > 0){
                this.writeMenuToPage(tagMenuList);
            }
            else{
                this.logVisitingMenu();
            }

            var tagArticleList = $("#latestArtileList");
            if($(tagArticleList).length > 0){
                this.writeArticleToPage(tagArticleList);
            }
        }

    }
    return popularize;
});
/*


 "7965":{"CHNLNAME":"每日统计",
          "PARENTCODE":"7964",
          "TYPE":"0",
          "DISPLAY":"1",
          "ORDER":"7964",
          "ISSPECIALCHANNEL":"0",
          "SHORTCUTORDER":"21",
          "CHILDREN":"",
          "STYLE":"",
          "URL": "/assortment/gpqq/date/overview/",
          "DATATYPE":"",
          "TARGET":"0"
          }
*/

/*
{
     code: key, //栏目id
     pcode: obj.PARENTCODE, //父栏目id
     label: key == '0' ? '首页' : obj.CHNLNAME, //标题
     href: obj.URL, //链接
     sorder: obj.SHORTCUTORDER, //快捷栏目类型序号
     order: obj.ORDER, //显示顺序
     target: obj.TARGET == '1' ? '_blank' : '_self', //打开窗口方式
     children: obj.CHILDREN, //子菜单
     nodeStyle: 'menu_style_' + obj.STYLE, //显示样式 0=新栏目
     active: key == sseMenuObj.act_id ? "active" : '' //是否是当前页面
};

*/