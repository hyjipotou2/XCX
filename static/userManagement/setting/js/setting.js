/**
 * Created by mac on 2017/9/5.
 */
$(function () {
    $("#to-status2-btn").click(function () {
        postXcx()

    })


})

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
function postXcx() {



    var formData = new FormData($("#appform")[0]);
    formData.append("id", getQueryString("id"))
    $(".pack-content-1").css("display","none");
    $(".pack-content-2").css("display","block");
    $(".pack-content-3").css("display","none");

    $(".pack-status-2").addClass("active")

    $.ajax({
        url: "/setting/",
        type: "POST",
        data: formData,

        cache: false,
        contentType: false,
        processData: false,
        mimeType: "multipart/form-data",
        success: function (returndata) {
            console.log(returndata.toString());
            data=JSON.parse(returndata)

            $(".pack-content-1").css("display","none");
    $(".pack-content-2").css("display","none");
    $(".pack-content-3").css("display","block");

            $(".pack-status-3").addClass("active");



            $(".download").attr('href',data.url);


        },
        error: function (returndata) {
            console.log(returndata.responseText);
        }
    });


}
