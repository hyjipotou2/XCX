var goodsId;
var pagelength = 10;


$(function () {

        $(".add-goods").click(function () {
            $("#mains").hide(0)
            $("#main2").show(0)


        })
        $("#goodstbody tr").each(
            function () {
                var currentEle = $(this);
                var deleteSpan = currentEle.find(".delete-data")
                var editSpan = currentEle.find(".edit-data")
                var isAliveCheckBox = currentEle.find(".if-show")
                var id = currentEle[0].dataset.id

                editSpan.click(function () {
                    getForm(id)


                })


                deleteSpan.click(function () {
                    delele(id)
                });

                isAliveCheckBox.change(function () {
                    var checkBox = $(this)[0]
                    var checked = checkBox.checked
                    console.log(checked)
                    patch(id, checked)


                })


            })


        $("#upload").change(function () {
            upImage()

        });

        setPages()

    }
)


setGoodsData(List, $("#goodstbody"), 1)


function postOrPatch() {
    var type;
    var url = '/api/cars/';
    if (goodsId != null) {
        type = "PUT";
        url = url + goodsId + "/"


    } else {
        type = "POST"


    }


    var formData = new FormData($("#goodsForm")[0]);
    formData.append("applet", getQueryString("id"))

    $.ajax({
        url: url,
        type: type,
        data: formData,

        cache: false,
        contentType: false,
        processData: false,
        mimeType: "multipart/form-data",
        success: function (returndata) {
            console.log(returndata.toString());
            goodsId = null
            location.reload(true)
        },
        error: function (returndata) {
            console.log(returndata.responseText);
        }
    });


}
function delele(id) {

    $.ajax({
        type: "DELETE",   //访问WebService使用Post方式请求

        url: "/api/cars/" + id, //调用WebService的地址和方法名称组合 ---- WsURL/方法名
        //这里是要传递的参数，格式为 data: "{paraName:paraValue}",下面将会看到


        success: function (result) {     //回调函数，result，返回值
            console.log("success")
            getData()

        }
        ,
        error: function (result) {
            console.log(result.responseText)

        }


    })


}
function patch(id, isAlive) {


    var data = "isAlive=" + isAlive
    $.ajax({
        type: "PATCH",   //访问WebService使用Post方式请求

        url: "/api/cars/" + id, //调用WebService的地址和方法名称组合 ---- WsURL/方法名
        //这里是要传递的参数，格式为 data: "{paraName:paraValue}",下面将会看到

        data: data,
        success: function (result) {     //回调函数，result，返回值
            console.log("success")


        }
        ,
        error: function (result) {
            console.log(result.responseText)

        }


    })


}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
function setGoodsData(data, tbody, page) {


    tbody.html("");
    for (var j = (page - 1) * pagelength; j <= List.length - 0 && j <= (page - 1) * pagelength + pagelength - 1; j++) {


        i = data[j]

        var checked;
        i.isAlive ? checked = 'checked="checked"' : checked = "";

        var tr = "<tr class='tr' data-id=" + i.id + ">" +

            "<td class='td'>" + i.carName + "</td>" +
            "<td class='td'>" + "<img src='" + i.image + "'>" + "</td>" +

            "<td class='td'>" + i.price + "</td>" +

     

            '<td><span class="edit-data" title="编辑"><img src="/static/userManagement/goods/images/edit.png"></span><span class="delete-data"><img src="/static/userManagement/goods/images/delete.png"></span></td>' +


            "</tr>"


        tbody.append(tr)


        console.log(tr)
    }


}
function getForm(goodsid) {
    $("#goodsForm").load("/getcarform/?id=" + goodsid, function () {
        $(".broadcast-img-dele").each(
            function () {

                console.log($(this))
                $(this).click(function () {
                    $(this).parent().remove()


                })


            })

        $("#upload").change(function () {
            upImage()

        });

    })
    $("#mains").hide(0);
    $("#main2").show(0);
    goodsId = goodsid


}


function getData() {

    $.get("/api/goods/?applet=" + getQueryString("id"), function (data, status) {


        setPages()


setGoodsData(data, $("#goodstbody"), 1)
    });

}
function setPages() {
    var len = 1;
    if (List.length >= pagelength) {
        len = Math.ceil(List.length / pagelength)

    }
    $("#page").createPage({
        pageCount: len,
        current: 1,
        backFn: function (p) {
            console.log(p);
            setGoodsData(List, $("#goodstbody"), p)

        }
    });
}