$(function () {
    $('.login-box').on('click', function () {
        $('#link_reg').hide()
        $('#link_login').show()
    })
    $('.reg-box').on('click', function () {
        $('#link_reg').show()
        $('#link_login').hide()
    })
})