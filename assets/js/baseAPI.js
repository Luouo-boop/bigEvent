$.ajaxPrefilter(function (options) {
    //拼接URL地址
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})