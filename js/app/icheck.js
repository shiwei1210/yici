/* 
* @Author: anchen
* @Date:   2015-11-19 17:40:49
* @Last Modified by:   anchen
* @Last Modified time: 2015-11-19 18:04:40
*/
//checkbox input
jQuery.fn.customInput = function(){
    return $(this).each(function(){ 
        if($(this).is('[type=checkbox]')){
            var input = $(this);
            // 使用输入的ID得到相关的标签
            var label = $(this).parent();
            
            //绑定自定义事件，触发它，绑定点击，焦点，模糊事件              
            input.bind('updateState', function(){   
                input.is(':checked') ? label.addClass('checked') : label.removeClass('checked'); 
            })
            .trigger('updateState')
            .click(function(){ 
                $(this).trigger('updateState'); 
            });
            
            if(input.is(':disabled')){ label.addClass('iedisabled'); }
        };
        if($(this).is('[type=radio]')){
            var input = $(this);
            // 使用输入的ID得到相关的标签
            var label = $(this).parent();
            
            //绑定自定义事件，触发它，绑定点击，焦点，模糊事件              
            input.bind('updateState', function(){   
                input.is(':checked') ? label.addClass('checked') : label.removeClass('checked'); 
            })
            .trigger('updateState')
            .click(function(){ 
                $('input[name='+ $(this).attr('name') +']').trigger('updateState'); 
            });
            
            if(input.is(':disabled')){ label.addClass('iedisabled'); }
        }
        
    });
};

function init(){
    //checkbox input 使用图标
    if($(".checkbox").length >0){
        $('.checkbox input[type=checkbox]').customInput();
    }
}