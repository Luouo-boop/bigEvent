$(function () {
    getUserInfo()

    var layer = layui.layer
    $('.btnLogout').on('click', function () {
        //layui 弹出层的confirm
        layer.confirm('确定退出吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            //1、退出后 清空本地存储的token数据
            //2、退出之后跳转到登录页面
            localStorage.removeItem('token')
            location.href = '/bigEvent/login.html'

            layer.close(index);
        });
    })
})

//获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //在baseAPI的js文件中，通过过滤函数添加headers头部信息
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success(res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        },
        // complete(res) {
        //     console.log(res);
        // }
    })
}

//渲染用户的头像
function renderAvatar(user) {
    //获取用户的昵称  或  用户名
    var name = user.nickname || user.username
    //设置欢迎的渲染
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    //如果用户有自己的头像
    if (user.user_pic !== null) {
        //渲染用户的头像，并显示
        //attr  设置并返回被选元素的属性值
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        //获取用户名的首字母，并转成大写
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first)
    }
}