/*
    为字符串拓展format方法
    用例：
    String.format('{0}, {1}!', 'Hello', 'world');
*/
if (!String.format) {
    String.format = function(src){
        if (arguments.length == 0){
            return null;
        }

        var args = Array.prototype.slice.call(arguments, 1);
        return src.replace(/\{(\d+)\}/g, function(m, i){
            return args[i];
        });
    };
}


(function($){

    /*
        给指定元素生成一个唯一id, 主要使用场景ajax需要一个id，防止多次点击

        用例：
        $('.someclass').setUUID();
    */
    $.fn.setUUID = function(){
        return this.each(function(){
            return $(this).attr('id', new Date().getTime());
        });
    }


	$.QXUtils = {
        version: '1.0.0',
        author: 'stranger',
        description: '工具包'
    };

    /*
        字典映射

        用例：
        $.QXUtils.dictMap({'a': '1', 'b': '2'}, {'a': 'a1', 'b': 'b1'})
        返回 {'a1': '1', 'b1': '2'}
    */
    $.QXUtils.dictMap = function(originDict, maps){
        var newDict = {};
        
        if(!originDict){
            return null;
        }
        
        for(var m in maps){
            newDict[m] = originDict[maps[m]]
        }

        return newDict;
    };

    /*
        批量字典映射解析

        $.QXUtils.dictMapParse([{'a': '1', 'b': '2'}], {'a': 'a1', 'b': 'b1'});
    */
    $.QXUtils.dictMapParse = function(data, maps){
        var temp = [];

            _.each(data, function(d){
                temp.push($.QXUtils.dictMap(d, maps));
            });

        return temp;
    };

    /*
        自动补零
        始终返回两位字符串，不够自动补零

        用例:
        $.QXUtils.addZero('0');
    */
    $.QXUtils.addZero = function(data){
        var temp = data + '';
        if(temp.length === 0){
            return '00'
        } else if(temp.length === 1){
            return  '0' + temp;
        } else{
            return data;
        }
    };

    /*
        格式化日期
        返回字符串  可带格式 y-m-d、h:m:s、y-m-d h:m:s

        用例:
        $.QXUtils.formatDate(new Date());
        $.QXUtils.formatDate(new Date(), 'y-m-d');
    */
    $.QXUtils.formatDate = function(date, format){

        var str = "",
            year = $.QXUtils.addZero(date.getFullYear()),
            month = $.QXUtils.addZero(date.getMonth()+1), 
            day = $.QXUtils.addZero(date.getDate()),
            hours = $.QXUtils.addZero(date.getHours()),
            minutes = $.QXUtils.addZero(date.getMinutes()),
            seconds = $.QXUtils.addZero(date.getSeconds());

        switch(format){
            case 'y-m-d': 
                str = String.format('{0}-{1}-{2}', year, month, day);
                break;
            case 'h:m:s':
                str = String.format('{0}:{1}:{2}', hours. minutes, seconds);
                break;
            default:
                str = String.format('{0}-{1}-{2} {3}:{4}:{5}', year, month, day, hours, minutes, seconds);
                break;
        }
        return str;

    };

    /*
        将表单数据转换成字典，用于ajax

        用例:
        $.ZXUtils.formToDict('myform');
    */
    $.QXUtils.formToDict = function(selector){
        var postData = {};

        // 转换
        _.map($(selector).serializeArray(), function(i){
            if(i.value){
                postData[i.name] = i.value
            }
        });

        return postData;
    };

    /*
        格式化价钱

        用例:
        $.QXUtils.formatPrice(12.5);
    */
    $.QXUtils.formatPrice = function(price){
        var price = Math.round(parseFloat(price) * 100) / 100;

        price = price + '';

        if(price.indexOf('.') > -1){
            if(price.split('.')[1].length == 1){
                return price + '0';
            } else {
                return price;
            }
        } else {
            return price + '.00';
        }
    };

    /*
        获取url参数

        用例:
        $.QXUtils.getQueryString('name');
    */
    $.QXUtils.getQueryString = function(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"),
            r = window.location.search.substr(1).match(reg);
        
        if(r != null){
            return decodeURI(r[2]);
        }

        return null;
    }

    /* 
        网站提示插件
    */
    $.QXNotice = {
        version: '1.0.0',
        author: 'stranger',
        description: '网站提示插件'
    };
    /*
        顶部通知
        content: 通知内容
        type: 是否重要通知

        用例:
        $.QXNotice.TopNotice('info', '这是通知', 2000);
    */
    $.QXNotice.TopNotice = function(type, content, closeSeconds){
        var noticeHtml = [
                '<div class="alert alert-dismissable pf box-shadow-224 border-radius-2 co5 zx-top-notice qx-{0}-notice">',
                    '<button type="button" class="close" aria-hidden="true">',
                        '<span class="fa fa-times co5 f18 pointer"></span>',
                    '</button>',
                    '<span class="fa {1} pa pr-10 f20" style="left: 25px; top: 15px;"></span>',
                    '<span class="notice-content pl-50">{2}</span>',
                '</div>'
            ].join(''),
            // 图标
            signDict = {
                'success': 'fa-check', 
                'error': 'fa-minus-circle',
                'warning': 'fa-warning',
                'info': 'fa-info-circle'
            },
            sign = signDict[type ? type : 'info'];


        var target = $(String.format(noticeHtml, type, sign, content)).appendTo($('body')),
            left = ($(window).width() - target.width()) / 2 - 30;

        target
        .css({'left': left > 0 ? left : 0 , 'top': 0})
        .animate({'top': 55}, 300);

        target
        .find('.close')
        .bind('click', function(){
            // 关闭之后删除自己
            target.animate({'top': 0}, 300, function(){target.remove()});
        });

        // 自动关闭时间
        if(closeSeconds){
            window.setTimeout(function(){
                target.animate({'top': 0}, 300, function(){target.remove()});
            }, closeSeconds);
        }

    };

    // 成功信息
    $.QXNotice.SuccessTopNotice = function(content){
        $.QXNotice.TopNotice('success', content, 3000);
    };

    // 错误信息
    $.QXNotice.ErrorTopNotice = function(content){
        $.QXNotice.TopNotice('error', content);
    };

    // 普通信息
    $.QXNotice.InfoTopNotice = function(content){
        $.QXNotice.TopNotice('info', content, 3000);
    };

    // 警告信息
    $.QXNotice.WarningTopNotice = function(content){
        $.QXNotice.TopNotice('warning', content);
    };


    /*
        分页组件
    */
    $.QXPagination = {
        version: '1.0.0',
        author: 'stranger',
        description: '分页组件'
    }
    /*
        分页组件
    */
    $.QXPagination.PaginationView = Backbone.View.extend({
        el: '.qx-pagination',

        step: 4,

        totalStep: 10,

        searchUrl: 'search',

        // 防止超出范围
        _protectRange: function(tempMin, tempMax, min, max){
            if(tempMin < min){
                tempMin = min;
            }

            if(tempMax > max){
                tempMax = max
            }

            return [tempMin, tempMax]
        },

        // 生成分页区间
        _generateRange: function(current, total){
            var pages = [], 
                current = parseInt(current),
                total = parseInt(total),
                min = current - this.step,
                max = current + this.step,
                temp = [];

            // 防止超出范围
            temp = this._protectRange(min, max, 1, total);
            min = temp[0];
            max = temp[1];

            // 维持列表在 totalStep-1 这个长度
            var tempCount = max - min + 2;
            if(tempCount < this.totalStep){
                if(max >= total){
                    max = total;
                    min = max - this.totalStep + 2;
                } else {
                    max = this.totalStep - 1;
                }
            }

            // 防止超出范围
            temp = this._protectRange(min, max, 1, total);

            // 生成列表
            pages = _.range(temp[0], temp[1]+1);

            return pages;
        },

        render: function(pageIndex, pageCount, searchUrl){
            var url = searchUrl || this.searchUrl,
                pageHtml = '',
                pages = this._generateRange(pageIndex, pageCount);
            
            for (var i = 0; i < pages.length; i++) {

                pageHtml += String.format(
                    '<li {0}><a href="#{1}/{2}">{3}</a></li>', 
                    pages[i] == pageIndex ? 'class="active"' : '', // 为当前页添加active类
                    url, 
                    pages[i], 
                    pages[i]
                );
            };

            // 首页
            pageHtml = String.format(
                '<li {0}><a href="{1}">&laquo;</a>', 
                pageIndex == 1 ? 'class="disabled"' : '',
                pageIndex == 1 ? 'javascript: void(0);' : ('#' + url + '/' + 1)
            ) + pageHtml;
            
            // 末页
            pageHtml += String.format(
                '<li {0}><a href="{1}">&raquo;</a>', 
                pageIndex == pageCount ? 'class="disabled"' : '',
                pageIndex == pageCount ? 'javascript: void(0);' : ('#' + url + '/' + pageCount)
            );

            this.$el.html(pageHtml);
        }
    });


    /*
        文本框组件
    */
    $.QXTextboxList = {
        version: '1.0.0',
        author: 'stranger',
        description: '文本框组件'
    };
    /**/
    $.QXTextboxList.create = function(selector, options){
        var temp = new $.TextboxList(selector, {
            bitsOptions: {
                box: {deleteButton: true}
            },
            unique: true, 
            max: options.max,
            plugins: {
                autocomplete: {
                    minLength: 2, // 最小字符
                    queryRemote: true, // 远程查询
                    placeholder: options.placeholder,
                    highlight: false,
                    onlyFromValues: true, // 是否默认选中第一个结果
                    remote: {
                        url: options.url, 
                        param: options.param,
                        loadPlaceholder: options.loadPlaceholder,
                    }
                }
            }

        });

        return {
            target: temp,
            add: function(name, value){
                temp.add(name, value)
            },
            getValues: function(){
                return _.map(temp.getValues(), function(v){return v[0]});
            }
        };
    };

})(jQuery);


