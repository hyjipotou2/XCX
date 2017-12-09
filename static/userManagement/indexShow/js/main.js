/**
 * Created by mac on 2017/2/21.
 */
$(document).ready(function () {


    var heigt = $('.bannder').width() * 575 / 1280;
    $('.bannder').height(heigt);
    $('.lxb-cb-input-btn').click(
        function () {
            var phone = $('.lxb-cb-input').val()

            if (checkPhone(phone)) {
                $.ajax({
                    type: "POST",   //访问WebService使用Post方式请求

                    url: "/phone/", //调用WebService的地址和方法名称组合 ---- WsURL/方法名
                    //这里是要传递的参数，格式为 data: "{paraName:paraValue}",下面将会看到

                    data: {"phone": phone},
                    success: function (result) {     //回调函数，result，返回值
                        console.log("success")
                        Toast("请求成功，我们马上会联系您")

                    }
                    ,
                    error: function (result) {
                        console.log(result.responseText)

                    }


                })
            }
        }
    )


});

$(window).resize(function () {
    var heigt = $('.bannder').width() * 575 / 1280;
    $('.bannder').height(heigt);
    $('.bannder>img').height(heigt);

    console.log($('.bannder>img'));

})

function Toast(msg, duration) {
    duration = isNaN(duration) ? 3000 : duration;
    var m = document.createElement('div');
    m.innerHTML = msg;
    m.style.cssText = "width: 60%;min-width: 150px;opacity: 0.7;height: 30px;color: rgb(255, 255, 255);line-height: 30px;text-align: center;border-radius: 5px;position: fixed;top: 40%;left: 20%;z-index: 999999;background: rgb(0, 0, 0);font-size: 12px;";
    document.body.appendChild(m);
    setTimeout(function () {
        var d = 0.5;
        m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        m.style.opacity = '0';
        setTimeout(function () {
            document.body.removeChild(m)
        }, d * 1000);
    }, duration);
}
function checkPhone(phone) {

    if (!(/^1[34578]\d{9}$/.test(phone))) {
        Toast("手机号码有误，请重填");
        return false;
    }
    return true;
}