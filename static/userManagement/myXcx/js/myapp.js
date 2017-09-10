$(function () {

        $(".add").click(function () {
             $(".mask_app_setting").show();

        })
	 $(".mask_app_setting").on("click", ".close-btn, .cancel-btn", function() {
         $(".mask_app_setting").hide();
     })
    $(".save-btn").click(function () {
        postApplet()

    })


})
function postApplet() {

    var formData = new FormData($("#applet-form")[0]);

    $.ajax({
        url: "/createapplet/",
        type: "POST",
        data: formData,

        cache: false,
        contentType: false,
        processData: false,
        mimeType: "multipart/form-data",
        success: function (returndata) {
            console.log(returndata.toString());
            Toast("创建成功");
             window.reload()

        },
        error: function (returndata) {
            console.log(returndata.responseText);
            Toast("创建失败")
        }
    });


}

function Toast(msg,duration){
    duration=isNaN(duration)?3000:duration;
    var m = document.createElement('div');
    m.innerHTML = msg;
    m.style.cssText="width: 60%;min-width: 150px;opacity: 0.7;height: 30px;color: rgb(255, 255, 255);line-height: 30px;text-align: center;border-radius: 5px;position: fixed;top: 40%;left: 20%;z-index: 999999;background: rgb(0, 0, 0);font-size: 12px;";
    document.body.appendChild(m);
    setTimeout(function() {
        var d = 0.5;
        m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        m.style.opacity = '0';
        setTimeout(function() { document.body.removeChild(m) }, d * 1000);
    }, duration);
}