/*
    创建 KindEditor 编辑器
    selector: textarea的选择器
*/
function createEditor(selector, imgType){
    return KindEditor.create(selector, {
        resizeType : 1,
        width: '100%',
        //autoHeightMode : true,
        allowPreviewEmoticons : true,
        allowImageUpload : true,
        allowImageRemote: true,
        // basePath: '/',
        uploadJson: MAIN_DOMAIN+'/save_img?img_type='+(imgType||""),
        pasteType : 1,
        cssData: 'body{font-family: "Helvetica Neue",Helvetica,"Lucida Grande","Luxi Sans",Arial,"Hiragino Sans GB",STHeiti,"Microsoft YaHei","Wenquanyi Micro Hei","WenQuanYi Micro Hei Mono","WenQuanYi Zen Hei","WenQuanYi Zen Hei Mono",LiGothicMed; font-size: 14px; color: #222;}',
        themesPath: MEDIA_URL + "css/kindeditor/themes/",
        pluginsPath: MEDIA_URL + "js/kindeditor/plugins/",
        langPath: MEDIA_URL + "js/kindeditor/",
        items : [
            'fontname', 'fontsize', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'removeformat', '|', 
            'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist', 'insertunorderedlist', '|', 
            'image', 'multiimage', 'link', '|',
            'fullscreen'
        ],
        afterCreate : function() { 
            //this.loadPlugin('autoheight');
        }, 
        afterBlur:function(){ 
            this.sync(); 
        },
        afterUpload : function(url) {
        }
    });
};

