/**
 * Created by cn on 16-9-22 by liyinhui
 */
$.event.special.valuechange = {

    teardown: function (namespaces) {
        $(this).unbind('.valuechange');
    },

    handler: function (e) {
        $.event.special.valuechange.triggerChanged($(this));
    },

    add: function (obj) {
        $(this).on('keyup.valuechange cut.valuechange paste.valuechange input.valuechange', obj.selector, $.event.special.valuechange.handler)
    },

    triggerChanged: function (element) {
        var current = element[0].contentEditable === 'true' ? element.html() : element.val()
            , previous = typeof element.data('previous') === 'undefined' ? element[0].defaultValue : element.data('previous');
        if (current !== previous) {
            element.trigger('valuechange', [element.data('previous')]);
            element.data('previous', current)
        }
    }
};


/*
 * 智能机浏览器版本信息:
 *
 */
var browser = {
    versions: function() {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {//移动终端浏览器版本信息
            sougou: u.indexOf('asdasd;ass;') > -1,
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1 //是否是微信浏览器
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    // window.location="https://itunes.apple.com/xxx";
}
else if (browser.versions.android) {
    //window.location="http://xxx/xxx.apk";
}

////////////////////////////////////////////////////////////////////////


$(function () {
    var body_height = $("body").height();
    var window_height = $(window).height();
    var window_width = $(window).width();

    /*字体大小自适应*/
    $("html").css("font-size",Math.ceil((window_width/375)*10)+"px");
   
});


$(window).resize(function() {
    var body_height = $("body").height();
    var window_height = $(window).height();
    var window_width = $(window).width();

    $("html").css("font-size",Math.ceil((window_width/270)*10)+"px");

});

