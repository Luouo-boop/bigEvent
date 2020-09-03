$.ajaxPrefilter(function (options) {
    //拼接URL地址
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    //统一为有权限的接口 设置headers请求头

    //通过indexOf 判断 options的URL地址中是否包含/my/请求体
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function (res) {
        if (res.responseJSON.status === 1 || res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/bigEvent/login.html'
        }
    }
})