/*
    jQuery.validate 中文提示
*/
if(jQuery.validator){
    jQuery.extend(jQuery.validator.messages, {
        required: "必填字段",
        remote: "请修正该字段",
        email: "请输入正确格式的电子邮件",
        url: "请输入合法的网址",
        date: "请输入合法的日期",
        dateISO: "请输入合法的日期 (ISO).",
        number: "请输入合法的数字",
        digits: "只能输入整数",
        creditcard: "请输入合法的信用卡号",
        equalTo: "请再次输入相同的值",
        accept: "请输入拥有合法后缀名的字符串",
        maxlength: jQuery.validator.format("请输入一个 长度最多是 {0} 的字符串"),
        minlength: jQuery.validator.format("请输入一个 长度最少是 {0} 的字符串"),
        rangelength: jQuery.validator.format("请输入 一个长度介于 {0} 和 {1} 之间的字符串"),
        range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
        max: jQuery.validator.format("请输入一个最大为{0} 的值"),
        min: jQuery.validator.format("请输入一个最小为{0} 的值")
    });
}


$(document).ready(function(){

    // 给不支持placeholder的浏览器添加此属性
    $('input, textarea').placeholder();

    // 提示信息框
    try {
        if(ERROR_MSG){
            $.QXNotice.ErrorTopNotice(ERROR_MSG);
        }
        if(SUCCESS_MSG){
            $.QXNotice.SuccessTopNotice(SUCCESS_MSG);
        }
        if(INFO_MSG){
            $.QXNotice.InfoTopNotice(INFO_MSG);
        }
        if(WARNING_MSG){
            $.QXNotice.WarningTopNotice(WARNING_MSG);
        }
    }
    catch(e) {
        alert(e);
    }

    // 统一返回按钮事件处理
    $('.go-back').bind('click', function(){
        if(document.referrer.indexOf('192.168.') > -1 || document.referrer.indexOf('aoaoxc.com') > -1){
            history.go(-1);
        } else {
            if(typeof(PARENT_URL) != "undefined" && PARENT_URL != ""){
                window.location.href = PARENT_URL;
            } else {
                window.location.href = "/";
            }
        }
        
    });

});