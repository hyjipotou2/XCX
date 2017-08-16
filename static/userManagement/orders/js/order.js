/**
 * Created by mac on 2017/7/2.
 */
var pagelength = 10;
var mstate=null;
$(function () {
    getData()
    $(".order-status-ul li").each(
        function () {
            $(this).click(function () {
                restLi()
                $(this).addClass("active")
                var state = $(this)[0].dataset.state
                getData(state)


            })


        }
    )


})

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
function setOrderData(data, body) {


    body.html("");
    for (var j = 0; j <= data.length - 1; j++) {


        i = data[j]
        if (i.orderState == -1) {
            i.orderStateText = '<select class="state">' +
                    '            <option value="-1" selected = "selected">已删除</option>' +
                    '            <option value="0" >待付款</option>' +
                    '            <option value="1">待发货</option>' +
                    '            <option value="2">待收货</option>' +
                    '            <option value="3">交易完成</option>' +
                    '        </select>'

        }
        if (i.orderState == 0) {
           i.orderStateText = '<select class="state" >' +
                    '            <option value="-1">已删除</option>' +
                    '            <option value="0" selected = "selected">待付款</option>' +
                    '            <option value="1">待发货</option>' +
                    '            <option value="2">待收货</option>' +
                    '            <option value="3">交易完成</option>' +
                    '        </select>'

        }

        if (i.orderState == 1) {
          i.orderStateText = '<select class="state">' +
                    '            <option value="-1">已删除</option>' +
                    '            <option value="0" >待付款</option>' +
                    '            <option value="1" selected = "selected">待发货</option>' +
                    '            <option value="2">待收货</option>' +
                    '            <option value="3">交易完成</option>' +
                    '        </select>'

        }

        if (i.orderState == 2) {
           i.orderStateText = '<select class="state">' +
                    '            <option value="-1">已删除</option>' +
                    '            <option value="0">待付款</option>' +
                    '            <option value="1">待发货</option>' +
                    '            <option value="2" selected = "selected">待收货</option>' +
                    '            <option value="3">交易完成</option>' +
                    '        </select>'

        }

        if (i.orderState == 3) {
            i.orderStateText = '<select class="state">' +
                    '            <option value="-1">已删除</option>' +
                    '            <option value="0" >待付款</option>' +
                    '            <option value="1">待发货</option>' +
                    '            <option value="2">待收货</option>' +
                    '            <option value="3" selected = "selected">交易完成</option>' +
                    '        </select>'

        }


        var ordergoods_set = i.ordergoods_set
        var div = ""
        for (var k = 0; k <= ordergoods_set.length - 1; k++) {
            var divinit = ""
            if (k == 0) {
                divinit = '<div class="order-body clearfix">' +
                    '                            <div class="col-md-3"><img src="{thumbnail}">' +
                    '                                <div class="order-goods-name">{goodsName}</div>' +
                    '                                <div class="order-goods-model"></div>' +
                    '                            </div>' +
                    '                            <div class="col-md-1">{price}</div>' +
                    '                            <div class="col-md-1">{orderGoodsnumber}</div>' +
                    '                            <div class="col-md-4">' +
                    '                                <div><span style="margin-right:20px;">{deliveryName}</span><span>{userForeignKey}</span></div>' +
                    '                                <div>{deliveryPosition}</div>' +
                    '                            </div>' +
                    '<div class="col-md-2">{orderStateText}</div>' +
                    '                            <div class="col-md-1">{payPrice}</div>' +
                    '                        </div>';

                //var divinit=divinit.format(ordergoods_set[k])


                var divinit = divinit.format(i).format(ordergoods_set[k].goods).format(ordergoods_set[k])

                console.log(divinit)

            }
            else {

                divinit = '<div class="order-body clearfix">' +
                    '                            <div class="col-md-3"><img src="{thumbnail}">' +
                    '                                <div class="order-goods-name">{goodsName}</div>' +
                    '                                <div class="order-goods-model"></div>' +
                    '                            </div>' +
                    '                            <div class="col-md-1">{price}</div>' +
                    '                            <div class="col-md-1">{orderGoodsnumber}</div></div>'


                //var divinit=divinit.format(ordergoods_set[k])


                divinit = divinit.format(ordergoods_set[k].goods).format(ordergoods_set[k])


            }


            console.log(divinit)
            div = div + divinit

        }


        var li = '<li data-parentsubid="0" data-id="{id}" data-payment="{orderState}">' +
            '                        <div class="order-head">' +
            '                            <div>订单号：{id}</div>' +
            '                            <div>成交时间：{createDateTime}</div>' +
            '                        </div>' +
            '{div}' +
            '                    </li>';
        li = li.format(i)
        li = li.format({"div": div})


        body.append(li)

        div = ""


    }


}
function getData(state) {
    var url;
    if (state != null) {

        url = "/api/order/?applet=" + getQueryString("id") + "&state=" + state
    }
    else {
        url = "/api/order/?applet=" + getQueryString("id")
        mstate=state
    }


    $.get(url, function (data, status) {


        setOrderData(data, $(".order-list"))

        $(".state").each(function () {
            $(this).change(function () {
                patch($(this).parents("li").data("id"),$(this).val())



            })

        })






    });

}
function restLi() {
    $(".order-status-ul li").each(
        function () {
            $(this).removeClass();


        }
    )

}
function patch(id, state) {


    var data = "orderState=" + state
    $.ajax({
        type: "PATCH",   //访问WebService使用Post方式请求

        url: "/api/order/" + id, //调用WebService的地址和方法名称组合 ---- WsURL/方法名
        //这里是要传递的参数，格式为 data: "{paraName:paraValue}",下面将会看到

        data: data,
        success: function (result) {     //回调函数，result，返回值
            console.log("success")
            getData(mstate)



        }
        ,
        error: function (result) {
            console.log(result.responseText)

        }


    })


}