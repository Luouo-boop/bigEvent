$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 获取要操作的layui模块
    var form = layui.form
    var layer = layui.layer //导入弹出层模块
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) { //value是属性值
            //后代选择器 属性选择器
            var pwd = $('.reg-box [name=password]').val()
            //密码框的值和 确认密码的值相比较
            if (pwd !== value) {
                return '两次输入密码不一致'
            }
        }
    })
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        // var data = {
        //     username: $('#form_reg [name=username]').val(),
        //     password: $('#form_reg [name=password]').val()
        // }
        // $.post('http://ajax.frontend.itheima.net/api/reguser', data, function (res) {
        //     if (res.status !== 0) {
        //         return layer.msg(res.message)
        //     }
        //     layer.msg('注册成功，请登录！')
        //     // 模拟人的点击行为
        //     $('#link_login').click()
        // })
        $.ajax({
            url: '/api/reguser',
            type: 'post',
            //快速获取表单的数据，需要的数据是username和password
            data: $(this).serialize(),
            success(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，去登录')
                //注册成功之后，自动跳转到登录页面
                $('#link_login').click()
            }
        })
    })

    //登录的submit事件
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $(this).serialize(),
            success(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                //把服务器 返回的 用户 的唯一标识，保存到本地存储
                localStorage.setItem('token', res.token)
                //登录成功之后跳转到主页
                location.href = '/bigEvent/index.html'
            }

        })
    })

})