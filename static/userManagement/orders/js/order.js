/**
 * Created by mac on 2017/7/2.
 */
var pagelength=10;

function setOrderData(data, tbody, page) {


    tbody.html("");
    for (var j = (page - 1) * pagelength; j <= List.length - 0 && j <= (page - 1) * pagelength + pagelength - 1; j++) {


        i = data[j]

        var checked;
        i.isAlive ? checked = 'checked="checked"' : checked = "";

        var tr = "<tr class='tr' data-id=" + i.id + ">" +
            "<td class='td'>" + i.goodsType + "</td>" +
            "<td class='td'>" + i.goodsName + "</td>" +
            "<td class='td'>" + "<img src='" + i.thumbnail + "'>" + "</td>" +

            "<td class='td'>" + i.price + "</td>" +
            "<td class='td'>" + i.salesVolume + "</td>" +
            "<td class='td'>" + i.stock + "</td>" +

            '<td><span class="edit-data" title="编辑"><img src="http://1251027630.cdn.myqcloud.com/1251027630/zhichi_frontend/static/webapp/images/edit.png"></span><span class="delete-data"><img src="http://1251027630.cdn.myqcloud.com/1251027630/zhichi_frontend/static/webapp/images/delete.png"></span></td>' +


            '<td><input type="checkbox" class="if-show"' + checked + '></td>' + +"</tr>"


        tbody.append(tr)


        console.log(tr)
    }


}
function getData(state) {
   var url;
    if(state!=null)
    {

        url="/api/order/?applet=" + getQueryString("id")+"&state="+state
    }
    else
    {
        url="/api/order/?applet=" + getQueryString("id")
    }


    $.get(url, function (data, status) {


        setPages()


        setOrderData(data, $("#goodstbody"), 1)
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