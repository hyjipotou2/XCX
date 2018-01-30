var svn_revision = 10173;
define("common/popup", [], function () {
    var reflash = false, messageboxloadcomplete = false;

    function SetMessageboxLoadComplete() {
        messageboxloadcomplete = true
    }

    SetMessageboxLoadComplete();
    var sctimer;
    var tempwidth = 0, tempheight = 0, temppate = 1, speedrate = 24, interval_id = 0;
    var newdiv = document.createElement("div");
    var sdiv = document.createElement("div");
    var contentdiv = document.createElement("div");
    var mycontentdiv = document.createElement("div");
    var Globle_width = 0, Globle_height = 0, Globle_src = "", Globle_title = "", Globle_Str = "", Globle_width_p = 0, Globle_height_div1 = 0;
    $("head").append('<style type="text/css">body{ margin:0px !ipmortant; padding:0px  !ipmortant;}#blackbg{position:fixed;_position:absolute;}.blackcontentOuter{zoom:1; position:fixed!important;position:absolute;left:50%;top:45%;_top:expression((document.documentElement.scrollTop || document.body.scrollTop) + Math.round(50 * (document.documentElement.offsetHeight || document.body.clientHeight) / 100));}</style>');
    function GetCookieValue(name) {
        var arr = document.cookie.match(new RegExp(name + "=([^&;]+)"));
        if (arr != null) {
            return decodeURI(arr[1])
        }
        return ""
    }

    function setbg(boxtitle, pwidth, pheight, psrc, showclose) {
        var show = "true";
        if (showclose && showclose == "false") {
            show = "false"
        }
        if (!messageboxloadcomplete) {
            window.clearInterval(interval_id);
            interval_id = window.setInterval("setbg('" + boxtitle + "', " + pwidth + "," + pheight + ", '" + psrc + "','" + show + "')", 200);
            return
        }
        ShowSelectAll(false, _58MessageBox.HideIDs);
        window.clearInterval(interval_id);
        if (GetCookieValue("UserID") == "")reflash = true;
        _58MessageBox.InitMsgDivData();
        Globle_title = boxtitle;
        Globle_width = pwidth;
        Globle_height = pheight;
        Globle_src = psrc;
        Globle_width_p = Globle_width - 20;
        Globle_height_div1 = Globle_height + 30;
        Globle_Str = '<div style=" position:relative"><div id="messageboxframecontainer" style="display:none;width:' + Globle_width + 'px; height:38px ;padding:8px; background:#000;filter:alpha(opacity=30); -moz-opacity:0.3; -kHTML-opacity: 0.3; opacity: 0.3; position:absolute; top:0; left:0; z-index:1"></div><div id="__messageboxback" style=" width:' + Globle_width + 'px;position:absolute; top:8px; left:8px; background:#fff; z-index:1000;"><p id="messageboxclosebutton" style=" display:none; background:url(//img.58cdn.com.cn/ui6/top_box_t.gif) repeat-x; width:' + Globle_width_p + 'px; height:30px; line-height:32px; padding:0 10px; border-bottom:none; font-size:14px; font-weight:bold; color:#000;margin:0;border-bottom:1px solid #C7C7C7">' + (show == "true" ? '<a style=" display:block; width:20px; height:20px; background:url(//img.58cdn.com.cn/ui6/top_box_close.gif) no-repeat 0 0; line-height:100px; overflow:hidden; margin-top:5px; float:right" href="javascript:closeopendiv()">[关闭]</a>' : "") + Globle_title + '</p><iframe id="_58MessageBoxFrame" onload="_58MessageBox.ResizeIframe()" scrolling="no" src="' + Globle_src + '" frameborder="0" height="0" width="' + Globle_width + '"></iframe></div></div>';
        _58MessageBox.scroolMsgeffect()
    }

    function closeopendiv() {
        ShowSelectAll(true, _58MessageBox.HideIDs);
        if (reflash == true && GetCookieValue("UserID") != "") {
            window.location.reload()
        } else {
            contentdiv.style.width = "10px";
            contentdiv.style.height = "10px";
            contentdiv.innerHTML = "";
            Globle_width = 0, Globle_height = 0, Globle_src = "", Globle_title = "", Globle_Str = "";
            tempwidth = 0, tempheight = 0, temppate = 1, contentdiv.style.display = "none";
            newdiv.style.display = "none"
        }
    }

    var _58MessageBox = {
        HideIDs: "", ResizeIframe: function () {
            try {
                var _frame = document.getElementById("_58MessageBoxFrame");
                var height = 0, width = 0;
                var f = document.getElementById("messageboxframecontainer");
                var closebutton = document.getElementById("messageboxclosebutton");
                try {
                    _frame.height = 0;
                    width = Math.max(_frame.contentWindow.document.documentElement.scrollWidth, _frame.contentWindow.document.body.scrollWidth);
                    height = Math.max(_frame.contentWindow.document.documentElement.scrollHeight, _frame.contentWindow.document.body.scrollHeight)
                } catch (e) {
                }
                if (height > 0) {
                    Globle_height = height;
                    Globle_height_div1 = Globle_height + 30;
                    Globle_width = width;
                    Globle_width_p = Globle_width - 20
                }
                contentdiv.style.width = Globle_width + "px";
                contentdiv.style.height = Globle_height + "px";
                contentdiv.style.margin = "-" + Globle_height / 2 + "px 0px 0px -" + Globle_width / 2 + "px";
                _frame.width = Globle_width;
                _frame.height = Globle_height;
                closebutton.style.width = Globle_width_p + "px";
                closebutton.style.display = "inline-block";
                f.style.width = Globle_width + "px";
                f.style.height = _58MessageBox.setheightauto(Globle_height_div1) + "px";
                f.style.display = "block";
                document.getElementById("__messageboxback").style.width = Globle_width + "px";
                document.getElementById("messageboxclosebutton").style.display = "inline-block"
            } catch (e1) {
            }
        }, getMsgDivHeight: function () {
            var a = document.body.scrollHeight;
            var b = window.screen.height;
            return a > b ? a : b
        }, InitMsgDivData: function () {
            newdiv.id = "blackbg";
            newdiv.style.display = "none";
            newdiv.style.zIndex = "99990";
            newdiv.style.backgroundColor = "#000000";
            newdiv.style.filter = "alpha(opacity=30)";
            newdiv.style.opacity = .3;
            newdiv.style.display = "block";
            newdiv.style.top = "0px";
            newdiv.style.left = "0px";
            newdiv.style.width = "100%";
            newdiv.style.height = _58MessageBox.getMsgDivHeight() + "px";
            contentdiv.className = "blackcontentOuter";
            contentdiv.style.display = "none";
            contentdiv.style.zIndex = "99991";
            contentdiv.style.width = "10px";
            contentdiv.style.height = "10px";
            contentdiv.style.margin = "-5px 0px 0px -5px";
            contentdiv.style.backgroundColor = "";
            document.body.appendChild(newdiv);
            document.body.appendChild(contentdiv)
        }, scroolMsgeffect: function () {
            contentdiv.style.display = "block";
            _58MessageBox.scroolMsgdiv()
        }, getiecopy: function () {
            var bro = navigator.userAgent.toLowerCase();
            if (/msie/.test(bro))return bro.match(/msie ([\d.]*);/)[1]
        }, setheightauto: function (input) {
            if (document.all) {
                if (_58MessageBox.getiecopy() < 7)return input + 3
            }
            return input
        }, scroolMsgdiv: function () {
            tempwidth = Globle_width;
            tempheight = Globle_height;
            contentdiv.innerHTML = Globle_Str;
            contentdiv.style.width = tempwidth + "px";
            contentdiv.style.height = tempheight + "px";
            contentdiv.style.margin = "-" + tempheight / 2 + "px 0px 0px -" + tempwidth / 2 + "px"
        }
    };

    function ShowSelectAll(show, sID) {
        var sList = document.getElementsByTagName("select");
        if (sID && sID != "") {
            sID = "|" + sID + "|"
        }
        if (sList && sList.length > 0) {
            for (var i = 0; i < sList.length; i++) {
                if (sID && sID != "") {
                    if (sList[i].id && sList[i].id != "" && sID.indexOf("|" + sList[i].id + "|") >= 0) {
                        continue
                    }
                }
                if (show) {
                    sList[i].style.display = "inline"
                } else {
                    sList[i].style.display = "none"
                }
            }
        }
    }

    window._58MessageBox = _58MessageBox;
    window.closeopendiv = closeopendiv;
    window.setbg = setbg;
    return {setbg: setbg, closeopendiv: closeopendiv}
});
define("job/tmpl.resume.protectTelTips", [""], function () {
    var template = '<div class="protectTelTips" style="display:none">' + '<div class="protectTel-tips-bg"></div>' + '<div class="protectTel-tips-content">' + '<a href="javascript:void(0)" class="protectTel-tips-img protectTel-tips-close"></a>' + '<div class="tips-hearder">' + '<h3 class="tips-title">查看简历联系方式流程有新变化啦~</h3>' + "</div>" + '<div class="tips-main">' + "<ul>" + '<li class="tips-main-li">' + '<i class="protectTel-tips-img protectTel-tips-img01"></i>' + '<p class="tips-fonts">' + '<span class="tips-font">添加联系求职者的</span>' + '<span class="tips-font">手机号／固话</span>' + "</p>" + "</li>" + '<li class="tips-main-li">' + '<i class="protectTel-tips-img protectTel-tips-img02"></i>' + '<p class="tips-fonts">' + '<span class="tips-font">查看简历联系方式</span>' + "</p>" + "</li>" + '<li class="tips-main-li">' + '<i class="protectTel-tips-img protectTel-tips-img03"></i>' + '<p class="tips-fonts">' + '<span class="tips-font">获得通话密号</span>' + '<span class="tips-font">立即呼叫吧～</span>' + "</p>" + "</li>" + "</ul>" + "</div>" + '<div class="tips-footer">' + '<h4 class="notes-title">新流程规则说明：</h4>' + "<ul>" + '<li class="notes-content">' + '1）若<span class="font-blue">求职者</span>在简历发布时<span class="font-blue">选择号码保护</span>，则该简历在后续投递或下载过程中将用通话密号替代真实手机号。' + "</li>" + '<li class="notes-content">' + "2）您在查看简历联系方式前，须添加主叫号码来获取简历的通话密号。您只能通过该账号下已添加的主叫号码拨打简历的通话密号，才能与对应的求职者通话。" + "</li>" + '<li class="notes-content">' + "3）通话密号有效期为3天。密号失效后，您可重新免费获取新的通话密号。" + "</li>" + "</ul>" + "</div>" + "</div>" + "</div>";
    return template
});
define("job/util.cookie", [""], function () {
    var cookie = {};
    cookie.getCookie = function (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2])
        } else {
            return null
        }
    };
    cookie.setCookie = function (name, value, outdays, path, domain) {
        var Days = outdays || 15, exp = new Date, path = path || "/", domain = domain || ".58.com";
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1e3);
        var params = ";expires=" + exp.toUTCString() + ";path=" + path + ";domain=" + domain;
        document.cookie = name + "=" + escape(value) + params
    };
    return cookie
});
define("job/busi.resume.showTips", ["./tmpl.resume.protectTelTips", "./util.cookie"], function (protectTelTips, cookie) {
    $(function () {
        var pageJson = ____global.pageJson, showTips = pageJson.tips;
        for (var i = 0, length = showTips.length; i < length; i++) {
            var showFlag = 0;
            switch (showTips[i].id) {
                case 1:
                    if (cookie.getCookie("showPTTip") != "1") {
                        $("body").append(protectTelTips);
                        cookie.setCookie("showPTTip", 1, 1, "/", ".58.com");
                        $(".protectTelTips").show();
                        showFlag = 1
                    }
                    break
            }
            if (showFlag == 1) {
                return false
            }
        }
    })
});
define("job/busi.resume.showMoreExpect", [], function () {
    $(function () {
        var pageJson = ____global.pageJson, bizState = pageJson.bizState, resumeDelivery = pageJson.resumeDelivery;
        if (bizState == 3 || bizState == 4) {
            if (typeof resumeDelivery.areaName != "undefined") {
                $("#expectLocation").append("、（TA还在" + resumeDelivery.areaName + "投递了职位）")
            }
            if (typeof resumeDelivery.cateName != "undefined") {
                $("#expectJob").append("、（TA还投递了" + resumeDelivery.cateName + "）")
            }
        }
    })
});
!function () {
    function a(a) {
        return a.replace(t, "").replace(u, ",").replace(v, "").replace(w, "").replace(x, "").split(y)
    }

    function b(a) {
        return "'" + a.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'"
    }

    function c(c, d) {
        function e(a) {
            return m += a.split(/\n/).length - 1, k && (a = a.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")), a && (a = s[1] + b(a) + s[2] + "\n"), a
        }

        function f(b) {
            var c = m;
            if (j ? b = j(b, d) : g && (b = b.replace(/\n/g, function () {
                    return m++, "$line=" + m + ";"
                })), 0 === b.indexOf("=")) {
                var e = l && !/^=[=#]/.test(b);
                if (b = b.replace(/^=[=#]?|[\s;]*$/g, ""), e) {
                    var f = b.replace(/\s*\([^\)]+\)/, "");
                    n[f] || /^(include|print)$/.test(f) || (b = "$escape(" + b + ")")
                } else b = "$string(" + b + ")";
                b = s[1] + b + s[2]
            }
            return g && (b = "$line=" + c + ";" + b), r(a(b), function (a) {
                if (a && !p[a]) {
                    var b;
                    b = "print" === a ? u : "include" === a ? v : n[a] ? "$utils." + a : o[a] ? "$helpers." + a : "$data." + a, w += a + "=" + b + ",", p[a] = !0
                }
            }), b + "\n"
        }

        var g = d.debug, h = d.openTag, i = d.closeTag, j = d.parser, k = d.compress, l = d.escape, m = 1, p = {
            $data: 1,
            $filename: 1,
            $utils: 1,
            $helpers: 1,
            $out: 1,
            $line: 1
        }, q = "".trim, s = q ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"], t = q ? "$out+=text;return $out;" : "$out.push(text);", u = "function(){var text=''.concat.apply('',arguments);" + t + "}", v = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + t + "}", w = "var $utils=this,$helpers=$utils.$helpers," + (g ? "$line=0," : ""), x = s[0], y = "return new String(" + s[3] + ");";
        r(c.split(h), function (a) {
            a = a.split(i);
            var b = a[0], c = a[1];
            1 === a.length ? x += e(b) : (x += f(b), c && (x += e(c)))
        });
        var z = w + x + y;
        g && (z = "try{" + z + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + b(c) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");
        try {
            var A = new Function("$data", "$filename", z);
            return A.prototype = n, A
        } catch (B) {
            throw B.temp = "function anonymous($data,$filename) {" + z + "}", B
        }
    }

    var d = function (a, b) {
        return "string" == typeof b ? q(b, {filename: a}) : g(a, b)
    };
    d.version = "3.0.0", d.config = function (a, b) {
        e[a] = b
    };
    var e = d.defaults = {
        openTag: "<%",
        closeTag: "%>",
        escape: !0,
        cache: !0,
        compress: !1,
        parser: null
    }, f = d.cache = {};
    d.render = function (a, b) {
        return q(a, b)
    };
    var g = d.renderFile = function (a, b) {
        var c = d.get(a) || p({filename: a, name: "Render Error", message: "Template not found"});
        return b ? c(b) : c
    };
    d.get = function (a) {
        var b;
        if (f[a])b = f[a]; else if ("object" == typeof document) {
            var c = document.getElementById(a);
            if (c) {
                var d = (c.value || c.innerHTML).replace(/^\s*|\s*$/g, "");
                b = q(d, {filename: a})
            }
        }
        return b
    };
    var h = function (a, b) {
        return "string" != typeof a && (b = typeof a, "number" === b ? a += "" : a = "function" === b ? h(a.call(a)) : ""), a
    }, i = {"<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "&": "&#38;"}, j = function (a) {
        return i[a]
    }, k = function (a) {
        return h(a).replace(/&(?![\w#]+;)|[<>"']/g, j)
    }, l = Array.isArray || function (a) {
            return "[object Array]" === {}.toString.call(a)
        }, m = function (a, b) {
        var c, d;
        if (l(a))for (c = 0, d = a.length; d > c; c++)b.call(a, a[c], c, a); else for (c in a)b.call(a, a[c], c)
    }, n = d.utils = {$helpers: {}, $include: g, $string: h, $escape: k, $each: m};
    d.helper = function (a, b) {
        o[a] = b
    };
    var o = d.helpers = n.$helpers;
    d.onerror = function (a) {
        var b = "Template Error\n\n";
        for (var c in a)b += "<" + c + ">\n" + a[c] + "\n\n";
        "object" == typeof console && console.error(b)
    };
    var p = function (a) {
        return d.onerror(a), function () {
            return "{Template Error}"
        }
    }, q = d.compile = function (a, b) {
        function d(c) {
            try {
                return new i(c, h) + ""
            } catch (d) {
                return b.debug ? p(d)() : (b.debug = !0, q(a, b)(c))
            }
        }

        b = b || {};
        for (var g in e)void 0 === b[g] && (b[g] = e[g]);
        var h = b.filename;
        try {
            var i = c(a, b)
        } catch (j) {
            return j.filename = h || "anonymous", j.name = "Syntax Error", p(j)
        }
        return d.prototype = i.prototype, d.toString = function () {
            return i.toString()
        }, h && b.cache && (f[h] = d), d
    }, r = n.$each, s = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined", t = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g, u = /[^\w$]+/g, v = new RegExp(["\\b" + s.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"), w = /^\d[^,]*|,\d[^,]*/g, x = /^,+|,+$/g, y = /^$|,+/;
    e.openTag = "{{", e.closeTag = "}}";
    var z = function (a, b) {
        var c = b.split(":"), d = c.shift(), e = c.join(":") || "";
        return e && (e = ", " + e), "$helpers." + d + "(" + a + e + ")"
    };
    e.parser = function (a) {
        a = a.replace(/^\s/, "");
        var b = a.split(" "), c = b.shift(), e = b.join(" ");
        switch (c) {
            case"if":
                a = "if(" + e + "){";
                break;
            case"else":
                b = "if" === b.shift() ? " if(" + b.join(" ") + ")" : "", a = "}else" + b + "{";
                break;
            case"/if":
                a = "}";
                break;
            case"each":
                var f = b[0] || "$data", g = b[1] || "as", h = b[2] || "$value", i = b[3] || "$index", j = h + "," + i;
                "as" !== g && (f = "[]"), a = "$each(" + f + ",function(" + j + "){";
                break;
            case"/each":
                a = "});";
                break;
            case"echo":
                a = "print(" + e + ");";
                break;
            case"print":
            case"include":
                a = c + "(" + b.join(",") + ");";
                break;
            default:
                if (/^\s*\|\s*[\w\$]/.test(e)) {
                    var k = !0;
                    0 === a.indexOf("#") && (a = a.substr(1), k = !1);
                    for (var l = 0, m = a.split("|"), n = m.length, o = m[l++]; n > l; l++)o = z(o, m[l]);
                    a = (k ? "=" : "=#") + o
                } else a = d.helpers[c] ? "=#" + c + "(" + b.join(",") + ");" : "=" + a
        }
        return a
    }, "function" == typeof define ? define("job/util.artTemplate", [], function () {
        return d
    }) : "undefined" != typeof exports ? module.exports = d : this.template = d
}();
define("job/tmpl.resume.ceping", [""], function () {
    var template = [];
    template["cepingError"] = '<div class="ceping-error" style="display: none">' + '<div class="ceping-tips-bg"></div>' + '<div class="ceping-error-content">' + '<div class="ceping-error-header">' + "<span>查看报告</span>" + '<a class="ceping-error-close"></a>' + "</div>" + '<div class="ceping-error-info">' + '<div class="ceping-info"></div>' + '<div class="close-btn">我知道了</div>' + "</div>" + "</div>" + "</div>";
    template["cepingSuccess"] = '<div class="ceping-success" style="display: none;">' + '<div class="ceping-tips-bg"></div>' + '<div class="ceping-success-content">' + '<div class="ceping-success-header">' + "<span>查看报告</span>" + '<a class="ceping-success-close"></a>' + "</div>" + '<div class="ceping-success-info">' + '<div class="ceping-cate-info">' + '<p class="watch-tip">该用户已参加以下类别测评，请选择要查看的报告</p>' + '<div class="ceping-list"></div>' + "</div>" + '<div class="submit-btn" style="background: rgb(255, 140, 20);">' + "马上查看" + "</div>" + "</div>" + "</div>" + "</div>";
    template["payReport"] = '<div class="payReport" style="display: none">' + '<div class="ceping-tips-bg"></div>' + '<div class="payReport-content">' + '<div class="payReport-header">' + "<span>查看报告</span>" + '<a class="payReport-close"></a>' + "</div>" + '<div class="yuePay" style="display: none">' + '<div class="pay-info">' + '<p class="pay-title">是不是您想要的人才，一看便知~</p>' + '<p class="pay-tip">您的余额还有（<span class="red cash"></span>），查看报告需要消费（<span class="red newPrice"></span><span class="oldPrice">原价：10元</span>）</p>' + "</div>" + '<div class="submit-btn">' + "确认查看" + "</div>" + "</div>" + '<div class="yuePay-success" style="display: none">' + '<div class="pay-info">' + "<p>恭喜您，支付成功！</p>" + "<p>点击可直接查看报告哦~</p>" + "</div>" + '<div class="submit-btn">' + "马上查看" + "</div>" + "</div>" + '<div class="yuePay-fail" style="display: none">' + '<div class="pay-info">' + "<p>支付失败！</p>" + "</div>" + '<div class="close-btn">' + "我知道了" + "</div>" + "</div>" + '<div class="cashPay" style="display: none">' + '<div class="pay-info">' + '<p class="pay-tip">限时大特惠，每份只需要（<span class="red newPrice"></span><span class="oldPrice">原价：10元</span>）</p>' + "<p>是不是您最想要的人才，一看便知~</p>" + "</div>" + '<ul class="payList">' + '<li id="wechat" class="wechat active">' + '<div class="payApp">' + '<!-- <i class="icon"></i> -->' + '<img class="wechatImg" src="//img.58cdn.com.cn/ui7/job/resume/wechat.png">' + '<!-- <span class="payApp-title">微信支付</span> -->' + "</div>" + '<i class="state"></i>' + "</li>" + '<li id="alipay" class="alipay">' + '<div class="payApp">' + '<!-- <i class="icon"></i> -->' + '<img class="alipayImg" src="//img.58cdn.com.cn/ui7/job/resume/alipay.png">' + "</div>" + '<i class="state"></i>' + "</li>" + "</ul>" + '<form action="//paycenter.58.com/pay" id="cashPay-submit" method="POST" style="display: none" target="_blank">' + '<input type="hidden" name="orderId" id="orderId" value="">' + '<input type="hidden" name="buyAccountId" id="buyAccountId" value="">' + '<input type="hidden" name="starttime" id="starttime" value="">' + '<input type="hidden" name="endtime" id="endtime" value="">' + '<input type="hidden" name="returnUrl" id="returnUrl" value="">' + '<input type="hidden" name="channelId" id="channelId" value="">' + '<input type="hidden" name="merId" id="merId" value="">' + '<input type="hidden" name="wapbanklist" id="wapbanklist" value="">' + '<input type="hidden" name="platfrom" id="platfrom" value="">' + '<input type="hidden" name="sign" id="sign" value="">' + '<input type="hidden" name="productDesc" id="productDesc" value="">' + '<input type="hidden" name="validPayTime" id="validPayTime" value="">' + '<input type="hidden" name="notifyUrl" id="notifyUrl" value="">' + '<input type="hidden" name="productName" id="productName" value="">' + '<input type="hidden" name="orderMoney" id="orderMoney" value="">' + '<input type="hidden" name="extensionInfo" id="extensionInfo" value="">' + '<input type="hidden" name="cityId" id="cityId" value="">' + "</form>" + '<div class="submit-btn">' + "立即购买" + "</div>" + "</div>" + '<div class="afterPay" style="display: none">' + '<div class="pay-info">' + '<p class="">您的订单支付成功了吗？</p>' + "</div>" + '<div class="btns">' + '<div class="btn paySuccess">成功，立即查看</div>' + '<div class="btn payFail">失败，重新支付</div>' + "</div>" + "</div>" + "</div>" + "</div>";
    return template
});
define("job/tmpl.resume.cepingList", ["./util.artTemplate"], function (artTemplate) {
    var template = "{{each dataList as value i}}" + '<div class="report-item" data-avail="{{value.avail}}">' + '<div class="ceping-radio">' + '<div class="chosen-state"></div>' + "</div>" + '<span class="report-msg">{{value.description}}</span>' + '<input class="reportid" type="hidden" value="{{value.reportid}}">' + "</div>" + "{{/each}}";
    return artTemplate.compile(template)
});
define("job/api.resume.getReport", ["./tmpl.resume.cepingList"], function (cepingList) {
    var getReport = function (resumeId) {
        $.ajax({
            type: "GET",
            dataType: "JSONP",
            async: false,
            url: "//cepingp.58.com/report/permit?resumeid=" + resumeId + "&source=pc&callback=?",
            success: function (data) {
                if (data.code == 0) {
                    var i, dataList = data.data, listHtml = cepingList({dataList: dataList});
                    $(".ceping-list").html(listHtml);
                    $(".ceping-list .report-item:eq(0)").addClass("active");
                    $(".ceping-success").show();
                    window.clickLog && window.clickLog("from=pc-ceping-select")
                } else {
                    $(".ceping-error .ceping-info").text(data.message);
                    $(".ceping-error").show();
                    window.clickLog && window.clickLog("from=pc-ceping-commonuser")
                }
            }
        })
    };
    return getReport
});
define("job/api.resume.watchReport", [""], function () {
    var watchReport = function (resumeId) {
        var reportid = $(".ceping-list .active .reportid").val(), avail = $(".ceping-list .active").attr("data-avail"), cepingUrl = "//cepingp.58.com/report/reportBpcinfo?resumeid=" + resumeId + "&reportid=" + reportid + "&source=pc";
        if (avail == 1) {
            $(".ceping-success-close").click();
            window.open(cepingUrl)
        } else {
            $.ajax({
                type: "GET",
                dataType: "JSONP",
                async: false,
                url: "//cepingp.58.com/report/reportb?resumeid=" + resumeId + "&reportid=" + reportid + "&source=pc&callback=?",
                success: function (data) {
                    $(".ceping-success").hide();
                    if (data.code == 5) {
                        var avail = data.data.avail;
                        $(".ceping-success-close").click();
                        if (avail == 1) {
                            var userid = dada.data.userid, cateid = dada.data.cateid;
                            cepingUrl = "//cepingp.58.com/report/info?userid=" + userid + "&cateid=" + cateid + "&source=pc"
                        }
                        var newWin = window.open(cepingUrl);
                        if (newWin == null || newWin == undefined) {
                            window.location.href = cepingUrl
                        }
                    } else if (data.code == 6) {
                        var cashstr = data.data.cashstr, coststr = data.data.coststr, orderId = data.data.orderid;
                        $(".yuePay .cash").text(cashstr + "元");
                        $(".yuePay .newPrice").text(coststr + "元");
                        $("#orderId").val(orderId);
                        $(".yuePay").show();
                        $(".payReport").show();
                        window.clickLog && window.clickLog("from=pc-ceping-pay-yue")
                    } else if (data.code == 7) {
                        var coststr = data.data.coststr, orderId = data.data.orderid, sPara = data.data.sPara, buyAccountId = sPara.buyAccountId, starttime = sPara.starttime, endtime = sPara.endtime, returnUrl = sPara.returnUrl, channelId = sPara.channelId, merId = sPara.merId, wapbanklist = sPara.wapbanklist, platfrom = sPara.platfrom, sign = sPara.sign, productDesc = sPara.productDesc, validPayTime = sPara.validPayTime, notifyUrl = sPara.notifyUrl, productName = sPara.productName, orderMoney = sPara.orderMoney, extensionInfo = sPara.extensionInfo, cityId = sPara.cityId;
                        $(".cashPay .newPrice").text(coststr + "元");
                        $("#orderId").val(orderId);
                        $("#buyAccountId").val(buyAccountId);
                        $("#starttime").val(starttime);
                        $("#endtime").val(endtime);
                        $("#returnUrl").val(returnUrl);
                        $("#channelId").val(channelId);
                        $("#merId").val(merId);
                        $("#wapbanklist").val(wapbanklist);
                        $("#platfrom").val(platfrom);
                        $("#sign").val(sign);
                        $("#productDesc").val(productDesc);
                        $("#validPayTime").val(validPayTime);
                        $("#notifyUrl").val(notifyUrl);
                        $("#productName").val(productName);
                        $("#orderMoney").val(orderMoney);
                        $("#extensionInfo").val(extensionInfo);
                        $("#cityId").val(cityId);
                        $(".cashPay").show();
                        $(".payReport").show();
                        window.clickLog && window.clickLog("from=pc-ceping-pay-weixin")
                    } else {
                        console.log(data.message)
                    }
                }
            })
        }
    };
    return watchReport
});
define("job/api.resume.vipWatchReport", ["./api.resume.watchReport"], function (watchReport) {
    var vipWatchReport = function (resumeId, reportid) {
        $.ajax({
            url: "//cepingp.58.com/report/reportb?resumeid=" + resumeId + "&reportid=" + reportid + "&source=pc&callback=?",
            type: "GET",
            dataType: "JSONP",
            async: false,
            success: function (data) {
                if (data.code == 10) {
                    var vipHtml = '<div class="ceping-success-vip">' + '<div class="ceping-tips-bg"></div>' + '<div class="ceping-success-content">' + '<div class="ceping-success-header">' + "<span>查看报告</span>" + '<a class="ceping-success-close"></a>' + "</div>" + '<div class="ceping-success-info">' + '<div class="ceping-cate-info">' + '<p class="watch-tip-vip">是不是您要的人才，一看便知</p>' + '<div class="ceping-list-vip">' + "您还有<span>" + data.data.vipavailCount + "</span>个测评点，本次要扣除1个。" + "</div>" + "</div>" + '<div class="submit-btn submit-btn-vip" id="submit-btn-point">' + "确认扣除" + "</div>" + "</div>" + "</div>" + "</div>";
                    $(".ceping-success").after(vipHtml);
                    $(".ceping-tips-bg,.ceping-success-content").show();
                    $(".ceping-success").hide();
                    $("#orderId").val(data.data.orderid);
                    window.clickLog && window.clickLog("from=pc-ceping-vip-free")
                } else {
                    watchReport(resumeId)
                }
            }
        })
    };
    return vipWatchReport
});
define("job/api.resume.vipGetReport", [], function () {
    var vipGetReport = function (resumeId, reportid) {
        var orderid = $("#orderId").val();
        $.ajax({
            url: "//cepingp.58.com/report/reportnresource?resumeid=" + resumeId + "&orderid=" + orderid + "&reportid=" + reportid + "&source=pc&callback=?",
            type: "GET",
            dataType: "JSONP",
            async: false,
            success: function (data) {
                if (data.code == 5) {
                    $(".ceping-success-vip").hide();
                    $(".payReport").show();
                    $(".yuePay-success").show()
                } else if (data.code == 8) {
                    $(".ceping-success-vip").hide();
                    $(".ceping-error .ceping-info").text(data.message);
                    $(".ceping-error").show()
                }
            }
        })
    };
    return vipGetReport
});
define("job/api.resume.yuePay", [""], function () {
    var yuePay = function (resumeId) {
        var reportid = $(".ceping-list .active .reportid").val(), orderid = $("#orderId").val();
        $.ajax({
            type: "GET",
            dataType: "JSONP",
            async: false,
            url: "//cepingp.58.com/report/reportpmc?resumeid=" + resumeId + "&reportid=" + reportid + "&orderid=" + orderid + "&source=pc&callback=?",
            success: function (data) {
                $(".yuePay").hide();
                $(".payReport-content").addClass("yuePayAfter-content");
                if (data.code == 5) {
                    $(".yuePay-success").show()
                } else {
                    $(".yuePay-fail").show()
                }
            },
            error: function (message) {
                $(".yuePay").hide();
                $(".payReport-content").addClass("yuePayAfter-content");
                $(".yuePay-fail").show()
            }
        })
    };
    return yuePay
});
define("job/api.resume.checkPayResult", [""], function () {
    var checkPayResult = function (resumeId) {
        var reportid = $(".ceping-list .active .reportid").val(), orderId = $("#orderId").val();
        $.ajax({
            type: "GET",
            dataType: "JSONP",
            async: false,
            url: "//cepingp.58.com/report/paycheck?reportid=" + reportid + "&resumeid=" + resumeId + "&orderid=" + orderId + "&source=pc",
            success: function (data) {
                if (data.code == 5) {
                    $(".payReport-close").click();
                    var cepingUrl = "//cepingp.58.com/report/reportBpcinfo?resumeid=" + resumeId + "&reportid=" + reportid + "&source=pc", newWin = window.open(cepingUrl);
                    if (newWin == null || newWin == undefined) {
                        window.location.href = cepingUrl
                    }
                } else {
                    $(".payReport-content").removeClass("payAfter-content");
                    $(".afterPay").hide();
                    $(".cashPay").show()
                }
            }
        })
    };
    return checkPayResult
});
define("job/busi.resume.cepingReport", ["./util.artTemplate", "./tmpl.resume.ceping", "./api.resume.getReport", "./api.resume.vipWatchReport", "./api.resume.vipGetReport", "./api.resume.yuePay", "./api.resume.checkPayResult"], function (artTemplate, cepingTmpl, getReport, vipWatchReport, vipGetReport, yuePay, checkPayResult) {
    $(function () {
        $("body").append(cepingTmpl["cepingError"]).append(cepingTmpl["cepingSuccess"]).append(cepingTmpl["payReport"]);
        var $body = $("body"), pageJson = ____global.pageJson, resumeid = pageJson.rid;
        $body.on("click", ".ceping_report", function (event) {
            event.preventDefault();
            window.clickLog && window.clickLog("from=pc-resume-detail-cepinga");
            getReport(resumeid)
        });
        $body.on("click", ".ceping-list .report-item", function (event) {
            event.preventDefault();
            if (!$(this).hasClass("active")) {
                $(this).parent().find(".report-item").removeClass("active");
                $(this).addClass("active")
            }
        });
        $body.on("click", ".ceping-success-info .submit-btn", function (event) {
            event.preventDefault();
            var isBuy = $(".ceping-list .active").attr("data-avail"), reportid = $(".ceping-list .active .reportid").val();
            window.clickLog && window.clickLog("from=pc-ceping-select-click");
            if (isBuy == "1") {
                $(".ceping-success").hide();
                window.open("//cepingp.58.com/report/reportBpcinfo?resumeid=" + resumeid + "&reportid=" + reportid + "&source=pc")
            } else {
                vipWatchReport(resumeid, reportid)
            }
        });
        $body.on("click", "#submit-btn-point", function (event) {
            event.preventDefault();
            window.clickLog && window.clickLog("from=pc-ceping-vip-free-click");
            var reportid = $(".ceping-list .active .reportid").val();
            $(".ceping-tips-bg,.ceping-success-content").hide();
            vipGetReport(resumeid, reportid)
        });
        $body.on("click", ".yuePay .submit-btn", function (event) {
            event.preventDefault();
            window.clickLog && window.clickLog("from=pc-ceping-pay-yue-click");
            yuePay(resumeid)
        });
        $body.on("click", ".cashPay .submit-btn", function (event) {
            event.preventDefault();
            window.clickLog && window.clickLog("from=pc-ceping-pay-weixin-click");
            $("#cashPay-submit").submit();
            $(".cashPay").hide();
            $(".payList .wechat").click();
            $(".payReport-content").addClass("payAfter-content");
            $(".afterPay").show()
        });
        $body.on("click", ".yuePay-success .submit-btn, .paySuccess, .payFail", function (event) {
            event.preventDefault();
            $(".payReport-close").click();
            var reportid = $(".ceping-list .active .reportid").val(), cepingUrl = "//cepingp.58.com/report/reportBpcinfo?resumeid=" + resumeid + "&reportid=" + reportid + "&source=pc";
            window.open(cepingUrl)
        });
        $body.on("click", ".ceping-tips-close", function () {
            $(".cepingTips").hide();
            $("body").css("overflow", "auto")
        });
        $body.on("click", ".ceping-error-close, .close-btn", function () {
            $(".ceping-error").hide()
        });
        $body.on("click", ".ceping-success-close", function () {
            if ($(".ceping-success-vip").length) {
                $(".ceping-success-vip").hide()
            }
            $(".ceping-success").hide()
        });
        $(".submit-btn, .paySuccess, .close-btn").mouseover(function (event) {
            $(this).css("background", "#F06600")
        }).mouseleave(function (event) {
            $(this).css("background", "#ff8c14")
        });
        $body.on("click", ".payReport-close, .yuePay-fail .close-btn", function (event) {
            $(".payReport").hide();
            $(".payReport-content").removeClass("payAfter-content").removeClass("yuePayAfter-content");
            $(".yuePay").hide();
            $(".yuePay-success").hide();
            $(".yuePay-fail").hide();
            $(".afterPay").hide();
            $(".payList .wechat").click()
        });
        $body.on("click", ".payList li", function (event) {
            if (!$(this).hasClass("active")) {
                $(".payList li").removeClass("active");
                $(this).addClass("active");
                if ($(this).attr("id") == "wechat") {
                    $("#channelId").val(83)
                } else {
                    $("#channelId").val(33)
                }
            }
        })
    })
});
define("job/busi.resume.getJingzhun", ["./util.cookie"], function (cookie) {
    var dlcookieFlag = cookie.getCookie("jingzhunxq-pc");
    if (!dlcookieFlag) {
        var jxjl = getQueryString("preci") || 0;
        if (jxjl == 1) {
            var url = "//jianli.58.com/precise/detail";
            cookie.setCookie("jingzhunxq-pc", 1, 1);
            window.clickLog && window.clickLog("from=jx_tipdialog_detail");
            window.parent.setbg("精选简历介绍", 448, 210, url)
        }
    }
    $(function () {
        var dlcookieFlag = cookie.getCookie("jingzhunxq-pc");
        if (!dlcookieFlag) {
            var jxjl = getQueryString("preci") || 0;
            if (jxjl == 1) {
                var url = "//jianli.58.com/precise/detail";
                cookie.setCookie("jingzhunxq-pc", 1, 1, "/");
                window.clickLog && window.clickLog("from=jx_tipdialog_detail");
                window.setbg("精准简历介绍", 448, 210, url)
            }
        }
    });
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2])
        }
        return null
    }
});
define("job/api.resume.printResume", [""], function () {
    var printResume = function (phoneProtectState, resumeid) {
        if (phoneProtectState != 1) {
            $.ajax({
                type: "post", url: "/jlprotect/callingcount", dataType: "jsonp", success: function (data) {
                    if (data.callingnum <= 0) {
                        window.setbg("提示", 475, 160, "//jianli.58.com/jlprotect/addcallingnumwarn")
                    } else {
                        if (phoneProtectState == 2 || phoneProtectState == 4) {
                            window.setbg("提示", 550, 190, "//jianli.58.com/jlprotect/printresume?rid=" + resumeid)
                        } else {
                            try {
                                window.print();
                                window.clickLog && window.clickLog("from=resume_print")
                            } catch (e) {
                                console.log("打印：" + e)
                            }
                        }
                    }
                }, error: function (e) {
                    console.log("报错：" + e)
                }
            })
        } else {
            try {
                window.print();
                window.clickLog && window.clickLog("from=resume_print")
            } catch (e) {
                console.log("打印：" + e)
            }
        }
    };
    return printResume
});
define("job/api.resume.saveResume", [""], function () {
    var saveResume = function (phoneProtectState, resumeid) {
        if (phoneProtectState != 1) {
            $.ajax({
                type: "post",
                url: "/jlprotect/callingcount",
                dataType: "jsonp",
                async: false,
                success: function (data) {
                    if (data.callingnum <= 0) {
                        window.setbg("提示", 475, 160, "//jianli.58.com/jlprotect/addcallingnumwarn")
                    } else {
                        if (phoneProtectState == 2 || phoneProtectState == 4) {
                            window.setbg("提示", 550, 190, "//jianli.58.com/jlprotect/savecomputer?rid=" + resumeid)
                        } else {
                            try {
                                var href = $("#savelocal").attr("hrefs");
                                var start = href.indexOf("rand=");
                                if (start > 0) {
                                    hrefs = href.substr(0, start + 5)
                                }
                                $("#savelocal").attr("hrefs", href + Math.random());
                                var hrefs = hrefs + Math.random();
                                window.open(hrefs)
                            } catch (e) {
                                console.log("打印：" + e)
                            }
                        }
                    }
                },
                error: function (e) {
                    console.log("报错：" + e)
                }
            })
        } else {
            try {
                var href = $("#savelocal").attr("hrefs");
                var start = href.indexOf("rand=");
                if (start > 0) {
                    hrefs = href.substr(0, start + 5)
                }
                $("#savelocal").attr("hrefs", href + Math.random());
                var hrefs = hrefs + Math.random();
                window.open(hrefs)
            } catch (e) {
                console.log("打印：" + e)
            }
        }
    };
    return saveResume
});
define("job/api.resume.getSecret", [""], function () {
    var getSecret = function (resumeid) {
        $.ajax({
            type: "post", url: "/jlprotect/callingcount", dataType: "jsonp", success: function (data) {
                if (data.callingnum <= 0) {
                    window.setbg("提示", 475, 130, "//jianli.58.com/jlprotect/addcallingnumwarn")
                } else {
                    var url = "//jianli.58.com/jlprotect/telbind?rid=" + resumeid + "&operateType=0";
                    $.ajax({
                        type: "GET", url: url, dataType: "jsonp", async: false, success: function (result) {
                            try {
                                if (!result.isSuccess) {
                                    alert("获取密号失败，请稍后再试！")
                                } else {
                                    parent.location.reload()
                                }
                            } catch (error) {
                                console.log(error)
                            }
                        }, error: function () {
                            alert("网络有问题，请稍后再试哦~")
                        }, timeout: 1e5
                    })
                }
            }, error: function (e) {
                console.log("报错：" + e)
            }
        })
    };
    return getSecret
});
define("job/tmpl.resume.telprotect_notTelprotect", ["./util.artTemplate"], function (artTemplate) {
    template = '<p class="phoneNum">' + '<span class="icon-mobile"></span>' + '<span class="real-mobile stonefont">{{mobile}}</span>' + "</p>";
    return artTemplate.compile(template)
});
define("job/tmpl.resume.interviewInvite", ["./util.artTemplate"], function (artTemplate) {
    var template = '<div class="resume-action">' + '<div id="interview_send" class="interview-btn btn">发送面试邀请</div>' + '<div class="interview-result">' + "{{each resultList as value key}}" + '<div id="{{key}}" class="result-item">' + '<span class="icon-noSelected"></span>' + '<span class="invitation-result">{{value}}</span>' + "</div>" + "{{/each}}" + "</div>" + "</div>";
    return artTemplate.compile(template)
});
define("job/tmpl.resume.telprotectLayer_notTelprotect", ["./util.artTemplate"], function (artTemplate) {
    var template = '<div class="content-info">' + '<div class="inner-content">' + '<div class="headFigure">' + '<img src="{{imgSrc}}">' + "</div>" + '<div class="resume-info">' + '<p class="name stonefont">{{name}}</p>' + '<div class="expect">' + "<span>期望职位：</span>" + '<span class="expect-job auto_hidden" title="{{expectjob}}"> ' + "{{expectjob}}" + "</span>" + "<span>期望工作地点：</span>" + '<span class="expect-location auto_hidden"> ' + "{{expectlocation}}" + "</span>" + "</div>" + "</div>" + '<div class="telephoneNum stonefont">{{mobile}}</div>' + "</div>" + "</div>";
    return artTemplate.compile(template)
});
define("job/tmpl.resume.bottomOperation", ["./util.artTemplate"], function (artTemplate) {
    var template = '<div class="bottomOperationMask">' + '<div class="bottomOperation">' + '<a target="_blank" id="savelocal" href="javascript:void(0);" hrefs="//jianli.58.com//resumedetail/savetolocal?rid={{resumeid}}&rand=' + Math.random() + '">' + '<i class="icon-save-resume"></i>' + "保存到电脑" + "</a>" + '<a href="javascript:void(0);" id="turnToEmail">' + '<i class="icon-forward"></i>' + "转发到邮箱" + "</a>" + '<a href="javascript:void(0);" id="printNow">' + '<i class="icon-print"></i>' + "打印" + "</a>" + '<span class="iconList operationHide">' + '<span class="fold-text">收起</span>' + '<span class="icon-packup"></span>' + "</span>" + "</div>" + "</div>" + '<div class="operationShow" style="display:none">' + '<span class="fold-text">展开</span>' + '<span class="icon-unfold"></span>' + "</div>";
    return artTemplate.compile(template)
});
define("job/api.resume.hasInterestIn", ["./tmpl.resume.telprotect_notTelprotect", "./tmpl.resume.interviewInvite", "./tmpl.resume.telprotectLayer_notTelprotect", "./tmpl.resume.bottomOperation", "./util.cookie"], function (notTelprotect, interviewInvite, notTelprotect_layer, bottomOperation, cookie) {
    var hasInterestIn = {
        showFullContract: function (bizid) {
            this.resumeIsRead(bizid)
        }, resumeIsRead: function (bizid) {
            var pageJson = ____global.pageJson, resumeid = pageJson.rid, phoneProtectState = pageJson.phoneProtect.state, sign = pageJson.feedback.bizSign, phoneProtectNumber = pageJson.phoneProtect.number;
            if (1 != phoneProtectState) {
                $.ajax({
                    type: "post",
                    url: "/jlprotect/callingcount",
                    async: false,
                    dataType: "jsonp",
                    success: function (data) {
                        if (data.callingnum <= 0) {
                            window.parent.setbg("提示", 475, 160, "//jianli.58.com/jlprotect/addcallingnumwarn")
                        } else {
                            var telNumcookieFlag = cookie.getCookie("getKey");
                            if (telNumcookieFlag == 1) {
                                var url = "//jianli.58.com/jlprotect/telbind?rid=" + resumeid + "&operateType=0";
                                $.ajax({
                                    type: "GET", url: url, dataType: "jsonp", async: false, success: function (result) {
                                        try {
                                            if (!result.isSuccess) {
                                                alert("获取通话密号失败")
                                            } else {
                                                parent.location.reload()
                                            }
                                        } catch (error) {
                                            console.log(error)
                                        }
                                    }, error: function () {
                                        alert("网络有问题，请稍后再试哦~")
                                    }, timeout: 1e5
                                })
                            } else {
                                cookie.setCookie("getKey", "1", "1");
                                window.parent.setbg("提示", 550, 190, "//jianli.58.com/jlprotect/getsecuritynumwarn")
                            }
                        }
                    },
                    error: function (e) {
                        console.log("报错：" + e)
                    }
                })
            } else {
                var telphoneHtml = "", telephoneLayerHtml = "", imgSrc = $(".headFigure img").attr("src"), name = $("#name").text(), expectjob = $("#expectJob").text(), expectlocation = $("#expectLocation").text(), resultList = {
                    "bizState-1": "可面试",
                    "bizState-2": "待定",
                    "bizState-3": "不合适",
                    "bizState-5": "暂未接通"
                };
                telphoneHtml = notTelprotect({mobile: phoneProtectNumber}) + interviewInvite({resultList: resultList});
                telephoneLayerHtml = notTelprotect_layer({
                    imgSrc: imgSrc,
                    name: name,
                    expectjob: expectjob,
                    expectlocation: expectlocation,
                    mobile: phoneProtectNumber
                });
                $(".telephone").html(telphoneHtml);
                $(".telProtect-layer").html(telephoneLayerHtml);
                var bottomOperationHtml = bottomOperation({resumeid: resumeid});
                $("#bottomTipID").html(bottomOperationHtml).show();
                $.ajax({
                    type: "post",
                    url: "/ajax/resumebiz/" + bizid + "/" + 4 + "?sign=" + sign + "&rand=" + Math.random(),
                    success: function (data) {
                        if (null != data && data.returnMessage == "success") {
                            var state = data.entity;
                            if (state > 0) {
                            }
                        } else {
                            alert("页面过期，请刷新页面后重试!")
                        }
                    }
                })
            }
        }
    };
    return hasInterestIn
});
define("job/tmpl.resume.telprotectTip", [], function () {
    var template = '<div class="protectTel-tips-bg"></div>' + '<div class="protectTel-tips-content">' + '<a href="javascript:void(0)" class="protectTel-tips-img protectTel-tips-close"></a>' + '<div class="tips-hearder">' + '<h3 class="tips-title">查看简历联系方式流程有新变化啦~</h3>' + "</div>" + '<div class="tips-main">' + "<ul>" + '<li class="tips-main-li">' + '<i class="protectTel-tips-img protectTel-tips-img01"></i>' + '<p class="tips-fonts">' + '<span class="tips-font">查看联系方式</span>' + '<span class="tips-font">（求职者已开启号码保护）</span>' + "</p>" + "</li>" + '<li class="tips-main-li">' + '<i class="protectTel-tips-img protectTel-tips-img02"></i>' + '<p class="tips-fonts">' + '<span class="tips-font">选择联系求职者的</span>' + '<span class="tips-font">手机号/固话</span>' + "</p>" + "</li>" + '<li class="tips-main-li">' + '<i class="protectTel-tips-img protectTel-tips-img03"></i>' + '<p class="tips-fonts">' + '<span class="tips-font">获得通话密号</span>' + '<span class="tips-font">立即呼叫吧～</span>' + "</p>" + "</li>" + "</ul>" + "</div>" + '<div class="tips-footer">' + '<h4 class="notes-title">新流程规则说明：</h4>' + "<ul>" + '<li class="notes-content">' + '1）若<span class="font-blue">求职者</span>在简历发布时<span class="font-blue">选择号码保护</span>，则该简历在后续投递或下载过程中将用通话密号替代真实手机号。' + "</li>" + '<li class="notes-content">' + "2）您在查看简历联系方式时须选择一个主叫号码进行绑定，来获取该简历的通话密号。您必须通过此主叫号码拨打简历的通话密号，才能与对应的求职者通话。" + "</li>" + '<li class="notes-content">' + "3）通话密号会在当天24点失效。密号失效后，您可重新选择主叫号码绑定简历，获取新的通话密号。" + "</li>" + "</ul>" + "</div>" + "</div>";
    return template
});
define("job/tmpl.resume.backTop", [""], function (artTemplate) {
    var template = '<div id="backtop" style="display: none">' + '<span class="icon-backtop"></span>' + "</div>";
    return template
});
define("job/tmpl.resume.telprotect_hasGotSecret", ["./util.artTemplate"], function (artTemplate) {
    var template = '<div class="secretNum">' + '<p class="protect-icon-mes">{{iconHoverMes}}</p>' + '<i class="secret-icon {{notConnClass}}"></i>' + '<span class="secretNum-text">通话密号：</span>' + '<span class="tel-pwd stonefont">{{secretNum}}</span>' + '<span class="failTime">密号失效时间：<em class="failTime-em">{{failDate}}</em></span>' + "</div>" + '<div class="telProtect-tip fail-tip"><i class="icon-remind"></i>记得在密号失效前，通过您已添加的主叫号码拨打通话密号联系Ta哦~密号失效后，可免费重新获取密号<a class="common-question" target="_blank" href="//j1.58cdn.com.cn/n/telProctectExplain.html">常见问题</a></div>';
    return artTemplate.compile(template)
});
define("job/tmpl.resume.telprotect_nodownload", ["./util.artTemplate"], function (artTemplate) {
    var template = '<div class="getContact">' + '<span id="getContact" class="telephone-btn btn">查看联系方式</span>' + '<div class="hasFound-tip" style="display:none">' + '<span id="resume-tips"></span>' + '<img class="close-tip" src="//img.58cdn.com.cn/ui7/job/resume/close.png">' + "</div>" + "</div>";
    return artTemplate.compile(template)
});
define("job/tmpl.resume.telprotect_nowatchTel", ["./util.artTemplate"], function (artTemplate) {
    var template = '<div class="noWatchTel">' + '<p class="protect-icon-mes">该求职者已开启号码保护，此联系方式为通话密号替代真实手机号</p>' + '<i class="secret-icon {{hideProtectIcon}}"></i>' + '<span class="tel-pwd stonefont" data-key="{{mobile}}">{{mobileSecret}}</span>' + "</div>";
    return artTemplate.compile(template)
});
define("job/tmpl.resume.telprotect_togetSecret", ["./util.artTemplate"], function (artTemplate) {
    var template = '<div class="getSecretNum">' + '<p class="protect-icon-mes">{{iconHoverMes}}</p>' + '<i class="secret-icon {{notConnClass}}"></i>' + '<span class="tel-pwd stonefont">{{mobile}}</span>' + '<div class="getSecret-btn btn">获取通话密号</div>' + "</div>" + '<div class="telProtect-tip"><i class="icon-remind"></i>{{telProtect_tip}}<a class="common-question" target="_blank" href="//j1.58cdn.com.cn/n/telProctectExplain.html">常见问题</a></div>';
    return artTemplate.compile(template)
});
define("job/tmpl.resume.hasInterestIn", [""], function () {
    var template = '<div id="hasInterestIn-btn">' + '<span class="telephone-btn hasInterestIn-btn lookAllWay btn">感兴趣，立即联系</span>' + '<div class="interview-result marginxiazai"><div id="bizState-3" class="result-item"><span class="icon-noSelected"></span><span class="invitation-result">不合适</span></div></div>' + '<div class="hasFound-tip" style="display:none">' + '<span id="resume-tips"></span>' + '<img class="close-tip" src="//img.58cdn.com.cn/ui7/job/resume/close.png">' + "</div>" + "</div>";
    return template
});
define("job/tmpl.resume.telprotectLayer_hasGotSecret", ["./util.artTemplate"], function (artTemplate) {
    var template = '<div class="content-info" id="get">' + '<div class="inner-content">' + '<div class="headFigure">' + '<img src="{{imgSrc}}">' + "</div>" + '<div class="resume-info">' + '<p class="name stonefont">{{name}}</p>' + '<p class="expect">' + "<span>期望职位：</span>" + '<span class="expect-job auto_hidden" title="{{expectjob}}"> ' + "{{expectjob}}" + "</span>" + "</p>" + "</div>" + '<div class="secret-div">' + '<p class="secretNum">' + '<span class="tel stonefont">{{secretNum}}</span>' + '<i class="secret-icon {{notConnClass}}"></i>' + "</p>" + '<p class="getContact-tip">密号失效时间：<span>{{failDate}}</span></p>' + "</div>" + "</div>" + "</div>";
    return artTemplate.compile(template)
});
define("job/tmpl.resume.telprotectLayer_nodownload", ["./util.artTemplate"], function (artTemplate) {
    var template = '<div class="content-info">' + '<div class="inner-content">' + '<div class="headFigure">' + '<img src="{{imgSrc}}">' + "</div>" + '<div class="resume-info">' + '<p class="name">' + '<span class="stonefont">{{name}}</span>' + "</p>" + '<div class="expect auto_hidden">' + "<span>期望职位：</span>" + '<span class="expect-job auto_hidden" title="{{expectjob}}"> ' + "{{expectjob}}" + "</span>" + "<span>期望工作地点：</span>" + '<span class="expect-location auto_hidden"> ' + "{{expectlocation}}" + "</span>" + "</div>" + "</div>" + '<div id="getContact-layer" class="getContact-btn">查看联系方式</div>' + "</div>" + "</div>";
    return artTemplate.compile(template)
});
define("job/tmpl.resume.telprotectLayer_togetSecret", ["./util.artTemplate"], function (artTemplate) {
    var template = '<div class="content-info" id="get">' + '<div class="inner-content">' + '<div class="headFigure">' + '<img src="{{imgSrc}}">' + "</div>" + '<div class="resume-info">' + "<p>" + '<span class="name stonefont">{{name}}</span>' + '<span class="tel stonefont">{{telephoneNum}}</span>' + '<i class="secret-icon {{notConnClass}}"></i>' + "</p>" + '<div class="expect auto_hidden">' + "<span>期望职位：</span>" + '<span class="expect-job auto_hidden" title="{{expectjob}}">' + "{{expectjob}}" + "</span>" + '<span class="getContact-tip">{{getContact_tip}}</span>' + "</div>" + "</div>" + '<div class="getContact-btn getSecretNum-btn btn">获取通话密号</div>' + "</div>" + "</div>";
    return artTemplate.compile(template)
});
define("job/tmpl.resume.telprotectLayer_nowatchTel", ["./util.artTemplate"], function (artTemplate) {
    var template = '<div class="content-info">' + '<div class="inner-content">' + '<div class="headFigure">' + '<img src="{{imgSrc}}">' + "</div>" + '<div class="resume-info">' + '<p class="name">' + '<span class="stonefont">{{name}}</span>' + "</p>" + '<div class="expect auto_hidden">' + "<span>期望职位：</span>" + '<span class="expect-job auto_hidden" title="{{expectjob}}"> ' + "{{expectjob}}" + "</span>" + "<span>期望工作地点：</span>" + '<span class="expect-location auto_hidden"> ' + "{{expectlocation}}" + "</span>" + "</div>" + "</div>" + '<div class="getContact-btn hasInterestIn-btn">感兴趣，立即联系</div>' + "</div>" + "</div>";
    return artTemplate.compile(template)
});
define("job/busi.resume.telprotectUI", ["./tmpl.resume.telprotect_hasGotSecret", "./tmpl.resume.telprotect_nodownload", "./tmpl.resume.telprotect_nowatchTel", "./tmpl.resume.telprotect_notTelprotect", "./tmpl.resume.telprotect_togetSecret", "./tmpl.resume.interviewInvite", "./tmpl.resume.hasInterestIn", "./tmpl.resume.telprotectLayer_hasGotSecret", "./tmpl.resume.telprotectLayer_nodownload", "./tmpl.resume.telprotectLayer_notTelprotect", "./tmpl.resume.telprotectLayer_togetSecret", "./tmpl.resume.telprotectLayer_nowatchTel"], function (hasGotSecret, nodownload, nowatchTel, notTelprotect, togetSecret, interviewInvite, hasInterestIn, hasGotSecret_layer, nodownload_layer, notTelprotect_layer, togetSecret_layer, nowatchTel_layer) {
    $(function () {
        var telphoneHtml = "", telephoneLayerHtml = "", imgSrc = $(".headFigure img").attr("src"), name = $("#name").text(), expectjob = $("#expectJob").text(), expectlocation = $("#expectLocation").text(), pageJson = ____global.pageJson, phoneProtectState = pageJson.phoneProtect.state, phoneProtectNumber = pageJson.phoneProtect.number, bizState = pageJson.bizState, findJobState = pageJson.resume.findJobState, feedbackState = pageJson.feedback.feedbackState || "", resultList = {
            "bizState-1": "可面试",
            "bizState-2": "待定",
            "bizState-3": "不合适",
            "bizState-5": "暂未接通"
        };
        if (bizState == 1) {
            telphoneHtml = nodownload;
            telephoneLayerHtml = nodownload_layer({
                imgSrc: imgSrc,
                name: name,
                expectjob: expectjob,
                expectlocation: expectlocation
            })
        } else if (bizState == 3 && (phoneProtectState == 1 || phoneProtectState == 2)) {
            $(".telephone").removeClass("telephone-no-border");
            var mobileSecret = phoneProtectNumber.length === 88 ? phoneProtectNumber.substring(0, 24) + " * * * * " + phoneProtectNumber.substring(56, phoneProtectNumber.length) : phoneProtectNumber, hideProtectIcon = phoneProtectState == 1 ? "hideProtectIcon" : "";
            telphoneHtml = nowatchTel({
                    hideProtectIcon: hideProtectIcon,
                    mobile: phoneProtectNumber,
                    mobileSecret: mobileSecret
                }) + hasInterestIn;
            telephoneLayerHtml = nowatchTel_layer({
                imgSrc: imgSrc,
                name: name,
                expectjob: expectjob,
                expectlocation: expectlocation
            })
        } else {
            $(".telephone").removeClass("telephone-no-border");
            if (phoneProtectState == 1) {
                telphoneHtml = notTelprotect({mobile: phoneProtectNumber}) + interviewInvite({resultList: resultList});
                telephoneLayerHtml = notTelprotect_layer({
                    imgSrc: imgSrc,
                    name: name,
                    expectjob: expectjob,
                    expectlocation: expectlocation,
                    mobile: phoneProtectNumber
                })
            } else if (phoneProtectState == 2) {
                var mobileSecret = phoneProtectNumber.length === 88 ? phoneProtectNumber.substring(0, phoneProtectNumber.length - 32) + " * * * *" : phoneProtectNumber;
                telphoneHtml = togetSecret({
                    mobile: mobileSecret,
                    telProtect_tip: "该求职者已开启号码保护，您暂未获取通话密号！",
                    iconHoverMes: "该求职者已开启号码保护，此联系方式为通话密号替代真实手机号",
                    notConnClass: ""
                });
                telephoneLayerHtml = togetSecret_layer({
                    imgSrc: imgSrc,
                    name: name,
                    telephoneNum: mobileSecret,
                    expectjob: expectjob,
                    expectlocation: expectlocation,
                    getContact_tip: "该求职者已开启号码保护，您暂未获取通话密号",
                    notConnClass: ""
                })
            } else if (phoneProtectState == 3) {
                var todayDate = ____global.pageJson["phoneProtect"]["expireTime"];
                telphoneHtml = hasGotSecret({
                        secretNum: phoneProtectNumber,
                        failDate: todayDate,
                        iconHoverMes: feedbackState === 8 ? "该简历拨打未接听" : "该求职者已开启号码保护，此联系方式为通话密号替代真实手机号",
                        notConnClass: feedbackState === 8 ? "not-connection" : ""
                    }) + interviewInvite({resultList: resultList});
                telephoneLayerHtml = hasGotSecret_layer({
                    imgSrc: imgSrc,
                    name: name,
                    expectjob: expectjob,
                    secretNum: phoneProtectNumber,
                    failDate: todayDate,
                    notConnClass: feedbackState === 8 ? "not-connection" : ""
                })
            } else if (phoneProtectState == 4) {
                telphoneHtml = togetSecret({
                        mobile: phoneProtectNumber,
                        telProtect_tip: "原通话密号已失效，您可免费重新获取",
                        iconHoverMes: feedbackState === 8 ? "该简历拨打未接听" : "该求职者已开启号码保护，此联系方式为通话密号替代真实手机号",
                        notConnClass: feedbackState === 8 ? "not-connection" : ""
                    }) + interviewInvite({resultList: resultList});
                telephoneLayerHtml = togetSecret_layer({
                    imgSrc: imgSrc,
                    name: name,
                    telephoneNum: phoneProtectNumber,
                    expectjob: expectjob,
                    expectlocation: expectlocation,
                    getContact_tip: "原通话密号已失效，您可免费重新获取",
                    notConnClass: feedbackState === 8 ? "not-connection" : ""
                })
            }
        }
        $(".telephone").html(telphoneHtml).show();
        $(".telProtect-layer").append(telephoneLayerHtml);
        if ($(".resume-action").length > 0) {
            var $feedbackStateRadio = $("#bizState-" + feedbackState);
            $feedbackStateRadio.addClass("active");
            $feedbackStateRadio.find(".icon-noSelected").removeClass("icon-noSelected").addClass("icon-selected")
        }
        if (findJobState == 0 && bizState == 1) {
            $("#resume-tips").text("TA已经找到工作了，您可以查看其他求职简历，或试试运气～");
            $(".hasFound-tip").show()
        }
        refferPage("page", bizState)
    });
    function getTodayDate() {
        var date = new Date, dateStr = date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();
        return dateStr
    }

    function refferPage(flag, bizState) {
        var sourcepath = ____global.pageJson.trace.sourcepath;
        if (flag == "page") {
            if (sourcepath == "pc_list_detai") {
                switch (bizState) {
                    case 1:
                        window.clickLog && window.clickLog("from=pc-jianlixiangqing-notdowna-liebiao-old");
                        break;
                    case 2:
                    case 4:
                        window.clickLog && window.clickLog("from=pc-jianlixiangqing-down-liebiao-old");
                        break;
                    case 3:
                        window.clickLog && window.clickLog("from=pc-jlxiangqing-received-liebiao-old");
                        break
                }
            } else if (sourcepath == "pc-jllistb") {
                switch (bizState) {
                    case 1:
                        window.clickLog && window.clickLog("from=pc-jianlixiangqing-notdowna-liebiao");
                        break;
                    case 2:
                    case 4:
                        window.clickLog && window.clickLog("from=pc-jianlixiangqing-down-liebiao");
                        break;
                    case 3:
                        window.clickLog && window.clickLog("from=pc-jlxiangqing-received-liebiao");
                        break
                }
            } else if (sourcepath == "pc-jllista") {
                switch (bizState) {
                    case 1:
                        window.clickLog && window.clickLog("from=pc-jianlixiangqing-notdowna-kapian");
                        break;
                    case 2:
                    case 4:
                        window.clickLog && window.clickLog("from=pc-jianlixiangqing-down-kapian");
                        break;
                    case 3:
                        window.clickLog && window.clickLog("from=pc-jlxiangqing-received-kapian");
                        break
                }
            } else if (sourcepath == "pc_list_pp_detail") {
                window.clickLog && window.clickLog("from=jianlilist-neitui-chakanshow")
            } else if (sourcepath == "searchneitui") {
                window.clickLog && window.clickLog("from=hxjianlilist-neitui-chakanshow")
            } else if (sourcepath == "searchyouzhi") {
                window.clickLog && window.clickLog("from=hxjianlilist-youzhi-chakanshow")
            } else if (sourcepath == "recommondneitui") {
                window.clickLog && window.clickLog("from=hxtuijian-neitui-chakanshow")
            } else if (sourcepath == "receiveneitui") {
                window.clickLog && window.clickLog("from=hxshoudao-neitui-chakanshow")
            } else if (sourcepath == "pc_list_yx_card_detail") {
                window.clickLog && window.clickLog("from=jianlilist-youzhi-chakanshow-kp")
            } else if (sourcepath == "pc_list_pp_card_detail") {
                window.clickLog && window.clickLog("from=jianlilist-neitui-chakanshow-kp")
            } else if (sourcepath == "pc_list_yx_new_detail") {
                window.clickLog && window.clickLog("from=jianlilist-youzhi-chakanshow-lb")
            } else if (sourcepath == "pc_list_pp_new_detail") {
                window.clickLog && window.clickLog("from=jianlilist-neitui-chakanshow-lb")
            } else {
                window.clickLog && window.clickLog("from=" + sourcepath)
            }
        }
    }
});
define("job/util.urlSearch", [], function () {
    var loc = window.location;
    var search = loc.search;
    var reQueryAll = /([^=&?]+)=([^=&?]*)/g;
    return {
        query: function (name) {
            var reQuery, matches, cache;
            if (!search) {
                return null
            }
            reQuery = new RegExp(name + "=([^=&?]*)", "g");
            cache = [];
            while (matches = reQuery.exec(search)) {
                cache.push(decodeURIComponent(matches[1]))
            }
            if (cache.length) {
                return cache.length === 1 ? cache[0] : cache
            }
            return null
        }, queryAll: function () {
            var matches, key, value;
            var params = {};
            if (!search) {
                return null
            }
            while (matches = reQueryAll.exec(search)) {
                key = matches[1];
                value = decodeURIComponent(matches[2]);
                if (!params[key]) {
                    params[key] = value
                } else {
                    if (!Array.isArray(params[key])) {
                        params[key] = [params[key], value]
                    } else {
                        params[key].push(value)
                    }
                }
            }
            return params
        }
    }
});
define("job/util.processor", [], function () {
    var processor = {
        timeoutId: null, performProcessing: function () {
        }, process: function (delayFunction, interval) {
            clearTimeout(this.timeoutId);
            var that = this;
            interval = interval || 100;
            this.performProcessing = delayFunction;
            this.timeoutId = setTimeout(function () {
                that.performProcessing()
            }, interval)
        }
    };
    return processor
});
define("job/api.resume.detaliShanxin", [""], function () {
    var IsShanxin = function (callbackFn) {
        function getUrl(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2])
            }
            return null
        }

        var flashid = getUrl("flashid");
        if (flashid != null) {
            $.ajax({
                type: "get",
                url: "https://cvip.58.com/flash/isflashed?flashid=" + flashid,
                dataType: "jsonp",
                jsonp: "callback",
                success: function (json) {
                    var dataShanXin = {
                        IsShanxin: json.onFlash,
                        remainTime: json.remainTime,
                        posName: json.posName,
                        addDate: json.addDate
                    };
                    if (typeof callbackFn == "function") {
                        callbackFn(dataShanXin)
                    }
                },
                error: function (e) {
                    alert("请求失败，请重试！");
                    console.log(e)
                }
            })
        } else {
            return false
        }
    };
    return IsShanxin
});
define("job/busi.resume.telephoneProtect", ["./api.resume.printResume", "./api.resume.saveResume", "./api.resume.getSecret", "./api.resume.hasInterestIn", "./tmpl.resume.telprotectTip", "./tmpl.resume.backTop", "./busi.resume.telprotectUI", "./util.cookie", "./util.urlSearch", "./util.processor", "./api.resume.detaliShanxin"], function (printResume, saveResume, getSecret, hasInterestIn, telprotectTip, backTop, telprotectUI, cookie, urlSearch, processor, ISshanXin) {
    var urlQuery = urlSearch.queryAll() || {}, pageJson = ____global.pageJson || {}, isVipLog = pageJson.userType == 3 ? "vip" : "nvip";
    $(function () {
        var $telephone = $(".telephone"), $telProtect_layer = $(".telProtect-layer"), resumeid = pageJson.rid, bizState = pageJson.bizState, bizId = pageJson.feedback.bizId || "", bizType = pageJson.feedback.bizType || "", shanxinUserType = pageJson.userType, haveIndustry = $(".pc-industry-job-box").text(), flashid = getUrl("flashid");
        $("body").append(backTop);
        $("body").on("click", "#backtop", function (event) {
            $("body,html").animate({scrollTop: 0}, 500);
            return false
        });
        $telephone.on("click", "#getContact", function (event) {
            getContact(resumeid);
            if (bizState == 1 && haveIndustry != "") {
                window.clickLog && clickLog("from=pc_jlxiangqing_chakanad")
            }
        });
        $telProtect_layer.on("click", "#getContact-layer", function (event) {
            getContact(resumeid);
            if (bizState == 1 && haveIndustry != "") {
                window.clickLog && clickLog("from=pc_jlxiangqing_chakanad")
            }
        });
        function getUrl(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2])
            }
            return null
        }

        function shanxinResumeChoose(shanxinState, flashid) {
            $.ajax({
                type: "get",
                url: "https://cvip.58.com/flash/feedback?state=" + shanxinState + "&flashid=" + flashid,
                dataType: "jsonp",
                jsonp: "callback",
                success: function (json) {
                },
                error: function (e) {
                    console.log(e)
                }
            })
        }

        $telephone.on("click", "#interview_send", function (event) {
            window.clickLog && clickLog("from=clk_send_interviewa");
            operBiz(bizId, 1, bizType);
            window.setbg("面试邀请", 640, 452, "//employer.58.com/invite/invitedialog?rids=" + resumeid);
            ISshanXin(function (dataShanXin) {
                if (dataShanXin.IsShanxin) {
                    shanxinResumeChoose(3, flashid);
                    window.clickLog && clickLog("from=sx_jldetail_yaoqing")
                }
            })
        });
        $telephone.on("click", ".interview-result .result-item", function (event) {
            var $this = $(this);
            ISshanXin(function (dataShanXin) {
                if (dataShanXin.IsShanxin && shanxinUserType == 3) {
                    if (bizState == 1 || bizState == 2 || bizState == 5)shanxinResumeChoose(3, flashid)
                }
            });
            if (!$this.hasClass("active")) {
                var bizState = $this.attr("id").split("-")[1];
                $this.siblings().removeClass("active");
                $(".result-item .icon-selected").addClass("icon-noSelected").removeClass("icon-selected");
                $this.addClass("active");
                $this.find(".icon-noSelected").addClass("icon-selected").removeClass("icon-noSelected");
                operBiz(bizId, bizState, bizType);
                if (bizState == 1) {
                    window.clickLog && clickLog("from=clk_kemianshia")
                } else if (bizState == 2) {
                    window.clickLog && clickLog("from=clk_daidinga")
                } else if (bizState == 3) {
                    window.clickLog && clickLog("from=clk_buheshia");
                    ISshanXin(function (dataShanXin) {
                        if (dataShanXin.IsShanxin) {
                            shanxinResumeChoose(4, flashid);
                            window.clickLog && clickLog("from=sx_jldetail_refuse")
                        }
                    })
                } else if (bizState == 5) {
                    window.clickLog && clickLog("from=clk_weijietonga")
                }
            }
        });
        $telephone.on("click", ".close-tip", function (event) {
            $(".hasFound-tip").hide()
        });
        $telephone.on("click", ".getSecret-btn", function (event) {
            window.clickLog && window.clickLog("from=huoqumihaotc");
            var telNumcookieFlag = cookie.getCookie("getKey");
            if (telNumcookieFlag == 1) {
                getSecret(resumeid)
            } else {
                cookie.setCookie("getKey", "1", "1");
                window.setbg("提示", 480, 340, "//jianli.58.com/jlprotect/getsecuritynumwarn")
            }
        });
        $telephone.on("click", ".hasInterestIn-btn", function (event) {
            hasInterestInClick(bizId);
            if (bizState == 3 && haveIndustry != "") {
                window.clickLog && window.clickLog("from=pc_jlxiangqing_ganxingquad")
            }
        });
        $telProtect_layer.on("click", ".hasInterestIn-btn", function (event) {
            hasInterestInClick(bizId);
            if (bizState == 3 && haveIndustry != "") {
                window.clickLog && window.clickLog("from=pc_jlxiangqing_ganxingquad")
            }
            ISshanXin(function (dataShanXin) {
                if (dataShanXin.IsShanxin) {
                    window.clickLog && clickLog("from=sx_jldetail_call")
                }
            })
        });
        $telProtect_layer.on("click", ".getSecretNum-btn", function (event) {
            $(".getSecret-btn").click()
        })
    });
    $(function () {
        $(".secret-icon").on("mouseover", function () {
            $(".protect-icon-mes").show()
        }).on("mouseout", function () {
            $(".protect-icon-mes").hide()
        });
        $("body").on("mouseover", ".resume-success-protect-icon", function () {
            $(".protect-icon-text").show()
        }).on("mouseout", ".resume-success-protect-icon", function () {
            $(".protect-icon-text").hide()
        });
        $("body").on("click", ".protectTel-tips-close", function () {
            $(".protectTelTips").hide()
        })
    });
    $(function () {
        var bizState = pageJson.bizState || 1;
        $(window).scroll(function (event) {
            processor.process(function () {
                var offsetTop = $(".jobInform")[0].offsetTop - $(window).scrollTop();
                if (offsetTop < 100) {
                    if (bizState === 1) {
                        $(".telProtect-layer").slideDown()
                    }
                    $("#backtop").show()
                } else {
                    $(".telProtect-layer").slideUp();
                    $("#backtop").hide()
                }
            })
        })
    });
    $(function () {
        var $telephone = $(".telephone"), pageJson = ____global.pageJson, resumeid = pageJson.rid, phoneProtectState = pageJson.phoneProtect.state, $bottomTipID = $("#bottomTipID");
        $bottomTipID.on("click", "#printNow", function () {
            window.clickLog && window.clickLog("from=resume_printa");
            $(".telProtect-layer").hide();
            $(".bottomOperationMask").hide();
            printResume(phoneProtectState, resumeid);
            setTimeout(function () {
                $(".bottomOperationMask").show()
            }, 1e3)
        });
        $bottomTipID.on("click", "#savelocal", function () {
            window.clickLog && window.clickLog("from=resume_save_locala");
            saveResume(phoneProtectState, resumeid)
        });
        $bottomTipID.on("click", "#turnToEmail", function () {
            window.clickLog && window.clickLog("from=resume_forward_emaila");
            window.setbg("发送到邮箱", 500, 300, "//jianli.58.com//resumedetail/sendtoemail/?id=" + resumeid)
        })
    });
    function hasInterestInClick(bizId) {
        window.clickLog && window.clickLog("from=pc_jlxiangqing_ganxingqua");
        hasInterestIn.showFullContract(bizId)
    }

    function getContact(resumeid) {
        var sourcepath = ____global.pageJson.trace.sourcepath;
        window.clickLog && window.clickLog("from=pc_jlxiangqing_chakana_" + sourcepath);
        window.resumeDownloadFrom = "pc,detail," + (urlQuery.from || sourcepath || "");
        window.clickLog && window.clickLog("from=pc-new-cvdetail-checkcontactway-clk-" + isVipLog);
        var followparam = ____global.pageJson.followparam || "";
        var resumeDownloadData = {
            resumeid: resumeid,
            isDownloadSame: false,
            source: window.resumeDownloadFrom,
            followparam: followparam
        };
        window.resumeDownload && resumeDownload(false, resumeDownloadData, function () {
            window.location.reload()
        });
        refferPage("downClick")
    }

    var operBiz = function (bizid, state, type) {
        var sign = ____global.pageJson.feedback.bizSign;
        $.ajax({
            type: "post",
            async: false,
            url: "/ajax/resumebiz/" + bizid + "/" + state + "?sign=" + sign + "&type=" + type + "&rand=" + Math.random(),
            success: function (data) {
                if (null != data && data.returnMessage == "success") {
                } else {
                    alert("页面过期，请刷新页面后重试!")
                }
            }
        });
        try {
            if (typeof htmlMap != "undefined") {
                htmlMap.removeByKey(currentid)
            }
        } catch (err) {
        }
    };

    function refferPage(flag) {
        var sourcepath = ____global.pageJson.trace.sourcepath;
        if (flag == "downClick") {
            if (sourcepath == "pc_list_detai") {
                window.clickLog && window.clickLog("from=pc_jlxiangqing_chakana-liebiao-old")
            } else if (sourcepath == "pc-jllistb") {
                window.clickLog && window.clickLog("from=pc_jlxiangqing_chakana-liebiao")
            } else if (sourcepath == "pc-jllista") {
                window.clickLog && window.clickLog("from=pc_jlxiangqing_chakana-kapian")
            } else if (sourcepath == "pc_list_pp_detail") {
                window.clickLog && window.clickLog("from=jianlilist-neitui-chakan-xiazai")
            } else if (sourcepath == "searchneitui") {
                window.clickLog && window.clickLog("from=hxjianlilist-neitui-detailxiazai")
            } else if (sourcepath == "searchyouzhi") {
                window.clickLog && window.clickLog("from=hxjianlilist-youzhi-detailxiazai")
            } else if (sourcepath == "recommondneitui") {
                window.clickLog && window.clickLog("from=hxtuijian-neitui-detailxiazai")
            } else if (sourcepath == "receiveneitui") {
                window.clickLog && window.clickLog("from=hxshoudao-neitui-detailxiazai")
            } else if (sourcepath == "pc_list_yx_card_detail") {
                window.clickLog && window.clickLog("from=jianlilist-youzhi-detailxiazai-kp")
            } else if (sourcepath == "pc_list_pp_card_detail") {
                window.clickLog && window.clickLog("from=jianlilist-neitui-detailxiazai-kp")
            } else if (sourcepath == "pc_list_yx_new_detail") {
                window.clickLog && window.clickLog("from=jianlilist-youzhi-detailxiazai-lb")
            } else if (sourcepath == "pc_list_pp_new_detail") {
                window.clickLog && window.clickLog("from=jianlilist-neitui-detailxiazai-lb")
            }
        }
    }
});
!function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("job/util.echarts", [], e) : "object" == typeof exports ? exports.echarts = e() : t.echarts = e()
}(this, function () {
    return function (t) {
        function e(i) {
            if (n[i])return n[i].exports;
            var r = n[i] = {exports: {}, id: i, loaded: !1};
            return t[i].call(r.exports, r, r.exports, e), r.loaded = !0, r.exports
        }

        var n = {};
        return e.m = t, e.c = n, e.p = "", e(0)
    }([function (t, e, n) {
        t.exports = n(2), n(96), n(90), n(101), n(35)
    }, function (t, e) {
        function n(t) {
            if (null == t || "object" != typeof t)return t;
            var e = t, i = O.call(t);
            if ("[object Array]" === i) {
                e = [];
                for (var r = 0, a = t.length; r < a; r++)e[r] = n(t[r])
            } else if (P[i])e = t.constructor.from(t); else if (!k[i] && !S(t)) {
                e = {};
                for (var o in t)t.hasOwnProperty(o) && (e[o] = n(t[o]))
            }
            return e
        }

        function i(t, e, r) {
            if (!M(e) || !M(t))return r ? n(e) : t;
            for (var a in e)if (e.hasOwnProperty(a)) {
                var o = t[a], s = e[a];
                !M(s) || !M(o) || x(s) || x(o) || S(s) || S(o) || T(s) || T(o) ? !r && a in t || (t[a] = n(e[a], !0)) : i(o, s, r)
            }
            return t
        }

        function r(t, e) {
            for (var n = t[0], r = 1, a = t.length; r < a; r++)n = i(n, t[r], e);
            return n
        }

        function a(t, e) {
            for (var n in e)e.hasOwnProperty(n) && (t[n] = e[n]);
            return t
        }

        function o(t, e, n) {
            for (var i in e)e.hasOwnProperty(i) && (n ? null != e[i] : null == t[i]) && (t[i] = e[i]);
            return t
        }

        function s() {
            return document.createElement("canvas")
        }

        function l() {
            return L || (L = F.createCanvas().getContext("2d")), L
        }

        function h(t, e) {
            if (t) {
                if (t.indexOf)return t.indexOf(e);
                for (var n = 0, i = t.length; n < i; n++)if (t[n] === e)return n
            }
            return -1
        }

        function u(t, e) {
            function n() {
            }

            var i = t.prototype;
            n.prototype = e.prototype, t.prototype = new n;
            for (var r in i)t.prototype[r] = i[r];
            t.prototype.constructor = t, t.superClass = e
        }

        function c(t, e, n) {
            t = "prototype" in t ? t.prototype : t, e = "prototype" in e ? e.prototype : e, o(t, e, n)
        }

        function f(t) {
            if (t)return "string" != typeof t && "number" == typeof t.length
        }

        function d(t, e, n) {
            if (t && e)if (t.forEach && t.forEach === E)t.forEach(e, n); else if (t.length === +t.length)for (var i = 0, r = t.length; i < r; i++)e.call(n, t[i], i, t); else for (var a in t)t.hasOwnProperty(a) && e.call(n, t[a], a, t)
        }

        function p(t, e, n) {
            if (t && e) {
                if (t.map && t.map === B)return t.map(e, n);
                for (var i = [], r = 0, a = t.length; r < a; r++)i.push(e.call(n, t[r], r, t));
                return i
            }
        }

        function g(t, e, n, i) {
            if (t && e) {
                if (t.reduce && t.reduce === N)return t.reduce(e, n, i);
                for (var r = 0, a = t.length; r < a; r++)n = e.call(i, n, t[r], r, t);
                return n
            }
        }

        function v(t, e, n) {
            if (t && e) {
                if (t.filter && t.filter === z)return t.filter(e, n);
                for (var i = [], r = 0, a = t.length; r < a; r++)e.call(n, t[r], r, t) && i.push(t[r]);
                return i
            }
        }

        function m(t, e, n) {
            if (t && e)for (var i = 0, r = t.length; i < r; i++)if (e.call(n, t[i], i, t))return t[i]
        }

        function y(t, e) {
            var n = R.call(arguments, 2);
            return function () {
                return t.apply(e, n.concat(R.call(arguments)))
            }
        }

        function _(t) {
            var e = R.call(arguments, 1);
            return function () {
                return t.apply(this, e.concat(R.call(arguments)))
            }
        }

        function x(t) {
            return "[object Array]" === O.call(t)
        }

        function b(t) {
            return "function" == typeof t
        }

        function w(t) {
            return "[object String]" === O.call(t)
        }

        function M(t) {
            var e = typeof t;
            return "function" === e || !!t && "object" == e
        }

        function T(t) {
            return !!k[O.call(t)]
        }

        function S(t) {
            return "object" == typeof t && "number" == typeof t.nodeType && "object" == typeof t.ownerDocument
        }

        function A(t) {
            for (var e = 0, n = arguments.length; e < n; e++)if (null != arguments[e])return arguments[e]
        }

        function I() {
            return Function.call.apply(R, arguments)
        }

        function C(t, e) {
            if (!t)throw new Error(e)
        }

        var L, k = {
            "[object Function]": 1, "[object RegExp]": 1, "[object Date]": 1, "[object Error]": 1,
            "[object CanvasGradient]": 1, "[object CanvasPattern]": 1, "[object Image]": 1, "[object Canvas]": 1
        }, P = {
            "[object Int8Array]": 1,
            "[object Uint8Array]": 1,
            "[object Uint8ClampedArray]": 1,
            "[object Int16Array]": 1,
            "[object Uint16Array]": 1,
            "[object Int32Array]": 1,
            "[object Uint32Array]": 1,
            "[object Float32Array]": 1,
            "[object Float64Array]": 1
        }, O = Object.prototype.toString, D = Array.prototype, E = D.forEach, z = D.filter, R = D.slice, B = D.map, N = D.reduce, F = {
            inherits: u,
            mixin: c,
            clone: n,
            merge: i,
            mergeAll: r,
            extend: a,
            defaults: o,
            getContext: l,
            createCanvas: s,
            indexOf: h,
            slice: I,
            find: m,
            isArrayLike: f,
            each: d,
            map: p,
            reduce: g,
            filter: v,
            bind: y,
            curry: _,
            isArray: x,
            isString: w,
            isObject: M,
            isFunction: b,
            isBuildInObject: T,
            isDom: S,
            retrieve: A,
            assert: C,
            noop: function () {
            }
        };
        t.exports = F
    }, function (t, e, n) {
        function i(t) {
            return function (e, n, i) {
                e = e && e.toLowerCase(), R.prototype[t].call(this, e, n, i)
            }
        }

        function r() {
            R.call(this)
        }

        function a(t, e, n) {
            function i(t, e) {
                return t.prio - e.prio
            }

            n = n || {}, "string" == typeof e && (e = it[e]), this.id, this.group, this._dom = t;
            var a = this._zr = D.init(t, {
                renderer: n.renderer || "canvas",
                devicePixelRatio: n.devicePixelRatio,
                width: n.width,
                height: n.height
            });
            this._throttledZrFlush = O.throttle(E.bind(a.flush, a), 17), this._theme = E.clone(e), this._chartsViews = [], this._chartsMap = {}, this._componentsViews = [], this._componentsMap = {}, this._api = new M(this), this._coordSysMgr = new T, R.call(this), this._messageCenter = new r, this._initEvents(), this.resize = E.bind(this.resize, this), this._pendingActions = [], B(nt, i), B(tt, i), a.animation.on("frame", this._onframe, this)
        }

        function o(t, e, n) {
            var i, r = this._model, a = this._coordSysMgr.getCoordinateSystems();
            e = P.parseFinder(r, e);
            for (var o = 0; o < a.length; o++) {
                var s = a[o];
                if (s[t] && null != (i = s[t](r, e, n)))return i
            }
        }

        function s(t, e) {
            var n = this._model;
            n && n.eachComponent({mainType: "series", query: e}, function (i, r) {
                var a = this._chartsMap[i.__viewId];
                a && a.__alive && a[t](i, n, this._api, e)
            }, this)
        }

        function l(t, e) {
            var n = K[t.type], i = n.actionInfo, r = i.update || "update";
            this[U] = !0;
            var a = [t], o = !1;
            t.batch && (o = !0, a = E.map(t.batch, function (e) {
                return e = E.defaults(E.extend({}, e), t), e.batch = null, e
            }));
            for (var s, l = [], h = "highlight" === t.type || "downplay" === t.type, u = 0; u < a.length; u++) {
                var c = a[u];
                s = n.action(c, this._model), s = s || E.extend({}, c), s.type = i.event || s.type, l.push(s), h && $[r].call(this, c)
            }
            "none" === r || h || (this[X] ? ($.prepareAndUpdate.call(this, t), this[X] = !1) : $[r].call(this, t)), s = o ? {
                type: i.event || t.type,
                batch: l
            } : l[0], this[U] = !1, !e && this._messageCenter.trigger(s.type, s)
        }

        function h(t) {
            for (var e = this._pendingActions; e.length;) {
                var n = e.shift();
                l.call(this, n, t)
            }
        }

        function u(t, e, n) {
            var i = this._api;
            N(this._componentsViews, function (r) {
                var a = r.__model;
                r[t](a, e, i, n), _(a, r)
            }, this), e.eachSeries(function (r, a) {
                var o = this._chartsMap[r.__viewId];
                o[t](r, e, i, n), _(r, o), y(r, o)
            }, this), m(this._zr, e)
        }

        function c(t, e) {
            for (var n = "component" === t, i = n ? this._componentsViews : this._chartsViews, r = n ? this._componentsMap : this._chartsMap, a = this._zr, o = 0; o < i.length; o++)i[o].__alive = !1;
            e[n ? "eachComponent" : "eachSeries"](function (t, o) {
                if (n) {
                    if ("series" === t)return
                } else o = t;
                var s = o.id + "_" + o.type, l = r[s];
                if (!l) {
                    var h = A.parseClassType(o.type), u = n ? C.getClass(h.main, h.sub) : L.getClass(h.sub);
                    if (!u)return;
                    l = new u, l.init(e, this._api), r[s] = l, i.push(l), a.add(l.group)
                }
                o.__viewId = s, l.__alive = !0, l.__id = s, l.__model = o
            }, this);
            for (var o = 0; o < i.length;) {
                var s = i[o];
                s.__alive ? o++ : (a.remove(s.group), s.dispose(e, this._api), i.splice(o, 1), delete r[s.__id])
            }
        }

        function f(t, e) {
            N(tt, function (n) {
                n.func(t, e)
            })
        }

        function d(t) {
            var e = {};
            t.eachSeries(function (t) {
                var n = t.get("stack"), i = t.getData();
                if (n && "list" === i.type) {
                    var r = e[n];
                    r && (i.stackedOn = r), e[n] = i
                }
            })
        }

        function p(t, e) {
            var n = this._api;
            N(nt, function (i) {
                i.isLayout && i.func(t, n, e)
            })
        }

        function g(t, e) {
            var n = this._api;
            t.clearColorPalette(), t.eachSeries(function (t) {
                t.clearColorPalette()
            }), N(nt, function (i) {
                i.func(t, n, e)
            })
        }

        function v(t, e) {
            var n = this._api;
            N(this._componentsViews, function (i) {
                var r = i.__model;
                i.render(r, t, n, e), _(r, i)
            }, this), N(this._chartsViews, function (t) {
                t.__alive = !1
            }, this), t.eachSeries(function (i, r) {
                var a = this._chartsMap[i.__viewId];
                a.__alive = !0, a.render(i, t, n, e), a.group.silent = !!i.get("silent"), _(i, a), y(i, a)
            }, this), m(this._zr, t), N(this._chartsViews, function (e) {
                e.__alive || e.remove(t, n)
            }, this)
        }

        function m(t, e) {
            var n = t.storage, i = 0;
            n.traverse(function (t) {
                t.isGroup || i++
            }), i > e.get("hoverLayerThreshold") && !b.node && n.traverse(function (t) {
                t.isGroup || (t.useHoverLayer = !0)
            })
        }

        function y(t, e) {
            var n = 0;
            e.group.traverse(function (t) {
                "group" === t.type || t.ignore || n++
            });
            var i = +t.get("progressive"), r = n > t.get("progressiveThreshold") && i && !b.node;
            r && e.group.traverse(function (t) {
                t.isGroup || (t.progressive = r ? Math.floor(n++ / i) : -1, r && t.stopAnimation(!0))
            });
            var a = t.get("blendMode") || null;
            e.group.traverse(function (t) {
                t.isGroup || t.setStyle("blend", a)
            })
        }

        function _(t, e) {
            var n = t.get("z"), i = t.get("zlevel");
            e.group.traverse(function (t) {
                "group" !== t.type && (null != n && (t.z = n), null != i && (t.zlevel = i))
            })
        }

        function x(t) {
            function e(t, e) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i[a] = e
                }
            }

            var n = 0, i = 1, r = 2, a = "__connectUpdateStatus";
            E.each(J, function (o, s) {
                t._messageCenter.on(s, function (o) {
                    if (ot[t.group] && t[a] !== n) {
                        var s = t.makeActionFromEvent(o), l = [];
                        E.each(at, function (e) {
                            e !== t && e.group === t.group && l.push(e)
                        }), e(l, n), N(l, function (t) {
                            t[a] !== i && t.dispatchAction(s)
                        }), e(l, r)
                    }
                })
            })
        }

        var b = n(11), w = n(124), M = n(89), T = n(23), S = n(125), A = n(13), I = n(15), C = n(58), L = n(27), k = n(3), P = n(6), O = n(46), D = n(77), E = n(1), z = n(18), R = n(20), B = n(44), N = E.each, F = 1e3, G = 5e3, V = 1e3, q = 2e3, H = 3e3, W = 4e3, j = 5e3, U = "__flagInMainProcess", Z = "__hasGradientOrPatternBg", X = "__optionUpdated";
        r.prototype.on = i("on"), r.prototype.off = i("off"), r.prototype.one = i("one"), E.mixin(r, R);
        var Y = a.prototype;
        Y._onframe = function () {
            this[X] && (this[U] = !0, $.prepareAndUpdate.call(this), this[U] = !1, this[X] = !1)
        }, Y.getDom = function () {
            return this._dom
        }, Y.getZr = function () {
            return this._zr
        }, Y.setOption = function (t, e, n) {
            if (this[U] = !0, !this._model || e) {
                var i = new S(this._api), r = this._theme, a = this._model = new w(null, null, r, i);
                a.init(null, null, r, i)
            }
            this.__lastOnlyGraphic = !(!t || !t.graphic), E.each(t, function (t, e) {
                "graphic" !== e && (this.__lastOnlyGraphic = !1)
            }, this), this._model.setOption(t, et), n ? this[X] = !0 : ($.prepareAndUpdate.call(this), this._zr.flush(), this[X] = !1), this[U] = !1, h.call(this, !1)
        }, Y.setTheme = function () {
            console.log("ECharts#setTheme() is DEPRECATED in ECharts 3.0")
        }, Y.getModel = function () {
            return this._model
        }, Y.getOption = function () {
            return this._model && this._model.getOption()
        }, Y.getWidth = function () {
            return this._zr.getWidth()
        }, Y.getHeight = function () {
            return this._zr.getHeight()
        }, Y.getRenderedCanvas = function (t) {
            if (b.canvasSupported) {
                t = t || {}, t.pixelRatio = t.pixelRatio || 1, t.backgroundColor = t.backgroundColor || this._model.get("backgroundColor");
                var e = this._zr, n = e.storage.getDisplayList();
                return E.each(n, function (t) {
                    t.stopAnimation(!0)
                }), e.painter.getRenderedCanvas(t)
            }
        }, Y.getDataURL = function (t) {
            t = t || {};
            var e = t.excludeComponents, n = this._model, i = [], r = this;
            N(e, function (t) {
                n.eachComponent({mainType: t}, function (t) {
                    var e = r._componentsMap[t.__viewId];
                    e.group.ignore || (i.push(e), e.group.ignore = !0)
                })
            });
            var a = this.getRenderedCanvas(t).toDataURL("image/" + (t && t.type || "png"));
            return N(i, function (t) {
                t.group.ignore = !1
            }), a
        }, Y.getConnectedDataURL = function (t) {
            if (b.canvasSupported) {
                var e = this.group, n = Math.min, i = Math.max, r = 1 / 0;
                if (ot[e]) {
                    var a = r, o = r, s = -r, l = -r, h = [], u = t && t.pixelRatio || 1;
                    E.each(at, function (r, u) {
                        if (r.group === e) {
                            var c = r.getRenderedCanvas(E.clone(t)), f = r.getDom().getBoundingClientRect();
                            a = n(f.left, a), o = n(f.top, o), s = i(f.right, s), l = i(f.bottom, l), h.push({
                                dom: c,
                                left: f.left,
                                top: f.top
                            })
                        }
                    }), a *= u, o *= u, s *= u, l *= u;
                    var c = s - a, f = l - o, d = E.createCanvas();
                    d.width = c, d.height = f;
                    var p = D.init(d);
                    return N(h, function (t) {
                        var e = new k.Image({style: {x: t.left * u - a, y: t.top * u - o, image: t.dom}});
                        p.add(e)
                    }), p.refreshImmediately(), d.toDataURL("image/" + (t && t.type || "png"))
                }
                return this.getDataURL(t)
            }
        }, Y.convertToPixel = E.curry(o, "convertToPixel"), Y.convertFromPixel = E.curry(o, "convertFromPixel"), Y.containPixel = function (t, e) {
            var n, i = this._model;
            return t = P.parseFinder(i, t), E.each(t, function (t, i) {
                i.indexOf("Models") >= 0 && E.each(t, function (t) {
                    var r = t.coordinateSystem;
                    if (r && r.containPoint)n |= !!r.containPoint(e); else if ("seriesModels" === i) {
                        var a = this._chartsMap[t.__viewId];
                        a && a.containPoint && (n |= a.containPoint(e, t))
                    }
                }, this)
            }, this), !!n
        }, Y.getVisual = function (t, e) {
            var n = this._model;
            t = P.parseFinder(n, t, {defaultMainType: "series"});
            var i = t.seriesModel, r = i.getData(), a = t.hasOwnProperty("dataIndexInside") ? t.dataIndexInside : t.hasOwnProperty("dataIndex") ? r.indexOfRawIndex(t.dataIndex) : null;
            return null != a ? r.getItemVisual(a, e) : r.getVisual(e)
        };
        var $ = {
            update: function (t) {
                var e = this._model, n = this._api, i = this._coordSysMgr, r = this._zr;
                if (e) {
                    e.restoreData(), i.create(this._model, this._api), f.call(this, e, n), d.call(this, e), i.update(e, n), g.call(this, e, t), v.call(this, e, t);
                    var a = e.get("backgroundColor") || "transparent", o = r.painter;
                    if (o.isSingleCanvas && o.isSingleCanvas())r.configLayer(0, {clearColor: a}); else {
                        if (!b.canvasSupported) {
                            var s = z.parse(a);
                            a = z.stringify(s, "rgb"), 0 === s[3] && (a = "transparent")
                        }
                        a.colorStops || a.image ? (r.configLayer(0, {clearColor: a}), this[Z] = !0, this._dom.style.background = "transparent") : (this[Z] && r.configLayer(0, {clearColor: null}), this[Z] = !1, this._dom.style.background = a)
                    }
                }
            }, updateView: function (t) {
                var e = this._model;
                e && (e.eachSeries(function (t) {
                    t.getData().clearAllVisual()
                }), g.call(this, e, t), u.call(this, "updateView", e, t))
            }, updateVisual: function (t) {
                var e = this._model;
                e && (e.eachSeries(function (t) {
                    t.getData().clearAllVisual()
                }), g.call(this, e, t), u.call(this, "updateVisual", e, t))
            }, updateLayout: function (t) {
                var e = this._model;
                e && (p.call(this, e, t), u.call(this, "updateLayout", e, t))
            }, highlight: function (t) {
                s.call(this, "highlight", t)
            }, downplay: function (t) {
                s.call(this, "downplay", t)
            }, prepareAndUpdate: function (t) {
                var e = this._model;
                c.call(this, "component", e), c.call(this, "chart", e), this.__lastOnlyGraphic ? (N(this._componentsViews, function (n) {
                    var i = n.__model;
                    i && "graphic" === i.mainType && (n.render(i, e, this._api, t), _(i, n))
                }, this), this.__lastOnlyGraphic = !1) : $.update.call(this, t)
            }
        };
        Y.resize = function (t) {
            this[U] = !0, this._zr.resize(t);
            var e = this._model && this._model.resetOption("media");
            $[e ? "prepareAndUpdate" : "update"].call(this), this._loadingFX && this._loadingFX.resize(), this[U] = !1, h.call(this)
        }, Y.showLoading = function (t, e) {
            if (E.isObject(t) && (e = t, t = ""), t = t || "default", this.hideLoading(), rt[t]) {
                var n = rt[t](this._api, e), i = this._zr;
                this._loadingFX = n, i.add(n)
            }
        }, Y.hideLoading = function () {
            this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null
        }, Y.makeActionFromEvent = function (t) {
            var e = E.extend({}, t);
            return e.type = J[t.type], e
        }, Y.dispatchAction = function (t, e) {
            if (E.isObject(e) || (e = {silent: !!e}), K[t.type]) {
                if (this[U])return void this._pendingActions.push(t);
                l.call(this, t, e.silent), e.flush ? this._zr.flush(!0) : e.flush !== !1 && b.browser.weChat && this._throttledZrFlush(), h.call(this, e.silent)
            }
        }, Y.on = i("on"), Y.off = i("off"), Y.one = i("one");
        var Q = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu"];
        Y._initEvents = function () {
            N(Q, function (t) {
                this._zr.on(t, function (e) {
                    var n, i = this.getModel(), r = e.target;
                    if ("globalout" === t)n = {}; else if (r && null != r.dataIndex) {
                        var a = r.dataModel || i.getSeriesByIndex(r.seriesIndex);
                        n = a && a.getDataParams(r.dataIndex, r.dataType) || {}
                    } else r && r.eventData && (n = E.extend({}, r.eventData));
                    n && (n.event = e, n.type = t, this.trigger(t, n))
                }, this)
            }, this), N(J, function (t, e) {
                this._messageCenter.on(e, function (t) {
                    this.trigger(e, t)
                }, this)
            }, this)
        }, Y.isDisposed = function () {
            return this._disposed
        }, Y.clear = function () {
            this.setOption({series: []}, !0)
        }, Y.dispose = function () {
            if (!this._disposed) {
                this._disposed = !0;
                var t = this._api, e = this._model;
                N(this._componentsViews, function (n) {
                    n.dispose(e, t)
                }), N(this._chartsViews, function (n) {
                    n.dispose(e, t)
                }), this._zr.dispose(), delete at[this.id]
            }
        }, E.mixin(a, R);
        var K = [], J = {}, tt = [], et = [], nt = [], it = {}, rt = {}, at = {}, ot = {}, st = new Date - 0, lt = new Date - 0, ht = "_echarts_instance_", ut = {
            version: "3.3.2",
            dependencies: {zrender: "3.2.2"}
        };
        ut.init = function (t, e, n) {
            var i = new a(t, e, n);
            return i.id = "ec_" + st++, at[i.id] = i, t.setAttribute && t.setAttribute(ht, i.id), x(i), i
        }, ut.connect = function (t) {
            if (E.isArray(t)) {
                var e = t;
                t = null, E.each(e, function (e) {
                    null != e.group && (t = e.group)
                }), t = t || "g_" + lt++, E.each(e, function (e) {
                    e.group = t
                })
            }
            return ot[t] = !0, t
        }, ut.disConnect = function (t) {
            ot[t] = !1
        }, ut.dispose = function (t) {
            E.isDom(t) ? t = ut.getInstanceByDom(t) : "string" == typeof t && (t = at[t]), t instanceof a && !t.isDisposed() && t.dispose()
        }, ut.getInstanceByDom = function (t) {
            var e = t.getAttribute(ht);
            return at[e]
        }, ut.getInstanceById = function (t) {
            return at[t]
        }, ut.registerTheme = function (t, e) {
            it[t] = e
        }, ut.registerPreprocessor = function (t) {
            et.push(t)
        }, ut.registerProcessor = function (t, e) {
            "function" == typeof t && (e = t, t = F), tt.push({prio: t, func: e})
        }, ut.registerAction = function (t, e, n) {
            "function" == typeof e && (n = e, e = "");
            var i = E.isObject(t) ? t.type : [t, t = {event: e}][0];
            t.event = (t.event || i).toLowerCase(), e = t.event, K[i] || (K[i] = {action: n, actionInfo: t}), J[e] = i
        }, ut.registerCoordinateSystem = function (t, e) {
            T.register(t, e)
        }, ut.registerLayout = function (t, e) {
            "function" == typeof t && (e = t, t = V), nt.push({prio: t, func: e, isLayout: !0})
        }, ut.registerVisual = function (t, e) {
            "function" == typeof t && (e = t, t = H), nt.push({prio: t, func: e})
        }, ut.registerLoading = function (t, e) {
            rt[t] = e
        };
        var ct = A.parseClassType;
        ut.extendComponentModel = function (t, e) {
            var n = A;
            if (e) {
                var i = ct(e);
                n = A.getClass(i.main, i.sub, !0)
            }
            return n.extend(t)
        }, ut.extendComponentView = function (t, e) {
            var n = C;
            if (e) {
                var i = ct(e);
                n = C.getClass(i.main, i.sub, !0)
            }
            return n.extend(t)
        }, ut.extendSeriesModel = function (t, e) {
            var n = I;
            if (e) {
                e = "series." + e.replace("series.", "");
                var i = ct(e);
                n = A.getClass(i.main, i.sub, !0)
            }
            return n.extend(t)
        }, ut.extendChartView = function (t, e) {
            var n = L;
            if (e) {
                e.replace("series.", "");
                var i = ct(e);
                n = L.getClass(i.main, !0)
            }
            return n.extend(t)
        }, ut.setCanvasCreator = function (t) {
            E.createCanvas = t
        }, ut.registerVisual(q, n(138)), ut.registerPreprocessor(n(132)), ut.registerLoading("default", n(123)), ut.registerAction({
            type: "highlight",
            event: "highlight",
            update: "highlight"
        }, E.noop), ut.registerAction({
            type: "downplay",
            event: "downplay",
            update: "downplay"
        }, E.noop), ut.List = n(14), ut.Model = n(10), ut.graphic = n(3), ut.number = n(4), ut.format = n(9), ut.matrix = n(19), ut.vector = n(5), ut.color = n(18), ut.util = {}, N(["map", "each", "filter", "indexOf", "inherits", "reduce", "filter", "bind", "curry", "isArray", "isString", "isObject", "isFunction", "extend", "defaults", "clone"], function (t) {
            ut.util[t] = E[t]
        }), ut.PRIORITY = {
            PROCESSOR: {FILTER: F, STATISTIC: G},
            VISUAL: {LAYOUT: V, GLOBAL: q, CHART: H, COMPONENT: W, BRUSH: j}
        }, t.exports = ut
    }, function (t, e, n) {
        function i(t) {
            return null != t && "none" != t
        }

        function r(t) {
            return "string" == typeof t ? x.lift(t, -.1) : t
        }

        function a(t) {
            if (t.__hoverStlDirty) {
                var e = t.style.stroke, n = t.style.fill, a = t.__hoverStl;
                a.fill = a.fill || (i(n) ? r(n) : null), a.stroke = a.stroke || (i(e) ? r(e) : null);
                var o = {};
                for (var s in a)a.hasOwnProperty(s) && (o[s] = t.style[s]);
                t.__normalStl = o, t.__hoverStlDirty = !1
            }
        }

        function o(t) {
            t.__isHover || (a(t), t.useHoverLayer ? t.__zr && t.__zr.addHover(t, t.__hoverStl) : (t.setStyle(t.__hoverStl), t.z2 += 1), t.__isHover = !0)
        }

        function s(t) {
            if (t.__isHover) {
                var e = t.__normalStl;
                t.useHoverLayer ? t.__zr && t.__zr.removeHover(t) : (e && t.setStyle(e), t.z2 -= 1), t.__isHover = !1
            }
        }

        function l(t) {
            "group" === t.type ? t.traverse(function (t) {
                "group" !== t.type && o(t)
            }) : o(t)
        }

        function h(t) {
            "group" === t.type ? t.traverse(function (t) {
                "group" !== t.type && s(t)
            }) : s(t)
        }

        function u(t, e) {
            t.__hoverStl = t.hoverStyle || e || {}, t.__hoverStlDirty = !0, t.__isHover && a(t)
        }

        function c(t) {
            this.__hoverSilentOnTouch && t.zrByTouch || !this.__isEmphasis && l(this)
        }

        function f(t) {
            this.__hoverSilentOnTouch && t.zrByTouch || !this.__isEmphasis && h(this)
        }

        function d() {
            this.__isEmphasis = !0, l(this)
        }

        function p() {
            this.__isEmphasis = !1, h(this)
        }

        function g(t, e, n, i, r, a) {
            "function" == typeof r && (a = r, r = null);
            var o = i && (i.ifEnableAnimation ? i.ifEnableAnimation() : i.getShallow("animation"));
            if (o) {
                var s = t ? "Update" : "", l = i && i.getShallow("animationDuration" + s), h = i && i.getShallow("animationEasing" + s), u = i && i.getShallow("animationDelay" + s);
                "function" == typeof u && (u = u(r)), l > 0 ? e.animateTo(n, l, u || 0, h, a) : (e.attr(n), a && a())
            } else e.attr(n), a && a()
        }

        var v = n(1), m = n(168), y = Math.round, _ = n(7), x = n(18), b = n(19), w = n(5), M = {};
        M.Group = n(33), M.Image = n(49), M.Text = n(75), M.Circle = n(159), M.Sector = n(165), M.Ring = n(164), M.Polygon = n(161), M.Polyline = n(162), M.Rect = n(163), M.Line = n(160), M.BezierCurve = n(158), M.Arc = n(157), M.CompoundPath = n(152), M.LinearGradient = n(87), M.RadialGradient = n(153), M.BoundingRect = n(8), M.extendShape = function (t) {
            return _.extend(t)
        }, M.extendPath = function (t, e) {
            return m.extendFromString(t, e)
        }, M.makePath = function (t, e, n, i) {
            var r = m.createFromString(t, e), a = r.getBoundingRect();
            if (n) {
                var o = a.width / a.height;
                if ("center" === i) {
                    var s, l = n.height * o;
                    l <= n.width ? s = n.height : (l = n.width, s = l / o);
                    var h = n.x + n.width / 2, u = n.y + n.height / 2;
                    n.x = h - l / 2, n.y = u - s / 2, n.width = l, n.height = s
                }
                this.resizePath(r, n)
            }
            return r
        }, M.mergePath = m.mergePath, M.resizePath = function (t, e) {
            if (t.applyTransform) {
                var n = t.getBoundingRect(), i = n.calculateTransform(e);
                t.applyTransform(i)
            }
        }, M.subPixelOptimizeLine = function (t) {
            var e = M.subPixelOptimize, n = t.shape, i = t.style.lineWidth;
            return y(2 * n.x1) === y(2 * n.x2) && (n.x1 = n.x2 = e(n.x1, i, !0)), y(2 * n.y1) === y(2 * n.y2) && (n.y1 = n.y2 = e(n.y1, i, !0)), t
        }, M.subPixelOptimizeRect = function (t) {
            var e = M.subPixelOptimize, n = t.shape, i = t.style.lineWidth, r = n.x, a = n.y, o = n.width, s = n.height;
            return n.x = e(n.x, i, !0), n.y = e(n.y, i, !0), n.width = Math.max(e(r + o, i, !1) - n.x, 0 === o ? 0 : 1), n.height = Math.max(e(a + s, i, !1) - n.y, 0 === s ? 0 : 1), t
        }, M.subPixelOptimize = function (t, e, n) {
            var i = y(2 * t);
            return (i + y(e)) % 2 === 0 ? i / 2 : (i + (n ? 1 : -1)) / 2
        }, M.setHoverStyle = function (t, e, n) {
            t.__hoverSilentOnTouch = n && n.hoverSilentOnTouch, "group" === t.type ? t.traverse(function (t) {
                "group" !== t.type && u(t, e)
            }) : u(t, e), t.on("mouseover", c).on("mouseout", f), t.on("emphasis", d).on("normal", p)
        }, M.setText = function (t, e, n) {
            var i = e.getShallow("position") || "inside", r = i.indexOf("inside") >= 0 ? "white" : n, a = e.getModel("textStyle");
            v.extend(t, {
                textDistance: e.getShallow("distance") || 5,
                textFont: a.getFont(),
                textPosition: i,
                textFill: a.getTextColor() || r
            })
        }, M.updateProps = function (t, e, n, i, r) {
            g(!0, t, e, n, i, r)
        }, M.initProps = function (t, e, n, i, r) {
            g(!1, t, e, n, i, r)
        }, M.getTransform = function (t, e) {
            for (var n = b.identity([]); t && t !== e;)b.mul(n, t.getLocalTransform(), n), t = t.parent;
            return n
        }, M.applyTransform = function (t, e, n) {
            return n && (e = b.invert([], e)), w.applyTransform([], t, e)
        }, M.transformDirection = function (t, e, n) {
            var i = 0 === e[4] || 0 === e[5] || 0 === e[0] ? 1 : Math.abs(2 * e[4] / e[0]), r = 0 === e[4] || 0 === e[5] || 0 === e[2] ? 1 : Math.abs(2 * e[4] / e[2]), a = ["left" === t ? -i : "right" === t ? i : 0, "top" === t ? -r : "bottom" === t ? r : 0];
            return a = M.applyTransform(a, e, n), Math.abs(a[0]) > Math.abs(a[1]) ? a[0] > 0 ? "right" : "left" : a[1] > 0 ? "bottom" : "top"
        }, M.groupTransition = function (t, e, n, i) {
            function r(t) {
                var e = {};
                return t.traverse(function (t) {
                    !t.isGroup && t.anid && (e[t.anid] = t)
                }), e
            }

            function a(t) {
                var e = {position: w.clone(t.position), rotation: t.rotation};
                return t.shape && (e.shape = v.extend({}, t.shape)), e
            }

            if (t && e) {
                var o = r(t);
                e.traverse(function (t) {
                    if (!t.isGroup && t.anid) {
                        var e = o[t.anid];
                        if (e) {
                            var i = a(t);
                            t.attr(a(e)), M.updateProps(t, i, n, t.dataIndex)
                        }
                    }
                })
            }
        }, t.exports = M
    }, function (t, e) {
        function n(t) {
            return t.replace(/^\s+/, "").replace(/\s+$/, "")
        }

        var i = {}, r = 1e-4;
        i.linearMap = function (t, e, n, i) {
            var r = e[1] - e[0], a = n[1] - n[0];
            if (0 === r)return 0 === a ? n[0] : (n[0] + n[1]) / 2;
            if (i)if (r > 0) {
                if (t <= e[0])return n[0];
                if (t >= e[1])return n[1]
            } else {
                if (t >= e[0])return n[0];
                if (t <= e[1])return n[1]
            } else {
                if (t === e[0])return n[0];
                if (t === e[1])return n[1]
            }
            return (t - e[0]) / r * a + n[0]
        }, i.parsePercent = function (t, e) {
            switch (t) {
                case"center":
                case"middle":
                    t = "50%";
                    break;
                case"left":
                case"top":
                    t = "0%";
                    break;
                case"right":
                case"bottom":
                    t = "100%"
            }
            return "string" == typeof t ? n(t).match(/%$/) ? parseFloat(t) / 100 * e : parseFloat(t) : null == t ? NaN : +t
        }, i.round = function (t, e) {
            return null == e && (e = 10), e = Math.min(Math.max(0, e), 20), +(+t).toFixed(e)
        }, i.asc = function (t) {
            return t.sort(function (t, e) {
                return t - e
            }), t
        }, i.getPrecision = function (t) {
            if (t = +t, isNaN(t))return 0;
            for (var e = 1, n = 0; Math.round(t * e) / e !== t;)e *= 10, n++;
            return n
        }, i.getPrecisionSafe = function (t) {
            var e = t.toString(), n = e.indexOf(".");
            return n < 0 ? 0 : e.length - 1 - n
        }, i.getPixelPrecision = function (t, e) {
            var n = Math.log, i = Math.LN10, r = Math.floor(n(t[1] - t[0]) / i), a = Math.round(n(Math.abs(e[1] - e[0])) / i);
            return Math.max(-r + a, 0)
        }, i.MAX_SAFE_INTEGER = 9007199254740991, i.remRadian = function (t) {
            var e = 2 * Math.PI;
            return (t % e + e) % e
        }, i.isRadianAroundZero = function (t) {
            return t > -r && t < r
        }, i.parseDate = function (t) {
            if (t instanceof Date)return t;
            if ("string" == typeof t) {
                var e = new Date(t);
                return isNaN(+e) && (e = new Date(new Date(t.replace(/-/g, "/")) - new Date("1970/01/01"))), e
            }
            return new Date(Math.round(t))
        }, i.quantity = function (t) {
            return Math.pow(10, Math.floor(Math.log(t) / Math.LN10))
        }, i.nice = function (t, e) {
            var n, r = i.quantity(t), a = t / r;
            return n = e ? a < 1.5 ? 1 : a < 2.5 ? 2 : a < 4 ? 3 : a < 7 ? 5 : 10 : a < 1 ? 1 : a < 2 ? 2 : a < 3 ? 3 : a < 5 ? 5 : 10, n * r
        }, i.reformIntervals = function (t) {
            function e(t, n, i) {
                return t.interval[i] < n.interval[i] || t.interval[i] === n.interval[i] && (t.close[i] - n.close[i] === (i ? -1 : 1) || !i && e(t, n, 1))
            }

            t.sort(function (t, n) {
                return e(t, n, 0) ? -1 : 1
            });
            for (var n = -(1 / 0), i = 1, r = 0; r < t.length;) {
                for (var a = t[r].interval, o = t[r].close, s = 0; s < 2; s++)a[s] <= n && (a[s] = n, o[s] = s ? 1 : 1 - i), n = a[s], i = o[s];
                a[0] === a[1] && o[0] * o[1] !== 1 ? t.splice(r, 1) : r++
            }
            return t
        }, t.exports = i
    }, function (t, e) {
        var n = "undefined" == typeof Float32Array ? Array : Float32Array, i = {
            create: function (t, e) {
                var i = new n(2);
                return null == t && (t = 0), null == e && (e = 0), i[0] = t, i[1] = e, i
            }, copy: function (t, e) {
                return t[0] = e[0], t[1] = e[1], t
            }, clone: function (t) {
                var e = new n(2);
                return e[0] = t[0], e[1] = t[1], e
            }, set: function (t, e, n) {
                return t[0] = e, t[1] = n, t
            }, add: function (t, e, n) {
                return t[0] = e[0] + n[0], t[1] = e[1] + n[1], t
            }, scaleAndAdd: function (t, e, n, i) {
                return t[0] = e[0] + n[0] * i, t[1] = e[1] + n[1] * i, t
            }, sub: function (t, e, n) {
                return t[0] = e[0] - n[0], t[1] = e[1] - n[1], t
            }, len: function (t) {
                return Math.sqrt(this.lenSquare(t))
            }, lenSquare: function (t) {
                return t[0] * t[0] + t[1] * t[1]
            }, mul: function (t, e, n) {
                return t[0] = e[0] * n[0], t[1] = e[1] * n[1], t
            }, div: function (t, e, n) {
                return t[0] = e[0] / n[0], t[1] = e[1] / n[1], t
            }, dot: function (t, e) {
                return t[0] * e[0] + t[1] * e[1]
            }, scale: function (t, e, n) {
                return t[0] = e[0] * n, t[1] = e[1] * n, t
            }, normalize: function (t, e) {
                var n = i.len(e);
                return 0 === n ? (t[0] = 0, t[1] = 0) : (t[0] = e[0] / n, t[1] = e[1] / n), t
            }, distance: function (t, e) {
                return Math.sqrt((t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]))
            }, distanceSquare: function (t, e) {
                return (t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1])
            }, negate: function (t, e) {
                return t[0] = -e[0], t[1] = -e[1], t
            }, lerp: function (t, e, n, i) {
                return t[0] = e[0] + i * (n[0] - e[0]), t[1] = e[1] + i * (n[1] - e[1]), t
            }, applyTransform: function (t, e, n) {
                var i = e[0], r = e[1];
                return t[0] = n[0] * i + n[2] * r + n[4], t[1] = n[1] * i + n[3] * r + n[5], t
            }, min: function (t, e, n) {
                return t[0] = Math.min(e[0], n[0]), t[1] = Math.min(e[1], n[1]), t
            }, max: function (t, e, n) {
                return t[0] = Math.max(e[0], n[0]), t[1] = Math.max(e[1], n[1]), t
            }
        };
        i.length = i.len, i.lengthSquare = i.lenSquare, i.dist = i.distance, i.distSquare = i.distanceSquare, t.exports = i
    }, function (t, e, n) {
        function i(t, e) {
            return t && t.hasOwnProperty(e)
        }

        var r = n(9), a = n(4), o = n(10), s = n(1), l = s.each, h = s.isObject, u = {};
        u.normalizeToArray = function (t) {
            return t instanceof Array ? t : null == t ? [] : [t]
        }, u.defaultEmphasis = function (t, e) {
            if (t) {
                var n = t.emphasis = t.emphasis || {}, i = t.normal = t.normal || {};
                l(e, function (t) {
                    var e = s.retrieve(n[t], i[t]);
                    null != e && (n[t] = e)
                })
            }
        }, u.LABEL_OPTIONS = ["position", "show", "textStyle", "distance", "formatter"], u.getDataItemValue = function (t) {
            return t && (null == t.value ? t : t.value)
        }, u.isDataItemOption = function (t) {
            return h(t) && !(t instanceof Array)
        }, u.converDataValue = function (t, e) {
            var n = e && e.type;
            return "ordinal" === n ? t : ("time" !== n || isFinite(t) || null == t || "-" === t || (t = +a.parseDate(t)), null == t || "" === t ? NaN : +t)
        }, u.createDataFormatModel = function (t, e) {
            var n = new o;
            return s.mixin(n, u.dataFormatMixin), n.seriesIndex = e.seriesIndex, n.name = e.name || "", n.mainType = e.mainType, n.subType = e.subType, n.getData = function () {
                return t
            }, n
        }, u.dataFormatMixin = {
            getDataParams: function (t, e) {
                var n = this.getData(e), i = this.seriesIndex, r = this.name, a = this.getRawValue(t, e), o = n.getRawIndex(t), s = n.getName(t, !0), l = n.getRawDataItem(t);
                return {
                    componentType: this.mainType,
                    componentSubType: this.subType,
                    seriesType: "series" === this.mainType ? this.subType : null,
                    seriesIndex: i,
                    seriesName: r,
                    name: s,
                    dataIndex: o,
                    data: l,
                    dataType: e,
                    value: a,
                    color: n.getItemVisual(t, "color"),
                    $vars: ["seriesName", "name", "value"]
                }
            }, getFormattedLabel: function (t, e, n, i) {
                e = e || "normal";
                var a = this.getData(n), o = a.getItemModel(t), s = this.getDataParams(t, n);
                null != i && s.value instanceof Array && (s.value = s.value[i]);
                var l = o.get(["label", e, "formatter"]);
                return "function" == typeof l ? (s.status = e, l(s)) : "string" == typeof l ? r.formatTpl(l, s) : void 0
            }, getRawValue: function (t, e) {
                var n = this.getData(e), i = n.getRawDataItem(t);
                if (null != i)return !h(i) || i instanceof Array ? i : i.value
            }, formatTooltip: s.noop
        }, u.mappingToExists = function (t, e) {
            e = (e || []).slice();
            var n = s.map(t || [], function (t, e) {
                return {exist: t}
            });
            return l(e, function (t, i) {
                if (h(t)) {
                    for (var r = 0; r < n.length; r++)if (!n[r].option && null != t.id && n[r].exist.id === t.id + "")return n[r].option = t, void(e[i] = null);
                    for (var r = 0; r < n.length; r++) {
                        var a = n[r].exist;
                        if (!(n[r].option || null != a.id && null != t.id || null == t.name || u.isIdInner(t) || u.isIdInner(a) || a.name !== t.name + ""))return n[r].option = t, void(e[i] = null)
                    }
                }
            }), l(e, function (t, e) {
                if (h(t)) {
                    for (var i = 0; i < n.length; i++) {
                        var r = n[i].exist;
                        if (!n[i].option && !u.isIdInner(r) && null == t.id) {
                            n[i].option = t;
                            break
                        }
                    }
                    i >= n.length && n.push({option: t})
                }
            }), n
        }, u.makeIdAndName = function (t) {
            var e = {};
            l(t, function (t, n) {
                var i = t.exist;
                i && (e[i.id] = t)
            }), l(t, function (t, n) {
                var i = t.option;
                s.assert(!i || null == i.id || !e[i.id] || e[i.id] === t, "id duplicates: " + (i && i.id)), i && null != i.id && (e[i.id] = t), !t.keyInfo && (t.keyInfo = {})
            }), l(t, function (t, n) {
                var i = t.exist, r = t.option, a = t.keyInfo;
                if (h(r)) {
                    if (a.name = null != r.name ? r.name + "" : i ? i.name : "\x00-", i)a.id = i.id; else if (null != r.id)a.id = r.id + ""; else {
                        var o = 0;
                        do a.id = "\x00" + a.name + "\x00" + o++; while (e[a.id])
                    }
                    e[a.id] = t
                }
            })
        }, u.isIdInner = function (t) {
            return h(t) && t.id && 0 === (t.id + "").indexOf("\x00_ec_\x00")
        }, u.compressBatches = function (t, e) {
            function n(t, e, n) {
                for (var i = 0, r = t.length; i < r; i++)for (var a = t[i].seriesId, o = u.normalizeToArray(t[i].dataIndex), s = n && n[a], l = 0, h = o.length; l < h; l++) {
                    var c = o[l];
                    s && s[c] ? s[c] = null : (e[a] || (e[a] = {}))[c] = 1
                }
            }

            function i(t, e) {
                var n = [];
                for (var r in t)if (t.hasOwnProperty(r) && null != t[r])if (e)n.push(+r); else {
                    var a = i(t[r], !0);
                    a.length && n.push({seriesId: r, dataIndex: a})
                }
                return n
            }

            var r = {}, a = {};
            return n(t || [], r), n(e || [], a, r), [i(r), i(a)]
        }, u.queryDataIndex = function (t, e) {
            return null != e.dataIndexInside ? e.dataIndexInside : null != e.dataIndex ? s.isArray(e.dataIndex) ? s.map(e.dataIndex, function (e) {
                return t.indexOfRawIndex(e)
            }) : t.indexOfRawIndex(e.dataIndex) : null != e.name ? s.isArray(e.name) ? s.map(e.name, function (e) {
                return t.indexOfName(e)
            }) : t.indexOfName(e.name) : void 0
        }, u.parseFinder = function (t, e, n) {
            if (s.isString(e)) {
                var r = {};
                r[e + "Index"] = 0, e = r
            }
            var a = n && n.defaultMainType;
            !a || i(e, a + "Index") || i(e, a + "Id") || i(e, a + "Name") || (e[a + "Index"] = 0);
            var o = {};
            return l(e, function (n, i) {
                var n = e[i];
                if ("dataIndex" === i || "dataIndexInside" === i)return void(o[i] = n);
                var r = i.match(/^(\w+)(Index|Id|Name)$/) || [], a = r[1], s = r[2];
                if (a && s) {
                    var l = {mainType: a};
                    l[s.toLowerCase()] = n;
                    var h = t.queryComponents(l);
                    o[a + "Models"] = h, o[a + "Model"] = h[0]
                }
            }), o
        }, t.exports = u
    }, function (t, e, n) {
        function i(t) {
            r.call(this, t), this.path = new o
        }

        var r = n(36), a = n(1), o = n(28), s = n(148), l = n(64), h = l.prototype.getCanvasPattern, u = Math.abs;
        i.prototype = {
            constructor: i,
            type: "path",
            __dirtyPath: !0,
            strokeContainThreshold: 5,
            brush: function (t, e) {
                var n = this.style, i = this.path, r = n.hasStroke(), a = n.hasFill(), o = n.fill, s = n.stroke, l = a && !!o.colorStops, u = r && !!s.colorStops, c = a && !!o.image, f = r && !!s.image;
                if (n.bind(t, this, e), this.setTransform(t), this.__dirty) {
                    var d = this.getBoundingRect();
                    l && (this._fillGradient = n.getGradient(t, o, d)), u && (this._strokeGradient = n.getGradient(t, s, d))
                }
                l ? t.fillStyle = this._fillGradient : c && (t.fillStyle = h.call(o, t)), u ? t.strokeStyle = this._strokeGradient : f && (t.strokeStyle = h.call(s, t));
                var p = n.lineDash, g = n.lineDashOffset, v = !!t.setLineDash, m = this.getGlobalScale();
                i.setScale(m[0], m[1]), this.__dirtyPath || p && !v && r ? (i = this.path.beginPath(t), p && !v && (i.setLineDash(p), i.setLineDashOffset(g)), this.buildPath(i, this.shape, !1), this.__dirtyPath = !1) : (t.beginPath(), this.path.rebuildPath(t)), a && i.fill(t), p && v && (t.setLineDash(p), t.lineDashOffset = g), r && i.stroke(t), p && v && t.setLineDash([]), this.restoreTransform(t), null != n.text && this.drawRectText(t, this.getBoundingRect())
            },
            buildPath: function (t, e, n) {
            },
            getBoundingRect: function () {
                var t = this._rect, e = this.style, n = !t;
                if (n) {
                    var i = this.path;
                    this.__dirtyPath && (i.beginPath(), this.buildPath(i, this.shape, !1)), t = i.getBoundingRect()
                }
                if (this._rect = t, e.hasStroke()) {
                    var r = this._rectWithStroke || (this._rectWithStroke = t.clone());
                    if (this.__dirty || n) {
                        r.copy(t);
                        var a = e.lineWidth, o = e.strokeNoScale ? this.getLineScale() : 1;
                        e.hasFill() || (a = Math.max(a, this.strokeContainThreshold || 4)), o > 1e-10 && (r.width += a / o, r.height += a / o, r.x -= a / o / 2, r.y -= a / o / 2)
                    }
                    return r
                }
                return t
            },
            contain: function (t, e) {
                var n = this.transformCoordToLocal(t, e), i = this.getBoundingRect(), r = this.style;
                if (t = n[0], e = n[1], i.contain(t, e)) {
                    var a = this.path.data;
                    if (r.hasStroke()) {
                        var o = r.lineWidth, l = r.strokeNoScale ? this.getLineScale() : 1;
                        if (l > 1e-10 && (r.hasFill() || (o = Math.max(o, this.strokeContainThreshold)), s.containStroke(a, o / l, t, e)))return !0
                    }
                    if (r.hasFill())return s.contain(a, t, e)
                }
                return !1
            },
            dirty: function (t) {
                null == t && (t = !0), t && (this.__dirtyPath = t, this._rect = null), this.__dirty = !0, this.__zr && this.__zr.refresh(), this.__clipTarget && this.__clipTarget.dirty()
            },
            animateShape: function (t) {
                return this.animate("shape", t)
            },
            attrKV: function (t, e) {
                "shape" === t ? (this.setShape(e), this.__dirtyPath = !0, this._rect = null) : r.prototype.attrKV.call(this, t, e)
            },
            setShape: function (t, e) {
                var n = this.shape;
                if (n) {
                    if (a.isObject(t))for (var i in t)t.hasOwnProperty(i) && (n[i] = t[i]); else n[t] = e;
                    this.dirty(!0)
                }
                return this
            },
            getLineScale: function () {
                var t = this.transform;
                return t && u(t[0] - 1) > 1e-10 && u(t[3] - 1) > 1e-10 ? Math.sqrt(u(t[0] * t[3] - t[2] * t[1])) : 1
            }
        }, i.extend = function (t) {
            var e = function (e) {
                i.call(this, e), t.style && this.style.extendFrom(t.style, !1);
                var n = t.shape;
                if (n) {
                    this.shape = this.shape || {};
                    var r = this.shape;
                    for (var a in n)!r.hasOwnProperty(a) && n.hasOwnProperty(a) && (r[a] = n[a])
                }
                t.init && t.init.call(this, e)
            };
            a.inherits(e, i);
            for (var n in t)"style" !== n && "shape" !== n && (e.prototype[n] = t[n]);
            return e
        }, a.inherits(i, r), t.exports = i
    }, function (t, e, n) {
        function i(t, e, n, i) {
            n < 0 && (t += n, n = -n), i < 0 && (e += i, i = -i), this.x = t, this.y = e, this.width = n, this.height = i
        }

        var r = n(5), a = n(19), o = r.applyTransform, s = Math.min, l = Math.max;
        i.prototype = {
            constructor: i, union: function (t) {
                var e = s(t.x, this.x), n = s(t.y, this.y);
                this.width = l(t.x + t.width, this.x + this.width) - e, this.height = l(t.y + t.height, this.y + this.height) - n, this.x = e, this.y = n
            }, applyTransform: function () {
                var t = [], e = [], n = [], i = [];
                return function (r) {
                    if (r) {
                        t[0] = n[0] = this.x, t[1] = i[1] = this.y, e[0] = i[0] = this.x + this.width, e[1] = n[1] = this.y + this.height, o(t, t, r), o(e, e, r), o(n, n, r), o(i, i, r), this.x = s(t[0], e[0], n[0], i[0]), this.y = s(t[1], e[1], n[1], i[1]);
                        var a = l(t[0], e[0], n[0], i[0]), h = l(t[1], e[1], n[1], i[1]);
                        this.width = a - this.x, this.height = h - this.y
                    }
                }
            }(), calculateTransform: function (t) {
                var e = this, n = t.width / e.width, i = t.height / e.height, r = a.create();
                return a.translate(r, r, [-e.x, -e.y]), a.scale(r, r, [n, i]), a.translate(r, r, [t.x, t.y]), r
            }, intersect: function (t) {
                if (!t)return !1;
                t instanceof i || (t = i.create(t));
                var e = this, n = e.x, r = e.x + e.width, a = e.y, o = e.y + e.height, s = t.x, l = t.x + t.width, h = t.y, u = t.y + t.height;
                return !(r < s || l < n || o < h || u < a)
            }, contain: function (t, e) {
                var n = this;
                return t >= n.x && t <= n.x + n.width && e >= n.y && e <= n.y + n.height
            }, clone: function () {
                return new i(this.x, this.y, this.width, this.height)
            }, copy: function (t) {
                this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height
            }, plain: function () {
                return {x: this.x, y: this.y, width: this.width, height: this.height}
            }
        }, i.create = function (t) {
            return new i(t.x, t.y, t.width, t.height)
        }, t.exports = i
    }, function (t, e, n) {
        var i = n(1), r = n(4), a = n(16), o = {};
        o.addCommas = function (t) {
            return isNaN(t) ? "-" : (t = (t + "").split("."), t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : ""))
        }, o.toCamelCase = function (t, e) {
            return t = (t || "").toLowerCase().replace(/-(.)/g, function (t, e) {
                return e.toUpperCase()
            }), e && t && (t = t.charAt(0).toUpperCase() + t.slice(1)), t
        }, o.normalizeCssArray = function (t) {
            var e = t.length;
            return "number" == typeof t ? [t, t, t, t] : 2 === e ? [t[0], t[1], t[0], t[1]] : 3 === e ? [t[0], t[1], t[2], t[1]] : t
        }, o.encodeHTML = function (t) {
            return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
        };
        var s = ["a", "b", "c", "d", "e", "f", "g"], l = function (t, e) {
            return "{" + t + (null == e ? "" : e) + "}"
        };
        o.formatTpl = function (t, e) {
            i.isArray(e) || (e = [e]);
            var n = e.length;
            if (!n)return "";
            for (var r = e[0].$vars || [], a = 0; a < r.length; a++) {
                var o = s[a];
                t = t.replace(l(o), l(o, 0))
            }
            for (var h = 0; h < n; h++)for (var u = 0; u < r.length; u++)t = t.replace(l(s[u], h), e[h][r[u]]);
            return t
        };
        var h = function (t) {
            return t < 10 ? "0" + t : t
        };
        o.formatTime = function (t, e) {
            "week" !== t && "month" !== t && "quarter" !== t && "half-year" !== t && "year" !== t || (t = "MM-dd\nyyyy");
            var n = r.parseDate(e), i = n.getFullYear(), a = n.getMonth() + 1, o = n.getDate(), s = n.getHours(), l = n.getMinutes(), u = n.getSeconds();
            return t = t.replace("MM", h(a)).toLowerCase().replace("yyyy", i).replace("yy", i % 100).replace("dd", h(o)).replace("d", o).replace("hh", h(s)).replace("h", s).replace("mm", h(l)).replace("m", l).replace("ss", h(u)).replace("s", u)
        }, o.capitalFirst = function (t) {
            return t ? t.charAt(0).toUpperCase() + t.substr(1) : t
        }, o.truncateText = a.truncateText, t.exports = o
    }, function (t, e, n) {
        function i(t, e, n) {
            this.parentModel = e, this.ecModel = n, this.option = t
        }

        var r = n(1), a = n(21);
        i.prototype = {
            constructor: i, init: null, mergeOption: function (t) {
                r.merge(this.option, t, !0)
            }, get: function (t, e) {
                if (!t)return this.option;
                "string" == typeof t && (t = t.split("."));
                for (var n = this.option, i = this.parentModel, r = 0; r < t.length && (!t[r] || (n = n && "object" == typeof n ? n[t[r]] : null, null != n)); r++);
                return null == n && i && !e && (n = i.get(t)), n
            }, getShallow: function (t, e) {
                var n = this.option, i = null == n ? n : n[t], r = this.parentModel;
                return null == i && r && !e && (i = r.getShallow(t)), i
            }, getModel: function (t, e) {
                var n = this.get(t, !0), r = this.parentModel, a = new i(n, e || r && r.getModel(t), this.ecModel);
                return a
            }, isEmpty: function () {
                return null == this.option
            }, restoreData: function () {
            }, clone: function () {
                var t = this.constructor;
                return new t(r.clone(this.option))
            }, setReadOnly: function (t) {
                a.setReadOnly(this, t)
            }
        }, a.enableClassExtend(i);
        var o = r.mixin;
        o(i, n(130)), o(i, n(127)), o(i, n(131)), o(i, n(129)), t.exports = i
    }, function (t, e) {
        function n(t) {
            var e = {}, n = {}, i = t.match(/Firefox\/([\d.]+)/), r = t.match(/MSIE\s([\d.]+)/) || t.match(/Trident\/.+?rv:(([\d.]+))/), a = t.match(/Edge\/([\d.]+)/), o = /micromessenger/i.test(t);
            return i && (n.firefox = !0, n.version = i[1]), r && (n.ie = !0, n.version = r[1]), a && (n.edge = !0, n.version = a[1]), o && (n.weChat = !0), {
                browser: n,
                os: e,
                node: !1,
                canvasSupported: !!document.createElement("canvas").getContext,
                touchEventsSupported: "ontouchstart" in window && !n.ie && !n.edge,
                pointerEventsSupported: "onpointerdown" in window && (n.edge || n.ie && n.version >= 10)
            }
        }

        var i = {};
        i = "undefined" == typeof navigator ? {
            browser: {},
            os: {},
            node: !0,
            canvasSupported: !0
        } : n(navigator.userAgent), t.exports = i
    }, function (t, e, n) {
        function i(t, e, n, i, r) {
            var a = 0, o = 0;
            null == i && (i = 1 / 0), null == r && (r = 1 / 0);
            var s = 0;
            e.eachChild(function (l, h) {
                var u, c, f = l.position, d = l.getBoundingRect(), p = e.childAt(h + 1), g = p && p.getBoundingRect();
                if ("horizontal" === t) {
                    var v = d.width + (g ? -g.x + d.x : 0);
                    u = a + v, u > i || l.newline ? (a = 0, u = v, o += s + n, s = d.height) : s = Math.max(s, d.height)
                } else {
                    var m = d.height + (g ? -g.y + d.y : 0);
                    c = o + m, c > r || l.newline ? (a += s + n, o = 0, c = m, s = d.width) : s = Math.max(s, d.width)
                }
                l.newline || (f[0] = a, f[1] = o, "horizontal" === t ? a = u + n : o = c + n)
            })
        }

        var r = n(1), a = n(8), o = n(4), s = n(9), l = o.parsePercent, h = r.each, u = {}, c = u.LOCATION_PARAMS = ["left", "right", "top", "bottom", "width", "height"];
        u.box = i, u.vbox = r.curry(i, "vertical"), u.hbox = r.curry(i, "horizontal"), u.getAvailableSize = function (t, e, n) {
            var i = e.width, r = e.height, a = l(t.x, i), o = l(t.y, r), h = l(t.x2, i), u = l(t.y2, r);
            return (isNaN(a) || isNaN(parseFloat(t.x))) && (a = 0), (isNaN(h) || isNaN(parseFloat(t.x2))) && (h = i), (isNaN(o) || isNaN(parseFloat(t.y))) && (o = 0), (isNaN(u) || isNaN(parseFloat(t.y2))) && (u = r), n = s.normalizeCssArray(n || 0), {
                width: Math.max(h - a - n[1] - n[3], 0),
                height: Math.max(u - o - n[0] - n[2], 0)
            }
        }, u.getLayoutRect = function (t, e, n) {
            n = s.normalizeCssArray(n || 0);
            var i = e.width, r = e.height, o = l(t.left, i), h = l(t.top, r), u = l(t.right, i), c = l(t.bottom, r), f = l(t.width, i), d = l(t.height, r), p = n[2] + n[0], g = n[1] + n[3], v = t.aspect;
            switch (isNaN(f) && (f = i - u - g - o), isNaN(d) && (d = r - c - p - h), isNaN(f) && isNaN(d) && (v > i / r ? f = .8 * i : d = .8 * r), null != v && (isNaN(f) && (f = v * d), isNaN(d) && (d = f / v)), isNaN(o) && (o = i - u - f - g), isNaN(h) && (h = r - c - d - p), t.left || t.right) {
                case"center":
                    o = i / 2 - f / 2 - n[3];
                    break;
                case"right":
                    o = i - f - g
            }
            switch (t.top || t.bottom) {
                case"middle":
                case"center":
                    h = r / 2 - d / 2 - n[0];
                    break;
                case"bottom":
                    h = r - d - p
            }
            o = o || 0, h = h || 0, isNaN(f) && (f = i - o - (u || 0)), isNaN(d) && (d = r - h - (c || 0));
            var m = new a(o + n[3], h + n[0], f, d);
            return m.margin = n, m
        }, u.positionElement = function (t, e, n, i, o) {
            var s = !o || !o.hv || o.hv[0], l = !o || !o.hv || o.hv[1], h = o && o.boundingMode || "all";
            if (s || l) {
                var c;
                if ("raw" === h)c = "group" === t.type ? new a(0, 0, +e.width || 0, +e.height || 0) : t.getBoundingRect(); else if (c = t.getBoundingRect(), t.needLocalTransform()) {
                    var f = t.getLocalTransform();
                    c = c.clone(), c.applyTransform(f)
                }
                e = u.getLayoutRect(r.defaults({width: c.width, height: c.height}, e), n, i);
                var d = t.position, p = s ? e.x - c.x : 0, g = l ? e.y - c.y : 0;
                t.attr("position", "raw" === h ? [p, g] : [d[0] + p, d[1] + g])
            }
        }, u.mergeLayoutParam = function (t, e, n) {
            function i(i) {
                var r = {}, s = 0, l = {}, u = 0, c = n.ignoreSize ? 1 : 2;
                if (h(i, function (e) {
                        l[e] = t[e]
                    }), h(i, function (t) {
                        a(e, t) && (r[t] = l[t] = e[t]), o(r, t) && s++, o(l, t) && u++
                    }), u !== c && s) {
                    if (s >= c)return r;
                    for (var f = 0; f < i.length; f++) {
                        var d = i[f];
                        if (!a(r, d) && a(t, d)) {
                            r[d] = t[d];
                            break
                        }
                    }
                    return r
                }
                return l
            }

            function a(t, e) {
                return t.hasOwnProperty(e)
            }

            function o(t, e) {
                return null != t[e] && "auto" !== t[e]
            }

            function s(t, e, n) {
                h(t, function (t) {
                    e[t] = n[t]
                })
            }

            !r.isObject(n) && (n = {});
            var l = ["width", "left", "right"], u = ["height", "top", "bottom"], c = i(l), f = i(u);
            s(l, t, c), s(u, t, f)
        }, u.getLayoutParams = function (t) {
            return u.copyLayoutParams({}, t)
        }, u.copyLayoutParams = function (t, e) {
            return e && t && h(c, function (n) {
                e.hasOwnProperty(n) && (t[n] = e[n])
            }), t
        }, t.exports = u
    }, function (t, e, n) {
        function i(t) {
            var e = [];
            return a.each(u.getClassesByMainType(t), function (t) {
                o.apply(e, t.prototype.dependencies || [])
            }), a.map(e, function (t) {
                return l.parseClassType(t).main
            })
        }

        var r = n(10), a = n(1), o = Array.prototype.push, s = n(43), l = n(21), h = n(12), u = r.extend({
            type: "component",
            id: "",
            name: "",
            mainType: "",
            subType: "",
            componentIndex: 0,
            defaultOption: null,
            ecModel: null,
            dependentModels: [],
            uid: null,
            layoutMode: null,
            $constructor: function (t, e, n, i) {
                r.call(this, t, e, n, i), this.uid = s.getUID("componentModel")
            },
            init: function (t, e, n, i) {
                this.mergeDefaultAndTheme(t, n)
            },
            mergeDefaultAndTheme: function (t, e) {
                var n = this.layoutMode, i = n ? h.getLayoutParams(t) : {}, r = e.getTheme();
                a.merge(t, r.get(this.mainType)), a.merge(t, this.getDefaultOption()), n && h.mergeLayoutParam(t, i, n)
            },
            mergeOption: function (t, e) {
                a.merge(this.option, t, !0);
                var n = this.layoutMode;
                n && h.mergeLayoutParam(this.option, t, n)
            },
            optionUpdated: function (t, e) {
            },
            getDefaultOption: function () {
                if (!this.hasOwnProperty("__defaultOption")) {
                    for (var t = [], e = this.constructor; e;) {
                        var n = e.prototype.defaultOption;
                        n && t.push(n), e = e.superClass
                    }
                    for (var i = {}, r = t.length - 1; r >= 0; r--)i = a.merge(i, t[r], !0);
                    this.__defaultOption = i
                }
                return this.__defaultOption
            },
            getReferringComponents: function (t) {
                return this.ecModel.queryComponents({
                    mainType: t,
                    index: this.get(t + "Index", !0),
                    id: this.get(t + "Id", !0)
                })
            }
        });
        l.enableClassManagement(u, {registerWhenExtend: !0}), s.enableSubTypeDefaulter(u), s.enableTopologicalTravel(u, i), a.mixin(u, n(128)), t.exports = u
    }, function (t, e, n) {
        (function (e) {
            function i(t) {
                return f.isArray(t) || (t = [t]), t
            }

            function r(t, e) {
                var n = t.dimensions, i = new m(f.map(n, t.getDimensionInfo, t), t.hostModel);
                v(i, t);
                for (var r = i._storage = {}, a = t._storage, o = 0; o < n.length; o++) {
                    var s = n[o], l = a[s];
                    f.indexOf(e, s) >= 0 ? r[s] = new l.constructor(a[s].length) : r[s] = a[s]
                }
                return i
            }

            var a = "undefined", o = "undefined" == typeof window ? e : window, s = typeof o.Float64Array === a ? Array : o.Float64Array, l = typeof o.Int32Array === a ? Array : o.Int32Array, h = {
                "float": s,
                "int": l,
                ordinal: Array,
                number: Array,
                time: Array
            }, u = n(10), c = n(45), f = n(1), d = n(6), p = f.isObject, g = ["stackedOn", "hasItemOption", "_nameList", "_idList", "_rawData"], v = function (t, e) {
                f.each(g.concat(e.__wrappedMethods || []), function (n) {
                    e.hasOwnProperty(n) && (t[n] = e[n])
                }), t.__wrappedMethods = e.__wrappedMethods
            }, m = function (t, e) {
                t = t || ["x", "y"];
                for (var n = {}, i = [], r = 0; r < t.length; r++) {
                    var a, o = {};
                    "string" == typeof t[r] ? (a = t[r], o = {
                        name: a,
                        stackable: !1,
                        type: "number"
                    }) : (o = t[r], a = o.name, o.type = o.type || "number"), i.push(a), n[a] = o
                }
                this.dimensions = i, this._dimensionInfos = n, this.hostModel = e, this.dataType, this.indices = [], this._storage = {}, this._nameList = [], this._idList = [], this._optionModels = [], this.stackedOn = null, this._visual = {}, this._layout = {}, this._itemVisuals = [], this._itemLayouts = [], this._graphicEls = [], this._rawData, this._extent
            }, y = m.prototype;
            y.type = "list", y.hasItemOption = !0, y.getDimension = function (t) {
                return isNaN(t) || (t = this.dimensions[t] || t), t
            }, y.getDimensionInfo = function (t) {
                return f.clone(this._dimensionInfos[this.getDimension(t)])
            }, y.initData = function (t, e, n) {
                t = t || [], this._rawData = t;
                var i = this._storage = {}, r = this.indices = [], a = this.dimensions, o = t.length, s = this._dimensionInfos, l = [], u = {};
                e = e || [];
                for (var c = 0; c < a.length; c++) {
                    var f = s[a[c]], p = h[f.type];
                    i[a[c]] = new p(o)
                }
                var g = this;
                n || (g.hasItemOption = !1), n = n || function (t, e, n, i) {
                        var r = d.getDataItemValue(t);
                        return d.isDataItemOption(t) && (g.hasItemOption = !0), d.converDataValue(r instanceof Array ? r[i] : r, s[e])
                    };
                for (var v = 0; v < t.length; v++) {
                    for (var m = t[v], y = 0; y < a.length; y++) {
                        var _ = a[y], x = i[_];
                        x[v] = n(m, _, v, y)
                    }
                    r.push(v)
                }
                for (var c = 0; c < t.length; c++) {
                    e[c] || t[c] && null != t[c].name && (e[c] = t[c].name);
                    var b = e[c] || "", w = t[c] && t[c].id;
                    !w && b && (u[b] = u[b] || 0, w = b, u[b] > 0 && (w += "__ec__" + u[b]), u[b]++), w && (l[c] = w)
                }
                this._nameList = e, this._idList = l
            }, y.count = function () {
                return this.indices.length
            }, y.get = function (t, e, n) {
                var i = this._storage, r = this.indices[e];
                if (null == r)return NaN;
                var a = i[t] && i[t][r];
                if (n) {
                    var o = this._dimensionInfos[t];
                    if (o && o.stackable)for (var s = this.stackedOn; s;) {
                        var l = s.get(t, e);
                        (a >= 0 && l > 0 || a <= 0 && l < 0) && (a += l), s = s.stackedOn
                    }
                }
                return a
            }, y.getValues = function (t, e, n) {
                var i = [];
                f.isArray(t) || (n = e, e = t, t = this.dimensions);
                for (var r = 0, a = t.length; r < a; r++)i.push(this.get(t[r], e, n));
                return i
            }, y.hasValue = function (t) {
                for (var e = this.dimensions, n = this._dimensionInfos, i = 0, r = e.length; i < r; i++)if ("ordinal" !== n[e[i]].type && isNaN(this.get(e[i], t)))return !1;
                return !0
            }, y.getDataExtent = function (t, e) {
                t = this.getDimension(t);
                var n = this._storage[t], i = this.getDimensionInfo(t);
                e = i && i.stackable && e;
                var r, a = (this._extent || (this._extent = {}))[t + !!e];
                if (a)return a;
                if (n) {
                    for (var o = 1 / 0, s = -(1 / 0), l = 0, h = this.count(); l < h; l++)r = this.get(t, l, e), r < o && (o = r), r > s && (s = r);
                    return this._extent[t + !!e] = [o, s]
                }
                return [1 / 0, -(1 / 0)]
            }, y.getSum = function (t, e) {
                var n = this._storage[t], i = 0;
                if (n)for (var r = 0, a = this.count(); r < a; r++) {
                    var o = this.get(t, r, e);
                    isNaN(o) || (i += o)
                }
                return i
            }, y.indexOf = function (t, e) {
                var n = this._storage, i = n[t], r = this.indices;
                if (i)for (var a = 0, o = r.length; a < o; a++) {
                    var s = r[a];
                    if (i[s] === e)return a
                }
                return -1
            }, y.indexOfName = function (t) {
                for (var e = this.indices, n = this._nameList, i = 0, r = e.length; i < r; i++) {
                    var a = e[i];
                    if (n[a] === t)return i
                }
                return -1
            }, y.indexOfRawIndex = function (t) {
                var e = this.indices, n = e[t];
                if (null != n && n === t)return t;
                for (var i = 0, r = e.length - 1; i <= r;) {
                    var a = (i + r) / 2 | 0;
                    if (e[a] < t)i = a + 1; else {
                        if (!(e[a] > t))return a;
                        r = a - 1
                    }
                }
                return -1
            }, y.indexOfNearest = function (t, e, n, i) {
                var r = this._storage, a = r[t];
                null == i && (i = 1 / 0);
                var o = -1;
                if (a)for (var s = Number.MAX_VALUE, l = 0, h = this.count(); l < h; l++) {
                    var u = e - this.get(t, l, n), c = Math.abs(u);
                    u <= i && (c < s || c === s && u > 0) && (s = c, o = l)
                }
                return o
            }, y.getRawIndex = function (t) {
                var e = this.indices[t];
                return null == e ? -1 : e
            }, y.getRawDataItem = function (t) {
                return this._rawData[this.getRawIndex(t)]
            }, y.getName = function (t) {
                return this._nameList[this.indices[t]] || ""
            }, y.getId = function (t) {
                return this._idList[this.indices[t]] || this.getRawIndex(t) + ""
            }, y.each = function (t, e, n, r) {
                "function" == typeof t && (r = n, n = e, e = t, t = []), t = f.map(i(t), this.getDimension, this);
                var a = [], o = t.length, s = this.indices;
                r = r || this;
                for (var l = 0; l < s.length; l++)switch (o) {
                    case 0:
                        e.call(r, l);
                        break;
                    case 1:
                        e.call(r, this.get(t[0], l, n), l);
                        break;
                    case 2:
                        e.call(r, this.get(t[0], l, n), this.get(t[1], l, n), l);
                        break;
                    default:
                        for (var h = 0; h < o; h++)a[h] = this.get(t[h], l, n);
                        a[h] = l, e.apply(r, a)
                }
            }, y.filterSelf = function (t, e, n, r) {
                "function" == typeof t && (r = n, n = e, e = t, t = []), t = f.map(i(t), this.getDimension, this);
                var a = [], o = [], s = t.length, l = this.indices;
                r = r || this;
                for (var h = 0; h < l.length; h++) {
                    var u;
                    if (1 === s)u = e.call(r, this.get(t[0], h, n), h); else {
                        for (var c = 0; c < s; c++)o[c] = this.get(t[c], h, n);
                        o[c] = h, u = e.apply(r, o)
                    }
                    u && a.push(l[h])
                }
                return this.indices = a, this._extent = {}, this
            }, y.mapArray = function (t, e, n, i) {
                "function" == typeof t && (i = n, n = e, e = t, t = []);
                var r = [];
                return this.each(t, function () {
                    r.push(e && e.apply(this, arguments))
                }, n, i), r
            }, y.map = function (t, e, n, a) {
                t = f.map(i(t), this.getDimension, this);
                var o = r(this, t), s = o.indices = this.indices, l = o._storage, h = [];
                return this.each(t, function () {
                    var n = arguments[arguments.length - 1], i = e && e.apply(this, arguments);
                    if (null != i) {
                        "number" == typeof i && (h[0] = i, i = h);
                        for (var r = 0; r < i.length; r++) {
                            var a = t[r], o = l[a], u = s[n];
                            o && (o[u] = i[r])
                        }
                    }
                }, n, a), o
            }, y.downSample = function (t, e, n, i) {
                for (var a = r(this, [t]), o = this._storage, s = a._storage, l = this.indices, h = a.indices = [], u = [], c = [], f = Math.floor(1 / e), d = s[t], p = this.count(), g = 0; g < o[t].length; g++)s[t][g] = o[t][g];
                for (var g = 0; g < p; g += f) {
                    f > p - g && (f = p - g, u.length = f);
                    for (var v = 0; v < f; v++) {
                        var m = l[g + v];
                        u[v] = d[m], c[v] = m
                    }
                    var y = n(u), m = c[i(u, y) || 0];
                    d[m] = y, h.push(m)
                }
                return a
            }, y.getItemModel = function (t) {
                var e = this.hostModel;
                return t = this.indices[t], new u(this._rawData[t], e, e && e.ecModel)
            }, y.diff = function (t) {
                var e, n = this._idList, i = t && t._idList, r = "e\x00\x00";
                return new c(t ? t.indices : [], this.indices, function (t) {
                    return null != (e = i[t]) ? e : r + t
                }, function (t) {
                    return null != (e = n[t]) ? e : r + t
                })
            }, y.getVisual = function (t) {
                var e = this._visual;
                return e && e[t]
            }, y.setVisual = function (t, e) {
                if (p(t))for (var n in t)t.hasOwnProperty(n) && this.setVisual(n, t[n]); else this._visual = this._visual || {}, this._visual[t] = e
            }, y.setLayout = function (t, e) {
                if (p(t))for (var n in t)t.hasOwnProperty(n) && this.setLayout(n, t[n]); else this._layout[t] = e
            }, y.getLayout = function (t) {
                return this._layout[t]
            }, y.getItemLayout = function (t) {
                return this._itemLayouts[t]
            }, y.setItemLayout = function (t, e, n) {
                this._itemLayouts[t] = n ? f.extend(this._itemLayouts[t] || {}, e) : e
            }, y.clearItemLayouts = function () {
                this._itemLayouts.length = 0
            }, y.getItemVisual = function (t, e, n) {
                var i = this._itemVisuals[t], r = i && i[e];
                return null != r || n ? r : this.getVisual(e)
            }, y.setItemVisual = function (t, e, n) {
                var i = this._itemVisuals[t] || {};
                if (this._itemVisuals[t] = i, p(e))for (var r in e)e.hasOwnProperty(r) && (i[r] = e[r]); else i[e] = n
            }, y.clearAllVisual = function () {
                this._visual = {}, this._itemVisuals = []
            };
            var _ = function (t) {
                t.seriesIndex = this.seriesIndex, t.dataIndex = this.dataIndex, t.dataType = this.dataType
            };
            y.setItemGraphicEl = function (t, e) {
                var n = this.hostModel;
                e && (e.dataIndex = t, e.dataType = this.dataType, e.seriesIndex = n && n.seriesIndex, "group" === e.type && e.traverse(_, e)), this._graphicEls[t] = e
            }, y.getItemGraphicEl = function (t) {
                return this._graphicEls[t]
            }, y.eachItemGraphicEl = function (t, e) {
                f.each(this._graphicEls, function (n, i) {
                    n && t && t.call(e, n, i)
                })
            }, y.cloneShallow = function () {
                var t = f.map(this.dimensions, this.getDimensionInfo, this), e = new m(t, this.hostModel);
                return e._storage = this._storage, v(e, this), e.indices = this.indices.slice(), this._extent && (e._extent = f.extend({}, this._extent)), e
            }, y.wrapMethod = function (t, e) {
                var n = this[t];
                "function" == typeof n && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(t), this[t] = function () {
                    var t = n.apply(this, arguments);
                    return e.apply(this, [t].concat(f.slice(arguments)))
                })
            }, y.TRANSFERABLE_METHODS = ["cloneShallow", "downSample", "map"], y.CHANGABLE_METHODS = ["filterSelf"], t.exports = m
        }).call(e, function () {
            return this
        }())
    }, function (t, e, n) {
        var i = n(1), r = n(9), a = n(6), o = n(13), s = n(57), l = n(11), h = n(12), u = r.encodeHTML, c = r.addCommas, f = o.extend({
            type: "series.__base__",
            seriesIndex: 0,
            coordinateSystem: null,
            defaultOption: null,
            legendDataProvider: null,
            visualColorAccessPath: "itemStyle.normal.color",
            layoutMode: null,
            init: function (t, e, n, i) {
                this.seriesIndex = this.componentIndex, this.mergeDefaultAndTheme(t, n), this._dataBeforeProcessed = this.getInitialData(t, n), this._data = this._dataBeforeProcessed.cloneShallow()
            },
            mergeDefaultAndTheme: function (t, e) {
                var n = this.layoutMode, r = n ? h.getLayoutParams(t) : {};
                i.merge(t, e.getTheme().get(this.subType)), i.merge(t, this.getDefaultOption()), a.defaultEmphasis(t.label, a.LABEL_OPTIONS), this.fillDataTextStyle(t.data), n && h.mergeLayoutParam(t, r, n)
            },
            mergeOption: function (t, e) {
                t = i.merge(this.option, t, !0), this.fillDataTextStyle(t.data);
                var n = this.layoutMode;
                n && h.mergeLayoutParam(this.option, t, n);
                var r = this.getInitialData(t, e);
                r && (this._data = r, this._dataBeforeProcessed = r.cloneShallow())
            },
            fillDataTextStyle: function (t) {
                if (t)for (var e = 0; e < t.length; e++)t[e] && t[e].label && a.defaultEmphasis(t[e].label, a.LABEL_OPTIONS)
            },
            getInitialData: function () {
            },
            getData: function (t) {
                return null == t ? this._data : this._data.getLinkedData(t)
            },
            setData: function (t) {
                this._data = t
            },
            getRawData: function () {
                return this._dataBeforeProcessed
            },
            coordDimToDataDim: function (t) {
                return [t]
            },
            dataDimToCoordDim: function (t) {
                return t
            },
            getBaseAxis: function () {
                var t = this.coordinateSystem;
                return t && t.getBaseAxis && t.getBaseAxis()
            },
            formatTooltip: function (t, e, n) {
                function a(t) {
                    var n = [];
                    return i.each(t, function (t, i) {
                        var a, s = o.getDimensionInfo(i), l = s && s.type;
                        a = "ordinal" === l ? t + "" : "time" === l ? e ? "" : r.formatTime("yyyy/MM/dd hh:mm:ss", t) : c(t), a && n.push(a)
                    }), n.join(", ")
                }

                var o = this._data, s = this.getRawValue(t), l = i.isArray(s) ? a(s) : c(s), h = o.getName(t), f = o.getItemVisual(t, "color");
                i.isObject(f) && f.colorStops && (f = (f.colorStops[0] || {}).color), f = f || "transparent";
                var d = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + f + '"></span>', p = this.name;
                return "\x00-" === p && (p = ""), e ? d + u(this.name) + " : " + l : (p && u(p) + "<br />") + d + (h ? u(h) + " : " + l : l)
            },
            ifEnableAnimation: function () {
                if (l.node)return !1;
                var t = this.getShallow("animation");
                return t && this.getData().count() > this.getShallow("animationThreshold") && (t = !1), t
            },
            restoreData: function () {
                this._data = this._dataBeforeProcessed.cloneShallow()
            },
            getColorFromPalette: function (t, e) {
                var n = this.ecModel, i = s.getColorFromPalette.call(this, t, e);
                return i || (i = n.getColorFromPalette(t, e)), i
            },
            getAxisTooltipDataIndex: null,
            getTooltipPosition: null
        });
        i.mixin(f, a.dataFormatMixin), i.mixin(f, s), t.exports = f
    }, function (t, e, n) {
        function i(t, e) {
            var n = t + ":" + e;
            if (l[n])return l[n];
            for (var i = (t + "").split("\n"), r = 0, a = 0, o = i.length; a < o; a++)r = Math.max(p.measureText(i[a], e).width, r);
            return h > u && (h = 0, l = {}), h++, l[n] = r, r
        }

        function r(t, e, n, r) {
            var a = ((t || "") + "").split("\n").length, o = i(t, e), s = i("国", e), l = a * s, h = new f(0, 0, o, l);
            switch (h.lineHeight = s, r) {
                case"bottom":
                case"alphabetic":
                    h.y -= s;
                    break;
                case"middle":
                    h.y -= s / 2
            }
            switch (n) {
                case"end":
                case"right":
                    h.x -= h.width;
                    break;
                case"center":
                    h.x -= h.width / 2
            }
            return h
        }

        function a(t, e, n, i) {
            var r = e.x, a = e.y, o = e.height, s = e.width, l = n.height, h = o / 2 - l / 2, u = "left";
            switch (t) {
                case"left":
                    r -= i, a += h, u = "right";
                    break;
                case"right":
                    r += i + s, a += h, u = "left";
                    break;
                case"top":
                    r += s / 2, a -= i + l, u = "center";
                    break;
                case"bottom":
                    r += s / 2, a += o + i, u = "center";
                    break;
                case"inside":
                    r += s / 2, a += h, u = "center";
                    break;
                case"insideLeft":
                    r += i, a += h, u = "left";
                    break;
                case"insideRight":
                    r += s - i, a += h, u = "right";
                    break;
                case"insideTop":
                    r += s / 2, a += i, u = "center";
                    break;
                case"insideBottom":
                    r += s / 2, a += o - l - i, u = "center";
                    break;
                case"insideTopLeft":
                    r += i, a += i, u = "left";
                    break;
                case"insideTopRight":
                    r += s - i, a += i, u = "right";
                    break;
                case"insideBottomLeft":
                    r += i, a += o - l - i;
                    break;
                case"insideBottomRight":
                    r += s - i, a += o - l - i, u = "right"
            }
            return {x: r, y: a, textAlign: u, textBaseline: "top"}
        }

        function o(t, e, n, r, a) {
            if (!e)return "";
            a = a || {}, r = d(r, "...");
            for (var o = d(a.maxIterations, 2), l = d(a.minChar, 0), h = i("国", n), u = i("a", n), c = d(a.placeholder, ""), f = e = Math.max(0, e - 1), p = 0; p < l && f >= u; p++)f -= u;
            var g = i(r);
            g > f && (r = "", g = 0), f = e - g;
            for (var v = (t + "").split("\n"), p = 0, m = v.length; p < m; p++) {
                var y = v[p], _ = i(y, n);
                if (!(_ <= e)) {
                    for (var x = 0; ; x++) {
                        if (_ <= f || x >= o) {
                            y += r;
                            break
                        }
                        var b = 0 === x ? s(y, f, u, h) : _ > 0 ? Math.floor(y.length * f / _) : 0;
                        y = y.substr(0, b), _ = i(y, n)
                    }
                    "" === y && (y = c), v[p] = y
                }
            }
            return v.join("\n")
        }

        function s(t, e, n, i) {
            for (var r = 0, a = 0, o = t.length; a < o && r < e; a++) {
                var s = t.charCodeAt(a);
                r += 0 <= s && s <= 127 ? n : i
            }
            return a
        }

        var l = {}, h = 0, u = 5e3, c = n(1), f = n(8), d = c.retrieve, p = {
            getWidth: i,
            getBoundingRect: r,
            adjustTextPositionOnRect: a,
            truncateText: o,
            measureText: function (t, e) {
                var n = c.getContext();
                return n.font = e || "12px sans-serif", n.measureText(t)
            }
        };
        t.exports = p
    }, function (t, e, n) {
        function i(t) {
            return t > -w && t < w
        }

        function r(t) {
            return t > w || t < -w
        }

        function a(t, e, n, i, r) {
            var a = 1 - r;
            return a * a * (a * t + 3 * r * e) + r * r * (r * i + 3 * a * n)
        }

        function o(t, e, n, i, r) {
            var a = 1 - r;
            return 3 * (((e - t) * a + 2 * (n - e) * r) * a + (i - n) * r * r)
        }

        function s(t, e, n, r, a, o) {
            var s = r + 3 * (e - n) - t, l = 3 * (n - 2 * e + t), h = 3 * (e - t), u = t - a, c = l * l - 3 * s * h, f = l * h - 9 * s * u, d = h * h - 3 * l * u, p = 0;
            if (i(c) && i(f))if (i(l))o[0] = 0; else {
                var g = -h / l;
                g >= 0 && g <= 1 && (o[p++] = g)
            } else {
                var v = f * f - 4 * c * d;
                if (i(v)) {
                    var m = f / c, g = -l / s + m, y = -m / 2;
                    g >= 0 && g <= 1 && (o[p++] = g), y >= 0 && y <= 1 && (o[p++] = y)
                } else if (v > 0) {
                    var _ = b(v), w = c * l + 1.5 * s * (-f + _), M = c * l + 1.5 * s * (-f - _);
                    w = w < 0 ? -x(-w, S) : x(w, S), M = M < 0 ? -x(-M, S) : x(M, S);
                    var g = (-l - (w + M)) / (3 * s);
                    g >= 0 && g <= 1 && (o[p++] = g)
                } else {
                    var A = (2 * c * l - 3 * s * f) / (2 * b(c * c * c)), I = Math.acos(A) / 3, C = b(c), L = Math.cos(I), g = (-l - 2 * C * L) / (3 * s), y = (-l + C * (L + T * Math.sin(I))) / (3 * s), k = (-l + C * (L - T * Math.sin(I))) / (3 * s);
                    g >= 0 && g <= 1 && (o[p++] = g), y >= 0 && y <= 1 && (o[p++] = y), k >= 0 && k <= 1 && (o[p++] = k)
                }
            }
            return p
        }

        function l(t, e, n, a, o) {
            var s = 6 * n - 12 * e + 6 * t, l = 9 * e + 3 * a - 3 * t - 9 * n, h = 3 * e - 3 * t, u = 0;
            if (i(l)) {
                if (r(s)) {
                    var c = -h / s;
                    c >= 0 && c <= 1 && (o[u++] = c)
                }
            } else {
                var f = s * s - 4 * l * h;
                if (i(f))o[0] = -s / (2 * l); else if (f > 0) {
                    var d = b(f), c = (-s + d) / (2 * l), p = (-s - d) / (2 * l);
                    c >= 0 && c <= 1 && (o[u++] = c), p >= 0 && p <= 1 && (o[u++] = p)
                }
            }
            return u
        }

        function h(t, e, n, i, r, a) {
            var o = (e - t) * r + t, s = (n - e) * r + e, l = (i - n) * r + n, h = (s - o) * r + o, u = (l - s) * r + s, c = (u - h) * r + h;
            a[0] = t, a[1] = o, a[2] = h, a[3] = c, a[4] = c, a[5] = u, a[6] = l, a[7] = i
        }

        function u(t, e, n, i, r, o, s, l, h, u, c) {
            var f, d, p, g, v, m = .005, y = 1 / 0;
            A[0] = h, A[1] = u;
            for (var x = 0; x < 1; x += .05)I[0] = a(t, n, r, s, x), I[1] = a(e, i, o, l, x), g = _(A, I), g < y && (f = x, y = g);
            y = 1 / 0;
            for (var w = 0; w < 32 && !(m < M); w++)d = f - m, p = f + m, I[0] = a(t, n, r, s, d), I[1] = a(e, i, o, l, d), g = _(I, A), d >= 0 && g < y ? (f = d, y = g) : (C[0] = a(t, n, r, s, p), C[1] = a(e, i, o, l, p), v = _(C, A), p <= 1 && v < y ? (f = p, y = v) : m *= .5);
            return c && (c[0] = a(t, n, r, s, f), c[1] = a(e, i, o, l, f)), b(y)
        }

        function c(t, e, n, i) {
            var r = 1 - i;
            return r * (r * t + 2 * i * e) + i * i * n
        }

        function f(t, e, n, i) {
            return 2 * ((1 - i) * (e - t) + i * (n - e))
        }

        function d(t, e, n, a, o) {
            var s = t - 2 * e + n, l = 2 * (e - t), h = t - a, u = 0;
            if (i(s)) {
                if (r(l)) {
                    var c = -h / l;
                    c >= 0 && c <= 1 && (o[u++] = c)
                }
            } else {
                var f = l * l - 4 * s * h;
                if (i(f)) {
                    var c = -l / (2 * s);
                    c >= 0 && c <= 1 && (o[u++] = c)
                } else if (f > 0) {
                    var d = b(f), c = (-l + d) / (2 * s), p = (-l - d) / (2 * s);
                    c >= 0 && c <= 1 && (o[u++] = c), p >= 0 && p <= 1 && (o[u++] = p)
                }
            }
            return u
        }

        function p(t, e, n) {
            var i = t + n - 2 * e;
            return 0 === i ? .5 : (t - e) / i
        }

        function g(t, e, n, i, r) {
            var a = (e - t) * i + t, o = (n - e) * i + e, s = (o - a) * i + a;
            r[0] = t, r[1] = a, r[2] = s, r[3] = s, r[4] = o, r[5] = n
        }

        function v(t, e, n, i, r, a, o, s, l) {
            var h, u = .005, f = 1 / 0;
            A[0] = o, A[1] = s;
            for (var d = 0; d < 1; d += .05) {
                I[0] = c(t, n, r, d), I[1] = c(e, i, a, d);
                var p = _(A, I);
                p < f && (h = d, f = p)
            }
            f = 1 / 0;
            for (var g = 0; g < 32 && !(u < M); g++) {
                var v = h - u, m = h + u;
                I[0] = c(t, n, r, v), I[1] = c(e, i, a, v);
                var p = _(I, A);
                if (v >= 0 && p < f)h = v, f = p; else {
                    C[0] = c(t, n, r, m), C[1] = c(e, i, a, m);
                    var y = _(C, A);
                    m <= 1 && y < f ? (h = m, f = y) : u *= .5
                }
            }
            return l && (l[0] = c(t, n, r, h), l[1] = c(e, i, a, h)), b(f)
        }

        var m = n(5), y = m.create, _ = m.distSquare, x = Math.pow, b = Math.sqrt, w = 1e-8, M = 1e-4, T = b(3), S = 1 / 3, A = y(), I = y(), C = y();
        t.exports = {
            cubicAt: a,
            cubicDerivativeAt: o,
            cubicRootAt: s,
            cubicExtrema: l,
            cubicSubdivide: h,
            cubicProjectPoint: u,
            quadraticAt: c,
            quadraticDerivativeAt: f,
            quadraticRootAt: d,
            quadraticExtremum: p,
            quadraticSubdivide: g,
            quadraticProjectPoint: v
        }
    }, function (t, e) {
        function n(t) {
            return t = Math.round(t), t < 0 ? 0 : t > 255 ? 255 : t
        }

        function i(t) {
            return t = Math.round(t), t < 0 ? 0 : t > 360 ? 360 : t
        }

        function r(t) {
            return t < 0 ? 0 : t > 1 ? 1 : t
        }

        function a(t) {
            return n(t.length && "%" === t.charAt(t.length - 1) ? parseFloat(t) / 100 * 255 : parseInt(t, 10))
        }

        function o(t) {
            return r(t.length && "%" === t.charAt(t.length - 1) ? parseFloat(t) / 100 : parseFloat(t))
        }

        function s(t, e, n) {
            return n < 0 ? n += 1 : n > 1 && (n -= 1), 6 * n < 1 ? t + (e - t) * n * 6 : 2 * n < 1 ? e : 3 * n < 2 ? t + (e - t) * (2 / 3 - n) * 6 : t
        }

        function l(t, e, n) {
            return t + (e - t) * n
        }

        function h(t) {
            if (t) {
                t += "";
                var e = t.replace(/ /g, "").toLowerCase();
                if (e in _)return _[e].slice();
                if ("#" !== e.charAt(0)) {
                    var n = e.indexOf("("), i = e.indexOf(")");
                    if (n !== -1 && i + 1 === e.length) {
                        var r = e.substr(0, n), s = e.substr(n + 1, i - (n + 1)).split(","), l = 1;
                        switch (r) {
                            case"rgba":
                                if (4 !== s.length)return;
                                l = o(s.pop());
                            case"rgb":
                                if (3 !== s.length)return;
                                return [a(s[0]), a(s[1]), a(s[2]), l];
                            case"hsla":
                                if (4 !== s.length)return;
                                return s[3] = o(s[3]), u(s);
                            case"hsl":
                                if (3 !== s.length)return;
                                return u(s);
                            default:
                                return
                        }
                    }
                } else {
                    if (4 === e.length) {
                        var h = parseInt(e.substr(1), 16);
                        if (!(h >= 0 && h <= 4095))return;
                        return [(3840 & h) >> 4 | (3840 & h) >> 8, 240 & h | (240 & h) >> 4, 15 & h | (15 & h) << 4, 1]
                    }
                    if (7 === e.length) {
                        var h = parseInt(e.substr(1), 16);
                        if (!(h >= 0 && h <= 16777215))return;
                        return [(16711680 & h) >> 16, (65280 & h) >> 8, 255 & h, 1]
                    }
                }
            }
        }

        function u(t) {
            var e = (parseFloat(t[0]) % 360 + 360) % 360 / 360, i = o(t[1]), r = o(t[2]), a = r <= .5 ? r * (i + 1) : r + i - r * i, l = 2 * r - a, h = [n(255 * s(l, a, e + 1 / 3)), n(255 * s(l, a, e)), n(255 * s(l, a, e - 1 / 3))];
            return 4 === t.length && (h[3] = t[3]), h
        }

        function c(t) {
            if (t) {
                var e, n, i = t[0] / 255, r = t[1] / 255, a = t[2] / 255, o = Math.min(i, r, a), s = Math.max(i, r, a), l = s - o, h = (s + o) / 2;
                if (0 === l)e = 0, n = 0; else {
                    n = h < .5 ? l / (s + o) : l / (2 - s - o);
                    var u = ((s - i) / 6 + l / 2) / l, c = ((s - r) / 6 + l / 2) / l, f = ((s - a) / 6 + l / 2) / l;
                    i === s ? e = f - c : r === s ? e = 1 / 3 + u - f : a === s && (e = 2 / 3 + c - u), e < 0 && (e += 1), e > 1 && (e -= 1)
                }
                var d = [360 * e, n, h];
                return null != t[3] && d.push(t[3]), d
            }
        }

        function f(t, e) {
            var n = h(t);
            if (n) {
                for (var i = 0; i < 3; i++)e < 0 ? n[i] = n[i] * (1 - e) | 0 : n[i] = (255 - n[i]) * e + n[i] | 0;
                return y(n, 4 === n.length ? "rgba" : "rgb")
            }
        }

        function d(t, e) {
            var n = h(t);
            if (n)return ((1 << 24) + (n[0] << 16) + (n[1] << 8) + +n[2]).toString(16).slice(1)
        }

        function p(t, e, i) {
            if (e && e.length && t >= 0 && t <= 1) {
                i = i || [0, 0, 0, 0];
                var r = t * (e.length - 1), a = Math.floor(r), o = Math.ceil(r), s = e[a], h = e[o], u = r - a;
                return i[0] = n(l(s[0], h[0], u)), i[1] = n(l(s[1], h[1], u)), i[2] = n(l(s[2], h[2], u)), i[3] = n(l(s[3], h[3], u)), i
            }
        }

        function g(t, e, i) {
            if (e && e.length && t >= 0 && t <= 1) {
                var a = t * (e.length - 1), o = Math.floor(a), s = Math.ceil(a), u = h(e[o]), c = h(e[s]), f = a - o, d = y([n(l(u[0], c[0], f)), n(l(u[1], c[1], f)), n(l(u[2], c[2], f)), r(l(u[3], c[3], f))], "rgba");
                return i ? {color: d, leftIndex: o, rightIndex: s, value: a} : d
            }
        }

        function v(t, e, n, r) {
            if (t = h(t))return t = c(t), null != e && (t[0] = i(e)), null != n && (t[1] = o(n)), null != r && (t[2] = o(r)), y(u(t), "rgba")
        }

        function m(t, e) {
            if (t = h(t), t && null != e)return t[3] = r(e), y(t, "rgba")
        }

        function y(t, e) {
            var n = t[0] + "," + t[1] + "," + t[2];
            return "rgba" !== e && "hsva" !== e && "hsla" !== e || (n += "," + t[3]), e + "(" + n + ")"
        }

        var _ = {
            transparent: [0, 0, 0, 0],
            aliceblue: [240, 248, 255, 1],
            antiquewhite: [250, 235, 215, 1],
            aqua: [0, 255, 255, 1],
            aquamarine: [127, 255, 212, 1],
            azure: [240, 255, 255, 1],
            beige: [245, 245, 220, 1],
            bisque: [255, 228, 196, 1],
            black: [0, 0, 0, 1],
            blanchedalmond: [255, 235, 205, 1],
            blue: [0, 0, 255, 1],
            blueviolet: [138, 43, 226, 1],
            brown: [165, 42, 42, 1],
            burlywood: [222, 184, 135, 1],
            cadetblue: [95, 158, 160, 1],
            chartreuse: [127, 255, 0, 1],
            chocolate: [210, 105, 30, 1],
            coral: [255, 127, 80, 1],
            cornflowerblue: [100, 149, 237, 1],
            cornsilk: [255, 248, 220, 1],
            crimson: [220, 20, 60, 1],
            cyan: [0, 255, 255, 1],
            darkblue: [0, 0, 139, 1],
            darkcyan: [0, 139, 139, 1],
            darkgoldenrod: [184, 134, 11, 1],
            darkgray: [169, 169, 169, 1],
            darkgreen: [0, 100, 0, 1],
            darkgrey: [169, 169, 169, 1],
            darkkhaki: [189, 183, 107, 1],
            darkmagenta: [139, 0, 139, 1],
            darkolivegreen: [85, 107, 47, 1],
            darkorange: [255, 140, 0, 1],
            darkorchid: [153, 50, 204, 1],
            darkred: [139, 0, 0, 1],
            darksalmon: [233, 150, 122, 1],
            darkseagreen: [143, 188, 143, 1],
            darkslateblue: [72, 61, 139, 1],
            darkslategray: [47, 79, 79, 1],
            darkslategrey: [47, 79, 79, 1],
            darkturquoise: [0, 206, 209, 1],
            darkviolet: [148, 0, 211, 1],
            deeppink: [255, 20, 147, 1],
            deepskyblue: [0, 191, 255, 1],
            dimgray: [105, 105, 105, 1],
            dimgrey: [105, 105, 105, 1],
            dodgerblue: [30, 144, 255, 1],
            firebrick: [178, 34, 34, 1],
            floralwhite: [255, 250, 240, 1],
            forestgreen: [34, 139, 34, 1],
            fuchsia: [255, 0, 255, 1],
            gainsboro: [220, 220, 220, 1],
            ghostwhite: [248, 248, 255, 1],
            gold: [255, 215, 0, 1],
            goldenrod: [218, 165, 32, 1],
            gray: [128, 128, 128, 1],
            green: [0, 128, 0, 1],
            greenyellow: [173, 255, 47, 1],
            grey: [128, 128, 128, 1],
            honeydew: [240, 255, 240, 1],
            hotpink: [255, 105, 180, 1],
            indianred: [205, 92, 92, 1],
            indigo: [75, 0, 130, 1],
            ivory: [255, 255, 240, 1],
            khaki: [240, 230, 140, 1],
            lavender: [230, 230, 250, 1],
            lavenderblush: [255, 240, 245, 1],
            lawngreen: [124, 252, 0, 1],
            lemonchiffon: [255, 250, 205, 1],
            lightblue: [173, 216, 230, 1],
            lightcoral: [240, 128, 128, 1],
            lightcyan: [224, 255, 255, 1],
            lightgoldenrodyellow: [250, 250, 210, 1],
            lightgray: [211, 211, 211, 1],
            lightgreen: [144, 238, 144, 1],
            lightgrey: [211, 211, 211, 1],
            lightpink: [255, 182, 193, 1],
            lightsalmon: [255, 160, 122, 1],
            lightseagreen: [32, 178, 170, 1],
            lightskyblue: [135, 206, 250, 1],
            lightslategray: [119, 136, 153, 1],
            lightslategrey: [119, 136, 153, 1],
            lightsteelblue: [176, 196, 222, 1],
            lightyellow: [255, 255, 224, 1],
            lime: [0, 255, 0, 1],
            limegreen: [50, 205, 50, 1],
            linen: [250, 240, 230, 1],
            magenta: [255, 0, 255, 1],
            maroon: [128, 0, 0, 1],
            mediumaquamarine: [102, 205, 170, 1],
            mediumblue: [0, 0, 205, 1],
            mediumorchid: [186, 85, 211, 1],
            mediumpurple: [147, 112, 219, 1],
            mediumseagreen: [60, 179, 113, 1],
            mediumslateblue: [123, 104, 238, 1],
            mediumspringgreen: [0, 250, 154, 1],
            mediumturquoise: [72, 209, 204, 1],
            mediumvioletred: [199, 21, 133, 1],
            midnightblue: [25, 25, 112, 1],
            mintcream: [245, 255, 250, 1],
            mistyrose: [255, 228, 225, 1],
            moccasin: [255, 228, 181, 1],
            navajowhite: [255, 222, 173, 1],
            navy: [0, 0, 128, 1],
            oldlace: [253, 245, 230, 1],
            olive: [128, 128, 0, 1],
            olivedrab: [107, 142, 35, 1],
            orange: [255, 165, 0, 1],
            orangered: [255, 69, 0, 1],
            orchid: [218, 112, 214, 1],
            palegoldenrod: [238, 232, 170, 1],
            palegreen: [152, 251, 152, 1],
            paleturquoise: [175, 238, 238, 1],
            palevioletred: [219, 112, 147, 1],
            papayawhip: [255, 239, 213, 1],
            peachpuff: [255, 218, 185, 1],
            peru: [205, 133, 63, 1],
            pink: [255, 192, 203, 1],
            plum: [221, 160, 221, 1],
            powderblue: [176, 224, 230, 1],
            purple: [128, 0, 128, 1],
            red: [255, 0, 0, 1],
            rosybrown: [188, 143, 143, 1],
            royalblue: [65, 105, 225, 1],
            saddlebrown: [139, 69, 19, 1],
            salmon: [250, 128, 114, 1],
            sandybrown: [244, 164, 96, 1],
            seagreen: [46, 139, 87, 1],
            seashell: [255, 245, 238, 1],
            sienna: [160, 82, 45, 1],
            silver: [192, 192, 192, 1],
            skyblue: [135, 206, 235, 1],
            slateblue: [106, 90, 205, 1],
            slategray: [112, 128, 144, 1],
            slategrey: [112, 128, 144, 1],
            snow: [255, 250, 250, 1],
            springgreen: [0, 255, 127, 1],
            steelblue: [70, 130, 180, 1],
            tan: [210, 180, 140, 1],
            teal: [0, 128, 128, 1],
            thistle: [216, 191, 216, 1],
            tomato: [255, 99, 71, 1],
            turquoise: [64, 224, 208, 1],
            violet: [238, 130, 238, 1],
            wheat: [245, 222, 179, 1],
            white: [255, 255, 255, 1],
            whitesmoke: [245, 245, 245, 1],
            yellow: [255, 255, 0, 1],
            yellowgreen: [154, 205, 50, 1]
        };
        t.exports = {
            parse: h,
            lift: f,
            toHex: d,
            fastMapToColor: p,
            mapToColor: g,
            modifyHSL: v,
            modifyAlpha: m,
            stringify: y
        }
    }, function (t, e) {
        var n = "undefined" == typeof Float32Array ? Array : Float32Array, i = {
            create: function () {
                var t = new n(6);
                return i.identity(t), t
            }, identity: function (t) {
                return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t
            }, copy: function (t, e) {
                return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t
            }, mul: function (t, e, n) {
                var i = e[0] * n[0] + e[2] * n[1], r = e[1] * n[0] + e[3] * n[1], a = e[0] * n[2] + e[2] * n[3], o = e[1] * n[2] + e[3] * n[3], s = e[0] * n[4] + e[2] * n[5] + e[4], l = e[1] * n[4] + e[3] * n[5] + e[5];
                return t[0] = i, t[1] = r, t[2] = a, t[3] = o, t[4] = s, t[5] = l, t
            }, translate: function (t, e, n) {
                return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4] + n[0], t[5] = e[5] + n[1], t
            }, rotate: function (t, e, n) {
                var i = e[0], r = e[2], a = e[4], o = e[1], s = e[3], l = e[5], h = Math.sin(n), u = Math.cos(n);
                return t[0] = i * u + o * h, t[1] = -i * h + o * u, t[2] = r * u + s * h, t[3] = -r * h + u * s, t[4] = u * a + h * l, t[5] = u * l - h * a, t
            }, scale: function (t, e, n) {
                var i = n[0], r = n[1];
                return t[0] = e[0] * i, t[1] = e[1] * r, t[2] = e[2] * i, t[3] = e[3] * r, t[4] = e[4] * i, t[5] = e[5] * r, t
            }, invert: function (t, e) {
                var n = e[0], i = e[2], r = e[4], a = e[1], o = e[3], s = e[5], l = n * o - a * i;
                return l ? (l = 1 / l, t[0] = o * l, t[1] = -a * l, t[2] = -i * l, t[3] = n * l, t[4] = (i * s - o * r) * l, t[5] = (a * r - n * s) * l, t) : null
            }
        };
        t.exports = i
    }, function (t, e) {
        var n = Array.prototype.slice, i = function () {
            this._$handlers = {}
        };
        i.prototype = {
            constructor: i, one: function (t, e, n) {
                var i = this._$handlers;
                if (!e || !t)return this;
                i[t] || (i[t] = []);
                for (var r = 0; r < i[t].length; r++)if (i[t][r].h === e)return this;
                return i[t].push({h: e, one: !0, ctx: n || this}), this
            }, on: function (t, e, n) {
                var i = this._$handlers;
                if (!e || !t)return this;
                i[t] || (i[t] = []);
                for (var r = 0; r < i[t].length; r++)if (i[t][r].h === e)return this;
                return i[t].push({h: e, one: !1, ctx: n || this}), this
            }, isSilent: function (t) {
                var e = this._$handlers;
                return e[t] && e[t].length
            }, off: function (t, e) {
                var n = this._$handlers;
                if (!t)return this._$handlers = {}, this;
                if (e) {
                    if (n[t]) {
                        for (var i = [], r = 0, a = n[t].length; r < a; r++)n[t][r].h != e && i.push(n[t][r]);
                        n[t] = i
                    }
                    n[t] && 0 === n[t].length && delete n[t]
                } else delete n[t];
                return this
            }, trigger: function (t) {
                if (this._$handlers[t]) {
                    var e = arguments, i = e.length;
                    i > 3 && (e = n.call(e, 1));
                    for (var r = this._$handlers[t], a = r.length, o = 0; o < a;) {
                        switch (i) {
                            case 1:
                                r[o].h.call(r[o].ctx);
                                break;
                            case 2:
                                r[o].h.call(r[o].ctx, e[1]);
                                break;
                            case 3:
                                r[o].h.call(r[o].ctx, e[1], e[2]);
                                break;
                            default:
                                r[o].h.apply(r[o].ctx, e)
                        }
                        r[o].one ? (r.splice(o, 1), a--) : o++
                    }
                }
                return this
            }, triggerWithContext: function (t) {
                if (this._$handlers[t]) {
                    var e = arguments, i = e.length;
                    i > 4 && (e = n.call(e, 1, e.length - 1));
                    for (var r = e[e.length - 1], a = this._$handlers[t], o = a.length, s = 0; s < o;) {
                        switch (i) {
                            case 1:
                                a[s].h.call(r);
                                break;
                            case 2:
                                a[s].h.call(r, e[1]);
                                break;
                            case 3:
                                a[s].h.call(r, e[1], e[2]);
                                break;
                            default:
                                a[s].h.apply(r, e)
                        }
                        a[s].one ? (a.splice(s, 1), o--) : s++
                    }
                }
                return this;
            }
        }, t.exports = i
    }, function (t, e, n) {
        function i(t, e) {
            var n = a.slice(arguments, 2);
            return this.superClass.prototype[e].apply(t, n)
        }

        function r(t, e, n) {
            return this.superClass.prototype[e].apply(t, n)
        }

        var a = n(1), o = {}, s = ".", l = "___EC__COMPONENT__CONTAINER___", h = o.parseClassType = function (t) {
            var e = {main: "", sub: ""};
            return t && (t = t.split(s), e.main = t[0] || "", e.sub = t[1] || ""), e
        };
        o.enableClassExtend = function (t, e) {
            t.$constructor = t, t.extend = function (t) {
                var e = this, n = function () {
                    t.$constructor ? t.$constructor.apply(this, arguments) : e.apply(this, arguments)
                };
                return a.extend(n.prototype, t), n.extend = this.extend, n.superCall = i, n.superApply = r, a.inherits(n, this), n.superClass = e, n
            }
        }, o.enableClassManagement = function (t, e) {
            function n(t) {
                var e = i[t.main];
                return e && e[l] || (e = i[t.main] = {}, e[l] = !0), e
            }

            e = e || {};
            var i = {};
            if (t.registerClass = function (t, e) {
                    if (e)if (e = h(e), e.sub) {
                        if (e.sub !== l) {
                            var r = n(e);
                            r[e.sub] = t
                        }
                    } else i[e.main] = t;
                    return t
                }, t.getClass = function (t, e, n) {
                    var r = i[t];
                    if (r && r[l] && (r = e ? r[e] : null), n && !r)throw new Error("Component " + t + "." + (e || "") + " not exists. Load it first.");
                    return r
                }, t.getClassesByMainType = function (t) {
                    t = h(t);
                    var e = [], n = i[t.main];
                    return n && n[l] ? a.each(n, function (t, n) {
                        n !== l && e.push(t)
                    }) : e.push(n), e
                }, t.hasClass = function (t) {
                    return t = h(t), !!i[t.main]
                }, t.getAllClassMainTypes = function () {
                    var t = [];
                    return a.each(i, function (e, n) {
                        t.push(n)
                    }), t
                }, t.hasSubTypes = function (t) {
                    t = h(t);
                    var e = i[t.main];
                    return e && e[l]
                }, t.parseClassType = h, e.registerWhenExtend) {
                var r = t.extend;
                r && (t.extend = function (e) {
                    var n = r.call(this, e);
                    return t.registerClass(n, e.type)
                })
            }
            return t
        }, o.setReadOnly = function (t, e) {
        }, t.exports = o
    }, function (t, e, n) {
        var i = n(136), r = n(38);
        n(137), n(135);
        var a = n(31), o = n(4), s = n(1), l = n(16), h = {};
        h.getScaleExtent = function (t, e) {
            var n = t.scale, i = n.getExtent(), r = i[1] - i[0];
            if ("ordinal" === n.type)return isFinite(r) ? i : [0, 0];
            var a = e.getMin ? e.getMin() : e.get("min"), l = e.getMax ? e.getMax() : e.get("max"), h = e.getNeedCrossZero ? e.getNeedCrossZero() : !e.get("scale"), u = e.get("boundaryGap");
            s.isArray(u) || (u = [u || 0, u || 0]), u[0] = o.parsePercent(u[0], 1), u[1] = o.parsePercent(u[1], 1);
            var c = !0, f = !0;
            return null == a && (a = i[0] - u[0] * r, c = !1), null == l && (l = i[1] + u[1] * r, f = !1), "dataMin" === a && (a = i[0]), "dataMax" === l && (l = i[1]), h && (a > 0 && l > 0 && !c && (a = 0), a < 0 && l < 0 && !f && (l = 0)), [a, l]
        }, h.niceScaleExtent = function (t, e) {
            var n = t.scale, i = h.getScaleExtent(t, e), r = null != (e.getMin ? e.getMin() : e.get("min")), a = null != (e.getMax ? e.getMax() : e.get("max")), o = e.get("splitNumber");
            "log" === n.type && (n.base = e.get("logBase")), n.setExtent(i[0], i[1]), n.niceExtent(o, r, a);
            var s = e.get("minInterval");
            if (isFinite(s) && !r && !a && "interval" === n.type) {
                var l = n.getInterval(), u = Math.max(Math.abs(l), s) / l;
                i = n.getExtent();
                var c = (i[1] + i[0]) / 2;
                n.setExtent(u * (i[0] - c) + c, u * (i[1] - c) + c), n.niceExtent(o)
            }
            var l = e.get("interval");
            null != l && n.setInterval && n.setInterval(l)
        }, h.createScaleByModel = function (t, e) {
            if (e = e || t.get("type"))switch (e) {
                case"category":
                    return new i(t.getCategories(), [1 / 0, -(1 / 0)]);
                case"value":
                    return new r;
                default:
                    return (a.getClass(e) || r).create(t)
            }
        }, h.ifAxisCrossZero = function (t) {
            var e = t.scale.getExtent(), n = e[0], i = e[1];
            return !(n > 0 && i > 0 || n < 0 && i < 0)
        }, h.getAxisLabelInterval = function (t, e, n, i) {
            var r, a = 0, o = 0, s = 1;
            e.length > 40 && (s = Math.floor(e.length / 40));
            for (var h = 0; h < t.length; h += s) {
                var u = t[h], c = l.getBoundingRect(e[h], n, "center", "top");
                c[i ? "x" : "y"] += u, c[i ? "width" : "height"] *= 1.3, r ? r.intersect(c) ? (o++, a = Math.max(a, o)) : (r.union(c), o = 0) : r = c.clone()
            }
            return 0 === a && s > 1 ? s : (a + 1) * s - 1
        }, h.getFormattedLabels = function (t, e) {
            var n = t.scale, i = n.getTicksLabels(), r = n.getTicks();
            return "string" == typeof e ? (e = function (t) {
                return function (e) {
                    return t.replace("{value}", null != e ? e : "")
                }
            }(e), s.map(i, e)) : "function" == typeof e ? s.map(r, function (i, r) {
                return e("category" === t.type ? n.getLabel(i) : i, r)
            }, this) : i
        }, t.exports = h
    }, function (t, e, n) {
        function i() {
            this._coordinateSystems = []
        }

        var r = n(1), a = {};
        i.prototype = {
            constructor: i, create: function (t, e) {
                var n = [];
                r.each(a, function (i, r) {
                    var a = i.create(t, e);
                    n = n.concat(a || [])
                }), this._coordinateSystems = n
            }, update: function (t, e) {
                r.each(this._coordinateSystems, function (n) {
                    n.update && n.update(t, e)
                })
            }, getCoordinateSystems: function () {
                return this._coordinateSystems.slice()
            }
        }, i.register = function (t, e) {
            a[t] = e
        }, i.get = function (t) {
            return a[t]
        }, t.exports = i
    }, function (t, e, n) {
        function i(t) {
            return t.getBoundingClientRect ? t.getBoundingClientRect() : {left: 0, top: 0}
        }

        function r(t, e, n, i) {
            return n = n || {}, i || !u.canvasSupported ? a(t, e, n) : u.browser.firefox && null != e.layerX && e.layerX !== e.offsetX ? (n.zrX = e.layerX, n.zrY = e.layerY) : null != e.offsetX ? (n.zrX = e.offsetX, n.zrY = e.offsetY) : a(t, e, n), n
        }

        function a(t, e, n) {
            var r = i(t);
            n.zrX = e.clientX - r.left, n.zrY = e.clientY - r.top
        }

        function o(t, e, n) {
            if (e = e || window.event, null != e.zrX)return e;
            var i = e.type, a = i && i.indexOf("touch") >= 0;
            if (a) {
                var o = "touchend" != i ? e.targetTouches[0] : e.changedTouches[0];
                o && r(t, o, e, n)
            } else r(t, e, e, n), e.zrDelta = e.wheelDelta ? e.wheelDelta / 120 : -(e.detail || 0) / 3;
            return e
        }

        function s(t, e, n) {
            c ? t.addEventListener(e, n) : t.attachEvent("on" + e, n)
        }

        function l(t, e, n) {
            c ? t.removeEventListener(e, n) : t.detachEvent("on" + e, n)
        }

        var h = n(20), u = n(11), c = "undefined" != typeof window && !!window.addEventListener, f = c ? function (t) {
            t.preventDefault(), t.stopPropagation(), t.cancelBubble = !0
        } : function (t) {
            t.returnValue = !1, t.cancelBubble = !0
        };
        t.exports = {
            clientToLocal: r,
            normalizeEvent: o,
            addEventListener: s,
            removeEventListener: l,
            stop: f,
            Dispatcher: h
        }
    }, , function (t, e, n) {
        var i = n(3), r = n(8), a = i.extendShape({
            type: "triangle",
            shape: {cx: 0, cy: 0, width: 0, height: 0},
            buildPath: function (t, e) {
                var n = e.cx, i = e.cy, r = e.width / 2, a = e.height / 2;
                t.moveTo(n, i - a), t.lineTo(n + r, i + a), t.lineTo(n - r, i + a), t.closePath()
            }
        }), o = i.extendShape({
            type: "diamond", shape: {cx: 0, cy: 0, width: 0, height: 0}, buildPath: function (t, e) {
                var n = e.cx, i = e.cy, r = e.width / 2, a = e.height / 2;
                t.moveTo(n, i - a), t.lineTo(n + r, i), t.lineTo(n, i + a), t.lineTo(n - r, i), t.closePath()
            }
        }), s = i.extendShape({
            type: "pin", shape: {x: 0, y: 0, width: 0, height: 0}, buildPath: function (t, e) {
                var n = e.x, i = e.y, r = e.width / 5 * 3, a = Math.max(r, e.height), o = r / 2, s = o * o / (a - o), l = i - a + o + s, h = Math.asin(s / o), u = Math.cos(h) * o, c = Math.sin(h), f = Math.cos(h);
                t.arc(n, l, o, Math.PI - h, 2 * Math.PI + h);
                var d = .6 * o, p = .7 * o;
                t.bezierCurveTo(n + u - c * d, l + s + f * d, n, i - p, n, i), t.bezierCurveTo(n, i - p, n - u + c * d, l + s + f * d, n - u, l + s), t.closePath()
            }
        }), l = i.extendShape({
            type: "arrow", shape: {x: 0, y: 0, width: 0, height: 0}, buildPath: function (t, e) {
                var n = e.height, i = e.width, r = e.x, a = e.y, o = i / 3 * 2;
                t.moveTo(r, a), t.lineTo(r + o, a + n), t.lineTo(r, a + n / 4 * 3), t.lineTo(r - o, a + n), t.lineTo(r, a), t.closePath()
            }
        }), h = {
            line: i.Line,
            rect: i.Rect,
            roundRect: i.Rect,
            square: i.Rect,
            circle: i.Circle,
            diamond: o,
            pin: s,
            arrow: l,
            triangle: a
        }, u = {
            line: function (t, e, n, i, r) {
                r.x1 = t, r.y1 = e + i / 2, r.x2 = t + n, r.y2 = e + i / 2
            }, rect: function (t, e, n, i, r) {
                r.x = t, r.y = e, r.width = n, r.height = i
            }, roundRect: function (t, e, n, i, r) {
                r.x = t, r.y = e, r.width = n, r.height = i, r.r = Math.min(n, i) / 4
            }, square: function (t, e, n, i, r) {
                var a = Math.min(n, i);
                r.x = t, r.y = e, r.width = a, r.height = a
            }, circle: function (t, e, n, i, r) {
                r.cx = t + n / 2, r.cy = e + i / 2, r.r = Math.min(n, i) / 2
            }, diamond: function (t, e, n, i, r) {
                r.cx = t + n / 2, r.cy = e + i / 2, r.width = n, r.height = i
            }, pin: function (t, e, n, i, r) {
                r.x = t + n / 2, r.y = e + i / 2, r.width = n, r.height = i
            }, arrow: function (t, e, n, i, r) {
                r.x = t + n / 2, r.y = e + i / 2, r.width = n, r.height = i
            }, triangle: function (t, e, n, i, r) {
                r.cx = t + n / 2, r.cy = e + i / 2, r.width = n, r.height = i
            }
        }, c = {};
        for (var f in h)h.hasOwnProperty(f) && (c[f] = new h[f]);
        var d = i.extendShape({
            type: "symbol",
            shape: {symbolType: "", x: 0, y: 0, width: 0, height: 0},
            beforeBrush: function () {
                var t = this.style, e = this.shape;
                "pin" === e.symbolType && "inside" === t.textPosition && (t.textPosition = ["50%", "40%"], t.textAlign = "center", t.textVerticalAlign = "middle")
            },
            buildPath: function (t, e, n) {
                var i = e.symbolType, r = c[i];
                "none" !== e.symbolType && (r || (i = "rect", r = c[i]), u[i](e.x, e.y, e.width, e.height, r.shape), r.buildPath(t, r.shape, n))
            }
        }), p = function (t) {
            if ("image" !== this.type) {
                var e = this.style, n = this.shape;
                n && "line" === n.symbolType ? e.stroke = t : this.__isEmptyBrush ? (e.stroke = t, e.fill = "#fff") : (e.fill && (e.fill = t), e.stroke && (e.stroke = t)), this.dirty(!1)
            }
        }, g = {
            createSymbol: function (t, e, n, a, o, s) {
                var l = 0 === t.indexOf("empty");
                l && (t = t.substr(5, 1).toLowerCase() + t.substr(6));
                var h;
                return h = 0 === t.indexOf("image://") ? new i.Image({
                    style: {
                        image: t.slice(8),
                        x: e,
                        y: n,
                        width: a,
                        height: o
                    }
                }) : 0 === t.indexOf("path://") ? i.makePath(t.slice(7), {}, new r(e, n, a, o)) : new d({
                    shape: {
                        symbolType: t,
                        x: e,
                        y: n,
                        width: a,
                        height: o
                    }
                }), h.__isEmptyBrush = l, h.setColor = p, h.setColor(s), h
            }
        };
        t.exports = g
    }, function (t, e, n) {
        function i() {
            this.group = new o, this.uid = s.getUID("viewChart")
        }

        function r(t, e) {
            if (t && (t.trigger(e), "group" === t.type))for (var n = 0; n < t.childCount(); n++)r(t.childAt(n), e)
        }

        function a(t, e, n) {
            var i = h.queryDataIndex(t, e);
            null != i ? u.each(h.normalizeToArray(i), function (e) {
                r(t.getItemGraphicEl(e), n)
            }) : t.eachItemGraphicEl(function (t) {
                r(t, n)
            })
        }

        var o = n(33), s = n(43), l = n(21), h = n(6), u = n(1);
        i.prototype = {
            type: "chart", init: function (t, e) {
            }, render: function (t, e, n, i) {
            }, highlight: function (t, e, n, i) {
                a(t.getData(), i, "emphasis")
            }, downplay: function (t, e, n, i) {
                a(t.getData(), i, "normal")
            }, remove: function (t, e) {
                this.group.removeAll()
            }, dispose: function () {
            }
        };
        var c = i.prototype;
        c.updateView = c.updateLayout = c.updateVisual = function (t, e, n, i) {
            this.render(t, e, n, i)
        }, l.enableClassExtend(i, ["dispose"]), l.enableClassManagement(i, {registerWhenExtend: !0}), t.exports = i
    }, function (t, e, n) {
        var i = n(17), r = n(5), a = n(74), o = n(8), s = n(32).devicePixelRatio, l = {
            M: 1,
            L: 2,
            C: 3,
            Q: 4,
            A: 5,
            Z: 6,
            R: 7
        }, h = [], u = [], c = [], f = [], d = Math.min, p = Math.max, g = Math.cos, v = Math.sin, m = Math.sqrt, y = Math.abs, _ = "undefined" != typeof Float32Array, x = function () {
            this.data = [], this._len = 0, this._ctx = null, this._xi = 0, this._yi = 0, this._x0 = 0, this._y0 = 0, this._ux = 0, this._uy = 0
        };
        x.prototype = {
            constructor: x,
            _lineDash: null,
            _dashOffset: 0,
            _dashIdx: 0,
            _dashSum: 0,
            setScale: function (t, e) {
                this._ux = y(1 / s / t) || 0, this._uy = y(1 / s / e) || 0
            },
            getContext: function () {
                return this._ctx
            },
            beginPath: function (t) {
                return this._ctx = t, t && t.beginPath(), t && (this.dpr = t.dpr), this._len = 0, this._lineDash && (this._lineDash = null, this._dashOffset = 0), this
            },
            moveTo: function (t, e) {
                return this.addData(l.M, t, e), this._ctx && this._ctx.moveTo(t, e), this._x0 = t, this._y0 = e, this._xi = t, this._yi = e, this
            },
            lineTo: function (t, e) {
                var n = y(t - this._xi) > this._ux || y(e - this._yi) > this._uy || this._len < 5;
                return this.addData(l.L, t, e), this._ctx && n && (this._needsDash() ? this._dashedLineTo(t, e) : this._ctx.lineTo(t, e)), n && (this._xi = t, this._yi = e), this
            },
            bezierCurveTo: function (t, e, n, i, r, a) {
                return this.addData(l.C, t, e, n, i, r, a), this._ctx && (this._needsDash() ? this._dashedBezierTo(t, e, n, i, r, a) : this._ctx.bezierCurveTo(t, e, n, i, r, a)), this._xi = r, this._yi = a, this
            },
            quadraticCurveTo: function (t, e, n, i) {
                return this.addData(l.Q, t, e, n, i), this._ctx && (this._needsDash() ? this._dashedQuadraticTo(t, e, n, i) : this._ctx.quadraticCurveTo(t, e, n, i)), this._xi = n, this._yi = i, this
            },
            arc: function (t, e, n, i, r, a) {
                return this.addData(l.A, t, e, n, n, i, r - i, 0, a ? 0 : 1), this._ctx && this._ctx.arc(t, e, n, i, r, a), this._xi = g(r) * n + t, this._xi = v(r) * n + t, this
            },
            arcTo: function (t, e, n, i, r) {
                return this._ctx && this._ctx.arcTo(t, e, n, i, r), this
            },
            rect: function (t, e, n, i) {
                return this._ctx && this._ctx.rect(t, e, n, i), this.addData(l.R, t, e, n, i), this
            },
            closePath: function () {
                this.addData(l.Z);
                var t = this._ctx, e = this._x0, n = this._y0;
                return t && (this._needsDash() && this._dashedLineTo(e, n), t.closePath()), this._xi = e, this._yi = n, this
            },
            fill: function (t) {
                t && t.fill(), this.toStatic()
            },
            stroke: function (t) {
                t && t.stroke(), this.toStatic()
            },
            setLineDash: function (t) {
                if (t instanceof Array) {
                    this._lineDash = t, this._dashIdx = 0;
                    for (var e = 0, n = 0; n < t.length; n++)e += t[n];
                    this._dashSum = e
                }
                return this
            },
            setLineDashOffset: function (t) {
                return this._dashOffset = t, this
            },
            len: function () {
                return this._len
            },
            setData: function (t) {
                var e = t.length;
                this.data && this.data.length == e || !_ || (this.data = new Float32Array(e));
                for (var n = 0; n < e; n++)this.data[n] = t[n];
                this._len = e
            },
            appendPath: function (t) {
                t instanceof Array || (t = [t]);
                for (var e = t.length, n = 0, i = this._len, r = 0; r < e; r++)n += t[r].len();
                _ && this.data instanceof Float32Array && (this.data = new Float32Array(i + n));
                for (var r = 0; r < e; r++)for (var a = t[r].data, o = 0; o < a.length; o++)this.data[i++] = a[o];
                this._len = i
            },
            addData: function (t) {
                var e = this.data;
                this._len + arguments.length > e.length && (this._expandData(), e = this.data);
                for (var n = 0; n < arguments.length; n++)e[this._len++] = arguments[n];
                this._prevCmd = t
            },
            _expandData: function () {
                if (!(this.data instanceof Array)) {
                    for (var t = [], e = 0; e < this._len; e++)t[e] = this.data[e];
                    this.data = t
                }
            },
            _needsDash: function () {
                return this._lineDash
            },
            _dashedLineTo: function (t, e) {
                var n, i, r = this._dashSum, a = this._dashOffset, o = this._lineDash, s = this._ctx, l = this._xi, h = this._yi, u = t - l, c = e - h, f = m(u * u + c * c), g = l, v = h, y = o.length;
                for (u /= f, c /= f, a < 0 && (a = r + a), a %= r, g -= a * u, v -= a * c; u > 0 && g <= t || u < 0 && g >= t || 0 == u && (c > 0 && v <= e || c < 0 && v >= e);)i = this._dashIdx, n = o[i], g += u * n, v += c * n, this._dashIdx = (i + 1) % y, u > 0 && g < l || u < 0 && g > l || c > 0 && v < h || c < 0 && v > h || s[i % 2 ? "moveTo" : "lineTo"](u >= 0 ? d(g, t) : p(g, t), c >= 0 ? d(v, e) : p(v, e));
                u = g - t, c = v - e, this._dashOffset = -m(u * u + c * c)
            },
            _dashedBezierTo: function (t, e, n, r, a, o) {
                var s, l, h, u, c, f = this._dashSum, d = this._dashOffset, p = this._lineDash, g = this._ctx, v = this._xi, y = this._yi, _ = i.cubicAt, x = 0, b = this._dashIdx, w = p.length, M = 0;
                for (d < 0 && (d = f + d), d %= f, s = 0; s < 1; s += .1)l = _(v, t, n, a, s + .1) - _(v, t, n, a, s), h = _(y, e, r, o, s + .1) - _(y, e, r, o, s), x += m(l * l + h * h);
                for (; b < w && (M += p[b], !(M > d)); b++);
                for (s = (M - d) / x; s <= 1;)u = _(v, t, n, a, s), c = _(y, e, r, o, s), b % 2 ? g.moveTo(u, c) : g.lineTo(u, c), s += p[b] / x, b = (b + 1) % w;
                b % 2 !== 0 && g.lineTo(a, o), l = a - u, h = o - c, this._dashOffset = -m(l * l + h * h)
            },
            _dashedQuadraticTo: function (t, e, n, i) {
                var r = n, a = i;
                n = (n + 2 * t) / 3, i = (i + 2 * e) / 3, t = (this._xi + 2 * t) / 3, e = (this._yi + 2 * e) / 3, this._dashedBezierTo(t, e, n, i, r, a)
            },
            toStatic: function () {
                var t = this.data;
                t instanceof Array && (t.length = this._len, _ && (this.data = new Float32Array(t)))
            },
            getBoundingRect: function () {
                h[0] = h[1] = c[0] = c[1] = Number.MAX_VALUE, u[0] = u[1] = f[0] = f[1] = -Number.MAX_VALUE;
                for (var t = this.data, e = 0, n = 0, i = 0, s = 0, d = 0; d < t.length;) {
                    var p = t[d++];
                    switch (1 == d && (e = t[d], n = t[d + 1], i = e, s = n), p) {
                        case l.M:
                            i = t[d++], s = t[d++], e = i, n = s, c[0] = i, c[1] = s, f[0] = i, f[1] = s;
                            break;
                        case l.L:
                            a.fromLine(e, n, t[d], t[d + 1], c, f), e = t[d++], n = t[d++];
                            break;
                        case l.C:
                            a.fromCubic(e, n, t[d++], t[d++], t[d++], t[d++], t[d], t[d + 1], c, f), e = t[d++], n = t[d++];
                            break;
                        case l.Q:
                            a.fromQuadratic(e, n, t[d++], t[d++], t[d], t[d + 1], c, f), e = t[d++], n = t[d++];
                            break;
                        case l.A:
                            var m = t[d++], y = t[d++], _ = t[d++], x = t[d++], b = t[d++], w = t[d++] + b, M = (t[d++], 1 - t[d++]);
                            1 == d && (i = g(b) * _ + m, s = v(b) * x + y), a.fromArc(m, y, _, x, b, w, M, c, f), e = g(w) * _ + m, n = v(w) * x + y;
                            break;
                        case l.R:
                            i = e = t[d++], s = n = t[d++];
                            var T = t[d++], S = t[d++];
                            a.fromLine(i, s, i + T, s + S, c, f);
                            break;
                        case l.Z:
                            e = i, n = s
                    }
                    r.min(h, h, c), r.max(u, u, f)
                }
                return 0 === d && (h[0] = h[1] = u[0] = u[1] = 0), new o(h[0], h[1], u[0] - h[0], u[1] - h[1])
            },
            rebuildPath: function (t) {
                for (var e, n, i, r, a, o, s = this.data, h = this._ux, u = this._uy, c = this._len, f = 0; f < c;) {
                    var d = s[f++];
                    switch (1 == f && (i = s[f], r = s[f + 1], e = i, n = r), d) {
                        case l.M:
                            e = i = s[f++], n = r = s[f++], t.moveTo(i, r);
                            break;
                        case l.L:
                            a = s[f++], o = s[f++], (y(a - i) > h || y(o - r) > u || f === c - 1) && (t.lineTo(a, o), i = a, r = o);
                            break;
                        case l.C:
                            t.bezierCurveTo(s[f++], s[f++], s[f++], s[f++], s[f++], s[f++]), i = s[f - 2], r = s[f - 1];
                            break;
                        case l.Q:
                            t.quadraticCurveTo(s[f++], s[f++], s[f++], s[f++]), i = s[f - 2], r = s[f - 1];
                            break;
                        case l.A:
                            var p = s[f++], m = s[f++], _ = s[f++], x = s[f++], b = s[f++], w = s[f++], M = s[f++], T = s[f++], S = _ > x ? _ : x, A = _ > x ? 1 : _ / x, I = _ > x ? x / _ : 1, C = Math.abs(_ - x) > .001, L = b + w;
                            C ? (t.translate(p, m), t.rotate(M), t.scale(A, I), t.arc(0, 0, S, b, L, 1 - T), t.scale(1 / A, 1 / I), t.rotate(-M), t.translate(-p, -m)) : t.arc(p, m, S, b, L, 1 - T), 1 == f && (e = g(b) * _ + p, n = v(b) * x + m), i = g(L) * _ + p, r = v(L) * x + m;
                            break;
                        case l.R:
                            e = i = s[f], n = r = s[f + 1], t.rect(s[f++], s[f++], s[f++], s[f++]);
                            break;
                        case l.Z:
                            t.closePath(), i = e, r = n
                    }
                }
            }
        }, x.CMD = l, t.exports = x
    }, function (t, e, n) {
        function i(t, e, n, i) {
            if (!e)return t;
            var s = r(e[0]), l = a.isArray(s) && s.length || 1;
            n = n || [], i = i || "extra";
            for (var h = 0; h < l; h++)if (!t[h]) {
                var u = n[h] || i + (h - n.length);
                t[h] = o(e, h) ? {type: "ordinal", name: u} : u
            }
            return t
        }

        function r(t) {
            return a.isArray(t) ? t : a.isObject(t) ? t.value : t
        }

        var a = n(1), o = i.guessOrdinal = function (t, e) {
            for (var n = 0, i = t.length; n < i; n++) {
                var o = r(t[n]);
                if (!a.isArray(o))return !1;
                var o = o[e];
                if (null != o && isFinite(o))return !1;
                if (a.isString(o) && "-" !== o)return !0
            }
            return !1
        };
        t.exports = i
    }, function (t, e, n) {
        var i = n(1);
        t.exports = function (t) {
            for (var e = 0; e < t.length; e++)t[e][1] || (t[e][1] = t[e][0]);
            return function (e) {
                for (var n = {}, r = 0; r < t.length; r++) {
                    var a = t[r][1];
                    if (!(e && i.indexOf(e, a) >= 0)) {
                        var o = this.getShallow(a);
                        null != o && (n[t[r][0]] = o)
                    }
                }
                return n
            }
        }
    }, function (t, e, n) {
        function i() {
            this._extent = [1 / 0, -(1 / 0)], this._interval = 0, this.init && this.init.apply(this, arguments)
        }

        var r = n(21), a = i.prototype;
        a.parse = function (t) {
            return t
        }, a.contain = function (t) {
            var e = this._extent;
            return t >= e[0] && t <= e[1]
        }, a.normalize = function (t) {
            var e = this._extent;
            return e[1] === e[0] ? .5 : (t - e[0]) / (e[1] - e[0])
        }, a.scale = function (t) {
            var e = this._extent;
            return t * (e[1] - e[0]) + e[0]
        }, a.unionExtent = function (t) {
            var e = this._extent;
            t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1])
        }, a.getExtent = function () {
            return this._extent.slice()
        }, a.setExtent = function (t, e) {
            var n = this._extent;
            isNaN(t) || (n[0] = t), isNaN(e) || (n[1] = e)
        }, a.getTicksLabels = function () {
            for (var t = [], e = this.getTicks(), n = 0; n < e.length; n++)t.push(this.getLabel(e[n]));
            return t
        }, r.enableClassExtend(i), r.enableClassManagement(i, {registerWhenExtend: !0}), t.exports = i
    }, function (t, e) {
        var n = 1;
        "undefined" != typeof window && (n = Math.max(window.devicePixelRatio || 1, 1));
        var i = {debugMode: 0, devicePixelRatio: n};
        t.exports = i
    }, function (t, e, n) {
        var i = n(1), r = n(59), a = n(8), o = function (t) {
            t = t || {}, r.call(this, t);
            for (var e in t)t.hasOwnProperty(e) && (this[e] = t[e]);
            this._children = [], this.__storage = null, this.__dirty = !0
        };
        o.prototype = {
            constructor: o, isGroup: !0, type: "group", silent: !1, children: function () {
                return this._children.slice()
            }, childAt: function (t) {
                return this._children[t]
            }, childOfName: function (t) {
                for (var e = this._children, n = 0; n < e.length; n++)if (e[n].name === t)return e[n]
            }, childCount: function () {
                return this._children.length
            }, add: function (t) {
                return t && t !== this && t.parent !== this && (this._children.push(t), this._doAdd(t)), this
            }, addBefore: function (t, e) {
                if (t && t !== this && t.parent !== this && e && e.parent === this) {
                    var n = this._children, i = n.indexOf(e);
                    i >= 0 && (n.splice(i, 0, t), this._doAdd(t))
                }
                return this
            }, _doAdd: function (t) {
                t.parent && t.parent.remove(t), t.parent = this;
                var e = this.__storage, n = this.__zr;
                e && e !== t.__storage && (e.addToMap(t), t instanceof o && t.addChildrenToStorage(e)), n && n.refresh()
            }, remove: function (t) {
                var e = this.__zr, n = this.__storage, r = this._children, a = i.indexOf(r, t);
                return a < 0 ? this : (r.splice(a, 1), t.parent = null, n && (n.delFromMap(t.id), t instanceof o && t.delChildrenFromStorage(n)), e && e.refresh(), this)
            }, removeAll: function () {
                var t, e, n = this._children, i = this.__storage;
                for (e = 0; e < n.length; e++)t = n[e], i && (i.delFromMap(t.id), t instanceof o && t.delChildrenFromStorage(i)), t.parent = null;
                return n.length = 0, this
            }, eachChild: function (t, e) {
                for (var n = this._children, i = 0; i < n.length; i++) {
                    var r = n[i];
                    t.call(e, r, i)
                }
                return this
            }, traverse: function (t, e) {
                for (var n = 0; n < this._children.length; n++) {
                    var i = this._children[n];
                    t.call(e, i), "group" === i.type && i.traverse(t, e)
                }
                return this
            }, addChildrenToStorage: function (t) {
                for (var e = 0; e < this._children.length; e++) {
                    var n = this._children[e];
                    t.addToMap(n), n instanceof o && n.addChildrenToStorage(t)
                }
            }, delChildrenFromStorage: function (t) {
                for (var e = 0; e < this._children.length; e++) {
                    var n = this._children[e];
                    t.delFromMap(n.id), n instanceof o && n.delChildrenFromStorage(t)
                }
            }, dirty: function () {
                return this.__dirty = !0, this.__zr && this.__zr.refresh(), this
            }, getBoundingRect: function (t) {
                for (var e = null, n = new a(0, 0, 0, 0), i = t || this._children, r = [], o = 0; o < i.length; o++) {
                    var s = i[o];
                    if (!s.ignore && !s.invisible) {
                        var l = s.getBoundingRect(), h = s.getLocalTransform(r);
                        h ? (n.copy(l), n.applyTransform(h), e = e || n.clone(), e.union(n)) : (e = e || l.clone(), e.union(l))
                    }
                }
                return e || n
            }
        }, i.inherits(o, r), t.exports = o
    }, function (t, e, n) {
        function i(t) {
            for (var e = 0; e < t.length && null == t[e];)e++;
            return t[e]
        }

        function r(t) {
            var e = i(t);
            return null != e && !c.isArray(p(e))
        }

        function a(t, e, n) {
            t = t || [];
            var i = e.get("coordinateSystem"), a = v[i], o = d.get(i), s = a && a(t, e, n), m = s && s.dimensions;
            m || (m = o && o.dimensions || ["x", "y"], m = u(m, t, m.concat(["value"])));
            var y = s ? s.categoryIndex : -1, _ = new h(m, e), x = l(s, t), b = {}, w = y >= 0 && r(t) ? function (t, e, n, i) {
                return f.isDataItemOption(t) && (_.hasItemOption = !0), i === y ? n : g(p(t), m[i])
            } : function (t, e, n, i) {
                var r = p(t), a = g(r && r[i], m[i]);
                f.isDataItemOption(t) && (_.hasItemOption = !0);
                var o = s && s.categoryAxesModels;
                return o && o[e] && "string" == typeof a && (b[e] = b[e] || o[e].getCategories(), a = c.indexOf(b[e], a), a < 0 && !isNaN(a) && (a = +a)), a
            };
            return _.hasItemOption = !1, _.initData(t, x, w), _
        }

        function o(t) {
            return "category" !== t && "time" !== t
        }

        function s(t) {
            return "category" === t ? "ordinal" : "time" === t ? "time" : "float"
        }

        function l(t, e) {
            var n, i = [], r = t && t.dimensions[t.categoryIndex];
            if (r && (n = t.categoryAxesModels[r.name]), n) {
                var a = n.getCategories();
                if (a) {
                    var o = e.length;
                    if (c.isArray(e[0]) && e[0].length > 1) {
                        i = [];
                        for (var s = 0; s < o; s++)i[s] = a[e[s][t.categoryIndex || 0]]
                    } else i = a.slice(0)
                }
            }
            return i
        }

        var h = n(14), u = n(29), c = n(1), f = n(6), d = n(23), p = f.getDataItemValue, g = f.converDataValue, v = {
            cartesian2d: function (t, e, n) {
                var i = c.map(["xAxis", "yAxis"], function (t) {
                    return n.queryComponents({mainType: t, index: e.get(t + "Index"), id: e.get(t + "Id")})[0]
                }), r = i[0], a = i[1], l = r.get("type"), h = a.get("type"), f = [{
                    name: "x",
                    type: s(l),
                    stackable: o(l)
                }, {name: "y", type: s(h), stackable: o(h)}], d = "category" === l, p = "category" === h;
                u(f, t, ["x", "y", "z"]);
                var g = {};
                return d && (g.x = r), p && (g.y = a), {
                    dimensions: f,
                    categoryIndex: d ? 0 : p ? 1 : -1,
                    categoryAxesModels: g
                }
            }, polar: function (t, e, n) {
                var i = n.queryComponents({
                    mainType: "polar",
                    index: e.get("polarIndex"),
                    id: e.get("polarId")
                })[0], r = i.findAxisModel("angleAxis"), a = i.findAxisModel("radiusAxis"), l = a.get("type"), h = r.get("type"), c = [{
                    name: "radius",
                    type: s(l),
                    stackable: o(l)
                }, {name: "angle", type: s(h), stackable: o(h)}], f = "category" === h, d = "category" === l;
                u(c, t, ["radius", "angle", "value"]);
                var p = {};
                return d && (p.radius = a), f && (p.angle = r), {
                    dimensions: c,
                    categoryIndex: f ? 1 : d ? 0 : -1,
                    categoryAxesModels: p
                }
            }, geo: function (t, e, n) {
                return {dimensions: u([{name: "lng"}, {name: "lat"}], t, ["lng", "lat", "value"])}
            }
        };
        t.exports = a
    }, function (t, e, n) {
        var i = n(3), r = n(1), a = n(2);
        n(55), n(106), a.extendComponentView({
            type: "grid", render: function (t, e) {
                this.group.removeAll(), t.get("show") && this.group.add(new i.Rect({
                    shape: t.coordinateSystem.getRect(),
                    style: r.defaults({fill: t.get("backgroundColor")}, t.getItemStyle()),
                    silent: !0,
                    z2: -1
                }))
            }
        }), a.registerPreprocessor(function (t) {
            t.xAxis && t.yAxis && !t.grid && (t.grid = {})
        })
    }, function (t, e, n) {
        function i(t) {
            t = t || {}, o.call(this, t);
            for (var e in t)t.hasOwnProperty(e) && "style" !== e && (this[e] = t[e]);
            this.style = new a(t.style), this._rect = null, this.__clipPaths = []
        }

        var r = n(1), a = n(65), o = n(59), s = n(76);
        i.prototype = {
            constructor: i,
            type: "displayable",
            __dirty: !0,
            invisible: !1,
            z: 0,
            z2: 0,
            zlevel: 0,
            draggable: !1,
            dragging: !1,
            silent: !1,
            culling: !1,
            cursor: "pointer",
            rectHover: !1,
            progressive: -1,
            beforeBrush: function (t) {
            },
            afterBrush: function (t) {
            },
            brush: function (t, e) {
            },
            getBoundingRect: function () {
            },
            contain: function (t, e) {
                return this.rectContain(t, e)
            },
            traverse: function (t, e) {
                t.call(e, this)
            },
            rectContain: function (t, e) {
                var n = this.transformCoordToLocal(t, e), i = this.getBoundingRect();
                return i.contain(n[0], n[1])
            },
            dirty: function () {
                this.__dirty = !0, this._rect = null, this.__zr && this.__zr.refresh()
            },
            animateStyle: function (t) {
                return this.animate("style", t)
            },
            attrKV: function (t, e) {
                "style" !== t ? o.prototype.attrKV.call(this, t, e) : this.style.set(e)
            },
            setStyle: function (t, e) {
                return this.style.set(t, e), this.dirty(!1), this
            },
            useStyle: function (t) {
                return this.style = new a(t), this.dirty(!1), this
            }
        }, r.inherits(i, o), r.mixin(i, s), t.exports = i
    }, function (t, e) {
        var n = function (t) {
            this.colorStops = t || []
        };
        n.prototype = {
            constructor: n, addColorStop: function (t, e) {
                this.colorStops.push({offset: t, color: e})
            }
        }, t.exports = n
    }, function (t, e, n) {
        var i = n(4), r = n(9), a = n(31), o = Math.floor, s = Math.ceil, l = i.getPrecisionSafe, h = i.round, u = a.extend({
            type: "interval",
            _interval: 0,
            setExtent: function (t, e) {
                var n = this._extent;
                isNaN(t) || (n[0] = parseFloat(t)), isNaN(e) || (n[1] = parseFloat(e))
            },
            unionExtent: function (t) {
                var e = this._extent;
                t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1]), u.prototype.setExtent.call(this, e[0], e[1])
            },
            getInterval: function () {
                return this._interval || this.niceTicks(), this._interval
            },
            setInterval: function (t) {
                this._interval = t, this._niceExtent = this._extent.slice()
            },
            getTicks: function () {
                this._interval || this.niceTicks();
                var t = this._interval, e = this._extent, n = [], i = 1e4;
                if (t) {
                    var r = this._niceExtent, a = l(t) + 2;
                    e[0] < r[0] && n.push(e[0]);
                    for (var o = r[0]; o <= r[1];)if (n.push(o), o = h(o + t, a), n.length > i)return [];
                    e[1] > (n.length ? n[n.length - 1] : r[1]) && n.push(e[1])
                }
                return n
            },
            getTicksLabels: function () {
                for (var t = [], e = this.getTicks(), n = 0; n < e.length; n++)t.push(this.getLabel(e[n]));
                return t
            },
            getLabel: function (t) {
                return r.addCommas(t)
            },
            niceTicks: function (t) {
                t = t || 5;
                var e = this._extent, n = e[1] - e[0];
                if (isFinite(n)) {
                    n < 0 && (n = -n, e.reverse());
                    var r = h(i.nice(n / t, !0), Math.max(l(e[0]), l(e[1])) + 2), a = l(r) + 2, u = [h(s(e[0] / r) * r, a), h(o(e[1] / r) * r, a)];
                    this._interval = r, this._niceExtent = u
                }
            },
            niceExtent: function (t, e, n) {
                var i = this._extent;
                if (i[0] === i[1])if (0 !== i[0]) {
                    var r = i[0];
                    n ? i[0] -= r / 2 : (i[1] += r / 2, i[0] -= r / 2)
                } else i[1] = 1;
                var a = i[1] - i[0];
                isFinite(a) || (i[0] = 0, i[1] = 1), this.niceTicks(t);
                var l = this._interval;
                e || (i[0] = h(o(i[0] / l) * l)), n || (i[1] = h(s(i[1] / l) * l))
            }
        });
        u.create = function () {
            return new u
        }, t.exports = u
    }, function (t, e, n) {
        function i(t) {
            this.group = new a.Group, this._symbolCtor = t || o
        }

        function r(t, e, n) {
            var i = t.getItemLayout(e);
            return i && !isNaN(i[0]) && !isNaN(i[1]) && !(n && n(e)) && "none" !== t.getItemVisual(e, "symbol")
        }

        var a = n(3), o = n(50), s = i.prototype;
        s.updateData = function (t, e) {
            var n = this.group, i = t.hostModel, o = this._data, s = this._symbolCtor, l = {
                itemStyle: i.getModel("itemStyle.normal").getItemStyle(["color"]),
                hoverItemStyle: i.getModel("itemStyle.emphasis").getItemStyle(),
                symbolRotate: i.get("symbolRotate"),
                symbolOffset: i.get("symbolOffset"),
                hoverAnimation: i.get("hoverAnimation"),
                labelModel: i.getModel("label.normal"),
                hoverLabelModel: i.getModel("label.emphasis")
            };
            t.diff(o).add(function (i) {
                var a = t.getItemLayout(i);
                if (r(t, i, e)) {
                    var o = new s(t, i, l);
                    o.attr("position", a), t.setItemGraphicEl(i, o), n.add(o)
                }
            }).update(function (h, u) {
                var c = o.getItemGraphicEl(u), f = t.getItemLayout(h);
                return r(t, h, e) ? (c ? (c.updateData(t, h, l), a.updateProps(c, {position: f}, i)) : (c = new s(t, h), c.attr("position", f)), n.add(c), void t.setItemGraphicEl(h, c)) : void n.remove(c)
            }).remove(function (t) {
                var e = o.getItemGraphicEl(t);
                e && e.fadeOut(function () {
                    n.remove(e)
                })
            }).execute(), this._data = t
        }, s.updateLayout = function () {
            var t = this._data;
            t && t.eachItemGraphicEl(function (e, n) {
                var i = t.getItemLayout(n);
                e.attr("position", i)
            })
        }, s.remove = function (t) {
            var e = this.group, n = this._data;
            n && (t ? n.eachItemGraphicEl(function (t) {
                t.fadeOut(function () {
                    e.remove(t)
                })
            }) : e.removeAll())
        }, t.exports = i
    }, , , function (t, e, n) {
        function i(t, e) {
            var n = t[1] - t[0], i = e, r = n / i / 2;
            t[0] += r, t[1] -= r
        }

        var r = n(4), a = r.linearMap, o = n(1), s = [0, 1], l = function (t, e, n) {
            this.dim = t, this.scale = e, this._extent = n || [0, 0], this.inverse = !1, this.onBand = !1
        };
        l.prototype = {
            constructor: l, contain: function (t) {
                var e = this._extent, n = Math.min(e[0], e[1]), i = Math.max(e[0], e[1]);
                return t >= n && t <= i
            }, containData: function (t) {
                return this.contain(this.dataToCoord(t))
            }, getExtent: function () {
                var t = this._extent.slice();
                return t
            }, getPixelPrecision: function (t) {
                return r.getPixelPrecision(t || this.scale.getExtent(), this._extent)
            }, setExtent: function (t, e) {
                var n = this._extent;
                n[0] = t, n[1] = e
            }, dataToCoord: function (t, e) {
                var n = this._extent, r = this.scale;
                return t = r.normalize(t), this.onBand && "ordinal" === r.type && (n = n.slice(), i(n, r.count())), a(t, s, n, e)
            }, coordToData: function (t, e) {
                var n = this._extent, r = this.scale;
                this.onBand && "ordinal" === r.type && (n = n.slice(), i(n, r.count()));
                var o = a(t, n, s, e);
                return this.scale.scale(o)
            }, getTicksCoords: function (t) {
                if (this.onBand && !t) {
                    for (var e = this.getBands(), n = [], i = 0; i < e.length; i++)n.push(e[i][0]);
                    return e[i - 1] && n.push(e[i - 1][1]), n
                }
                return o.map(this.scale.getTicks(), this.dataToCoord, this)
            }, getLabelsCoords: function () {
                return o.map(this.scale.getTicks(), this.dataToCoord, this)
            }, getBands: function () {
                for (var t = this.getExtent(), e = [], n = this.scale.count(), i = t[0], r = t[1], a = r - i, o = 0; o < n; o++)e.push([a * o / n + i, a * (o + 1) / n + i]);
                return e
            }, getBandWidth: function () {
                var t = this._extent, e = this.scale.getExtent(), n = e[1] - e[0] + (this.onBand ? 1 : 0);
                0 === n && (n = 1);
                var i = Math.abs(t[1] - t[0]);
                return Math.abs(i) / n
            }
        }, t.exports = l
    }, function (t, e, n) {
        var i = n(1), r = n(21), a = r.parseClassType, o = 0, s = {}, l = "_";
        s.getUID = function (t) {
            return [t || "", o++, Math.random()].join(l)
        }, s.enableSubTypeDefaulter = function (t) {
            var e = {};
            return t.registerSubTypeDefaulter = function (t, n) {
                t = a(t), e[t.main] = n
            }, t.determineSubType = function (n, i) {
                var r = i.type;
                if (!r) {
                    var o = a(n).main;
                    t.hasSubTypes(n) && e[o] && (r = e[o](i))
                }
                return r
            }, t
        }, s.enableTopologicalTravel = function (t, e) {
            function n(t) {
                var n = {}, o = [];
                return i.each(t, function (s) {
                    var l = r(n, s), h = l.originalDeps = e(s), u = a(h, t);
                    l.entryCount = u.length, 0 === l.entryCount && o.push(s), i.each(u, function (t) {
                        i.indexOf(l.predecessor, t) < 0 && l.predecessor.push(t);
                        var e = r(n, t);
                        i.indexOf(e.successor, t) < 0 && e.successor.push(s)
                    })
                }), {graph: n, noEntryList: o}
            }

            function r(t, e) {
                return t[e] || (t[e] = {predecessor: [], successor: []}), t[e]
            }

            function a(t, e) {
                var n = [];
                return i.each(t, function (t) {
                    i.indexOf(e, t) >= 0 && n.push(t)
                }), n
            }

            t.topologicalTravel = function (t, e, r, a) {
                function o(t) {
                    h[t].entryCount--, 0 === h[t].entryCount && u.push(t)
                }

                function s(t) {
                    c[t] = !0, o(t)
                }

                if (t.length) {
                    var l = n(e), h = l.graph, u = l.noEntryList, c = {};
                    for (i.each(t, function (t) {
                        c[t] = !0
                    }); u.length;) {
                        var f = u.pop(), d = h[f], p = !!c[f];
                        p && (r.call(a, f, d.originalDeps.slice()), delete c[f]), i.each(d.successor, p ? s : o)
                    }
                    i.each(c, function () {
                        throw new Error("Circle dependency may exists")
                    })
                }
            }
        }, t.exports = s
    }, function (t, e) {
        function n(t) {
            for (var e = 0; t >= u;)e |= 1 & t, t >>= 1;
            return t + e
        }

        function i(t, e, n, i) {
            var a = e + 1;
            if (a === n)return 1;
            if (i(t[a++], t[e]) < 0) {
                for (; a < n && i(t[a], t[a - 1]) < 0;)a++;
                r(t, e, a)
            } else for (; a < n && i(t[a], t[a - 1]) >= 0;)a++;
            return a - e
        }

        function r(t, e, n) {
            for (n--; e < n;) {
                var i = t[e];
                t[e++] = t[n], t[n--] = i
            }
        }

        function a(t, e, n, i, r) {
            for (i === e && i++; i < n; i++) {
                for (var a, o = t[i], s = e, l = i; s < l;)a = s + l >>> 1, r(o, t[a]) < 0 ? l = a : s = a + 1;
                var h = i - s;
                switch (h) {
                    case 3:
                        t[s + 3] = t[s + 2];
                    case 2:
                        t[s + 2] = t[s + 1];
                    case 1:
                        t[s + 1] = t[s];
                        break;
                    default:
                        for (; h > 0;)t[s + h] = t[s + h - 1], h--
                }
                t[s] = o
            }
        }

        function o(t, e, n, i, r, a) {
            var o = 0, s = 0, l = 1;
            if (a(t, e[n + r]) > 0) {
                for (s = i - r; l < s && a(t, e[n + r + l]) > 0;)o = l, l = (l << 1) + 1, l <= 0 && (l = s);
                l > s && (l = s), o += r, l += r
            } else {
                for (s = r + 1; l < s && a(t, e[n + r - l]) <= 0;)o = l, l = (l << 1) + 1, l <= 0 && (l = s);
                l > s && (l = s);
                var h = o;
                o = r - l, l = r - h
            }
            for (o++; o < l;) {
                var u = o + (l - o >>> 1);
                a(t, e[n + u]) > 0 ? o = u + 1 : l = u
            }
            return l
        }

        function s(t, e, n, i, r, a) {
            var o = 0, s = 0, l = 1;
            if (a(t, e[n + r]) < 0) {
                for (s = r + 1; l < s && a(t, e[n + r - l]) < 0;)o = l, l = (l << 1) + 1, l <= 0 && (l = s);
                l > s && (l = s);
                var h = o;
                o = r - l, l = r - h
            } else {
                for (s = i - r; l < s && a(t, e[n + r + l]) >= 0;)o = l, l = (l << 1) + 1, l <= 0 && (l = s);
                l > s && (l = s), o += r, l += r
            }
            for (o++; o < l;) {
                var u = o + (l - o >>> 1);
                a(t, e[n + u]) < 0 ? l = u : o = u + 1
            }
            return l
        }

        function l(t, e) {
            function n(t, e) {
                u[y] = t, d[y] = e, y += 1
            }

            function i() {
                for (; y > 1;) {
                    var t = y - 2;
                    if (t >= 1 && d[t - 1] <= d[t] + d[t + 1] || t >= 2 && d[t - 2] <= d[t] + d[t - 1])d[t - 1] < d[t + 1] && t--; else if (d[t] > d[t + 1])break;
                    a(t)
                }
            }

            function r() {
                for (; y > 1;) {
                    var t = y - 2;
                    t > 0 && d[t - 1] < d[t + 1] && t--, a(t)
                }
            }

            function a(n) {
                var i = u[n], r = d[n], a = u[n + 1], c = d[n + 1];
                d[n] = r + c, n === y - 3 && (u[n + 1] = u[n + 2], d[n + 1] = d[n + 2]), y--;
                var f = s(t[a], t, i, r, 0, e);
                i += f, r -= f, 0 !== r && (c = o(t[i + r - 1], t, a, c, c - 1, e), 0 !== c && (r <= c ? l(i, r, a, c) : h(i, r, a, c)))
            }

            function l(n, i, r, a) {
                var l = 0;
                for (l = 0; l < i; l++)_[l] = t[n + l];
                var h = 0, u = r, f = n;
                if (t[f++] = t[u++], 0 !== --a) {
                    if (1 === i) {
                        for (l = 0; l < a; l++)t[f + l] = t[u + l];
                        return void(t[f + a] = _[h])
                    }
                    for (var d, g, v, m = p; ;) {
                        d = 0, g = 0, v = !1;
                        do if (e(t[u], _[h]) < 0) {
                            if (t[f++] = t[u++], g++, d = 0, 0 === --a) {
                                v = !0;
                                break
                            }
                        } else if (t[f++] = _[h++], d++, g = 0, 1 === --i) {
                            v = !0;
                            break
                        } while ((d | g) < m);
                        if (v)break;
                        do {
                            if (d = s(t[u], _, h, i, 0, e), 0 !== d) {
                                for (l = 0; l < d; l++)t[f + l] = _[h + l];
                                if (f += d, h += d, i -= d, i <= 1) {
                                    v = !0;
                                    break
                                }
                            }
                            if (t[f++] = t[u++], 0 === --a) {
                                v = !0;
                                break
                            }
                            if (g = o(_[h], t, u, a, 0, e), 0 !== g) {
                                for (l = 0; l < g; l++)t[f + l] = t[u + l];
                                if (f += g, u += g, a -= g, 0 === a) {
                                    v = !0;
                                    break
                                }
                            }
                            if (t[f++] = _[h++], 1 === --i) {
                                v = !0;
                                break
                            }
                            m--
                        } while (d >= c || g >= c);
                        if (v)break;
                        m < 0 && (m = 0), m += 2
                    }
                    if (p = m, p < 1 && (p = 1), 1 === i) {
                        for (l = 0; l < a; l++)t[f + l] = t[u + l];
                        t[f + a] = _[h]
                    } else {
                        if (0 === i)throw new Error;
                        for (l = 0; l < i; l++)t[f + l] = _[h + l]
                    }
                } else for (l = 0; l < i; l++)t[f + l] = _[h + l]
            }

            function h(n, i, r, a) {
                var l = 0;
                for (l = 0; l < a; l++)_[l] = t[r + l];
                var h = n + i - 1, u = a - 1, f = r + a - 1, d = 0, g = 0;
                if (t[f--] = t[h--], 0 !== --i) {
                    if (1 === a) {
                        for (f -= i, h -= i, g = f + 1, d = h + 1, l = i - 1; l >= 0; l--)t[g + l] = t[d + l];
                        return void(t[f] = _[u])
                    }
                    for (var v = p; ;) {
                        var m = 0, y = 0, x = !1;
                        do if (e(_[u], t[h]) < 0) {
                            if (t[f--] = t[h--], m++, y = 0, 0 === --i) {
                                x = !0;
                                break
                            }
                        } else if (t[f--] = _[u--], y++, m = 0, 1 === --a) {
                            x = !0;
                            break
                        } while ((m | y) < v);
                        if (x)break;
                        do {
                            if (m = i - s(_[u], t, n, i, i - 1, e), 0 !== m) {
                                for (f -= m, h -= m, i -= m, g = f + 1, d = h + 1, l = m - 1; l >= 0; l--)t[g + l] = t[d + l];
                                if (0 === i) {
                                    x = !0;
                                    break
                                }
                            }
                            if (t[f--] = _[u--], 1 === --a) {
                                x = !0;
                                break
                            }
                            if (y = a - o(t[h], _, 0, a, a - 1, e), 0 !== y) {
                                for (f -= y, u -= y, a -= y, g = f + 1, d = u + 1, l = 0; l < y; l++)t[g + l] = _[d + l];
                                if (a <= 1) {
                                    x = !0;
                                    break
                                }
                            }
                            if (t[f--] = t[h--], 0 === --i) {
                                x = !0;
                                break
                            }
                            v--
                        } while (m >= c || y >= c);
                        if (x)break;
                        v < 0 && (v = 0), v += 2
                    }
                    if (p = v, p < 1 && (p = 1), 1 === a) {
                        for (f -= i, h -= i, g = f + 1, d = h + 1, l = i - 1; l >= 0; l--)t[g + l] = t[d + l];
                        t[f] = _[u]
                    } else {
                        if (0 === a)throw new Error;
                        for (d = f - (a - 1), l = 0; l < a; l++)t[d + l] = _[l]
                    }
                } else for (d = f - (a - 1), l = 0; l < a; l++)t[d + l] = _[l]
            }

            var u, d, p = c, g = 0, v = f, m = 0, y = 0;
            g = t.length, g < 2 * f && (v = g >>> 1);
            var _ = [];
            m = g < 120 ? 5 : g < 1542 ? 10 : g < 119151 ? 19 : 40, u = [], d = [], this.mergeRuns = i, this.forceMergeRuns = r, this.pushRun = n
        }

        function h(t, e, r, o) {
            r || (r = 0), o || (o = t.length);
            var s = o - r;
            if (!(s < 2)) {
                var h = 0;
                if (s < u)return h = i(t, r, o, e), void a(t, r, o, r + h, e);
                var c = new l(t, e), f = n(s);
                do {
                    if (h = i(t, r, o, e), h < f) {
                        var d = s;
                        d > f && (d = f), a(t, r, r + d, r + h, e), h = d
                    }
                    c.pushRun(r, h), c.mergeRuns(), s -= h, r += h
                } while (0 !== s);
                c.forceMergeRuns()
            }
        }

        var u = 32, c = 7, f = 256;
        t.exports = h
    }, function (t, e) {
        function n(t) {
            return t
        }

        function i(t, e, i, r) {
            this._old = t, this._new = e, this._oldKeyGetter = i || n, this._newKeyGetter = r || n
        }

        function r(t, e, n, i) {
            for (var r = 0; r < t.length; r++) {
                var a = i(t[r], r), o = e[a];
                null == o ? (n.push(a), e[a] = r) : (o.length || (e[a] = o = [o]), o.push(r))
            }
        }

        i.prototype = {
            constructor: i, add: function (t) {
                return this._add = t, this
            }, update: function (t) {
                return this._update = t, this
            }, remove: function (t) {
                return this._remove = t, this
            }, execute: function () {
                var t, e = this._old, n = this._new, i = this._oldKeyGetter, a = this._newKeyGetter, o = {}, s = {}, l = [], h = [];
                for (r(e, o, l, i), r(n, s, h, a), t = 0; t < e.length; t++) {
                    var u = l[t], c = s[u];
                    if (null != c) {
                        var f = c.length;
                        f ? (1 === f && (s[u] = null), c = c.unshift()) : s[u] = null, this._update && this._update(c, t)
                    } else this._remove && this._remove(t)
                }
                for (var t = 0; t < h.length; t++) {
                    var u = h[t];
                    if (s.hasOwnProperty(u)) {
                        var c = s[u];
                        if (null == c)continue;
                        if (c.length)for (var d = 0, f = c.length; d < f; d++)this._add && this._add(c[d]); else this._add && this._add(c)
                    }
                }
            }
        }, t.exports = i
    }, function (t, e) {
        var n = {}, i = "\x00__throttleOriginMethod", r = "\x00__throttleRate", a = "\x00__throttleType";
        n.throttle = function (t, e, n) {
            function i() {
                h = (new Date).getTime(), u = null, t.apply(o, s || [])
            }

            var r, a, o, s, l = 0, h = 0, u = null;
            e = e || 0;
            var c = function () {
                r = (new Date).getTime(), o = this, s = arguments, a = r - (n ? l : h) - e, clearTimeout(u), n ? u = setTimeout(i, e) : a >= 0 ? i() : u = setTimeout(i, -a), l = r
            };
            return c.clear = function () {
                u && (clearTimeout(u), u = null)
            }, c
        }, n.createOrUpdate = function (t, e, o, s) {
            var l = t[e];
            if (l) {
                var h = l[i] || l, u = l[a], c = l[r];
                if (c !== o || u !== s) {
                    if (null == o || !s)return t[e] = h;
                    l = t[e] = n.throttle(h, o, "debounce" === s), l[i] = h, l[a] = s, l[r] = o
                }
                return l
            }
        }, n.clear = function (t, e) {
            var n = t[e];
            n && n[i] && (t[e] = n[i])
        }, t.exports = n
    }, function (t, e) {
        t.exports = function (t, e, n, i, r) {
            i.eachRawSeriesByType(t, function (t) {
                var r = t.getData(), a = t.get("symbol") || e, o = t.get("symbolSize");
                r.setVisual({
                    legendSymbol: n || a,
                    symbol: a,
                    symbolSize: o
                }), i.isSeriesFiltered(t) || ("function" == typeof o && r.each(function (e) {
                    var n = t.getRawValue(e), i = t.getDataParams(e);
                    r.setItemVisual(e, "symbolSize", o(n, i))
                }), r.each(function (t) {
                    var e = r.getItemModel(t), n = e.getShallow("symbol", !0), i = e.getShallow("symbolSize", !0);
                    null != n && r.setItemVisual(t, "symbol", n), null != i && r.setItemVisual(t, "symbolSize", i)
                }))
            })
        }
    }, function (t, e, n) {
        var i = n(32);
        t.exports = function () {
            if (0 !== i.debugMode)if (1 == i.debugMode)for (var t in arguments)throw new Error(arguments[t]); else if (i.debugMode > 1)for (var t in arguments)console.log(arguments[t])
        }
    }, function (t, e, n) {
        function i(t) {
            r.call(this, t)
        }

        var r = n(36), a = n(8), o = n(1), s = n(150), l = new s(50);
        i.prototype = {
            constructor: i, type: "image", brush: function (t, e) {
                var n, i = this.style, r = i.image;
                if (i.bind(t, this, e), n = "string" == typeof r ? this._image : r, !n && r) {
                    var a = l.get(r);
                    if (!a)return n = new Image, n.onload = function () {
                        n.onload = null;
                        for (var t = 0; t < a.pending.length; t++)a.pending[t].dirty()
                    }, a = {image: n, pending: [this]}, n.src = r, l.put(r, a), void(this._image = n);
                    if (n = a.image, this._image = n, !n.width || !n.height)return void a.pending.push(this)
                }
                if (n) {
                    var o = i.width || n.width, s = i.height || n.height, h = i.x || 0, u = i.y || 0;
                    if (!n.width || !n.height)return;
                    if (this.setTransform(t), i.sWidth && i.sHeight) {
                        var c = i.sx || 0, f = i.sy || 0;
                        t.drawImage(n, c, f, i.sWidth, i.sHeight, h, u, o, s)
                    } else if (i.sx && i.sy) {
                        var c = i.sx, f = i.sy, d = o - c, p = s - f;
                        t.drawImage(n, c, f, d, p, h, u, o, s)
                    } else t.drawImage(n, h, u, o, s);
                    null == i.width && (i.width = o), null == i.height && (i.height = s), this.restoreTransform(t), null != i.text && this.drawRectText(t, this.getBoundingRect())
                }
            }, getBoundingRect: function () {
                var t = this.style;
                return this._rect || (this._rect = new a(t.x || 0, t.y || 0, t.width || 0, t.height || 0)), this._rect
            }
        }, o.inherits(i, r), t.exports = i
    }, function (t, e, n) {
        function i(t) {
            return t = t instanceof Array ? t.slice() : [+t, +t], t[0] /= 2, t[1] /= 2, t
        }

        function r(t, e, n) {
            l.Group.call(this), this.updateData(t, e, n)
        }

        function a(t, e) {
            this.parent.drift(t, e)
        }

        var o = n(1), s = n(26), l = n(3), h = n(4), u = r.prototype;
        u._createSymbol = function (t, e, n) {
            this.removeAll();
            var r = e.hostModel, o = e.getItemVisual(n, "color"), h = s.createSymbol(t, -1, -1, 2, 2, o);
            h.attr({z2: 100, culling: !0, scale: [0, 0]}), h.drift = a;
            var u = i(e.getItemVisual(n, "symbolSize"));
            l.initProps(h, {scale: u}, r, n), this._symbolType = t, this.add(h)
        }, u.stopSymbolAnimation = function (t) {
            this.childAt(0).stopAnimation(t)
        }, u.getSymbolPath = function () {
            return this.childAt(0)
        }, u.getScale = function () {
            return this.childAt(0).scale
        }, u.highlight = function () {
            this.childAt(0).trigger("emphasis")
        }, u.downplay = function () {
            this.childAt(0).trigger("normal")
        }, u.setZ = function (t, e) {
            var n = this.childAt(0);
            n.zlevel = t, n.z = e
        }, u.setDraggable = function (t) {
            var e = this.childAt(0);
            e.draggable = t, e.cursor = t ? "move" : "pointer"
        }, u.updateData = function (t, e, n) {
            this.silent = !1;
            var r = t.getItemVisual(e, "symbol") || "circle", a = t.hostModel, o = i(t.getItemVisual(e, "symbolSize"));
            if (r !== this._symbolType)this._createSymbol(r, t, e); else {
                var s = this.childAt(0);
                l.updateProps(s, {scale: o}, a, e)
            }
            this._updateCommon(t, e, o, n), this._seriesModel = a
        };
        var c = ["itemStyle", "normal"], f = ["itemStyle", "emphasis"], d = ["label", "normal"], p = ["label", "emphasis"];
        u._updateCommon = function (t, e, n, r) {
            var a = this.childAt(0), s = t.hostModel, u = t.getItemVisual(e, "color");
            "image" !== a.type && a.useStyle({strokeNoScale: !0}), r = r || null;
            var g = r && r.itemStyle, v = r && r.hoverItemStyle, m = r && r.symbolRotate, y = r && r.symbolOffset, _ = r && r.labelModel, x = r && r.hoverLabelModel, b = r && r.hoverAnimation;
            if (!r || t.hasItemOption) {
                var w = t.getItemModel(e);
                g = w.getModel(c).getItemStyle(["color"]), v = w.getModel(f).getItemStyle(), m = w.getShallow("symbolRotate"), y = w.getShallow("symbolOffset"), _ = w.getModel(d), x = w.getModel(p), b = w.getShallow("hoverAnimation")
            } else v = o.extend({}, v);
            var M = a.style;
            a.attr("rotation", (m || 0) * Math.PI / 180 || 0), y && a.attr("position", [h.parsePercent(y[0], n[0]), h.parsePercent(y[1], n[1])]), a.setColor(u), a.setStyle(g);
            var T = t.getItemVisual(e, "opacity");
            null != T && (M.opacity = T);
            for (var S, A, I = t.dimensions.slice(); I.length && (S = I.pop(), A = t.getDimensionInfo(S).type, "ordinal" === A || "time" === A););
            null != S && _.getShallow("show") ? (l.setText(M, _, u), M.text = o.retrieve(s.getFormattedLabel(e, "normal"), t.get(S, e))) : M.text = "", null != S && x.getShallow("show") ? (l.setText(v, x, u), v.text = o.retrieve(s.getFormattedLabel(e, "emphasis"), t.get(S, e))) : v.text = "";
            var C = i(t.getItemVisual(e, "symbolSize"));
            if (a.off("mouseover").off("mouseout").off("emphasis").off("normal"), a.hoverStyle = v, l.setHoverStyle(a), b && s.ifEnableAnimation()) {
                var L = function () {
                    var t = C[1] / C[0];
                    this.animateTo({scale: [Math.max(1.1 * C[0], C[0] + 3), Math.max(1.1 * C[1], C[1] + 3 * t)]}, 400, "elasticOut")
                }, k = function () {
                    this.animateTo({scale: C}, 400, "elasticOut")
                };
                a.on("mouseover", L).on("mouseout", k).on("emphasis", L).on("normal", k)
            }
        }, u.fadeOut = function (t) {
            var e = this.childAt(0);
            this.silent = !0, e.style.text = "", l.updateProps(e, {scale: [0, 0]}, this._seriesModel, this.dataIndex, t)
        }, o.inherits(r, l.Group), t.exports = r
    }, function (t, e, n) {
        function i(t) {
            var e = {componentType: t.mainType};
            return e[t.mainType + "Index"] = t.componentIndex, e
        }

        function r(t, e, n) {
            var i, r, a = f(e - t.rotation);
            return d(a) ? (r = n > 0 ? "top" : "bottom", i = "center") : d(a - m) ? (r = n > 0 ? "bottom" : "top", i = "center") : (r = "middle", i = a > 0 && a < m ? n > 0 ? "right" : "left" : n > 0 ? "left" : "right"), {
                rotation: a,
                textAlign: i,
                verticalAlign: r
            }
        }

        function a(t, e, n, i) {
            var r, a, o = f(n - t.rotation), s = i[0] > i[1], l = "start" === e && !s || "start" !== e && s;
            return d(o - m / 2) ? (a = l ? "bottom" : "top", r = "center") : d(o - 1.5 * m) ? (a = l ? "top" : "bottom", r = "center") : (a = "middle", r = o < 1.5 * m && o > m / 2 ? l ? "left" : "right" : l ? "right" : "left"), {
                rotation: o,
                textAlign: r,
                verticalAlign: a
            }
        }

        function o(t) {
            var e = t.get("tooltip");
            return t.get("silent") || !(t.get("triggerEvent") || e && e.show)
        }

        var s = n(1), l = n(9), h = n(3), u = n(10), c = n(4), f = c.remRadian, d = c.isRadianAroundZero, p = n(5), g = p.applyTransform, v = s.retrieve, m = Math.PI, y = function (t, e) {
            this.opt = e, this.axisModel = t, s.defaults(e, {
                labelOffset: 0,
                nameDirection: 1,
                tickDirection: 1,
                labelDirection: 1,
                silent: !0
            }), this.group = new h.Group;
            var n = new h.Group({position: e.position.slice(), rotation: e.rotation});
            n.updateTransform(), this._transform = n.transform, this._dumbGroup = n
        };
        y.prototype = {
            constructor: y, hasBuilder: function (t) {
                return !!_[t]
            }, add: function (t) {
                _[t].call(this)
            }, getGroup: function () {
                return this.group
            }
        };
        var _ = {
            axisLine: function () {
                var t = this.opt, e = this.axisModel;
                if (e.get("axisLine.show")) {
                    var n = this.axisModel.axis.getExtent(), i = this._transform, r = [n[0], 0], a = [n[1], 0];
                    i && (g(r, r, i), g(a, a, i)), this.group.add(new h.Line(h.subPixelOptimizeLine({
                        anid: "line",
                        shape: {x1: r[0], y1: r[1], x2: a[0], y2: a[1]},
                        style: s.extend({lineCap: "round"}, e.getModel("axisLine.lineStyle").getLineStyle()),
                        strokeContainThreshold: t.strokeContainThreshold || 5,
                        silent: !0,
                        z2: 1
                    })))
                }
            }, axisTick: function () {
                var t = this.axisModel;
                if (t.get("axisTick.show"))for (var e = t.axis, n = t.getModel("axisTick"), i = this.opt, r = n.getModel("lineStyle"), a = n.get("length"), o = b(n, i.labelInterval), l = e.getTicksCoords(n.get("alignWithLabel")), u = e.scale.getTicks(), c = [], f = [], d = this._transform, p = 0; p < l.length; p++)if (!x(e, p, o)) {
                    var v = l[p];
                    c[0] = v, c[1] = 0, f[0] = v, f[1] = i.tickDirection * a, d && (g(c, c, d), g(f, f, d)), this.group.add(new h.Line(h.subPixelOptimizeLine({
                        anid: "tick_" + u[p],
                        shape: {x1: c[0], y1: c[1], x2: f[0], y2: f[1]},
                        style: s.defaults(r.getLineStyle(), {stroke: t.get("axisLine.lineStyle.color")}),
                        z2: 2,
                        silent: !0
                    })))
                }
            }, axisLabel: function () {
                function t(t, e) {
                    var n = t && t.getBoundingRect().clone(), i = e && e.getBoundingRect().clone();
                    if (n && i)return n.applyTransform(t.getLocalTransform()), i.applyTransform(e.getLocalTransform()), n.intersect(i)
                }

                var e = this.opt, n = this.axisModel, a = v(e.axisLabelShow, n.get("axisLabel.show"));
                if (a) {
                    var l = n.axis, c = n.getModel("axisLabel"), f = c.getModel("textStyle"), d = c.get("margin"), p = l.scale.getTicks(), g = n.getFormattedLabels(), y = v(e.labelRotation, c.get("rotate")) || 0;
                    y = y * m / 180;
                    var _ = r(e, y, e.labelDirection), b = n.get("data"), w = [], M = o(n), T = n.get("triggerEvent");
                    if (s.each(p, function (t, r) {
                            if (!x(l, r, e.labelInterval)) {
                                var a = f;
                                b && b[t] && b[t].textStyle && (a = new u(b[t].textStyle, f, n.ecModel));
                                var o = a.getTextColor() || n.get("axisLine.lineStyle.color"), s = l.dataToCoord(t), c = [s, e.labelOffset + e.labelDirection * d], p = l.scale.getLabel(t), v = new h.Text({
                                    anid: "label_" + t,
                                    style: {
                                        text: g[r],
                                        textAlign: a.get("align", !0) || _.textAlign,
                                        textVerticalAlign: a.get("baseline", !0) || _.verticalAlign,
                                        textFont: a.getFont(),
                                        fill: "function" == typeof o ? o(p) : o
                                    },
                                    position: c,
                                    rotation: _.rotation,
                                    silent: M,
                                    z2: 10
                                });
                                T && (v.eventData = i(n), v.eventData.targetType = "axisLabel", v.eventData.value = p), this._dumbGroup.add(v), v.updateTransform(), w.push(v), this.group.add(v), v.decomposeTransform()
                            }
                        }, this), "category" !== l.type) {
                        if (n.getMin ? n.getMin() : n.get("min")) {
                            var S = w[0], A = w[1];
                            t(S, A) && (S.ignore = !0)
                        }
                        if (n.getMax ? n.getMax() : n.get("max")) {
                            var I = w[w.length - 1], C = w[w.length - 2];
                            t(C, I) && (I.ignore = !0)
                        }
                    }
                }
            }, axisName: function () {
                var t = this.opt, e = this.axisModel, n = v(t.axisName, e.get("name"));
                if (n) {
                    var u, c = e.get("nameLocation"), f = t.nameDirection, d = e.getModel("nameTextStyle"), p = e.get("nameGap") || 0, g = this.axisModel.axis.getExtent(), y = g[0] > g[1] ? -1 : 1, _ = ["start" === c ? g[0] - y * p : "end" === c ? g[1] + y * p : (g[0] + g[1]) / 2, "middle" === c ? t.labelOffset + f * p : 0], x = e.get("nameRotate");
                    null != x && (x = x * m / 180);
                    var b;
                    "middle" === c ? u = r(t, null != x ? x : t.rotation, f) : (u = a(t, c, x || 0, g), b = t.axisNameAvailableWidth, null != b && (b = Math.abs(b / Math.sin(u.rotation)), !isFinite(b) && (b = null)));
                    var w = d.getFont(), M = e.get("nameTruncate", !0) || {}, T = M.ellipsis, S = v(M.maxWidth, b), A = null != T && null != S ? l.truncateText(n, S, w, T, {
                        minChar: 2,
                        placeholder: M.placeholder
                    }) : n, I = e.get("tooltip", !0), C = e.mainType, L = {componentType: C, name: n, $vars: ["name"]};
                    L[C + "Index"] = e.componentIndex;
                    var k = new h.Text({
                        anid: "name",
                        __fullText: n,
                        __truncatedText: A,
                        style: {
                            text: A,
                            textFont: w,
                            fill: d.getTextColor() || e.get("axisLine.lineStyle.color"),
                            textAlign: u.textAlign,
                            textVerticalAlign: u.verticalAlign
                        },
                        position: _,
                        rotation: u.rotation,
                        silent: o(e),
                        z2: 1,
                        tooltip: I && I.show ? s.extend({
                            content: n, formatter: function () {
                                return n
                            }, formatterParams: L
                        }, I) : null
                    });
                    e.get("triggerEvent") && (k.eventData = i(e), k.eventData.targetType = "axisName", k.eventData.name = n), this._dumbGroup.add(k), k.updateTransform(), this.group.add(k), k.decomposeTransform()
                }
            }
        }, x = y.ifIgnoreOnTick = function (t, e, n) {
            var i, r = t.scale;
            return "ordinal" === r.type && ("function" == typeof n ? (i = r.getTicks()[e], !n(i, r.getLabel(i))) : e % (n + 1))
        }, b = y.getInterval = function (t, e) {
            var n = t.get("interval");
            return null != n && "auto" != n || (n = e), n
        };
        t.exports = y
    }, function (t, e, n) {
        function i(t) {
            return o.isObject(t) && null != t.value ? t.value : t
        }

        function r() {
            return "category" === this.get("type") && o.map(this.get("data"), i)
        }

        function a() {
            return s.getFormattedLabels(this.axis, this.get("axisLabel.formatter"))
        }

        var o = n(1), s = n(22);
        t.exports = {getFormattedLabels: a, getCategories: r}
    }, function (t, e, n) {
        var i = n(82), r = n(1), a = n(13), o = n(12), s = ["value", "category", "time", "log"];
        t.exports = function (t, e, n, l) {
            r.each(s, function (a) {
                e.extend({
                    type: t + "Axis." + a, mergeDefaultAndTheme: function (e, i) {
                        var s = this.layoutMode, l = s ? o.getLayoutParams(e) : {}, h = i.getTheme();
                        r.merge(e, h.get(a + "Axis")), r.merge(e, this.getDefaultOption()), e.type = n(t, e), s && o.mergeLayoutParam(e, l, s)
                    }, defaultOption: r.mergeAll([{}, i[a + "Axis"], l], !0)
                })
            }), a.registerSubTypeDefaulter(t + "Axis", r.curry(n, t))
        }
    }, function (t, e, n) {
        function i(t, e) {
            return e.type || (e.data ? "category" : "value")
        }

        var r = n(13), a = n(1), o = n(53), s = r.extend({
            type: "cartesian2dAxis", axis: null, init: function () {
                s.superApply(this, "init", arguments), this.resetRange()
            }, mergeOption: function () {
                s.superApply(this, "mergeOption", arguments), this.resetRange()
            }, restoreData: function () {
                s.superApply(this, "restoreData", arguments), this.resetRange()
            }, findGridModel: function () {
                return this.ecModel.queryComponents({
                    mainType: "grid",
                    index: this.get("gridIndex"),
                    id: this.get("gridId")
                })[0]
            }
        });
        a.merge(s.prototype, n(52)), a.merge(s.prototype, n(83));
        var l = {offset: 0};
        o("x", s, i, l), o("y", s, i, l), t.exports = s
    }, function (t, e, n) {
        function i(t, e, n) {
            return t.findGridModel() === e
        }

        function r(t) {
            var e, n = t.model, i = n.getFormattedLabels(), r = n.getModel("axisLabel.textStyle"), a = 1, o = i.length;
            o > 40 && (a = Math.ceil(o / 40));
            for (var s = 0; s < o; s += a)if (!t.isLabelIgnored(s)) {
                var l = r.getTextRect(i[s]);
                e ? e.union(l) : e = l
            }
            return e
        }

        function a(t, e, n) {
            this._coordsMap = {}, this._coordsList = [], this._axesMap = {}, this._axesList = [], this._initCartesian(t, e, n), this._model = t
        }

        function o(t, e) {
            var n = t.getExtent(), i = n[0] + n[1];
            t.toGlobalCoord = "x" === t.dim ? function (t) {
                return t + e
            } : function (t) {
                return i - t + e
            }, t.toLocalCoord = "x" === t.dim ? function (t) {
                return t - e
            } : function (t) {
                return i - t + e
            }
        }

        function s(t, e) {
            return c.map(y, function (e) {
                var n = t.getReferringComponents(e)[0];
                return n
            })
        }

        function l(t) {
            return "cartesian2d" === t.get("coordinateSystem")
        }

        var h = n(12), u = n(22), c = n(1), f = n(119), d = n(117), p = c.each, g = u.ifAxisCrossZero, v = u.niceScaleExtent;
        n(120);
        var m = a.prototype;
        m.type = "grid", m.getRect = function () {
            return this._rect
        }, m.update = function (t, e) {
            function n(t) {
                var e = i[t];
                for (var n in e)if (e.hasOwnProperty(n)) {
                    var r = e[n];
                    if (r && ("category" === r.type || !g(r)))return !0
                }
                return !1
            }

            var i = this._axesMap;
            this._updateScale(t, this._model), p(i.x, function (t) {
                v(t, t.model)
            }), p(i.y, function (t) {
                v(t, t.model)
            }), p(i.x, function (t) {
                n("y") && (t.onZero = !1)
            }), p(i.y, function (t) {
                n("x") && (t.onZero = !1)
            }), this.resize(this._model, e)
        }, m.resize = function (t, e) {
            function n() {
                p(a, function (t) {
                    var e = t.isHorizontal(), n = e ? [0, i.width] : [0, i.height], r = t.inverse ? 1 : 0;
                    t.setExtent(n[r], n[1 - r]), o(t, e ? i.x : i.y)
                })
            }

            var i = h.getLayoutRect(t.getBoxLayoutParams(), {width: e.getWidth(), height: e.getHeight()});
            this._rect = i;
            var a = this._axesList;
            n(), t.get("containLabel") && (p(a, function (t) {
                if (!t.model.get("axisLabel.inside")) {
                    var e = r(t);
                    if (e) {
                        var n = t.isHorizontal() ? "height" : "width", a = t.model.get("axisLabel.margin");
                        i[n] -= e[n] + a, "top" === t.position ? i.y += e.height + a : "left" === t.position && (i.x += e.width + a)
                    }
                }
            }), n())
        }, m.getAxis = function (t, e) {
            var n = this._axesMap[t];
            if (null != n) {
                if (null == e)for (var i in n)if (n.hasOwnProperty(i))return n[i];
                return n[e]
            }
        }, m.getCartesian = function (t, e) {
            if (null != t && null != e) {
                var n = "x" + t + "y" + e;
                return this._coordsMap[n]
            }
            for (var i = 0, r = this._coordsList; i < r.length; i++)if (r[i].getAxis("x").index === t || r[i].getAxis("y").index === e)return r[i]
        }, m.convertToPixel = function (t, e, n) {
            var i = this._findConvertTarget(t, e);
            return i.cartesian ? i.cartesian.dataToPoint(n) : i.axis ? i.axis.toGlobalCoord(i.axis.dataToCoord(n)) : null
        }, m.convertFromPixel = function (t, e, n) {
            var i = this._findConvertTarget(t, e);
            return i.cartesian ? i.cartesian.pointToData(n) : i.axis ? i.axis.coordToData(i.axis.toLocalCoord(n)) : null
        }, m._findConvertTarget = function (t, e) {
            var n, i, r = e.seriesModel, a = e.xAxisModel || r && r.getReferringComponents("xAxis")[0], o = e.yAxisModel || r && r.getReferringComponents("yAxis")[0], s = e.gridModel, l = this._coordsList;
            if (r)n = r.coordinateSystem, c.indexOf(l, n) < 0 && (n = null); else if (a && o)n = this.getCartesian(a.componentIndex, o.componentIndex); else if (a)i = this.getAxis("x", a.componentIndex); else if (o)i = this.getAxis("y", o.componentIndex); else if (s) {
                var h = s.coordinateSystem;
                h === this && (n = this._coordsList[0])
            }
            return {cartesian: n, axis: i}
        }, m.containPoint = function (t) {
            var e = this._coordsList[0];
            if (e)return e.containPoint(t)
        }, m._initCartesian = function (t, e, n) {
            function r(n) {
                return function (r, l) {
                    if (i(r, t, e)) {
                        var h = r.get("position");
                        "x" === n ? "top" !== h && "bottom" !== h && (h = "bottom", a[h] && (h = "top" === h ? "bottom" : "top")) : "left" !== h && "right" !== h && (h = "left", a[h] && (h = "left" === h ? "right" : "left")), a[h] = !0;
                        var c = new d(n, u.createScaleByModel(r), [0, 0], r.get("type"), h), f = "category" === c.type;
                        c.onBand = f && r.get("boundaryGap"), c.inverse = r.get("inverse"), c.onZero = r.get("axisLine.onZero"), r.axis = c, c.model = r, c.grid = this, c.index = l, this._axesList.push(c), o[n][l] = c, s[n]++
                    }
                }
            }

            var a = {left: !1, right: !1, top: !1, bottom: !1}, o = {x: {}, y: {}}, s = {x: 0, y: 0};
            return e.eachComponent("xAxis", r("x"), this), e.eachComponent("yAxis", r("y"), this), s.x && s.y ? (this._axesMap = o, void p(o.x, function (t, e) {
                p(o.y, function (n, i) {
                    var r = "x" + e + "y" + i, a = new f(r);
                    a.grid = this, this._coordsMap[r] = a, this._coordsList.push(a), a.addAxis(t), a.addAxis(n)
                }, this)
            }, this)) : (this._axesMap = {}, void(this._axesList = []))
        }, m._updateScale = function (t, e) {
            function n(t, e, n) {
                p(n.coordDimToDataDim(e.dim), function (n) {
                    e.scale.unionExtent(t.getDataExtent(n, "ordinal" !== e.scale.type))
                })
            }

            c.each(this._axesList, function (t) {
                t.scale.setExtent(1 / 0, -(1 / 0))
            }), t.eachSeries(function (r) {
                if (l(r)) {
                    var a = s(r, t), o = a[0], h = a[1];
                    if (!i(o, e, t) || !i(h, e, t))return;
                    var u = this.getCartesian(o.componentIndex, h.componentIndex), c = r.getData(), f = u.getAxis("x"), d = u.getAxis("y");
                    "list" === c.type && (n(c, f, r), n(c, d, r))
                }
            }, this)
        };
        var y = ["xAxis", "yAxis"];
        a.create = function (t, e) {
            var n = [];
            return t.eachComponent("grid", function (i, r) {
                var o = new a(i, t, e);
                o.name = "grid_" + r, o.resize(i, e), i.coordinateSystem = o, n.push(o)
            }), t.eachSeries(function (e) {
                if (l(e)) {
                    var n = s(e, t), i = n[0], r = n[1], a = i.findGridModel(), o = a.coordinateSystem;
                    e.coordinateSystem = o.getCartesian(i.componentIndex, r.componentIndex)
                }
            }), n
        }, a.dimensions = f.prototype.dimensions, n(23).register("cartesian2d", a), t.exports = a
    }, function (t, e) {
        t.exports = function (t, e) {
            e.eachSeriesByType(t, function (t) {
                var e = t.getData(), n = t.coordinateSystem;
                if (n) {
                    var i = n.dimensions;
                    "singleAxis" === n.type ? e.each(i[0], function (t, i) {
                        e.setItemLayout(i, isNaN(t) ? [NaN, NaN] : n.dataToPoint(t))
                    }) : e.each(i, function (t, i, r) {
                        e.setItemLayout(r, isNaN(t) || isNaN(i) ? [NaN, NaN] : n.dataToPoint([t, i]))
                    }, !0)
                }
            })
        }
    }, function (t, e) {
        t.exports = {
            clearColorPalette: function () {
                this._colorIdx = 0, this._colorNameMap = {}
            }, getColorFromPalette: function (t, e) {
                e = e || this;
                var n = e._colorIdx || 0, i = e._colorNameMap || (e._colorNameMap = {});
                if (i[t])return i[t];
                var r = this.get("color", !0) || [];
                if (r.length) {
                    var a = r[n];
                    return t && (i[t] = a), e._colorIdx = (n + 1) % r.length, a
                }
            }
        }
    }, function (t, e, n) {
        var i = n(33), r = n(43), a = n(21), o = function () {
            this.group = new i, this.uid = r.getUID("viewComponent")
        };
        o.prototype = {
            constructor: o, init: function (t, e) {
            }, render: function (t, e, n, i) {
            }, dispose: function () {
            }
        };
        var s = o.prototype;
        s.updateView = s.updateLayout = s.updateVisual = function (t, e, n, i) {
        }, a.enableClassExtend(o), a.enableClassManagement(o, {registerWhenExtend: !0}), t.exports = o
    }, function (t, e, n) {
        var i = n(63), r = n(20), a = n(88), o = n(166), s = n(1), l = function (t) {
            a.call(this, t), r.call(this, t), o.call(this, t), this.id = t.id || i()
        };
        l.prototype = {
            type: "element", name: "", __zr: null, ignore: !1, clipPath: null, drift: function (t, e) {
                switch (this.draggable) {
                    case"horizontal":
                        e = 0;
                        break;
                    case"vertical":
                        t = 0
                }
                var n = this.transform;
                n || (n = this.transform = [1, 0, 0, 1, 0, 0]), n[4] += t, n[5] += e, this.decomposeTransform(), this.dirty(!1)
            }, beforeUpdate: function () {
            }, afterUpdate: function () {
            }, update: function () {
                this.updateTransform()
            }, traverse: function (t, e) {
            }, attrKV: function (t, e) {
                if ("position" === t || "scale" === t || "origin" === t) {
                    if (e) {
                        var n = this[t];
                        n || (n = this[t] = []), n[0] = e[0], n[1] = e[1]
                    }
                } else this[t] = e
            }, hide: function () {
                this.ignore = !0, this.__zr && this.__zr.refresh()
            }, show: function () {
                this.ignore = !1, this.__zr && this.__zr.refresh()
            }, attr: function (t, e) {
                if ("string" == typeof t)this.attrKV(t, e); else if (s.isObject(t))for (var n in t)t.hasOwnProperty(n) && this.attrKV(n, t[n]);
                return this.dirty(!1), this
            }, setClipPath: function (t) {
                var e = this.__zr;
                e && t.addSelfToZr(e), this.clipPath && this.clipPath !== t && this.removeClipPath(), this.clipPath = t, t.__zr = e, t.__clipTarget = this, this.dirty(!1)
            }, removeClipPath: function () {
                var t = this.clipPath;
                t && (t.__zr && t.removeSelfFromZr(t.__zr), t.__zr = null, t.__clipTarget = null, this.clipPath = null, this.dirty(!1))
            }, addSelfToZr: function (t) {
                this.__zr = t;
                var e = this.animators;
                if (e)for (var n = 0; n < e.length; n++)t.animation.addAnimator(e[n]);
                this.clipPath && this.clipPath.addSelfToZr(t)
            }, removeSelfFromZr: function (t) {
                this.__zr = null;
                var e = this.animators;
                if (e)for (var n = 0; n < e.length; n++)t.animation.removeAnimator(e[n]);
                this.clipPath && this.clipPath.removeSelfFromZr(t)
            }
        }, s.mixin(l, o), s.mixin(l, a), s.mixin(l, r), t.exports = l
    }, function (t, e, n) {
        function i(t, e) {
            return t[e]
        }

        function r(t, e, n) {
            t[e] = n
        }

        function a(t, e, n) {
            return (e - t) * n + t
        }

        function o(t, e, n) {
            return n > .5 ? e : t
        }

        function s(t, e, n, i, r) {
            var o = t.length;
            if (1 == r)for (var s = 0; s < o; s++)i[s] = a(t[s], e[s], n); else for (var l = t[0].length, s = 0; s < o; s++)for (var h = 0; h < l; h++)i[s][h] = a(t[s][h], e[s][h], n)
        }

        function l(t, e, n) {
            var i = t.length, r = e.length;
            if (i !== r) {
                var a = i > r;
                if (a)t.length = r; else for (var o = i; o < r; o++)t.push(1 === n ? e[o] : _.call(e[o]))
            }
            for (var s = t[0] && t[0].length, o = 0; o < t.length; o++)if (1 === n)isNaN(t[o]) && (t[o] = e[o]); else for (var l = 0; l < s; l++)isNaN(t[o][l]) && (t[o][l] = e[o][l])
        }

        function h(t, e, n) {
            if (t === e)return !0;
            var i = t.length;
            if (i !== e.length)return !1;
            if (1 === n) {
                for (var r = 0; r < i; r++)if (t[r] !== e[r])return !1
            } else for (var a = t[0].length, r = 0; r < i; r++)for (var o = 0; o < a; o++)if (t[r][o] !== e[r][o])return !1;
            return !0
        }

        function u(t, e, n, i, r, a, o, s, l) {
            var h = t.length;
            if (1 == l)for (var u = 0; u < h; u++)s[u] = c(t[u], e[u], n[u], i[u], r, a, o); else for (var f = t[0].length, u = 0; u < h; u++)for (var d = 0; d < f; d++)s[u][d] = c(t[u][d], e[u][d], n[u][d], i[u][d], r, a, o)
        }

        function c(t, e, n, i, r, a, o) {
            var s = .5 * (n - t), l = .5 * (i - e);
            return (2 * (e - n) + s + l) * o + (-3 * (e - n) - 2 * s - l) * a + s * r + e
        }

        function f(t) {
            if (y(t)) {
                var e = t.length;
                if (y(t[0])) {
                    for (var n = [], i = 0; i < e; i++)n.push(_.call(t[i]));
                    return n
                }
                return _.call(t)
            }
            return t
        }

        function d(t) {
            return t[0] = Math.floor(t[0]), t[1] = Math.floor(t[1]), t[2] = Math.floor(t[2]), "rgba(" + t.join(",") + ")"
        }

        function p(t, e, n, i, r) {
            var f = t._getter, p = t._setter, m = "spline" === e, _ = i.length;
            if (_) {
                var x, b = i[0].value, w = y(b), M = !1, T = !1, S = w && y(b[0]) ? 2 : 1;
                i.sort(function (t, e) {
                    return t.time - e.time
                }), x = i[_ - 1].time;
                for (var A = [], I = [], C = i[0].value, L = !0, k = 0; k < _; k++) {
                    A.push(i[k].time / x);
                    var P = i[k].value;
                    if (w && h(P, C, S) || !w && P === C || (L = !1), C = P, "string" == typeof P) {
                        var O = v.parse(P);
                        O ? (P = O, M = !0) : T = !0
                    }
                    I.push(P)
                }
                if (!L) {
                    for (var D = I[_ - 1], k = 0; k < _ - 1; k++)w ? l(I[k], D, S) : !isNaN(I[k]) || isNaN(D) || T || M || (I[k] = D);
                    w && l(f(t._target, r), D, S);
                    var E, z, R, B, N, F, G = 0, V = 0;
                    if (M)var q = [0, 0, 0, 0];
                    var H = function (t, e) {
                        var n;
                        if (e < 0)n = 0; else if (e < V) {
                            for (E = Math.min(G + 1, _ - 1), n = E; n >= 0 && !(A[n] <= e); n--);
                            n = Math.min(n, _ - 2)
                        } else {
                            for (n = G; n < _ && !(A[n] > e); n++);
                            n = Math.min(n - 1, _ - 2)
                        }
                        G = n, V = e;
                        var i = A[n + 1] - A[n];
                        if (0 !== i)if (z = (e - A[n]) / i, m)if (B = I[n], R = I[0 === n ? n : n - 1], N = I[n > _ - 2 ? _ - 1 : n + 1], F = I[n > _ - 3 ? _ - 1 : n + 2], w)u(R, B, N, F, z, z * z, z * z * z, f(t, r), S); else {
                            var l;
                            if (M)l = u(R, B, N, F, z, z * z, z * z * z, q, 1), l = d(q); else {
                                if (T)return o(B, N, z);
                                l = c(R, B, N, F, z, z * z, z * z * z)
                            }
                            p(t, r, l)
                        } else if (w)s(I[n], I[n + 1], z, f(t, r), S); else {
                            var l;
                            if (M)s(I[n], I[n + 1], z, q, 1), l = d(q); else {
                                if (T)return o(I[n], I[n + 1], z);
                                l = a(I[n], I[n + 1], z)
                            }
                            p(t, r, l)
                        }
                    }, W = new g({
                        target: t._target,
                        life: x,
                        loop: t._loop,
                        delay: t._delay,
                        onframe: H,
                        ondestroy: n
                    });
                    return e && "spline" !== e && (W.easing = e), W
                }
            }
        }

        var g = n(144), v = n(18), m = n(1), y = m.isArrayLike, _ = Array.prototype.slice, x = function (t, e, n, a) {
            this._tracks = {}, this._target = t, this._loop = e || !1, this._getter = n || i, this._setter = a || r, this._clipCount = 0, this._delay = 0, this._doneList = [], this._onframeList = [], this._clipList = []
        };
        x.prototype = {
            when: function (t, e) {
                var n = this._tracks;
                for (var i in e)if (e.hasOwnProperty(i)) {
                    if (!n[i]) {
                        n[i] = [];
                        var r = this._getter(this._target, i);
                        if (null == r)continue;
                        0 !== t && n[i].push({time: 0, value: f(r)})
                    }
                    n[i].push({time: t, value: e[i]})
                }
                return this
            }, during: function (t) {
                return this._onframeList.push(t), this
            }, _doneCallback: function () {
                this._tracks = {}, this._clipList.length = 0;
                for (var t = this._doneList, e = t.length, n = 0; n < e; n++)t[n].call(this)
            }, start: function (t) {
                var e, n = this, i = 0, r = function () {
                    i--, i || n._doneCallback()
                };
                for (var a in this._tracks)if (this._tracks.hasOwnProperty(a)) {
                    var o = p(this, t, r, this._tracks[a], a);
                    o && (this._clipList.push(o), i++, this.animation && this.animation.addClip(o), e = o)
                }
                if (e) {
                    var s = e.onframe;
                    e.onframe = function (t, e) {
                        s(t, e);
                        for (var i = 0; i < n._onframeList.length; i++)n._onframeList[i](t, e)
                    }
                }
                return i || this._doneCallback(), this
            }, stop: function (t) {
                for (var e = this._clipList, n = this.animation, i = 0; i < e.length; i++) {
                    var r = e[i];
                    t && r.onframe(this._target, 1), n && n.removeClip(r)
                }
                e.length = 0
            }, delay: function (t) {
                return this._delay = t, this
            }, done: function (t) {
                return t && this._doneList.push(t), this
            }, getClips: function () {
                return this._clipList
            }
        }, t.exports = x
    }, function (t, e) {
        t.exports = "undefined" != typeof window && (window.requestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function (t) {
                setTimeout(t, 16)
            }
    }, function (t, e) {
        var n = 2 * Math.PI;
        t.exports = {
            normalizeRadian: function (t) {
                return t %= n, t < 0 && (t += n), t
            }
        }
    }, function (t, e) {
        var n = 2311;
        t.exports = function () {
            return n++
        }
    }, function (t, e) {
        var n = function (t, e) {
            this.image = t, this.repeat = e, this.type = "pattern"
        };
        n.prototype.getCanvasPattern = function (t) {
            return this._canvasPattern || (this._canvasPattern = t.createPattern(this.image, this.repeat))
        }, t.exports = n
    }, function (t, e) {
        function n(t, e, n) {
            var i = e.x, r = e.x2, a = e.y, o = e.y2;
            e.global || (i = i * n.width + n.x, r = r * n.width + n.x, a = a * n.height + n.y, o = o * n.height + n.y);
            var s = t.createLinearGradient(i, a, r, o);
            return s
        }

        function i(t, e, n) {
            var i = n.width, r = n.height, a = Math.min(i, r), o = e.x, s = e.y, l = e.r;
            e.global || (o = o * i + n.x, s = s * r + n.y, l *= a);
            var h = t.createRadialGradient(o, s, 0, o, s, l);
            return h
        }

        var r = [["shadowBlur", 0], ["shadowOffsetX", 0], ["shadowOffsetY", 0], ["shadowColor", "#000"], ["lineCap", "butt"], ["lineJoin", "miter"], ["miterLimit", 10]], a = function (t) {
            this.extendFrom(t)
        };
        a.prototype = {
            constructor: a,
            fill: "#000000",
            stroke: null,
            opacity: 1,
            lineDash: null,
            lineDashOffset: 0,
            shadowBlur: 0,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            lineWidth: 1,
            strokeNoScale: !1,
            text: null,
            textFill: "#000",
            textStroke: null,
            textPosition: "inside",
            textBaseline: null,
            textAlign: null,
            textVerticalAlign: null,
            textDistance: 5,
            textShadowBlur: 0,
            textShadowOffsetX: 0,
            textShadowOffsetY: 0,
            textTransform: !1,
            textRotation: 0,
            blend: null,
            bind: function (t, e, n) {
                for (var i = this, a = n && n.style, o = !a, s = 0; s < r.length; s++) {
                    var l = r[s], h = l[0];
                    (o || i[h] !== a[h]) && (t[h] = i[h] || l[1])
                }
                if ((o || i.fill !== a.fill) && (t.fillStyle = i.fill), (o || i.stroke !== a.stroke) && (t.strokeStyle = i.stroke), (o || i.opacity !== a.opacity) && (t.globalAlpha = null == i.opacity ? 1 : i.opacity), (o || i.blend !== a.blend) && (t.globalCompositeOperation = i.blend || "source-over"), this.hasStroke()) {
                    var u = i.lineWidth;
                    t.lineWidth = u / (this.strokeNoScale && e && e.getLineScale ? e.getLineScale() : 1)
                }
            },
            hasFill: function () {
                var t = this.fill;
                return null != t && "none" !== t
            },
            hasStroke: function () {
                var t = this.stroke;
                return null != t && "none" !== t && this.lineWidth > 0
            },
            extendFrom: function (t, e) {
                if (t) {
                    var n = this;
                    for (var i in t)!t.hasOwnProperty(i) || !e && n.hasOwnProperty(i) || (n[i] = t[i])
                }
            },
            set: function (t, e) {
                "string" == typeof t ? this[t] = e : this.extendFrom(t, !0)
            },
            clone: function () {
                var t = new this.constructor;
                return t.extendFrom(this, !0), t
            },
            getGradient: function (t, e, r) {
                for (var a = "radial" === e.type ? i : n, o = a(t, e, r), s = e.colorStops, l = 0; l < s.length; l++)o.addColorStop(s[l].offset, s[l].color);
                return o
            }
        };
        for (var o = a.prototype, s = 0; s < r.length; s++) {
            var l = r[s];
            l[0] in o || (o[l[0]] = l[1])
        }
        a.getGradient = o.getGradient, t.exports = a
    }, function (t, e, n) {
        var i = n(156), r = n(155);
        t.exports = {
            buildPath: function (t, e, n) {
                var a = e.points, o = e.smooth;
                if (a && a.length >= 2) {
                    if (o && "spline" !== o) {
                        var s = r(a, o, n, e.smoothConstraint);
                        t.moveTo(a[0][0], a[0][1]);
                        for (var l = a.length, h = 0; h < (n ? l : l - 1); h++) {
                            var u = s[2 * h], c = s[2 * h + 1], f = a[(h + 1) % l];
                            t.bezierCurveTo(u[0], u[1], c[0], c[1], f[0], f[1])
                        }
                    } else {
                        "spline" === o && (a = i(a, n)), t.moveTo(a[0][0], a[0][1]);
                        for (var h = 1, d = a.length; h < d; h++)t.lineTo(a[h][0], a[h][1])
                    }
                    n && t.closePath()
                }
            }
        }
    }, function (t, e, n) {
        var i = n(1);
        t.exports = {
            updateSelectedMap: function (t) {
                this._selectTargetMap = i.reduce(t || [], function (t, e) {
                    return t[e.name] = e, t
                }, {})
            }, select: function (t) {
                var e = this._selectTargetMap, n = e[t], r = this.get("selectedMode");
                "single" === r && i.each(e, function (t) {
                    t.selected = !1
                }), n && (n.selected = !0)
            }, unSelect: function (t) {
                var e = this._selectTargetMap[t];
                e && (e.selected = !1)
            }, toggleSelected: function (t) {
                var e = this._selectTargetMap[t];
                if (null != e)return this[e.selected ? "unSelect" : "select"](t), e.selected
            }, isSelected: function (t) {
                var e = this._selectTargetMap[t];
                return e && e.selected
            }
        }
    }, , , , function (t, e) {
        t.exports = function (t, e) {
            var n = e.findComponents({mainType: "legend"});
            n && n.length && e.eachSeriesByType(t, function (t) {
                var e = t.getData();
                e.filterSelf(function (t) {
                    for (var i = e.getName(t), r = 0; r < n.length; r++)if (!n[r].isSelected(i))return !1;
                    return !0
                }, this)
            }, this)
        }
    }, , function (t, e) {
        t.exports = function (t, e) {
            var n = {};
            e.eachRawSeriesByType(t, function (t) {
                var i = t.getRawData(), r = {};
                if (!e.isSeriesFiltered(t)) {
                    var a = t.getData();
                    a.each(function (t) {
                        var e = a.getRawIndex(t);
                        r[e] = t
                    }), i.each(function (e) {
                        var o = i.getItemModel(e), s = r[e], l = null != s && a.getItemVisual(s, "color", !0);
                        if (l)i.setItemVisual(e, "color", l); else {
                            var h = o.get("itemStyle.normal.color") || t.getColorFromPalette(i.getName(e), n);
                            i.setItemVisual(e, "color", h), null != s && a.setItemVisual(s, "color", h)
                        }
                    })
                }
            })
        }
    }, function (t, e, n) {
        var i = n(5), r = n(17), a = {}, o = Math.min, s = Math.max, l = Math.sin, h = Math.cos, u = i.create(), c = i.create(), f = i.create(), d = 2 * Math.PI;
        a.fromPoints = function (t, e, n) {
            if (0 !== t.length) {
                var i, r = t[0], a = r[0], l = r[0], h = r[1], u = r[1];
                for (i = 1; i < t.length; i++)r = t[i], a = o(a, r[0]), l = s(l, r[0]), h = o(h, r[1]), u = s(u, r[1]);
                e[0] = a, e[1] = h, n[0] = l, n[1] = u
            }
        }, a.fromLine = function (t, e, n, i, r, a) {
            r[0] = o(t, n), r[1] = o(e, i), a[0] = s(t, n), a[1] = s(e, i)
        };
        var p = [], g = [];
        a.fromCubic = function (t, e, n, i, a, l, h, u, c, f) {
            var d, v = r.cubicExtrema, m = r.cubicAt, y = v(t, n, a, h, p);
            for (c[0] = 1 / 0, c[1] = 1 / 0, f[0] = -(1 / 0), f[1] = -(1 / 0), d = 0; d < y; d++) {
                var _ = m(t, n, a, h, p[d]);
                c[0] = o(_, c[0]), f[0] = s(_, f[0])
            }
            for (y = v(e, i, l, u, g), d = 0; d < y; d++) {
                var x = m(e, i, l, u, g[d]);
                c[1] = o(x, c[1]), f[1] = s(x, f[1])
            }
            c[0] = o(t, c[0]), f[0] = s(t, f[0]), c[0] = o(h, c[0]), f[0] = s(h, f[0]), c[1] = o(e, c[1]), f[1] = s(e, f[1]), c[1] = o(u, c[1]), f[1] = s(u, f[1])
        }, a.fromQuadratic = function (t, e, n, i, a, l, h, u) {
            var c = r.quadraticExtremum, f = r.quadraticAt, d = s(o(c(t, n, a), 1), 0), p = s(o(c(e, i, l), 1), 0), g = f(t, n, a, d), v = f(e, i, l, p);
            h[0] = o(t, a, g), h[1] = o(e, l, v), u[0] = s(t, a, g), u[1] = s(e, l, v)
        }, a.fromArc = function (t, e, n, r, a, o, s, p, g) {
            var v = i.min, m = i.max, y = Math.abs(a - o);
            if (y % d < 1e-4 && y > 1e-4)return p[0] = t - n, p[1] = e - r, g[0] = t + n, void(g[1] = e + r);
            if (u[0] = h(a) * n + t, u[1] = l(a) * r + e, c[0] = h(o) * n + t, c[1] = l(o) * r + e, v(p, u, c), m(g, u, c), a %= d, a < 0 && (a += d), o %= d, o < 0 && (o += d), a > o && !s ? o += d : a < o && s && (a += d), s) {
                var _ = o;
                o = a, a = _
            }
            for (var x = 0; x < o; x += Math.PI / 2)x > a && (f[0] = h(x) * n + t, f[1] = l(x) * r + e, v(p, f, p), m(g, f, g))
        }, t.exports = a
    }, function (t, e, n) {
        var i = n(36), r = n(1), a = n(16), o = function (t) {
            i.call(this, t)
        };
        o.prototype = {
            constructor: o, type: "text", brush: function (t, e) {
                var n = this.style, i = n.x || 0, r = n.y || 0, o = n.text;
                if (null != o && (o += ""), n.bind(t, this, e), o) {
                    this.setTransform(t);
                    var s, l = n.textAlign, h = n.textFont || n.font;
                    if (n.textVerticalAlign) {
                        var u = a.getBoundingRect(o, h, n.textAlign, "top");
                        switch (s = "middle", n.textVerticalAlign) {
                            case"middle":
                                r -= u.height / 2 - u.lineHeight / 2;
                                break;
                            case"bottom":
                                r -= u.height - u.lineHeight / 2;
                                break;
                            default:
                                r += u.lineHeight / 2
                        }
                    } else s = n.textBaseline;
                    t.font = h || "12px sans-serif", t.textAlign = l || "left", t.textAlign !== l && (t.textAlign = "left"), t.textBaseline = s || "alphabetic", t.textBaseline !== s && (t.textBaseline = "alphabetic");
                    for (var c = a.measureText("国", t.font).width, f = o.split("\n"), d = 0; d < f.length; d++)n.hasFill() && t.fillText(f[d], i, r), n.hasStroke() && t.strokeText(f[d], i, r), r += c;
                    this.restoreTransform(t)
                }
            }, getBoundingRect: function () {
                if (!this._rect) {
                    var t = this.style, e = t.textVerticalAlign, n = a.getBoundingRect(t.text + "", t.textFont || t.font, t.textAlign, e ? "top" : t.textBaseline);
                    switch (e) {
                        case"middle":
                            n.y -= n.height / 2;
                            break;
                        case"bottom":
                            n.y -= n.height
                    }
                    n.x += t.x || 0, n.y += t.y || 0, this._rect = n
                }
                return this._rect
            }
        }, r.inherits(o, i), t.exports = o
    }, function (t, e, n) {
        function i(t, e) {
            return "string" == typeof t ? t.lastIndexOf("%") >= 0 ? parseFloat(t) / 100 * e : parseFloat(t) : t
        }

        var r = n(16), a = n(8), o = new a, s = function () {
        };
        s.prototype = {
            constructor: s, drawRectText: function (t, e, n) {
                var a = this.style, s = a.text;
                if (null != s && (s += ""), s) {
                    t.save();
                    var l, h, u = a.textPosition, c = a.textDistance, f = a.textAlign, d = a.textFont || a.font, p = a.textBaseline, g = a.textVerticalAlign;
                    n = n || r.getBoundingRect(s, d, f, p);
                    var v = this.transform;
                    if (a.textTransform ? this.setTransform(t) : v && (o.copy(e), o.applyTransform(v), e = o), u instanceof Array) {
                        if (l = e.x + i(u[0], e.width), h = e.y + i(u[1], e.height), f = f || "left", p = p || "top", g) {
                            switch (g) {
                                case"middle":
                                    h -= n.height / 2 - n.lineHeight / 2;
                                    break;
                                case"bottom":
                                    h -= n.height - n.lineHeight / 2;
                                    break;
                                default:
                                    h += n.lineHeight / 2
                            }
                            p = "middle"
                        }
                    } else {
                        var m = r.adjustTextPositionOnRect(u, e, n, c);
                        l = m.x, h = m.y, f = f || m.textAlign, p = p || m.textBaseline
                    }
                    t.textAlign = f || "left", t.textBaseline = p || "alphabetic";
                    var y = a.textFill, _ = a.textStroke;
                    y && (t.fillStyle = y), _ && (t.strokeStyle = _), t.font = d || "12px sans-serif", t.shadowBlur = a.textShadowBlur, t.shadowColor = a.textShadowColor || "transparent", t.shadowOffsetX = a.textShadowOffsetX, t.shadowOffsetY = a.textShadowOffsetY;
                    var x = s.split("\n");
                    a.textRotation && (v && t.translate(v[4], v[5]), t.rotate(a.textRotation), v && t.translate(-v[4], -v[5]));
                    for (var b = 0; b < x.length; b++)y && t.fillText(x[b], l, h), _ && t.strokeText(x[b], l, h), h += n.lineHeight;
                    t.restore()
                }
            }
        }, t.exports = s
    }, function (t, e, n) {
        function i(t) {
            delete d[t]
        }

        var r = n(63), a = n(11), o = n(1), s = n(139), l = n(142), h = n(143), u = n(151), c = !a.canvasSupported, f = {canvas: n(141)}, d = {}, p = {};
        p.version = "3.2.2", p.init = function (t, e) {
            var n = new g(r(), t, e);
            return d[n.id] = n, n
        }, p.dispose = function (t) {
            if (t)t.dispose(); else {
                for (var e in d)d.hasOwnProperty(e) && d[e].dispose();
                d = {}
            }
            return p
        }, p.getInstance = function (t) {
            return d[t]
        }, p.registerPainter = function (t, e) {
            f[t] = e
        };
        var g = function (t, e, n) {
            n = n || {}, this.dom = e, this.id = t;
            var i = this, r = new l, d = n.renderer;
            if (c) {
                if (!f.vml)throw new Error("You need to require 'zrender/vml/vml' to support IE8");
                d = "vml"
            } else d && f[d] || (d = "canvas");
            var p = new f[d](e, r, n);
            this.storage = r, this.painter = p;
            var g = a.node ? null : new u(p.getViewportRoot());
            this.handler = new s(r, p, g, p.root), this.animation = new h({stage: {update: o.bind(this.flush, this)}}), this.animation.start(), this._needsRefresh;
            var v = r.delFromMap, m = r.addToMap;
            r.delFromMap = function (t) {
                var e = r.get(t);
                v.call(r, t), e && e.removeSelfFromZr(i)
            }, r.addToMap = function (t) {
                m.call(r, t), t.addSelfToZr(i)
            }
        };
        g.prototype = {
            constructor: g, getId: function () {
                return this.id
            }, add: function (t) {
                this.storage.addRoot(t), this._needsRefresh = !0
            }, remove: function (t) {
                this.storage.delRoot(t), this._needsRefresh = !0
            }, configLayer: function (t, e) {
                this.painter.configLayer(t, e), this._needsRefresh = !0
            }, refreshImmediately: function () {
                this._needsRefresh = !1, this.painter.refresh(), this._needsRefresh = !1
            }, refresh: function () {
                this._needsRefresh = !0
            }, flush: function () {
                this._needsRefresh && this.refreshImmediately(), this._needsRefreshHover && this.refreshHoverImmediately()
            }, addHover: function (t, e) {
                this.painter.addHover && (this.painter.addHover(t, e), this.refreshHover())
            }, removeHover: function (t) {
                this.painter.removeHover && (this.painter.removeHover(t), this.refreshHover())
            }, clearHover: function () {
                this.painter.clearHover && (this.painter.clearHover(), this.refreshHover())
            }, refreshHover: function () {
                this._needsRefreshHover = !0
            }, refreshHoverImmediately: function () {
                this._needsRefreshHover = !1, this.painter.refreshHover && this.painter.refreshHover()
            }, resize: function (t) {
                t = t || {}, this.painter.resize(t.width, t.height), this.handler.resize()
            }, clearAnimation: function () {
                this.animation.clear()
            }, getWidth: function () {
                return this.painter.getWidth()
            }, getHeight: function () {
                return this.painter.getHeight()
            }, pathToImage: function (t, e, n) {
                var i = r();
                return this.painter.pathToImage(i, t, e, n)
            }, setCursorStyle: function (t) {
                this.handler.setCursorStyle(t)
            }, on: function (t, e, n) {
                this.handler.on(t, e, n)
            }, off: function (t, e) {
                this.handler.off(t, e)
            }, trigger: function (t, e) {
                this.handler.trigger(t, e)
            }, clear: function () {
                this.storage.delRoot(), this.painter.clear()
            }, dispose: function () {
                this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, i(this.id)
            }
        }, t.exports = p
    }, function (t, e, n) {
        var i = n(2), r = n(1);
        t.exports = function (t, e) {
            r.each(e, function (e) {
                e.update = "updateView", i.registerAction(e, function (n, i) {
                    var r = {};
                    return i.eachComponent({mainType: "series", subType: t, query: n}, function (t) {
                        t[e.method] && t[e.method](n.name);
                        var i = t.getData();
                        i.each(function (e) {
                            var n = i.getName(e);
                            r[n] = t.isSelected(n) || !1
                        })
                    }), {name: n.name, selected: r}
                })
            })
        }
    }, , , , function (t, e, n) {
        var i = n(1), r = {
            show: !0,
            zlevel: 0,
            z: 0,
            inverse: !1,
            name: "",
            nameLocation: "end",
            nameRotate: null,
            nameTruncate: {maxWidth: null, ellipsis: "...", placeholder: "."},
            nameTextStyle: {},
            nameGap: 15,
            silent: !1,
            triggerEvent: !1,
            tooltip: {show: !1},
            axisLine: {show: !0, onZero: !0, lineStyle: {color: "#333", width: 1, type: "solid"}},
            axisTick: {show: !0, inside: !1, length: 5, lineStyle: {width: 1}},
            axisLabel: {show: !0, inside: !1, rotate: 0, margin: 8, textStyle: {fontSize: 12}},
            splitLine: {show: !0, lineStyle: {color: ["#ccc"], width: 1, type: "solid"}},
            splitArea: {show: !1, areaStyle: {color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"]}}
        }, a = i.merge({
            boundaryGap: !0,
            splitLine: {show: !1},
            axisTick: {alignWithLabel: !1, interval: "auto"},
            axisLabel: {interval: "auto"}
        }, r), o = i.merge({boundaryGap: [0, 0], splitNumber: 5}, r), s = i.defaults({
            scale: !0,
            min: "dataMin",
            max: "dataMax"
        }, o), l = i.defaults({logBase: 10}, o);
        l.scale = !0, t.exports = {categoryAxis: a, valueAxis: o, timeAxis: s, logAxis: l}
    }, function (t, e) {
        t.exports = {
            getMin: function () {
                var t = this.option, e = null != t.rangeStart ? t.rangeStart : t.min;
                return e instanceof Date && (e = +e), e
            }, getMax: function () {
                var t = this.option, e = null != t.rangeEnd ? t.rangeEnd : t.max;
                return e instanceof Date && (e = +e), e
            }, getNeedCrossZero: function () {
                var t = this.option;
                return null == t.rangeStart && null == t.rangeEnd && !t.scale
            }, setRange: function (t, e) {
                this.option.rangeStart = t, this.option.rangeEnd = e
            }, resetRange: function () {
                this.option.rangeStart = this.option.rangeEnd = null
            }
        }
    }, function (t, e) {
        t.exports = {
            containStroke: function (t, e, n, i, r, a, o) {
                if (0 === r)return !1;
                var s = r, l = 0, h = t;
                if (o > e + s && o > i + s || o < e - s && o < i - s || a > t + s && a > n + s || a < t - s && a < n - s)return !1;
                if (t === n)return Math.abs(a - t) <= s / 2;
                l = (e - i) / (t - n), h = (t * i - n * e) / (t - n);
                var u = l * a - o + h, c = u * u / (l * l + 1);
                return c <= s / 2 * s / 2
            }
        }
    }, function (t, e, n) {
        var i = n(17);
        t.exports = {
            containStroke: function (t, e, n, r, a, o, s, l, h) {
                if (0 === s)return !1;
                var u = s;
                if (h > e + u && h > r + u && h > o + u || h < e - u && h < r - u && h < o - u || l > t + u && l > n + u && l > a + u || l < t - u && l < n - u && l < a - u)return !1;
                var c = i.quadraticProjectPoint(t, e, n, r, a, o, l, h, null);
                return c <= u / 2
            }
        }
    }, function (t, e) {
        t.exports = function (t, e, n, i, r, a) {
            if (a > e && a > i || a < e && a < i)return 0;
            if (i === e)return 0;
            var o = i < e ? 1 : -1, s = (a - e) / (i - e);
            1 !== s && 0 !== s || (o = i < e ? .5 : -.5);
            var l = s * (n - t) + t;
            return l > r ? o : 0
        }
    }, function (t, e, n) {
        var i = n(1), r = n(37), a = function (t, e, n, i, a, o) {
            this.x = null == t ? 0 : t, this.y = null == e ? 0 : e, this.x2 = null == n ? 1 : n, this.y2 = null == i ? 0 : i, this.type = "linear", this.global = o || !1, r.call(this, a)
        };
        a.prototype = {constructor: a}, i.inherits(a, r), t.exports = a
    }, function (t, e, n) {
        function i(t) {
            return t > s || t < -s
        }

        var r = n(19), a = n(5), o = r.identity, s = 5e-5, l = function (t) {
            t = t || {}, t.position || (this.position = [0, 0]), null == t.rotation && (this.rotation = 0), t.scale || (this.scale = [1, 1]), this.origin = this.origin || null
        }, h = l.prototype;
        h.transform = null, h.needLocalTransform = function () {
            return i(this.rotation) || i(this.position[0]) || i(this.position[1]) || i(this.scale[0] - 1) || i(this.scale[1] - 1)
        }, h.updateTransform = function () {
            var t = this.parent, e = t && t.transform, n = this.needLocalTransform(), i = this.transform;
            return n || e ? (i = i || r.create(), n ? this.getLocalTransform(i) : o(i), e && (n ? r.mul(i, t.transform, i) : r.copy(i, t.transform)), this.transform = i, this.invTransform = this.invTransform || r.create(), void r.invert(this.invTransform, i)) : void(i && o(i))
        }, h.getLocalTransform = function (t) {
            t = t || [], o(t);
            var e = this.origin, n = this.scale, i = this.rotation, a = this.position;
            return e && (t[4] -= e[0], t[5] -= e[1]), r.scale(t, t, n), i && r.rotate(t, t, i), e && (t[4] += e[0], t[5] += e[1]), t[4] += a[0], t[5] += a[1], t
        }, h.setTransform = function (t) {
            var e = this.transform, n = t.dpr || 1;
            e ? t.setTransform(n * e[0], n * e[1], n * e[2], n * e[3], n * e[4], n * e[5]) : t.setTransform(n, 0, 0, n, 0, 0)
        }, h.restoreTransform = function (t) {
            var e = (this.transform, t.dpr || 1);
            t.setTransform(e, 0, 0, e, 0, 0)
        };
        var u = [];
        h.decomposeTransform = function () {
            if (this.transform) {
                var t = this.parent, e = this.transform;
                t && t.transform && (r.mul(u, t.invTransform, e), e = u);
                var n = e[0] * e[0] + e[1] * e[1], a = e[2] * e[2] + e[3] * e[3], o = this.position, s = this.scale;
                i(n - 1) && (n = Math.sqrt(n)), i(a - 1) && (a = Math.sqrt(a)), e[0] < 0 && (n = -n), e[3] < 0 && (a = -a), o[0] = e[4], o[1] = e[5], s[0] = n, s[1] = a, this.rotation = Math.atan2(-e[1] / a, e[0] / n)
            }
        }, h.getGlobalScale = function () {
            var t = this.transform;
            if (!t)return [1, 1];
            var e = Math.sqrt(t[0] * t[0] + t[1] * t[1]), n = Math.sqrt(t[2] * t[2] + t[3] * t[3]);
            return t[0] < 0 && (e = -e), t[3] < 0 && (n = -n), [e, n]
        }, h.transformCoordToLocal = function (t, e) {
            var n = [t, e], i = this.invTransform;
            return i && a.applyTransform(n, n, i), n
        }, h.transformCoordToGlobal = function (t, e) {
            var n = [t, e], i = this.transform;
            return i && a.applyTransform(n, n, i), n
        }, t.exports = l
    }, function (t, e, n) {
        function i(t) {
            r.each(a, function (e) {
                this[e] = r.bind(t[e], t)
            }, this)
        }

        var r = n(1), a = ["getDom", "getZr", "getWidth", "getHeight", "dispatchAction", "isDisposed", "on", "off", "getDataURL", "getConnectedDataURL", "getModel", "getOption"];
        t.exports = i
    }, function (t, e, n) {
        var i = n(1);
        n(55), n(91), n(92);
        var r = n(122), a = n(2);
        a.registerLayout(i.curry(r, "bar")), a.registerVisual(function (t) {
            t.eachSeriesByType("bar", function (t) {
                var e = t.getData();
                e.setVisual("legendSymbol", "roundRect")
            })
        }), n(35)
    }, function (t, e, n) {
        var i = n(15), r = n(34);
        t.exports = i.extend({
            type: "series.bar",
            dependencies: ["grid", "polar"],
            getInitialData: function (t, e) {
                return r(t.data, this, e)
            },
            getMarkerPosition: function (t) {
                var e = this.coordinateSystem;
                if (e) {
                    var n = e.dataToPoint(t, !0), i = this.getData(), r = i.getLayout("offset"), a = i.getLayout("size"), o = e.getBaseAxis().isHorizontal() ? 0 : 1;
                    return n[o] += r + a / 2, n
                }
                return [NaN, NaN]
            },
            brushSelector: "rect",
            defaultOption: {
                zlevel: 0,
                z: 2,
                coordinateSystem: "cartesian2d",
                legendHoverLink: !0,
                barMinHeight: 0,
                itemStyle: {normal: {}, emphasis: {}}
            }
        })
    }, function (t, e, n) {
        function i(t, e) {
            var n = t.width > 0 ? 1 : -1, i = t.height > 0 ? 1 : -1;
            e = Math.min(e, Math.abs(t.width), Math.abs(t.height)), t.x += n * e / 2, t.y += i * e / 2, t.width -= n * e, t.height -= i * e
        }

        var r = n(1), a = n(3);
        r.extend(n(10).prototype, n(93)), t.exports = n(2).extendChartView({
            type: "bar", render: function (t, e, n) {
                var i = t.get("coordinateSystem");
                return "cartesian2d" === i && this._renderOnCartesian(t, e, n), this.group
            }, dispose: r.noop, _renderOnCartesian: function (t, e, n) {
                function o(e, n) {
                    var o = l.getItemLayout(e), s = l.getItemModel(e).get(p) || 0;
                    i(o, s);
                    var h = new a.Rect({shape: r.extend({}, o)});
                    if (d) {
                        var u = h.shape, c = f ? "height" : "width", g = {};
                        u[c] = 0, g[c] = o[c], a[n ? "updateProps" : "initProps"](h, {shape: g}, t, e)
                    }
                    return h
                }

                var s = this.group, l = t.getData(), h = this._data, u = t.coordinateSystem, c = u.getBaseAxis(), f = c.isHorizontal(), d = t.get("animation"), p = ["itemStyle", "normal", "barBorderWidth"];
                l.diff(h).add(function (t) {
                    if (l.hasValue(t)) {
                        var e = o(t);
                        l.setItemGraphicEl(t, e), s.add(e)
                    }
                }).update(function (e, n) {
                    var r = h.getItemGraphicEl(n);
                    if (!l.hasValue(e))return void s.remove(r);
                    r || (r = o(e, !0));
                    var u = l.getItemLayout(e), c = l.getItemModel(e).get(p) || 0;
                    i(u, c), a.updateProps(r, {shape: u}, t, e), l.setItemGraphicEl(e, r), s.add(r)
                }).remove(function (e) {
                    var n = h.getItemGraphicEl(e);
                    n && (n.style.text = "", a.updateProps(n, {shape: {width: 0}}, t, e, function () {
                        s.remove(n)
                    }))
                }).execute(), this._updateStyle(t, l, f), this._data = l
            }, _updateStyle: function (t, e, n) {
                function i(t, e, n, i, r) {
                    a.setText(t, e, n), t.text = i, "outside" === t.textPosition && (t.textPosition = r)
                }

                e.eachItemGraphicEl(function (o, s) {
                    var l = e.getItemModel(s), h = e.getItemVisual(s, "color"), u = e.getItemVisual(s, "opacity"), c = e.getItemLayout(s), f = l.getModel("itemStyle.normal"), d = l.getModel("itemStyle.emphasis").getBarItemStyle();
                    o.setShape("r", f.get("barBorderRadius") || 0), o.useStyle(r.defaults({
                        fill: h,
                        opacity: u
                    }, f.getBarItemStyle()));
                    var p = n ? c.height > 0 ? "bottom" : "top" : c.width > 0 ? "left" : "right", g = l.getModel("label.normal"), v = l.getModel("label.emphasis"), m = o.style;
                    g.get("show") ? i(m, g, h, r.retrieve(t.getFormattedLabel(s, "normal"), t.getRawValue(s)), p) : m.text = "", v.get("show") ? i(d, v, h, r.retrieve(t.getFormattedLabel(s, "emphasis"), t.getRawValue(s)), p) : d.text = "", a.setHoverStyle(o, d)
                })
            }, remove: function (t, e) {
                var n = this.group;
                t.get("animation") ? this._data && this._data.eachItemGraphicEl(function (e) {
                    e.style.text = "", a.updateProps(e, {shape: {width: 0}}, t, e.dataIndex, function () {
                        n.remove(e)
                    })
                }) : n.removeAll()
            }
        })
    }, function (t, e, n) {
        var i = n(30)([["fill", "color"], ["stroke", "borderColor"], ["lineWidth", "borderWidth"], ["stroke", "barBorderColor"], ["lineWidth", "barBorderWidth"], ["opacity"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["shadowColor"]]);
        t.exports = {
            getBarItemStyle: function (t) {
                var e = i.call(this, t);
                if (this.getBorderLineDash) {
                    var n = this.getBorderLineDash();
                    n && (e.lineDash = n)
                }
                return e
            }
        }
    }, , , function (t, e, n) {
        var i = n(1), r = n(2), a = r.PRIORITY;
        n(97), n(98), r.registerVisual(i.curry(n(47), "line", "circle", "line")), r.registerLayout(i.curry(n(56), "line")), r.registerProcessor(a.PROCESSOR.STATISTIC, i.curry(n(134), "line")), n(35)
    }, function (t, e, n) {
        var i = n(34), r = n(15);
        t.exports = r.extend({
            type: "series.line",
            dependencies: ["grid", "polar"],
            getInitialData: function (t, e) {
                return i(t.data, this, e)
            },
            defaultOption: {
                zlevel: 0,
                z: 2,
                coordinateSystem: "cartesian2d",
                legendHoverLink: !0,
                hoverAnimation: !0,
                clipOverflow: !0,
                label: {normal: {position: "top"}},
                lineStyle: {normal: {width: 2, type: "solid"}},
                step: !1,
                smooth: !1,
                smoothMonotone: null,
                symbol: "emptyCircle",
                symbolSize: 4,
                symbolRotate: null,
                showSymbol: !0,
                showAllSymbol: !1,
                connectNulls: !1,
                sampling: "none",
                animationEasing: "linear",
                progressive: 0,
                hoverLayerThreshold: 1 / 0
            }
        })
    }, function (t, e, n) {
        function i(t, e) {
            if (t.length === e.length) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n], r = e[n];
                    if (i[0] !== r[0] || i[1] !== r[1])return
                }
                return !0
            }
        }

        function r(t) {
            return "number" == typeof t ? t : t ? .3 : 0
        }

        function a(t) {
            var e = t.getGlobalExtent();
            if (t.onBand) {
                var n = t.getBandWidth() / 2 - 1, i = e[1] > e[0] ? 1 : -1;
                e[0] += i * n, e[1] -= i * n
            }
            return e
        }

        function o(t) {
            return t >= 0 ? 1 : -1
        }

        function s(t, e) {
            var n = t.getBaseAxis(), i = t.getOtherAxis(n), r = n.onZero ? 0 : i.scale.getExtent()[0], a = i.dim, s = "x" === a || "radius" === a ? 1 : 0;
            return e.mapArray([a], function (i, l) {
                for (var h, u = e.stackedOn; u && o(u.get(a, l)) === o(i);) {
                    h = u;
                    break
                }
                var c = [];
                return c[s] = e.get(n.dim, l), c[1 - s] = h ? h.get(a, l, !0) : r, t.dataToPoint(c)
            }, !0)
        }

        function l(t, e, n) {
            var i = a(t.getAxis("x")), r = a(t.getAxis("y")), o = t.getBaseAxis().isHorizontal(), s = Math.min(i[0], i[1]), l = Math.min(r[0], r[1]), h = Math.max(i[0], i[1]) - s, u = Math.max(r[0], r[1]) - l, c = n.get("lineStyle.normal.width") || 2, f = n.get("clipOverflow") ? c / 2 : Math.max(h, u);
            o ? (l -= f, u += 2 * f) : (s -= f, h += 2 * f);
            var d = new m.Rect({shape: {x: s, y: l, width: h, height: u}});
            return e && (d.shape[o ? "width" : "height"] = 0, m.initProps(d, {shape: {width: h, height: u}}, n)), d
        }

        function h(t, e, n) {
            var i = t.getAngleAxis(), r = t.getRadiusAxis(), a = r.getExtent(), o = i.getExtent(), s = Math.PI / 180, l = new m.Sector({
                shape: {
                    cx: t.cx,
                    cy: t.cy,
                    r0: a[0],
                    r: a[1],
                    startAngle: -o[0] * s,
                    endAngle: -o[1] * s,
                    clockwise: i.inverse
                }
            });
            return e && (l.shape.endAngle = -o[0] * s, m.initProps(l, {shape: {endAngle: -o[1] * s}}, n)), l
        }

        function u(t, e, n) {
            return "polar" === t.type ? h(t, e, n) : l(t, e, n)
        }

        function c(t, e, n) {
            for (var i = e.getBaseAxis(), r = "x" === i.dim || "radius" === i.dim ? 0 : 1, a = [], o = 0; o < t.length - 1; o++) {
                var s = t[o + 1], l = t[o];
                a.push(l);
                var h = [];
                switch (n) {
                    case"end":
                        h[r] = s[r], h[1 - r] = l[1 - r], a.push(h);
                        break;
                    case"middle":
                        var u = (l[r] + s[r]) / 2, c = [];
                        h[r] = c[r] = u, h[1 - r] = l[1 - r], c[1 - r] = s[1 - r], a.push(h), a.push(c);
                        break;
                    default:
                        h[r] = l[r], h[1 - r] = s[1 - r], a.push(h)
                }
            }
            return t[o] && a.push(t[o]), a
        }

        function f(t, e) {
            var n = t.getVisual("visualMeta");
            if (n && n.length && t.count()) {
                for (var i, r = n.length - 1; r >= 0; r--)if (n[r].dimension < 2) {
                    i = n[r];
                    break
                }
                if (i && "cartesian2d" === e.type) {
                    var a = i.dimension, o = t.dimensions[a], s = e.getAxis(o), l = d.map(i.stops, function (t) {
                        return {coord: s.toGlobalCoord(s.dataToCoord(t.value)), color: t.color}
                    }), h = l.length, u = i.outerColors.slice();
                    h && l[0].coord > l[h - 1].coord && (l.reverse(), u.reverse());
                    var c = 10, f = l[0].coord - c, p = l[h - 1].coord + c, g = p - f;
                    if (g < .001)return "transparent";
                    d.each(l, function (t) {
                        t.offset = (t.coord - f) / g
                    }), l.push({
                        offset: h ? l[h - 1].offset : .5,
                        color: u[1] || "transparent"
                    }), l.unshift({offset: h ? l[0].offset : .5, color: u[0] || "transparent"});
                    var v = new m.LinearGradient(0, 0, 0, 0, l, !0);
                    return v[o] = f, v[o + "2"] = p, v
                }
            }
        }

        var d = n(1), p = n(39), g = n(50), v = n(99), m = n(3), y = n(6), _ = n(100), x = n(27);
        t.exports = x.extend({
            type: "line", init: function () {
                var t = new m.Group, e = new p;
                this.group.add(e.group), this._symbolDraw = e, this._lineGroup = t
            }, render: function (t, e, n) {
                var a = t.coordinateSystem, o = this.group, l = t.getData(), h = t.getModel("lineStyle.normal"), p = t.getModel("areaStyle.normal"), g = l.mapArray(l.getItemLayout, !0), v = "polar" === a.type, m = this._coordSys, y = this._symbolDraw, _ = this._polyline, x = this._polygon, b = this._lineGroup, w = t.get("animation"), M = !p.isEmpty(), T = s(a, l), S = t.get("showSymbol"), A = S && !v && !t.get("showAllSymbol") && this._getSymbolIgnoreFunc(l, a), I = this._data;
                I && I.eachItemGraphicEl(function (t, e) {
                    t.__temp && (o.remove(t), I.setItemGraphicEl(e, null))
                }), S || y.remove(), o.add(b);
                var C = !v && t.get("step");
                _ && m.type === a.type && C === this._step ? (M && !x ? x = this._newPolygon(g, T, a, w) : x && !M && (b.remove(x), x = this._polygon = null), b.setClipPath(u(a, !1, t)), S && y.updateData(l, A), l.eachItemGraphicEl(function (t) {
                    t.stopAnimation(!0)
                }), i(this._stackedOnPoints, T) && i(this._points, g) || (w ? this._updateAnimation(l, T, a, n, C) : (C && (g = c(g, a, C), T = c(T, a, C)), _.setShape({points: g}), x && x.setShape({
                    points: g,
                    stackedOnPoints: T
                })))) : (S && y.updateData(l, A), C && (g = c(g, a, C), T = c(T, a, C)), _ = this._newPolyline(g, a, w), M && (x = this._newPolygon(g, T, a, w)), b.setClipPath(u(a, !0, t)));
                var L = f(l, a) || l.getVisual("color");
                _.useStyle(d.defaults(h.getLineStyle(), {fill: "none", stroke: L, lineJoin: "bevel"}));
                var k = t.get("smooth");
                if (k = r(t.get("smooth")), _.setShape({
                        smooth: k,
                        smoothMonotone: t.get("smoothMonotone"),
                        connectNulls: t.get("connectNulls")
                    }), x) {
                    var P = l.stackedOn, O = 0;
                    if (x.useStyle(d.defaults(p.getAreaStyle(), {fill: L, opacity: .7, lineJoin: "bevel"})), P) {
                        var D = P.hostModel;
                        O = r(D.get("smooth"))
                    }
                    x.setShape({
                        smooth: k,
                        stackedOnSmooth: O,
                        smoothMonotone: t.get("smoothMonotone"),
                        connectNulls: t.get("connectNulls")
                    })
                }
                this._data = l, this._coordSys = a, this._stackedOnPoints = T, this._points = g, this._step = C
            }, dispose: function () {
            }, highlight: function (t, e, n, i) {
                var r = t.getData(), a = y.queryDataIndex(r, i);
                if (!(a instanceof Array) && null != a && a >= 0) {
                    var o = r.getItemGraphicEl(a);
                    if (!o) {
                        var s = r.getItemLayout(a);
                        if (!s)return;
                        o = new g(r, a), o.position = s, o.setZ(t.get("zlevel"), t.get("z")), o.ignore = isNaN(s[0]) || isNaN(s[1]), o.__temp = !0, r.setItemGraphicEl(a, o), o.stopSymbolAnimation(!0), this.group.add(o)
                    }
                    o.highlight()
                } else x.prototype.highlight.call(this, t, e, n, i)
            }, downplay: function (t, e, n, i) {
                var r = t.getData(), a = y.queryDataIndex(r, i);
                if (null != a && a >= 0) {
                    var o = r.getItemGraphicEl(a);
                    o && (o.__temp ? (r.setItemGraphicEl(a, null), this.group.remove(o)) : o.downplay())
                } else x.prototype.downplay.call(this, t, e, n, i)
            }, _newPolyline: function (t) {
                var e = this._polyline;
                return e && this._lineGroup.remove(e), e = new _.Polyline({
                    shape: {points: t},
                    silent: !0,
                    z2: 10
                }), this._lineGroup.add(e), this._polyline = e, e
            }, _newPolygon: function (t, e) {
                var n = this._polygon;
                return n && this._lineGroup.remove(n), n = new _.Polygon({
                    shape: {points: t, stackedOnPoints: e},
                    silent: !0
                }), this._lineGroup.add(n), this._polygon = n, n
            }, _getSymbolIgnoreFunc: function (t, e) {
                var n = e.getAxesByScale("ordinal")[0];
                if (n && n.isLabelIgnored)return d.bind(n.isLabelIgnored, n)
            }, _updateAnimation: function (t, e, n, i, r) {
                var a = this._polyline, o = this._polygon, s = t.hostModel, l = v(this._data, t, this._stackedOnPoints, e, this._coordSys, n), h = l.current, u = l.stackedOnCurrent, f = l.next, d = l.stackedOnNext;
                r && (h = c(l.current, n, r), u = c(l.stackedOnCurrent, n, r), f = c(l.next, n, r), d = c(l.stackedOnNext, n, r)), a.shape.__points = l.current, a.shape.points = h, m.updateProps(a, {shape: {points: f}}, s), o && (o.setShape({
                    points: h,
                    stackedOnPoints: u
                }), m.updateProps(o, {shape: {points: f, stackedOnPoints: d}}, s));
                for (var p = [], g = l.status, y = 0; y < g.length; y++) {
                    var _ = g[y].cmd;
                    if ("=" === _) {
                        var x = t.getItemGraphicEl(g[y].idx1);
                        x && p.push({el: x, ptIdx: y})
                    }
                }
                a.animators && a.animators.length && a.animators[0].during(function () {
                    for (var t = 0; t < p.length; t++) {
                        var e = p[t].el;
                        e.attr("position", a.shape.__points[p[t].ptIdx])
                    }
                })
            }, remove: function (t) {
                var e = this.group, n = this._data;
                this._lineGroup.removeAll(), this._symbolDraw.remove(!0), n && n.eachItemGraphicEl(function (t, i) {
                    t.__temp && (e.remove(t), n.setItemGraphicEl(i, null))
                }), this._polyline = this._polygon = this._coordSys = this._points = this._stackedOnPoints = this._data = null
            }
        })
    }, function (t, e) {
        function n(t) {
            return t >= 0 ? 1 : -1
        }

        function i(t, e, i) {
            for (var r, a = t.getBaseAxis(), o = t.getOtherAxis(a), s = a.onZero ? 0 : o.scale.getExtent()[0], l = o.dim, h = "x" === l || "radius" === l ? 1 : 0, u = e.stackedOn, c = e.get(l, i); u && n(u.get(l, i)) === n(c);) {
                r = u;
                break
            }
            var f = [];
            return f[h] = e.get(a.dim, i), f[1 - h] = r ? r.get(l, i, !0) : s, t.dataToPoint(f)
        }

        function r(t, e) {
            var n = [];
            return e.diff(t).add(function (t) {
                n.push({cmd: "+", idx: t})
            }).update(function (t, e) {
                n.push({cmd: "=", idx: e, idx1: t})
            }).remove(function (t) {
                n.push({cmd: "-", idx: t})
            }).execute(), n
        }

        t.exports = function (t, e, n, a, o, s) {
            for (var l = r(t, e), h = [], u = [], c = [], f = [], d = [], p = [], g = [], v = s.dimensions, m = 0; m < l.length; m++) {
                var y = l[m], _ = !0;
                switch (y.cmd) {
                    case"=":
                        var x = t.getItemLayout(y.idx), b = e.getItemLayout(y.idx1);
                        (isNaN(x[0]) || isNaN(x[1])) && (x = b.slice()), h.push(x), u.push(b), c.push(n[y.idx]), f.push(a[y.idx1]), g.push(e.getRawIndex(y.idx1));
                        break;
                    case"+":
                        var w = y.idx;
                        h.push(o.dataToPoint([e.get(v[0], w, !0), e.get(v[1], w, !0)])), u.push(e.getItemLayout(w).slice()), c.push(i(o, e, w)), f.push(a[w]), g.push(e.getRawIndex(w));
                        break;
                    case"-":
                        var w = y.idx, M = t.getRawIndex(w);
                        M !== w ? (h.push(t.getItemLayout(w)), u.push(s.dataToPoint([t.get(v[0], w, !0), t.get(v[1], w, !0)])), c.push(n[w]), f.push(i(s, t, w)), g.push(M)) : _ = !1
                }
                _ && (d.push(y), p.push(p.length))
            }
            p.sort(function (t, e) {
                return g[t] - g[e]
            });
            for (var T = [], S = [], A = [], I = [], C = [], m = 0; m < p.length; m++) {
                var w = p[m];
                T[m] = h[w], S[m] = u[w], A[m] = c[w], I[m] = f[w], C[m] = d[w]
            }
            return {current: T, next: S, stackedOnCurrent: A, stackedOnNext: I, status: C}
        }
    }, function (t, e, n) {
        function i(t) {
            return isNaN(t[0]) || isNaN(t[1])
        }

        function r(t, e, n, r, a, o, g, v, m, y, _) {
            for (var x = 0, b = n, w = 0; w < r; w++) {
                var M = e[b];
                if (b >= a || b < 0)break;
                if (i(M)) {
                    if (_) {
                        b += o;
                        continue
                    }
                    break
                }
                if (b === n)t[o > 0 ? "moveTo" : "lineTo"](M[0], M[1]), c(d, M); else if (m > 0) {
                    var T = b + o, S = e[T];
                    if (_)for (; S && i(e[T]);)T += o, S = e[T];
                    var A = .5, I = e[x], S = e[T];
                    if (!S || i(S))c(p, M); else {
                        i(S) && !_ && (S = M), s.sub(f, S, I);
                        var C, L;
                        if ("x" === y || "y" === y) {
                            var k = "x" === y ? 0 : 1;
                            C = Math.abs(M[k] - I[k]), L = Math.abs(M[k] - S[k])
                        } else C = s.dist(M, I), L = s.dist(M, S);
                        A = L / (L + C), u(p, M, f, -m * (1 - A))
                    }
                    l(d, d, v), h(d, d, g), l(p, p, v), h(p, p, g), t.bezierCurveTo(d[0], d[1], p[0], p[1], M[0], M[1]), u(d, M, f, m * A)
                } else t.lineTo(M[0], M[1]);
                x = b, b += o
            }
            return w
        }

        function a(t, e) {
            var n = [1 / 0, 1 / 0], i = [-(1 / 0), -(1 / 0)];
            if (e)for (var r = 0; r < t.length; r++) {
                var a = t[r];
                a[0] < n[0] && (n[0] = a[0]), a[1] < n[1] && (n[1] = a[1]), a[0] > i[0] && (i[0] = a[0]), a[1] > i[1] && (i[1] = a[1])
            }
            return {min: e ? n : i, max: e ? i : n}
        }

        var o = n(7), s = n(5), l = s.min, h = s.max, u = s.scaleAndAdd, c = s.copy, f = [], d = [], p = [];
        t.exports = {
            Polyline: o.extend({
                type: "ec-polyline",
                shape: {points: [], smooth: 0, smoothConstraint: !0, smoothMonotone: null, connectNulls: !1},
                style: {fill: null, stroke: "#000"},
                buildPath: function (t, e) {
                    var n = e.points, o = 0, s = n.length, l = a(n, e.smoothConstraint);
                    if (e.connectNulls) {
                        for (; s > 0 && i(n[s - 1]); s--);
                        for (; o < s && i(n[o]); o++);
                    }
                    for (; o < s;)o += r(t, n, o, s, s, 1, l.min, l.max, e.smooth, e.smoothMonotone, e.connectNulls) + 1
                }
            }),
            Polygon: o.extend({
                type: "ec-polygon",
                shape: {
                    points: [],
                    stackedOnPoints: [],
                    smooth: 0,
                    stackedOnSmooth: 0,
                    smoothConstraint: !0,
                    smoothMonotone: null,
                    connectNulls: !1
                },
                buildPath: function (t, e) {
                    var n = e.points, o = e.stackedOnPoints, s = 0, l = n.length, h = e.smoothMonotone, u = a(n, e.smoothConstraint), c = a(o, e.smoothConstraint);
                    if (e.connectNulls) {
                        for (; l > 0 && i(n[l - 1]); l--);
                        for (; s < l && i(n[s]); s++);
                    }
                    for (; s < l;) {
                        var f = r(t, n, s, l, l, 1, u.min, u.max, e.smooth, h, e.connectNulls);
                        r(t, o, s + f - 1, f, l, -1, c.min, c.max, e.stackedOnSmooth, h, e.connectNulls), s += f + 1, t.closePath()
                    }
                }
            })
        }
    }, function (t, e, n) {
        var i = n(1), r = n(2);
        n(102), n(103), n(78)("pie", [{
            type: "pieToggleSelect",
            event: "pieselectchanged",
            method: "toggleSelected"
        }, {type: "pieSelect", event: "pieselected", method: "select"}, {
            type: "pieUnSelect",
            event: "pieunselected",
            method: "unSelect"
        }]), r.registerVisual(i.curry(n(73), "pie")), r.registerLayout(i.curry(n(105), "pie")), r.registerProcessor(i.curry(n(71), "pie"))
    }, function (t, e, n) {
        var i = n(14), r = n(1), a = n(6), o = n(29), s = n(67), l = n(2).extendSeriesModel({
            type: "series.pie",
            init: function (t) {
                l.superApply(this, "init", arguments), this.legendDataProvider = function () {
                    return this._dataBeforeProcessed
                }, this.updateSelectedMap(t.data), this._defaultLabelLine(t)
            },
            mergeOption: function (t) {
                l.superCall(this, "mergeOption", t), this.updateSelectedMap(this.option.data)
            },
            getInitialData: function (t, e) {
                var n = o(["value"], t.data), r = new i(n, this);
                return r.initData(t.data), r
            },
            getDataParams: function (t) {
                var e = this._data, n = l.superCall(this, "getDataParams", t), i = e.getSum("value");
                return n.percent = i ? +(e.get("value", t) / i * 100).toFixed(2) : 0, n.$vars.push("percent"), n
            },
            _defaultLabelLine: function (t) {
                a.defaultEmphasis(t.labelLine, ["show"]);
                var e = t.labelLine.normal, n = t.labelLine.emphasis;
                e.show = e.show && t.label.normal.show, n.show = n.show && t.label.emphasis.show
            },
            defaultOption: {
                zlevel: 0,
                z: 2,
                legendHoverLink: !0,
                hoverAnimation: !0,
                center: ["50%", "50%"],
                radius: [0, "75%"],
                clockwise: !0,
                startAngle: 90,
                minAngle: 0,
                selectedOffset: 10,
                avoidLabelOverlap: !0,
                label: {normal: {rotate: !1, show: !0, position: "outer"}, emphasis: {}},
                labelLine: {
                    normal: {
                        show: !0,
                        length: 15,
                        length2: 15,
                        smooth: !1,
                        lineStyle: {width: 1, type: "solid"}
                    }
                },
                itemStyle: {normal: {borderWidth: 1}, emphasis: {}},
                animationEasing: "cubicOut",
                data: []
            }
        });
        r.mixin(l, s), t.exports = l
    }, function (t, e, n) {
        function i(t, e, n, i) {
            var a = e.getData(), o = this.dataIndex, s = a.getName(o), l = e.get("selectedOffset");
            i.dispatchAction({type: "pieToggleSelect", from: t, name: s, seriesId: e.id}), a.each(function (t) {
                r(a.getItemGraphicEl(t), a.getItemLayout(t), e.isSelected(a.getName(t)), l, n)
            })
        }

        function r(t, e, n, i, r) {
            var a = (e.startAngle + e.endAngle) / 2, o = Math.cos(a), s = Math.sin(a), l = n ? i : 0, h = [o * l, s * l];
            r ? t.animate().when(200, {position: h}).start("bounceOut") : t.attr("position", h)
        }

        function a(t, e) {
            function n() {
                a.ignore = a.hoverIgnore, o.ignore = o.hoverIgnore
            }

            function i() {
                a.ignore = a.normalIgnore, o.ignore = o.normalIgnore
            }

            s.Group.call(this);
            var r = new s.Sector({z2: 2}), a = new s.Polyline, o = new s.Text;
            this.add(r), this.add(a), this.add(o), this.updateData(t, e, !0), this.on("emphasis", n).on("normal", i).on("mouseover", n).on("mouseout", i)
        }

        function o(t, e, n, i, r) {
            var a = i.getModel("textStyle"), o = "inside" === r || "inner" === r;
            return {
                fill: a.getTextColor() || (o ? "#fff" : t.getItemVisual(e, "color")),
                opacity: t.getItemVisual(e, "opacity"),
                textFont: a.getFont(),
                text: l.retrieve(t.hostModel.getFormattedLabel(e, n), t.getName(e))
            }
        }

        var s = n(3), l = n(1), h = a.prototype;
        h.updateData = function (t, e, n) {
            function i() {
                o.stopAnimation(!0), o.animateTo({shape: {r: c.r + 10}}, 300, "elasticOut")
            }

            function a() {
                o.stopAnimation(!0), o.animateTo({shape: {r: c.r}}, 300, "elasticOut")
            }

            var o = this.childAt(0), h = t.hostModel, u = t.getItemModel(e), c = t.getItemLayout(e), f = l.extend({}, c);
            f.label = null, n ? (o.setShape(f), o.shape.endAngle = c.startAngle, s.updateProps(o, {shape: {endAngle: c.endAngle}}, h, e)) : s.updateProps(o, {shape: f}, h, e);
            var d = u.getModel("itemStyle"), p = t.getItemVisual(e, "color");
            o.useStyle(l.defaults({
                lineJoin: "bevel",
                fill: p
            }, d.getModel("normal").getItemStyle())), o.hoverStyle = d.getModel("emphasis").getItemStyle(), r(this, t.getItemLayout(e), u.get("selected"), h.get("selectedOffset"), h.get("animation")), o.off("mouseover").off("mouseout").off("emphasis").off("normal"), u.get("hoverAnimation") && h.ifEnableAnimation() && o.on("mouseover", i).on("mouseout", a).on("emphasis", i).on("normal", a), this._updateLabel(t, e), s.setHoverStyle(this)
        }, h._updateLabel = function (t, e) {
            var n = this.childAt(1), i = this.childAt(2), r = t.hostModel, a = t.getItemModel(e), l = t.getItemLayout(e), h = l.label, u = t.getItemVisual(e, "color");
            s.updateProps(n, {shape: {points: h.linePoints || [[h.x, h.y], [h.x, h.y], [h.x, h.y]]}}, r, e), s.updateProps(i, {
                style: {
                    x: h.x,
                    y: h.y
                }
            }, r, e), i.attr({
                style: {textVerticalAlign: h.verticalAlign, textAlign: h.textAlign, textFont: h.font},
                rotation: h.rotation,
                origin: [h.x, h.y],
                z2: 10
            });
            var c = a.getModel("label.normal"), f = a.getModel("label.emphasis"), d = a.getModel("labelLine.normal"), p = a.getModel("labelLine.emphasis"), g = c.get("position") || f.get("position");
            i.setStyle(o(t, e, "normal", c, g)), i.ignore = i.normalIgnore = !c.get("show"), i.hoverIgnore = !f.get("show"), n.ignore = n.normalIgnore = !d.get("show"), n.hoverIgnore = !p.get("show"), n.setStyle({
                stroke: u,
                opacity: t.getItemVisual(e, "opacity")
            }), n.setStyle(d.getModel("lineStyle").getLineStyle()), i.hoverStyle = o(t, e, "emphasis", f, g), n.hoverStyle = p.getModel("lineStyle").getLineStyle();
            var v = d.get("smooth");
            v && v === !0 && (v = .4), n.setShape({smooth: v})
        }, l.inherits(a, s.Group);
        var u = n(27).extend({
            type: "pie", init: function () {
                var t = new s.Group;
                this._sectorGroup = t
            }, render: function (t, e, n, r) {
                if (!r || r.from !== this.uid) {
                    var o = t.getData(), s = this._data, h = this.group, u = e.get("animation"), c = !s, f = l.curry(i, this.uid, t, u, n), d = t.get("selectedMode");
                    if (o.diff(s).add(function (t) {
                            var e = new a(o, t);
                            c && e.eachChild(function (t) {
                                t.stopAnimation(!0)
                            }), d && e.on("click", f), o.setItemGraphicEl(t, e), h.add(e)
                        }).update(function (t, e) {
                            var n = s.getItemGraphicEl(e);
                            n.updateData(o, t), n.off("click"), d && n.on("click", f), h.add(n), o.setItemGraphicEl(t, n)
                        }).remove(function (t) {
                            var e = s.getItemGraphicEl(t);
                            h.remove(e)
                        }).execute(), u && c && o.count() > 0) {
                        var p = o.getItemLayout(0), g = Math.max(n.getWidth(), n.getHeight()) / 2, v = l.bind(h.removeClipPath, h);
                        h.setClipPath(this._createClipPath(p.cx, p.cy, g, p.startAngle, p.clockwise, v, t))
                    }
                    this._data = o
                }
            }, dispose: function () {
            }, _createClipPath: function (t, e, n, i, r, a, o) {
                var l = new s.Sector({shape: {cx: t, cy: e, r0: 0, r: n, startAngle: i, endAngle: i, clockwise: r}});
                return s.initProps(l, {shape: {endAngle: i + (r ? 1 : -1) * Math.PI * 2}}, o, a), l
            }, containPoint: function (t, e) {
                var n = e.getData(), i = n.getItemLayout(0);
                if (i) {
                    var r = t[0] - i.cx, a = t[1] - i.cy, o = Math.sqrt(r * r + a * a);
                    return o <= i.r && o >= i.r0
                }
            }
        });
        t.exports = u
    }, function (t, e, n) {
        function i(t, e, n, i, r, a, o) {
            function s(e, n, i, r) {
                for (var a = e; a < n; a++)if (t[a].y += i, a > e && a + 1 < n && t[a + 1].y > t[a].y + t[a].height)return void l(a, i / 2);
                l(n - 1, i / 2)
            }

            function l(e, n) {
                for (var i = e; i >= 0 && (t[i].y -= n, !(i > 0 && t[i].y > t[i - 1].y + t[i - 1].height)); i--);
            }

            function h(t, e, n, i, r, a) {
                for (var o = a > 0 ? e ? Number.MAX_VALUE : 0 : e ? Number.MAX_VALUE : 0, s = 0, l = t.length; s < l; s++)if ("center" !== t[s].position) {
                    var h = Math.abs(t[s].y - i), u = t[s].len, c = t[s].len2, f = h < r + u ? Math.sqrt((r + u + c) * (r + u + c) - h * h) : Math.abs(t[s].x - n);
                    e && f >= o && (f = o - 10), !e && f <= o && (f = o + 10), t[s].x = n + f * a, o = f
                }
            }

            t.sort(function (t, e) {
                return t.y - e.y
            });
            for (var u, c = 0, f = t.length, d = [], p = [], g = 0; g < f; g++)u = t[g].y - c, u < 0 && s(g, f, -u, r), c = t[g].y + t[g].height;
            o - c < 0 && l(f - 1, c - o);
            for (var g = 0; g < f; g++)t[g].y >= n ? p.push(t[g]) : d.push(t[g]);
            h(d, !1, e, n, i, r), h(p, !0, e, n, i, r)
        }

        function r(t, e, n, r, a, o) {
            for (var s = [], l = [], h = 0; h < t.length; h++)t[h].x < e ? s.push(t[h]) : l.push(t[h]);
            i(l, e, n, r, 1, a, o), i(s, e, n, r, -1, a, o);
            for (var h = 0; h < t.length; h++) {
                var u = t[h].linePoints;
                if (u) {
                    var c = u[1][0] - u[2][0];
                    t[h].x < e ? u[2][0] = t[h].x + 3 : u[2][0] = t[h].x - 3, u[1][1] = u[2][1] = t[h].y, u[1][0] = u[2][0] + c
                }
            }
        }

        var a = n(16);
        t.exports = function (t, e, n, i) {
            var o, s, l = t.getData(), h = [], u = !1;
            l.each(function (n) {
                var i, r, c, f, d = l.getItemLayout(n), p = l.getItemModel(n), g = p.getModel("label.normal"), v = g.get("position") || p.get("label.emphasis.position"), m = p.getModel("labelLine.normal"), y = m.get("length"), _ = m.get("length2"), x = (d.startAngle + d.endAngle) / 2, b = Math.cos(x), w = Math.sin(x);
                o = d.cx, s = d.cy;
                var M = "inside" === v || "inner" === v;
                if ("center" === v)i = d.cx, r = d.cy, f = "center"; else {
                    var T = (M ? (d.r + d.r0) / 2 * b : d.r * b) + o, S = (M ? (d.r + d.r0) / 2 * w : d.r * w) + s;
                    if (i = T + 3 * b, r = S + 3 * w, !M) {
                        var A = T + b * (y + e - d.r), I = S + w * (y + e - d.r), C = A + (b < 0 ? -1 : 1) * _, L = I;
                        i = C + (b < 0 ? -5 : 5), r = L, c = [[T, S], [A, I], [C, L]]
                    }
                    f = M ? "center" : b > 0 ? "left" : "right"
                }
                var k = g.getModel("textStyle").getFont(), P = g.get("rotate") ? b < 0 ? -x + Math.PI : -x : 0, O = t.getFormattedLabel(n, "normal") || l.getName(n), D = a.getBoundingRect(O, k, f, "top");
                u = !!P, d.label = {
                    x: i,
                    y: r,
                    position: v,
                    height: D.height,
                    len: y,
                    len2: _,
                    linePoints: c,
                    textAlign: f,
                    verticalAlign: "middle",
                    font: k,
                    rotation: P
                }, M || h.push(d.label)
            }), !u && t.get("avoidLabelOverlap") && r(h, o, s, e, n, i)
        }
    }, function (t, e, n) {
        var i = n(4), r = i.parsePercent, a = n(104), o = n(1), s = 2 * Math.PI, l = Math.PI / 180;
        t.exports = function (t, e, n, h) {
            e.eachSeriesByType(t, function (t) {
                var e = t.get("center"), h = t.get("radius");
                o.isArray(h) || (h = [0, h]), o.isArray(e) || (e = [e, e]);
                var u = n.getWidth(), c = n.getHeight(), f = Math.min(u, c), d = r(e[0], u), p = r(e[1], c), g = r(h[0], f / 2), v = r(h[1], f / 2), m = t.getData(), y = -t.get("startAngle") * l, _ = t.get("minAngle") * l, x = m.getSum("value"), b = Math.PI / (x || m.count()) * 2, w = t.get("clockwise"), M = t.get("roseType"), T = m.getDataExtent("value");
                T[0] = 0;
                var S = s, A = 0, I = y, C = w ? 1 : -1;
                if (m.each("value", function (t, e) {
                        var n;
                        n = "area" !== M ? 0 === x ? b : t * b : s / (m.count() || 1), n < _ ? (n = _, S -= _) : A += t;
                        var r = I + C * n;
                        m.setItemLayout(e, {
                            angle: n,
                            startAngle: I,
                            endAngle: r,
                            clockwise: w,
                            cx: d,
                            cy: p,
                            r0: g,
                            r: M ? i.linearMap(t, T, [g, v]) : v
                        }), I = r
                    }, !0), S < s)if (S <= .001) {
                    var L = s / m.count();
                    m.each(function (t) {
                        var e = m.getItemLayout(t);
                        e.startAngle = y + C * t * L, e.endAngle = y + C * (t + 1) * L
                    })
                } else b = S / A, I = y, m.each("value", function (t, e) {
                    var n = m.getItemLayout(e), i = n.angle === _ ? _ : t * b;
                    n.startAngle = I, n.endAngle = I + C * i, I += C * i
                });
                a(t, v, u, c)
            })
        }
    }, function (t, e, n) {
        n(54), n(107)
    }, function (t, e, n) {
        function i(t, e) {
            function n(t, e) {
                var n = i.getAxis(t);
                return n.toGlobalCoord(n.dataToCoord(0))
            }

            var i = t.coordinateSystem, r = e.axis, a = {}, o = r.position, s = r.onZero ? "onZero" : o, l = r.dim, h = i.getRect(), u = [h.x, h.x + h.width, h.y, h.y + h.height], c = e.get("offset") || 0, f = {
                x: {
                    top: u[2] - c,
                    bottom: u[3] + c
                }, y: {left: u[0] - c, right: u[1] + c}
            };
            f.x.onZero = Math.max(Math.min(n("y"), f.x.bottom), f.x.top), f.y.onZero = Math.max(Math.min(n("x"), f.y.right), f.y.left), a.position = ["y" === l ? f.y[s] : u[0], "x" === l ? f.x[s] : u[3]], a.rotation = Math.PI / 2 * ("x" === l ? 0 : 1);
            var d = {top: -1, bottom: 1, left: -1, right: 1};
            a.labelDirection = a.tickDirection = a.nameDirection = d[o], r.onZero && (a.labelOffset = f[l][o] - f[l].onZero), e.getModel("axisTick").get("inside") && (a.tickDirection = -a.tickDirection), e.getModel("axisLabel").get("inside") && (a.labelDirection = -a.labelDirection);
            var p = e.getModel("axisLabel").get("rotate");
            return a.labelRotation = "top" === s ? -p : p, a.labelInterval = r.getLabelInterval(), a.z2 = 1, a
        }

        var r = n(1), a = n(3), o = n(51), s = o.ifIgnoreOnTick, l = o.getInterval, h = ["axisLine", "axisLabel", "axisTick", "axisName"], u = ["splitArea", "splitLine"], c = n(2).extendComponentView({
            type: "axis",
            render: function (t, e) {
                this.group.removeAll();
                var n = this._axisGroup;
                if (this._axisGroup = new a.Group, this.group.add(this._axisGroup), t.get("show")) {
                    var s = t.findGridModel(), l = i(s, t), c = new o(t, l);
                    r.each(h, c.add, c), this._axisGroup.add(c.getGroup()), r.each(u, function (e) {
                        t.get(e + ".show") && this["_" + e](t, s, l.labelInterval)
                    }, this), a.groupTransition(n, this._axisGroup, t)
                }
            },
            _splitLine: function (t, e, n) {
                var i = t.axis, o = t.getModel("splitLine"), h = o.getModel("lineStyle"), u = h.get("color"), c = l(o, n);
                u = r.isArray(u) ? u : [u];
                for (var f = e.coordinateSystem.getRect(), d = i.isHorizontal(), p = 0, g = i.getTicksCoords(), v = i.scale.getTicks(), m = [], y = [], _ = h.getLineStyle(), x = 0; x < g.length; x++)if (!s(i, x, c)) {
                    var b = i.toGlobalCoord(g[x]);
                    d ? (m[0] = b, m[1] = f.y, y[0] = b, y[1] = f.y + f.height) : (m[0] = f.x, m[1] = b, y[0] = f.x + f.width, y[1] = b);
                    var w = p++ % u.length;
                    this._axisGroup.add(new a.Line(a.subPixelOptimizeLine({
                        anid: "line_" + v[x],
                        shape: {x1: m[0], y1: m[1], x2: y[0], y2: y[1]},
                        style: r.defaults({stroke: u[w]}, _),
                        silent: !0
                    })))
                }
            },
            _splitArea: function (t, e, n) {
                var i = t.axis, o = t.getModel("splitArea"), h = o.getModel("areaStyle"), u = h.get("color"), c = e.coordinateSystem.getRect(), f = i.getTicksCoords(), d = i.scale.getTicks(), p = i.toGlobalCoord(f[0]), g = i.toGlobalCoord(f[0]), v = 0, m = l(o, n), y = h.getAreaStyle();
                u = r.isArray(u) ? u : [u];
                for (var _ = 1; _ < f.length; _++)if (!s(i, _, m)) {
                    var x, b, w, M, T = i.toGlobalCoord(f[_]);
                    i.isHorizontal() ? (x = p, b = c.y, w = T - x, M = c.height) : (x = c.x, b = g, w = c.width, M = T - b);
                    var S = v++ % u.length;
                    this._axisGroup.add(new a.Rect({
                        anid: "area_" + d[_],
                        shape: {x: x, y: b, width: w, height: M},
                        style: r.defaults({fill: u[S]}, y),
                        silent: !0
                    })), p = x + w, g = b + M
                }
            }
        });
        c.extend({type: "xAxis"}), c.extend({type: "yAxis"})
    }, , , , , , , , , , function (t, e, n) {
        var i = n(1), r = n(42), a = n(121), o = function (t, e, n, i, a) {
            r.call(this, t, e, n), this.type = i || "value", this.position = a || "bottom"
        };
        o.prototype = {
            constructor: o, index: 0, onZero: !1, model: null, isHorizontal: function () {
                var t = this.position;
                return "top" === t || "bottom" === t
            }, getGlobalExtent: function () {
                var t = this.getExtent();
                return t[0] = this.toGlobalCoord(t[0]), t[1] = this.toGlobalCoord(t[1]), t
            }, getLabelInterval: function () {
                var t = this._labelInterval;
                return t || (t = this._labelInterval = a(this)), t
            }, isLabelIgnored: function (t) {
                if ("category" === this.type) {
                    var e = this.getLabelInterval();
                    return "function" == typeof e && !e(t, this.scale.getLabel(t)) || t % (e + 1)
                }
            }, toLocalCoord: null, toGlobalCoord: null
        }, i.inherits(o, r), t.exports = o
    }, function (t, e, n) {
        function i(t) {
            return this._axes[t]
        }

        var r = n(1), a = function (t) {
            this._axes = {}, this._dimList = [], this.name = t || ""
        };
        a.prototype = {
            constructor: a, type: "cartesian", getAxis: function (t) {
                return this._axes[t]
            }, getAxes: function () {
                return r.map(this._dimList, i, this)
            }, getAxesByScale: function (t) {
                return t = t.toLowerCase(), r.filter(this.getAxes(), function (e) {
                    return e.scale.type === t
                })
            }, addAxis: function (t) {
                var e = t.dim;
                this._axes[e] = t, this._dimList.push(e)
            }, dataToCoord: function (t) {
                return this._dataCoordConvert(t, "dataToCoord")
            }, coordToData: function (t) {
                return this._dataCoordConvert(t, "coordToData")
            }, _dataCoordConvert: function (t, e) {
                for (var n = this._dimList, i = t instanceof Array ? [] : {}, r = 0; r < n.length; r++) {
                    var a = n[r], o = this._axes[a];
                    i[a] = o[e](t[a])
                }
                return i
            }
        }, t.exports = a
    }, function (t, e, n) {
        function i(t) {
            a.call(this, t)
        }

        var r = n(1), a = n(118);
        i.prototype = {
            constructor: i, type: "cartesian2d", dimensions: ["x", "y"], getBaseAxis: function () {
                return this.getAxesByScale("ordinal")[0] || this.getAxesByScale("time")[0] || this.getAxis("x")
            }, containPoint: function (t) {
                var e = this.getAxis("x"), n = this.getAxis("y");
                return e.contain(e.toLocalCoord(t[0])) && n.contain(n.toLocalCoord(t[1]))
            }, containData: function (t) {
                return this.getAxis("x").containData(t[0]) && this.getAxis("y").containData(t[1])
            }, dataToPoints: function (t, e) {
                return t.mapArray(["x", "y"], function (t, e) {
                    return this.dataToPoint([t, e])
                }, e, this)
            }, dataToPoint: function (t, e) {
                var n = this.getAxis("x"), i = this.getAxis("y");
                return [n.toGlobalCoord(n.dataToCoord(t[0], e)), i.toGlobalCoord(i.dataToCoord(t[1], e))]
            }, pointToData: function (t, e) {
                var n = this.getAxis("x"), i = this.getAxis("y");
                return [n.coordToData(n.toLocalCoord(t[0]), e), i.coordToData(i.toLocalCoord(t[1]), e)]
            }, getOtherAxis: function (t) {
                return this.getAxis("x" === t.dim ? "y" : "x")
            }
        }, r.inherits(i, a), t.exports = i
    }, function (t, e, n) {
        n(54);
        var i = n(13);
        t.exports = i.extend({
            type: "grid",
            dependencies: ["xAxis", "yAxis"],
            layoutMode: "box",
            coordinateSystem: null,
            defaultOption: {
                show: !1,
                zlevel: 0,
                z: 0,
                left: "10%",
                top: 60,
                right: "10%",
                bottom: 60,
                containLabel: !1,
                backgroundColor: "rgba(0,0,0,0)",
                borderWidth: 1,
                borderColor: "#ccc"
            }
        })
    }, function (t, e, n) {
        var i = n(1), r = n(22);
        t.exports = function (t) {
            var e = t.model, n = e.getModel("axisLabel"), a = n.get("interval");
            return "category" !== t.type || "auto" !== a ? "auto" === a ? 0 : a : r.getAxisLabelInterval(i.map(t.scale.getTicks(), t.dataToCoord, t), e.getFormattedLabels(), n.getModel("textStyle").getFont(), t.isHorizontal())
        }
    }, function (t, e, n) {
        function i(t) {
            return t.get("stack") || "__ec_stack_" + t.seriesIndex
        }

        function r(t) {
            return t.dim + t.index
        }

        function a(t, e) {
            var n = {};
            s.each(t, function (t, e) {
                var a = t.getData(), o = t.coordinateSystem, s = o.getBaseAxis(), l = s.getExtent(), u = "category" === s.type ? s.getBandWidth() : Math.abs(l[1] - l[0]) / a.count(), c = n[r(s)] || {
                        bandWidth: u,
                        remainedWidth: u,
                        autoWidthCount: 0,
                        categoryGap: "20%",
                        gap: "30%",
                        stacks: {}
                    }, f = c.stacks;
                n[r(s)] = c;
                var d = i(t);
                f[d] || c.autoWidthCount++, f[d] = f[d] || {width: 0, maxWidth: 0};
                var p = h(t.get("barWidth"), u), g = h(t.get("barMaxWidth"), u), v = t.get("barGap"), m = t.get("barCategoryGap");
                p && !f[d].width && (p = Math.min(c.remainedWidth, p), f[d].width = p, c.remainedWidth -= p), g && (f[d].maxWidth = g), null != v && (c.gap = v), null != m && (c.categoryGap = m)
            });
            var a = {};
            return s.each(n, function (t, e) {
                a[e] = {};
                var n = t.stacks, i = t.bandWidth, r = h(t.categoryGap, i), o = h(t.gap, 1), l = t.remainedWidth, u = t.autoWidthCount, c = (l - r) / (u + (u - 1) * o);
                c = Math.max(c, 0), s.each(n, function (t, e) {
                    var n = t.maxWidth;
                    !t.width && n && n < c && (n = Math.min(n, l), l -= n, t.width = n, u--)
                }), c = (l - r) / (u + (u - 1) * o), c = Math.max(c, 0);
                var f, d = 0;
                s.each(n, function (t, e) {
                    t.width || (t.width = c), f = t, d += t.width * (1 + o)
                }), f && (d -= f.width * o);
                var p = -d / 2;
                s.each(n, function (t, n) {
                    a[e][n] = a[e][n] || {offset: p, width: t.width}, p += t.width * (1 + o)
                })
            }), a
        }

        function o(t, e, n) {
            var o = a(s.filter(e.getSeriesByType(t), function (t) {
                return !e.isSeriesFiltered(t) && t.coordinateSystem && "cartesian2d" === t.coordinateSystem.type
            })), l = {}, h = {};
            e.eachSeriesByType(t, function (t) {
                var e = t.getData(), n = t.coordinateSystem, a = n.getBaseAxis(), s = i(t), u = o[r(a)][s], c = u.offset, f = u.width, d = n.getOtherAxis(a), p = t.get("barMinHeight") || 0, g = a.onZero ? d.toGlobalCoord(d.dataToCoord(0)) : d.getGlobalExtent()[0], v = n.dataToPoints(e, !0);
                l[s] = l[s] || [], h[s] = h[s] || [], e.setLayout({offset: c, size: f}), e.each(d.dim, function (t, n) {
                    if (!isNaN(t)) {
                        l[s][n] || (l[s][n] = {p: g, n: g}, h[s][n] = {p: g, n: g});
                        var i, r, a, o, u = t >= 0 ? "p" : "n", m = v[n], y = l[s][n][u], _ = h[s][n][u];
                        d.isHorizontal() ? (i = y, r = m[1] + c, a = m[0] - _, o = f, h[s][n][u] += a, Math.abs(a) < p && (a = (a < 0 ? -1 : 1) * p), l[s][n][u] += a) : (i = m[0] + c, r = y, a = f, o = m[1] - _, h[s][n][u] += o, Math.abs(o) < p && (o = (o <= 0 ? -1 : 1) * p), l[s][n][u] += o), e.setItemLayout(n, {
                            x: i,
                            y: r,
                            width: a,
                            height: o
                        })
                    }
                }, !0)
            }, this)
        }

        var s = n(1), l = n(4), h = l.parsePercent;
        t.exports = o
    }, function (t, e, n) {
        var i = n(3), r = n(1), a = Math.PI;
        t.exports = function (t, e) {
            e = e || {}, r.defaults(e, {
                text: "loading",
                color: "#c23531",
                textColor: "#000",
                maskColor: "rgba(255, 255, 255, 0.8)",
                zlevel: 0
            });
            var n = new i.Rect({
                style: {fill: e.maskColor},
                zlevel: e.zlevel,
                z: 1e4
            }), o = new i.Arc({
                shape: {startAngle: -a / 2, endAngle: -a / 2 + .1, r: 10},
                style: {stroke: e.color, lineCap: "round", lineWidth: 5},
                zlevel: e.zlevel,
                z: 10001
            }), s = new i.Rect({
                style: {
                    fill: "none",
                    text: e.text,
                    textPosition: "right",
                    textDistance: 10,
                    textFill: e.textColor
                }, zlevel: e.zlevel, z: 10001
            });
            o.animateShape(!0).when(1e3, {endAngle: 3 * a / 2}).start("circularInOut"), o.animateShape(!0).when(1e3, {startAngle: 3 * a / 2}).delay(300).start("circularInOut");
            var l = new i.Group;
            return l.add(o), l.add(s), l.add(n), l.resize = function () {
                var e = t.getWidth() / 2, i = t.getHeight() / 2;
                o.setShape({cx: e, cy: i});
                var r = o.shape.r;
                s.setShape({x: e - r, y: i - r, width: 2 * r, height: 2 * r}), n.setShape({
                    x: 0,
                    y: 0,
                    width: t.getWidth(),
                    height: t.getHeight()
                })
            }, l.resize(), l
        }
    }, function (t, e, n) {
        function i(t, e) {
            u.each(e, function (e, n) {
                _.hasClass(n) || ("object" == typeof e ? t[n] = t[n] ? u.merge(t[n], e, !1) : u.clone(e) : null == t[n] && (t[n] = e))
            })
        }

        function r(t) {
            t = t, this.option = {}, this.option[b] = 1, this._componentsMap = {}, this._seriesIndices = null, i(t, this._theme.option), u.merge(t, x, !1), this.mergeOption(t)
        }

        function a(t, e) {
            u.isArray(e) || (e = e ? [e] : []);
            var n = {};
            return d(e, function (e) {
                n[e] = (t[e] || []).slice()
            }), n
        }

        function o(t, e, n) {
            var i = e.type ? e.type : n ? n.subType : _.determineSubType(t, e);
            return i
        }

        function s(t) {
            return g(t, function (t) {
                    return t.componentIndex
                }) || []
        }

        function l(t, e) {
            return e.hasOwnProperty("subType") ? p(t, function (t) {
                return t.subType === e.subType
            }) : t
        }

        function h(t) {
        }

        var u = n(1), c = n(6), f = n(10), d = u.each, p = u.filter, g = u.map, v = u.isArray, m = u.indexOf, y = u.isObject, _ = n(13), x = n(126), b = "\x00_ec_inner", w = f.extend({
            constructor: w,
            init: function (t, e, n, i) {
                n = n || {}, this.option = null, this._theme = new f(n), this._optionManager = i
            },
            setOption: function (t, e) {
                u.assert(!(b in t), "please use chart.getOption()"), this._optionManager.setOption(t, e), this.resetOption()
            },
            resetOption: function (t) {
                var e = !1, n = this._optionManager;
                if (!t || "recreate" === t) {
                    var i = n.mountOption("recreate" === t);
                    this.option && "recreate" !== t ? (this.restoreData(), this.mergeOption(i)) : r.call(this, i), e = !0
                }
                if ("timeline" !== t && "media" !== t || this.restoreData(), !t || "recreate" === t || "timeline" === t) {
                    var a = n.getTimelineOption(this);
                    a && (this.mergeOption(a), e = !0)
                }
                if (!t || "recreate" === t || "media" === t) {
                    var o = n.getMediaOption(this, this._api);
                    o.length && d(o, function (t) {
                        this.mergeOption(t, e = !0)
                    }, this)
                }
                return e
            },
            mergeOption: function (t) {
                function e(e, r) {
                    var l = c.normalizeToArray(t[e]), h = c.mappingToExists(i[e], l);
                    c.makeIdAndName(h), d(h, function (t, n) {
                        var i = t.option;
                        y(i) && (t.keyInfo.mainType = e, t.keyInfo.subType = o(e, i, t.exist))
                    });
                    var f = a(i, r);
                    n[e] = [], i[e] = [], d(h, function (t, r) {
                        var a = t.exist, o = t.option;
                        if (u.assert(y(o) || a, "Empty component definition"), o) {
                            var s = _.getClass(e, t.keyInfo.subType, !0);
                            if (a && a instanceof s)a.name = t.keyInfo.name, a.mergeOption(o, this), a.optionUpdated(o, !1); else {
                                var l = u.extend({dependentModels: f, componentIndex: r}, t.keyInfo);
                                a = new s(o, this, this, l), u.extend(a, l), a.init(o, this, this, l), a.optionUpdated(null, !0)
                            }
                        } else a.mergeOption({}, this), a.optionUpdated({}, !1);
                        i[e][r] = a, n[e][r] = a.option
                    }, this), "series" === e && (this._seriesIndices = s(i.series))
                }

                var n = this.option, i = this._componentsMap, r = [];
                d(t, function (t, e) {
                    null != t && (_.hasClass(e) ? r.push(e) : n[e] = null == n[e] ? u.clone(t) : u.merge(n[e], t, !0))
                }), _.topologicalTravel(r, _.getAllClassMainTypes(), e, this), this._seriesIndices = this._seriesIndices || []
            },
            getOption: function () {
                var t = u.clone(this.option);
                return d(t, function (e, n) {
                    if (_.hasClass(n)) {
                        for (var e = c.normalizeToArray(e), i = e.length - 1; i >= 0; i--)c.isIdInner(e[i]) && e.splice(i, 1);
                        t[n] = e
                    }
                }), delete t[b], t
            },
            getTheme: function () {
                return this._theme
            },
            getComponent: function (t, e) {
                var n = this._componentsMap[t];
                if (n)return n[e || 0]
            },
            queryComponents: function (t) {
                var e = t.mainType;
                if (!e)return [];
                var n = t.index, i = t.id, r = t.name, a = this._componentsMap[e];
                if (!a || !a.length)return [];
                var o;
                if (null != n)v(n) || (n = [n]), o = p(g(n, function (t) {
                    return a[t]
                }), function (t) {
                    return !!t
                }); else if (null != i) {
                    var s = v(i);
                    o = p(a, function (t) {
                        return s && m(i, t.id) >= 0 || !s && t.id === i
                    })
                } else if (null != r) {
                    var h = v(r);
                    o = p(a, function (t) {
                        return h && m(r, t.name) >= 0 || !h && t.name === r
                    })
                } else o = a;
                return l(o, t)
            },
            findComponents: function (t) {
                function e(t) {
                    var e = r + "Index", n = r + "Id", i = r + "Name";
                    return t && (t.hasOwnProperty(e) || t.hasOwnProperty(n) || t.hasOwnProperty(i)) ? {
                        mainType: r,
                        index: t[e],
                        id: t[n],
                        name: t[i]
                    } : null
                }

                function n(e) {
                    return t.filter ? p(e, t.filter) : e
                }

                var i = t.query, r = t.mainType, a = e(i), o = a ? this.queryComponents(a) : this._componentsMap[r];
                return n(l(o, t))
            },
            eachComponent: function (t, e, n) {
                var i = this._componentsMap;
                if ("function" == typeof t)n = e, e = t, d(i, function (t, i) {
                    d(t, function (t, r) {
                        e.call(n, i, t, r)
                    })
                }); else if (u.isString(t))d(i[t], e, n); else if (y(t)) {
                    var r = this.findComponents(t);
                    d(r, e, n)
                }
            },
            getSeriesByName: function (t) {
                var e = this._componentsMap.series;
                return p(e, function (e) {
                    return e.name === t
                })
            },
            getSeriesByIndex: function (t) {
                return this._componentsMap.series[t]
            },
            getSeriesByType: function (t) {
                var e = this._componentsMap.series;
                return p(e, function (e) {
                    return e.subType === t
                })
            },
            getSeries: function () {
                return this._componentsMap.series.slice()
            },
            eachSeries: function (t, e) {
                h(this), d(this._seriesIndices, function (n) {
                    var i = this._componentsMap.series[n];
                    t.call(e, i, n)
                }, this)
            },
            eachRawSeries: function (t, e) {
                d(this._componentsMap.series, t, e)
            },
            eachSeriesByType: function (t, e, n) {
                h(this), d(this._seriesIndices, function (i) {
                    var r = this._componentsMap.series[i];
                    r.subType === t && e.call(n, r, i)
                }, this)
            },
            eachRawSeriesByType: function (t, e, n) {
                return d(this.getSeriesByType(t), e, n)
            },
            isSeriesFiltered: function (t) {
                return h(this), u.indexOf(this._seriesIndices, t.componentIndex) < 0
            },
            filterSeries: function (t, e) {
                h(this);
                var n = p(this._componentsMap.series, t, e);
                this._seriesIndices = s(n)
            },
            restoreData: function () {
                var t = this._componentsMap;
                this._seriesIndices = s(t.series);
                var e = [];
                d(t, function (t, n) {
                    e.push(n)
                }), _.topologicalTravel(e, _.getAllClassMainTypes(), function (e, n) {
                    d(t[e], function (t) {
                        t.restoreData()
                    })
                })
            }
        });
        u.mixin(w, n(57)), t.exports = w
    }, function (t, e, n) {
        function i(t) {
            this._api = t, this._timelineOptions = [], this._mediaList = [], this._mediaDefault, this._currentMediaIndices = [], this._optionBackup, this._newBaseOption
        }

        function r(t, e, n) {
            var i, r, a = [], o = [], s = t.timeline;
            if (t.baseOption && (r = t.baseOption), (s || t.options) && (r = r || {}, a = (t.options || []).slice()), t.media) {
                r = r || {};
                var l = t.media;
                f(l, function (t) {
                    t && t.option && (t.query ? o.push(t) : i || (i = t))
                })
            }
            return r || (r = t), r.timeline || (r.timeline = s), f([r].concat(a).concat(h.map(o, function (t) {
                return t.option
            })), function (t) {
                f(e, function (e) {
                    e(t, n)
                })
            }), {baseOption: r, timelineOptions: a, mediaDefault: i, mediaList: o}
        }

        function a(t, e, n) {
            var i = {width: e, height: n, aspectratio: e / n}, r = !0;
            return h.each(t, function (t, e) {
                var n = e.match(v);
                if (n && n[1] && n[2]) {
                    var a = n[1], s = n[2].toLowerCase();
                    o(i[s], t, a) || (r = !1)
                }
            }), r
        }

        function o(t, e, n) {
            return "min" === n ? t >= e : "max" === n ? t <= e : t === e
        }

        function s(t, e) {
            return t.join(",") === e.join(",")
        }

        function l(t, e) {
            e = e || {}, f(e, function (e, n) {
                if (null != e) {
                    var i = t[n];
                    if (c.hasClass(n)) {
                        e = u.normalizeToArray(e), i = u.normalizeToArray(i);
                        var r = u.mappingToExists(i, e);
                        t[n] = p(r, function (t) {
                            return t.option && t.exist ? g(t.exist, t.option, !0) : t.exist || t.option
                        })
                    } else t[n] = g(i, e, !0)
                }
            })
        }

        var h = n(1), u = n(6), c = n(13), f = h.each, d = h.clone, p = h.map, g = h.merge, v = /^(min|max)?(.+)$/;
        i.prototype = {
            constructor: i, setOption: function (t, e) {
                t = d(t, !0);
                var n = this._optionBackup, i = r.call(this, t, e, !n);
                this._newBaseOption = i.baseOption, n ? (l(n.baseOption, i.baseOption), i.timelineOptions.length && (n.timelineOptions = i.timelineOptions), i.mediaList.length && (n.mediaList = i.mediaList), i.mediaDefault && (n.mediaDefault = i.mediaDefault)) : this._optionBackup = i
            }, mountOption: function (t) {
                var e = this._optionBackup;
                return this._timelineOptions = p(e.timelineOptions, d), this._mediaList = p(e.mediaList, d), this._mediaDefault = d(e.mediaDefault), this._currentMediaIndices = [], d(t ? e.baseOption : this._newBaseOption)
            }, getTimelineOption: function (t) {
                var e, n = this._timelineOptions;
                if (n.length) {
                    var i = t.getComponent("timeline");
                    i && (e = d(n[i.getCurrentIndex()], !0))
                }
                return e
            }, getMediaOption: function (t) {
                var e = this._api.getWidth(), n = this._api.getHeight(), i = this._mediaList, r = this._mediaDefault, o = [], l = [];
                if (!i.length && !r)return l;
                for (var h = 0, u = i.length; h < u; h++)a(i[h].query, e, n) && o.push(h);
                return !o.length && r && (o = [-1]), o.length && !s(o, this._currentMediaIndices) && (l = p(o, function (t) {
                    return d(t === -1 ? r.option : i[t].option)
                })), this._currentMediaIndices = o, l
            }
        }, t.exports = i
    }, function (t, e) {
        var n = "";
        "undefined" != typeof navigator && (n = navigator.platform || ""), t.exports = {
            color: ["#c23531", "#2f4554", "#61a0a8", "#d48265", "#91c7ae", "#749f83", "#ca8622", "#bda29a", "#6e7074", "#546570", "#c4ccd3"],
            textStyle: {
                fontFamily: n.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
                fontSize: 12,
                fontStyle: "normal",
                fontWeight: "normal"
            },
            blendMode: null,
            animation: !0,
            animationDuration: 1e3,
            animationDurationUpdate: 300,
            animationEasing: "exponentialOut",
            animationEasingUpdate: "cubicOut",
            animationThreshold: 2e3,
            progressiveThreshold: 3e3,
            progressive: 400,
            hoverLayerThreshold: 3e3
        }
    }, function (t, e, n) {
        t.exports = {getAreaStyle: n(30)([["fill", "color"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["opacity"], ["shadowColor"]])}
    }, function (t, e) {
        t.exports = {
            getBoxLayoutParams: function () {
                return {
                    left: this.get("left"),
                    top: this.get("top"),
                    right: this.get("right"),
                    bottom: this.get("bottom"),
                    width: this.get("width"),
                    height: this.get("height")
                }
            }
        }
    }, function (t, e, n) {
        var i = n(30)([["fill", "color"], ["stroke", "borderColor"], ["lineWidth", "borderWidth"], ["opacity"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["shadowColor"], ["textPosition"], ["textAlign"]]);
        t.exports = {
            getItemStyle: function (t) {
                var e = i.call(this, t), n = this.getBorderLineDash();
                return n && (e.lineDash = n), e
            }, getBorderLineDash: function () {
                var t = this.get("borderType");
                return "solid" === t || null == t ? null : "dashed" === t ? [5, 5] : [1, 1]
            }
        }
    }, function (t, e, n) {
        var i = n(30)([["lineWidth", "width"], ["stroke", "color"], ["opacity"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["shadowColor"]]);
        t.exports = {
            getLineStyle: function (t) {
                var e = i.call(this, t), n = this.getLineDash(e.lineWidth);
                return n && (e.lineDash = n), e
            }, getLineDash: function (t) {
                null == t && (t = 1);
                var e = this.get("type"), n = Math.max(t, 2), i = 4 * t;
                return "solid" === e || null == e ? null : "dashed" === e ? [i, i] : [n, n]
            }
        }
    }, function (t, e, n) {
        function i(t, e) {
            return t && t.getShallow(e)
        }

        var r = n(16);
        t.exports = {
            getTextColor: function () {
                var t = this.ecModel;
                return this.getShallow("color") || t && t.get("textStyle.color")
            }, getFont: function () {
                var t = this.ecModel, e = t && t.getModel("textStyle");
                return [this.getShallow("fontStyle") || i(e, "fontStyle"), this.getShallow("fontWeight") || i(e, "fontWeight"), (this.getShallow("fontSize") || i(e, "fontSize") || 12) + "px", this.getShallow("fontFamily") || i(e, "fontFamily") || "sans-serif"].join(" ")
            }, getTextRect: function (t) {
                return r.getBoundingRect(t, this.getFont(), this.getShallow("align"), this.getShallow("baseline"))
            }, truncateText: function (t, e, n, i) {
                return r.truncateText(t, e, this.getFont(), n, i)
            }
        }
    }, function (t, e, n) {
        function i(t, e) {
            e = e.split(",");
            for (var n = t, i = 0; i < e.length && (n = n && n[e[i]], null != n); i++);
            return n
        }

        function r(t, e, n, i) {
            e = e.split(",");
            for (var r, a = t, o = 0; o < e.length - 1; o++)r = e[o], null == a[r] && (a[r] = {}), a = a[r];
            (i || null == a[e[o]]) && (a[e[o]] = n)
        }

        function a(t) {
            c(l, function (e) {
                e[0] in t && !(e[1] in t) && (t[e[1]] = t[e[0]])
            })
        }

        var o = n(1), s = n(133), l = [["x", "left"], ["y", "top"], ["x2", "right"], ["y2", "bottom"]], h = ["grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline"], u = ["bar", "boxplot", "candlestick", "chord", "effectScatter", "funnel", "gauge", "lines", "graph", "heatmap", "line", "map", "parallel", "pie", "radar", "sankey", "scatter", "treemap"], c = o.each;
        t.exports = function (t) {
            c(t.series, function (t) {
                if (o.isObject(t)) {
                    var e = t.type;
                    if (s(t), "pie" !== e && "gauge" !== e || null != t.clockWise && (t.clockwise = t.clockWise), "gauge" === e) {
                        var n = i(t, "pointer.color");
                        null != n && r(t, "itemStyle.normal.color", n)
                    }
                    for (var l = 0; l < u.length; l++)if (u[l] === t.type) {
                        a(t);
                        break
                    }
                }
            }), t.dataRange && (t.visualMap = t.dataRange), c(h, function (e) {
                var n = t[e];
                n && (o.isArray(n) || (n = [n]), c(n, function (t) {
                    a(t)
                }))
            })
        }
    }, function (t, e, n) {
        function i(t) {
            var e = t && t.itemStyle;
            e && r.each(a, function (n) {
                var i = e.normal, a = e.emphasis;
                i && i[n] && (t[n] = t[n] || {}, t[n].normal ? r.merge(t[n].normal, i[n]) : t[n].normal = i[n], i[n] = null), a && a[n] && (t[n] = t[n] || {}, t[n].emphasis ? r.merge(t[n].emphasis, a[n]) : t[n].emphasis = a[n], a[n] = null)
            })
        }

        var r = n(1), a = ["areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine"];
        t.exports = function (t) {
            if (t) {
                i(t), i(t.markPoint), i(t.markLine);
                var e = t.data;
                if (e) {
                    for (var n = 0; n < e.length; n++)i(e[n]);
                    var a = t.markPoint;
                    if (a && a.data)for (var o = a.data, n = 0; n < o.length; n++)i(o[n]);
                    var s = t.markLine;
                    if (s && s.data)for (var l = s.data, n = 0; n < l.length; n++)r.isArray(l[n]) ? (i(l[n][0]), i(l[n][1])) : i(l[n])
                }
            }
        }
    }, function (t, e) {
        var n = {
            average: function (t) {
                for (var e = 0, n = 0, i = 0; i < t.length; i++)isNaN(t[i]) || (e += t[i], n++);
                return 0 === n ? NaN : e / n
            }, sum: function (t) {
                for (var e = 0, n = 0; n < t.length; n++)e += t[n] || 0;
                return e
            }, max: function (t) {
                for (var e = -(1 / 0), n = 0; n < t.length; n++)t[n] > e && (e = t[n]);
                return e
            }, min: function (t) {
                for (var e = 1 / 0, n = 0; n < t.length; n++)t[n] < e && (e = t[n]);
                return e
            }, nearest: function (t) {
                return t[0]
            }
        }, i = function (t, e) {
            return Math.round(t.length / 2)
        };
        t.exports = function (t, e, r) {
            e.eachSeriesByType(t, function (t) {
                var e = t.getData(), r = t.get("sampling"), a = t.coordinateSystem;
                if ("cartesian2d" === a.type && r) {
                    var o = a.getBaseAxis(), s = a.getOtherAxis(o), l = o.getExtent(), h = l[1] - l[0], u = Math.round(e.count() / h);
                    if (u > 1) {
                        var c;
                        "string" == typeof r ? c = n[r] : "function" == typeof r && (c = r), c && (e = e.downSample(s.dim, 1 / u, c, i), t.setData(e))
                    }
                }
            }, this)
        }
    }, function (t, e, n) {
        function i(t, e) {
            return c(t, u(e))
        }

        var r = n(1), a = n(31), o = n(4), s = n(38), l = a.prototype, h = s.prototype, u = o.getPrecisionSafe, c = o.round, f = Math.floor, d = Math.ceil, p = Math.pow, g = Math.log, v = a.extend({
            type: "log",
            base: 10,
            $constructor: function () {
                a.apply(this, arguments), this._originalScale = new s
            },
            getTicks: function () {
                var t = this._originalScale, e = this._extent, n = t.getExtent();
                return r.map(h.getTicks.call(this), function (r) {
                    var a = o.round(p(this.base, r));
                    return a = r === e[0] && t.__fixMin ? i(a, n[0]) : a, a = r === e[1] && t.__fixMax ? i(a, n[1]) : a
                }, this)
            },
            getLabel: h.getLabel,
            scale: function (t) {
                return t = l.scale.call(this, t), p(this.base, t)
            },
            setExtent: function (t, e) {
                var n = this.base;
                t = g(t) / g(n), e = g(e) / g(n), h.setExtent.call(this, t, e)
            },
            getExtent: function () {
                var t = this.base, e = l.getExtent.call(this);
                e[0] = p(t, e[0]), e[1] = p(t, e[1]);
                var n = this._originalScale, r = n.getExtent();
                return n.__fixMin && (e[0] = i(e[0], r[0])), n.__fixMax && (e[1] = i(e[1], r[1])), e
            },
            unionExtent: function (t) {
                this._originalScale.unionExtent(t);
                var e = this.base;
                t[0] = g(t[0]) / g(e), t[1] = g(t[1]) / g(e), l.unionExtent.call(this, t)
            },
            niceTicks: function (t) {
                t = t || 10;
                var e = this._extent, n = e[1] - e[0];
                if (!(n === 1 / 0 || n <= 0)) {
                    var i = o.quantity(n), r = t / n * i;
                    for (r <= .5 && (i *= 10); !isNaN(i) && Math.abs(i) < 1 && Math.abs(i) > 0;)i *= 10;
                    var a = [o.round(d(e[0] / i) * i), o.round(f(e[1] / i) * i)];
                    this._interval = i, this._niceExtent = a
                }
            },
            niceExtent: function (t, e, n) {
                h.niceExtent.call(this, t, e, n);
                var i = this._originalScale;
                i.__fixMin = e, i.__fixMax = n
            }
        });
        r.each(["contain", "normalize"], function (t) {
            v.prototype[t] = function (e) {
                return e = g(e) / g(this.base), l[t].call(this, e)
            }
        }), v.create = function () {
            return new v
        }, t.exports = v
    }, function (t, e, n) {
        var i = n(1), r = n(31), a = r.prototype, o = r.extend({
            type: "ordinal", init: function (t, e) {
                this._data = t, this._extent = e || [0, t.length - 1]
            }, parse: function (t) {
                return "string" == typeof t ? i.indexOf(this._data, t) : Math.round(t)
            }, contain: function (t) {
                return t = this.parse(t), a.contain.call(this, t) && null != this._data[t]
            }, normalize: function (t) {
                return a.normalize.call(this, this.parse(t))
            }, scale: function (t) {
                return Math.round(a.scale.call(this, t))
            }, getTicks: function () {
                for (var t = [], e = this._extent, n = e[0]; n <= e[1];)t.push(n), n++;
                return t
            }, getLabel: function (t) {
                return this._data[t]
            }, count: function () {
                return this._extent[1] - this._extent[0] + 1
            }, niceTicks: i.noop, niceExtent: i.noop
        });
        o.create = function () {
            return new o
        }, t.exports = o
    }, function (t, e, n) {
        var i = n(1), r = n(4), a = n(9), o = n(38), s = o.prototype, l = Math.ceil, h = Math.floor, u = 1e3, c = 60 * u, f = 60 * c, d = 24 * f, p = function (t, e, n, i) {
            for (; n < i;) {
                var r = n + i >>> 1;
                t[r][2] < e ? n = r + 1 : i = r
            }
            return n
        }, g = o.extend({
            type: "time", getLabel: function (t) {
                var e = this._stepLvl, n = new Date(t);
                return a.formatTime(e[0], n)
            }, niceExtent: function (t, e, n) {
                var i = this._extent;
                if (i[0] === i[1] && (i[0] -= d, i[1] += d), i[1] === -(1 / 0) && i[0] === 1 / 0) {
                    var a = new Date;
                    i[1] = new Date(a.getFullYear(), a.getMonth(), a.getDate()), i[0] = i[1] - d
                }
                this.niceTicks(t);
                var o = this._interval;
                e || (i[0] = r.round(h(i[0] / o) * o)), n || (i[1] = r.round(l(i[1] / o) * o))
            }, niceTicks: function (t) {
                t = t || 10;
                var e = this._extent, n = e[1] - e[0], i = n / t, a = v.length, o = p(v, i, 0, a), s = v[Math.min(o, a - 1)], u = s[2];
                if ("year" === s[0]) {
                    var c = n / u, f = r.nice(c / t, !0);
                    u *= f
                }
                var d = [l(e[0] / u) * u, h(e[1] / u) * u];
                this._stepLvl = s, this._interval = u, this._niceExtent = d
            }, parse: function (t) {
                return +r.parseDate(t)
            }
        });
        i.each(["contain", "normalize"], function (t) {
            g.prototype[t] = function (e) {
                return s[t].call(this, this.parse(e))
            }
        });
        var v = [["hh:mm:ss", 1, u], ["hh:mm:ss", 5, 5 * u], ["hh:mm:ss", 10, 10 * u], ["hh:mm:ss", 15, 15 * u], ["hh:mm:ss", 30, 30 * u], ["hh:mm\nMM-dd", 1, c], ["hh:mm\nMM-dd", 5, 5 * c], ["hh:mm\nMM-dd", 10, 10 * c], ["hh:mm\nMM-dd", 15, 15 * c], ["hh:mm\nMM-dd", 30, 30 * c], ["hh:mm\nMM-dd", 1, f], ["hh:mm\nMM-dd", 2, 2 * f], ["hh:mm\nMM-dd", 6, 6 * f], ["hh:mm\nMM-dd", 12, 12 * f], ["MM-dd\nyyyy", 1, d], ["week", 7, 7 * d], ["month", 1, 31 * d], ["quarter", 3, 380 * d / 4], ["half-year", 6, 380 * d / 2], ["year", 1, 380 * d]];
        g.create = function () {
            return new g
        }, t.exports = g
    }, function (t, e, n) {
        var i = n(37);
        t.exports = function (t) {
            function e(e) {
                var n = (e.visualColorAccessPath || "itemStyle.normal.color").split("."), r = e.getData(), a = e.get(n) || e.getColorFromPalette(e.get("name"));
                r.setVisual("color", a), t.isSeriesFiltered(e) || ("function" != typeof a || a instanceof i || r.each(function (t) {
                    r.setItemVisual(t, "color", a(e.getDataParams(t)))
                }), r.each(function (t) {
                    var e = r.getItemModel(t), i = e.get(n, !0);
                    null != i && r.setItemVisual(t, "color", i)
                }))
            }

            t.eachRawSeries(e)
        }
    }, function (t, e, n) {
        function i(t, e, n) {
            return {
                type: t,
                event: n,
                target: e,
                cancelBubble: !1,
                offsetX: n.zrX,
                offsetY: n.zrY,
                gestureEvent: n.gestureEvent,
                pinchX: n.pinchX,
                pinchY: n.pinchY,
                pinchScale: n.pinchScale,
                wheelDelta: n.zrDelta,
                zrByTouch: n.zrByTouch
            }
        }

        function r() {
        }

        function a(t, e, n) {
            if (t[t.rectHover ? "rectContain" : "contain"](e, n)) {
                for (var i = t; i;) {
                    if (i.silent || i.clipPath && !i.clipPath.contain(e, n))return !1;
                    i = i.parent
                }
                return !0
            }
            return !1
        }

        var o = n(1), s = n(167), l = n(20);
        r.prototype.dispose = function () {
        };
        var h = ["click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"], u = function (t, e, n, i) {
            l.call(this), this.storage = t, this.painter = e, this.painterRoot = i, n = n || new r, this.proxy = n, n.handler = this, this._hovered, this._lastTouchMoment, this._lastX, this._lastY, s.call(this), o.each(h, function (t) {
                n.on && n.on(t, this[t], this)
            }, this)
        };
        u.prototype = {
            constructor: u, mousemove: function (t) {
                var e = t.zrX, n = t.zrY, i = this.findHover(e, n, null), r = this._hovered, a = this.proxy;
                this._hovered = i, a.setCursor && a.setCursor(i ? i.cursor : "default"), r && i !== r && r.__zr && this.dispatchToElement(r, "mouseout", t), this.dispatchToElement(i, "mousemove", t), i && i !== r && this.dispatchToElement(i, "mouseover", t)
            }, mouseout: function (t) {
                this.dispatchToElement(this._hovered, "mouseout", t);
                var e, n = t.toElement || t.relatedTarget;
                do n = n && n.parentNode; while (n && 9 != n.nodeType && !(e = n === this.painterRoot));
                !e && this.trigger("globalout", {event: t})
            }, resize: function (t) {
                this._hovered = null
            }, dispatch: function (t, e) {
                var n = this[t];
                n && n.call(this, e)
            }, dispose: function () {
                this.proxy.dispose(), this.storage = this.proxy = this.painter = null
            }, setCursorStyle: function (t) {
                var e = this.proxy;
                e.setCursor && e.setCursor(t)
            }, dispatchToElement: function (t, e, n) {
                for (var r = "on" + e, a = i(e, t, n), o = t; o && (o[r] && (a.cancelBubble = o[r].call(o, a)), o.trigger(e, a), o = o.parent, !a.cancelBubble););
                a.cancelBubble || (this.trigger(e, a), this.painter && this.painter.eachOtherLayer(function (t) {
                    "function" == typeof t[r] && t[r].call(t, a), t.trigger && t.trigger(e, a)
                }))
            }, findHover: function (t, e, n) {
                for (var i = this.storage.getDisplayList(), r = i.length - 1; r >= 0; r--)if (!i[r].silent && i[r] !== n && !i[r].ignore && a(i[r], t, e))return i[r]
            }
        }, o.each(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function (t) {
            u.prototype[t] = function (e) {
                var n = this.findHover(e.zrX, e.zrY, null);
                if ("mousedown" === t)this._downel = n, this._upel = n; else if ("mosueup" === t)this._upel = n; else if ("click" === t && this._downel !== this._upel)return;
                this.dispatchToElement(n, t, e)
            }
        }), o.mixin(u, l), o.mixin(u, s), t.exports = u
    }, function (t, e, n) {
        function i() {
            return !1
        }

        function r(t, e, n, i) {
            var r = document.createElement(e), a = n.getWidth(), o = n.getHeight(), s = r.style;
            return s.position = "absolute", s.left = 0, s.top = 0, s.width = a + "px", s.height = o + "px", r.width = a * i, r.height = o * i, r.setAttribute("data-zr-dom-id", t), r
        }

        var a = n(1), o = n(32), s = n(65), l = n(64), h = function (t, e, n) {
            var s;
            n = n || o.devicePixelRatio, "string" == typeof t ? s = r(t, "canvas", e, n) : a.isObject(t) && (s = t, t = s.id), this.id = t, this.dom = s;
            var l = s.style;
            l && (s.onselectstart = i, l["-webkit-user-select"] = "none", l["user-select"] = "none", l["-webkit-touch-callout"] = "none", l["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)", l.padding = 0, l.margin = 0, l["border-width"] = 0), this.domBack = null, this.ctxBack = null, this.painter = e, this.config = null, this.clearColor = 0, this.motionBlur = !1, this.lastFrameAlpha = .7, this.dpr = n
        };
        h.prototype = {
            constructor: h, elCount: 0, __dirty: !0, initContext: function () {
                this.ctx = this.dom.getContext("2d"), this.ctx.dpr = this.dpr
            }, createBackBuffer: function () {
                var t = this.dpr;
                this.domBack = r("back-" + this.id, "canvas", this.painter, t), this.ctxBack = this.domBack.getContext("2d"), 1 != t && this.ctxBack.scale(t, t)
            }, resize: function (t, e) {
                var n = this.dpr, i = this.dom, r = i.style, a = this.domBack;
                r.width = t + "px", r.height = e + "px", i.width = t * n, i.height = e * n, a && (a.width = t * n, a.height = e * n, 1 != n && this.ctxBack.scale(n, n))
            }, clear: function (t) {
                var e = this.dom, n = this.ctx, i = e.width, r = e.height, a = this.clearColor, o = this.motionBlur && !t, h = this.lastFrameAlpha, u = this.dpr;
                if (o && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(e, 0, 0, i / u, r / u)), n.clearRect(0, 0, i, r), a) {
                    var c;
                    a.colorStops ? (c = a.__canvasGradient || s.getGradient(n, a, {
                            x: 0,
                            y: 0,
                            width: i,
                            height: r
                        }), a.__canvasGradient = c) : a.image && (c = l.prototype.getCanvasPattern.call(a, n)), n.save(), n.fillStyle = c || a, n.fillRect(0, 0, i, r), n.restore()
                }
                if (o) {
                    var f = this.domBack;
                    n.save(), n.globalAlpha = h, n.drawImage(f, 0, 0, i, r), n.restore()
                }
            }
        }, t.exports = h
    }, function (t, e, n) {
        function i(t) {
            return parseInt(t, 10)
        }

        function r(t) {
            return !!t && (!!t.isBuildin || "function" == typeof t.resize && "function" == typeof t.refresh);
        }

        function a(t) {
            t.__unusedCount++
        }

        function o(t) {
            1 == t.__unusedCount && t.clear()
        }

        function s(t, e, n) {
            return _.copy(t.getBoundingRect()), t.transform && _.applyTransform(t.transform), x.width = e, x.height = n, !_.intersect(x)
        }

        function l(t, e) {
            if (t == e)return !1;
            if (!t || !e || t.length !== e.length)return !0;
            for (var n = 0; n < t.length; n++)if (t[n] !== e[n])return !0
        }

        function h(t, e) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n], r = i.path;
                i.setTransform(e), r.beginPath(e), i.buildPath(r, i.shape), e.clip(), i.restoreTransform(e)
            }
        }

        function u(t, e) {
            var n = document.createElement("div");
            return n.style.cssText = ["position:relative", "overflow:hidden", "width:" + t + "px", "height:" + e + "px", "padding:0", "margin:0", "border-width:0"].join(";") + ";", n
        }

        var c = n(32), f = n(1), d = n(48), p = n(8), g = n(44), v = n(140), m = n(61), y = 5, _ = new p(0, 0, 0, 0), x = new p(0, 0, 0, 0), b = function (t, e, n) {
            var i = !t.nodeName || "CANVAS" === t.nodeName.toUpperCase();
            this._opts = n = f.extend({}, n || {}), this.dpr = n.devicePixelRatio || c.devicePixelRatio, this._singleCanvas = i, this.root = t;
            var r = t.style;
            r && (r["-webkit-tap-highlight-color"] = "transparent", r["-webkit-user-select"] = r["user-select"] = r["-webkit-touch-callout"] = "none", t.innerHTML = ""), this.storage = e;
            var a = this._zlevelList = [], o = this._layers = {};
            if (this._layerConfig = {}, i) {
                var s = t.width, l = t.height;
                this._width = s, this._height = l;
                var h = new v(t, this, 1);
                h.initContext(), o[0] = h, a.push(0)
            } else {
                this._width = this._getSize(0), this._height = this._getSize(1);
                var d = this._domRoot = u(this._width, this._height);
                t.appendChild(d)
            }
            this.pathToImage = this._createPathToImage(), this._progressiveLayers = [], this._hoverlayer, this._hoverElements = []
        };
        b.prototype = {
            constructor: b, isSingleCanvas: function () {
                return this._singleCanvas
            }, getViewportRoot: function () {
                return this._singleCanvas ? this._layers[0].dom : this._domRoot
            }, refresh: function (t) {
                var e = this.storage.getDisplayList(!0), n = this._zlevelList;
                this._paintList(e, t);
                for (var i = 0; i < n.length; i++) {
                    var r = n[i], a = this._layers[r];
                    !a.isBuildin && a.refresh && a.refresh()
                }
                return this.refreshHover(), this._progressiveLayers.length && this._startProgessive(), this
            }, addHover: function (t, e) {
                if (!t.__hoverMir) {
                    var n = new t.constructor({style: t.style, shape: t.shape});
                    n.__from = t, t.__hoverMir = n, n.setStyle(e), this._hoverElements.push(n)
                }
            }, removeHover: function (t) {
                var e = t.__hoverMir, n = this._hoverElements, i = f.indexOf(n, e);
                i >= 0 && n.splice(i, 1), t.__hoverMir = null
            }, clearHover: function (t) {
                for (var e = this._hoverElements, n = 0; n < e.length; n++) {
                    var i = e[n].__from;
                    i && (i.__hoverMir = null)
                }
                e.length = 0
            }, refreshHover: function () {
                var t = this._hoverElements, e = t.length, n = this._hoverlayer;
                if (n && n.clear(), e) {
                    g(t, this.storage.displayableSortFunc), n || (n = this._hoverlayer = this.getLayer(1e5));
                    var i = {};
                    n.ctx.save();
                    for (var r = 0; r < e;) {
                        var a = t[r], o = a.__from;
                        o && o.__zr ? (r++, o.invisible || (a.transform = o.transform, a.invTransform = o.invTransform, a.__clipPaths = o.__clipPaths, this._doPaintEl(a, n, !0, i))) : (t.splice(r, 1), o.__hoverMir = null, e--)
                    }
                    n.ctx.restore()
                }
            }, _startProgessive: function () {
                function t() {
                    n === e._progressiveToken && e.storage && (e._doPaintList(e.storage.getDisplayList()), e._furtherProgressive ? (e._progress++, m(t)) : e._progressiveToken = -1)
                }

                var e = this;
                if (e._furtherProgressive) {
                    var n = e._progressiveToken = +new Date;
                    e._progress++, m(t)
                }
            }, _clearProgressive: function () {
                this._progressiveToken = -1, this._progress = 0, f.each(this._progressiveLayers, function (t) {
                    t.__dirty && t.clear()
                })
            }, _paintList: function (t, e) {
                null == e && (e = !1), this._updateLayerStatus(t), this._clearProgressive(), this.eachBuildinLayer(a), this._doPaintList(t, e), this.eachBuildinLayer(o)
            }, _doPaintList: function (t, e) {
                function n(t) {
                    var e = a.dpr || 1;
                    a.save(), a.globalAlpha = 1, a.shadowBlur = 0, i.__dirty = !0, a.setTransform(1, 0, 0, 1, 0, 0), a.drawImage(t.dom, 0, 0, u * e, c * e), a.restore()
                }

                for (var i, r, a, o, s, l, h = 0, u = this._width, c = this._height, p = this._progress, g = 0, v = t.length; g < v; g++) {
                    var m = t[g], _ = this._singleCanvas ? 0 : m.zlevel, x = m.__frame;
                    if (x < 0 && s && (n(s), s = null), r !== _ && (a && a.restore(), o = {}, r = _, i = this.getLayer(r), i.isBuildin || d("ZLevel " + r + " has been used by unkown layer " + i.id), a = i.ctx, a.save(), i.__unusedCount = 0, (i.__dirty || e) && i.clear()), i.__dirty || e) {
                        if (x >= 0) {
                            if (!s) {
                                if (s = this._progressiveLayers[Math.min(h++, y - 1)], s.ctx.save(), s.renderScope = {}, s && s.__progress > s.__maxProgress) {
                                    g = s.__nextIdxNotProg - 1;
                                    continue
                                }
                                l = s.__progress, s.__dirty || (p = l), s.__progress = p + 1
                            }
                            x === p && this._doPaintEl(m, s, !0, s.renderScope)
                        } else this._doPaintEl(m, i, e, o);
                        m.__dirty = !1
                    }
                }
                s && n(s), a && a.restore(), this._furtherProgressive = !1, f.each(this._progressiveLayers, function (t) {
                    t.__maxProgress >= t.__progress && (this._furtherProgressive = !0)
                }, this)
            }, _doPaintEl: function (t, e, n, i) {
                var r = e.ctx, a = t.transform;
                if ((e.__dirty || n) && !t.invisible && 0 !== t.style.opacity && (!a || a[0] || a[3]) && (!t.culling || !s(t, this._width, this._height))) {
                    var o = t.__clipPaths;
                    (i.prevClipLayer !== e || l(o, i.prevElClipPaths)) && (i.prevElClipPaths && (i.prevClipLayer.ctx.restore(), i.prevClipLayer = i.prevElClipPaths = null, i.prevEl = null), o && (r.save(), h(o, r), i.prevClipLayer = e, i.prevElClipPaths = o)), t.beforeBrush && t.beforeBrush(r), t.brush(r, i.prevEl || null), i.prevEl = t, t.afterBrush && t.afterBrush(r)
                }
            }, getLayer: function (t) {
                if (this._singleCanvas)return this._layers[0];
                var e = this._layers[t];
                return e || (e = new v("zr_" + t, this, this.dpr), e.isBuildin = !0, this._layerConfig[t] && f.merge(e, this._layerConfig[t], !0), this.insertLayer(t, e), e.initContext()), e
            }, insertLayer: function (t, e) {
                var n = this._layers, i = this._zlevelList, a = i.length, o = null, s = -1, l = this._domRoot;
                if (n[t])return void d("ZLevel " + t + " has been used already");
                if (!r(e))return void d("Layer of zlevel " + t + " is not valid");
                if (a > 0 && t > i[0]) {
                    for (s = 0; s < a - 1 && !(i[s] < t && i[s + 1] > t); s++);
                    o = n[i[s]]
                }
                if (i.splice(s + 1, 0, t), o) {
                    var h = o.dom;
                    h.nextSibling ? l.insertBefore(e.dom, h.nextSibling) : l.appendChild(e.dom)
                } else l.firstChild ? l.insertBefore(e.dom, l.firstChild) : l.appendChild(e.dom);
                n[t] = e
            }, eachLayer: function (t, e) {
                var n, i, r = this._zlevelList;
                for (i = 0; i < r.length; i++)n = r[i], t.call(e, this._layers[n], n)
            }, eachBuildinLayer: function (t, e) {
                var n, i, r, a = this._zlevelList;
                for (r = 0; r < a.length; r++)i = a[r], n = this._layers[i], n.isBuildin && t.call(e, n, i)
            }, eachOtherLayer: function (t, e) {
                var n, i, r, a = this._zlevelList;
                for (r = 0; r < a.length; r++)i = a[r], n = this._layers[i], n.isBuildin || t.call(e, n, i)
            }, getLayers: function () {
                return this._layers
            }, _updateLayerStatus: function (t) {
                var e = this._layers, n = this._progressiveLayers, i = {}, r = {};
                this.eachBuildinLayer(function (t, e) {
                    i[e] = t.elCount, t.elCount = 0, t.__dirty = !1
                }), f.each(n, function (t, e) {
                    r[e] = t.elCount, t.elCount = 0, t.__dirty = !1
                });
                for (var a, o, s = 0, l = 0, h = 0, u = t.length; h < u; h++) {
                    var c = t[h], d = this._singleCanvas ? 0 : c.zlevel, p = e[d], g = c.progressive;
                    if (p && (p.elCount++, p.__dirty = p.__dirty || c.__dirty), g >= 0) {
                        o !== g && (o = g, l++);
                        var m = c.__frame = l - 1;
                        if (!a) {
                            var _ = Math.min(s, y - 1);
                            a = n[_], a || (a = n[_] = new v("progressive", this, this.dpr), a.initContext()), a.__maxProgress = 0
                        }
                        a.__dirty = a.__dirty || c.__dirty, a.elCount++, a.__maxProgress = Math.max(a.__maxProgress, m), a.__maxProgress >= a.__progress && (p.__dirty = !0)
                    } else c.__frame = -1, a && (a.__nextIdxNotProg = h, s++, a = null)
                }
                a && (s++, a.__nextIdxNotProg = h), this.eachBuildinLayer(function (t, e) {
                    i[e] !== t.elCount && (t.__dirty = !0)
                }), n.length = Math.min(s, y), f.each(n, function (t, e) {
                    r[e] !== t.elCount && (c.__dirty = !0), t.__dirty && (t.__progress = 0)
                })
            }, clear: function () {
                return this.eachBuildinLayer(this._clearLayer), this
            }, _clearLayer: function (t) {
                t.clear()
            }, configLayer: function (t, e) {
                if (e) {
                    var n = this._layerConfig;
                    n[t] ? f.merge(n[t], e, !0) : n[t] = e;
                    var i = this._layers[t];
                    i && f.merge(i, n[t], !0)
                }
            }, delLayer: function (t) {
                var e = this._layers, n = this._zlevelList, i = e[t];
                i && (i.dom.parentNode.removeChild(i.dom), delete e[t], n.splice(f.indexOf(n, t), 1))
            }, resize: function (t, e) {
                var n = this._domRoot;
                n.style.display = "none";
                var i = this._opts;
                if (null != t && (i.width = t), null != e && (i.height = e), t = this._getSize(0), e = this._getSize(1), n.style.display = "", this._width != t || e != this._height) {
                    n.style.width = t + "px", n.style.height = e + "px";
                    for (var r in this._layers)this._layers.hasOwnProperty(r) && this._layers[r].resize(t, e);
                    f.each(this._progressiveLayers, function (n) {
                        n.resize(t, e)
                    }), this.refresh(!0)
                }
                return this._width = t, this._height = e, this
            }, clearLayer: function (t) {
                var e = this._layers[t];
                e && e.clear()
            }, dispose: function () {
                this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null
            }, getRenderedCanvas: function (t) {
                if (t = t || {}, this._singleCanvas)return this._layers[0].dom;
                var e = new v("image", this, t.pixelRatio || this.dpr);
                e.initContext(), e.clearColor = t.backgroundColor, e.clear();
                for (var n = this.storage.getDisplayList(!0), i = {}, r = 0; r < n.length; r++) {
                    var a = n[r];
                    this._doPaintEl(a, e, !0, i)
                }
                return e.dom
            }, getWidth: function () {
                return this._width
            }, getHeight: function () {
                return this._height
            }, _getSize: function (t) {
                var e = this._opts, n = ["width", "height"][t], r = ["clientWidth", "clientHeight"][t], a = ["paddingLeft", "paddingTop"][t], o = ["paddingRight", "paddingBottom"][t];
                if (null != e[n] && "auto" !== e[n])return parseFloat(e[n]);
                var s = this.root, l = document.defaultView.getComputedStyle(s);
                return (s[r] || i(l[n]) || i(s.style[n])) - (i(l[a]) || 0) - (i(l[o]) || 0) | 0
            }, _pathToImage: function (t, e, i, r, a) {
                var o = document.createElement("canvas"), s = o.getContext("2d");
                o.width = i * a, o.height = r * a, s.clearRect(0, 0, i * a, r * a);
                var l = {position: e.position, rotation: e.rotation, scale: e.scale};
                e.position = [0, 0, 0], e.rotation = 0, e.scale = [1, 1], e && e.brush(s);
                var h = n(49), u = new h({id: t, style: {x: 0, y: 0, image: o}});
                return null != l.position && (u.position = e.position = l.position), null != l.rotation && (u.rotation = e.rotation = l.rotation), null != l.scale && (u.scale = e.scale = l.scale), u
            }, _createPathToImage: function () {
                var t = this;
                return function (e, n, i, r) {
                    return t._pathToImage(e, n, i, r, t.dpr)
                }
            }
        }, t.exports = b
    }, function (t, e, n) {
        function i(t, e) {
            return t.zlevel === e.zlevel ? t.z === e.z ? t.z2 - e.z2 : t.z - e.z : t.zlevel - e.zlevel
        }

        var r = n(1), a = n(11), o = n(33), s = n(44), l = function () {
            this._elements = {}, this._roots = [], this._displayList = [], this._displayListLen = 0
        };
        l.prototype = {
            constructor: l, traverse: function (t, e) {
                for (var n = 0; n < this._roots.length; n++)this._roots[n].traverse(t, e)
            }, getDisplayList: function (t, e) {
                return e = e || !1, t && this.updateDisplayList(e), this._displayList
            }, updateDisplayList: function (t) {
                this._displayListLen = 0;
                for (var e = this._roots, n = this._displayList, r = 0, o = e.length; r < o; r++)this._updateAndAddDisplayable(e[r], null, t);
                n.length = this._displayListLen, a.canvasSupported && s(n, i)
            }, _updateAndAddDisplayable: function (t, e, n) {
                if (!t.ignore || n) {
                    t.beforeUpdate(), t.__dirty && t.update(), t.afterUpdate();
                    var i = t.clipPath;
                    if (i && (i.parent = t, i.updateTransform(), e ? (e = e.slice(), e.push(i)) : e = [i]), t.isGroup) {
                        for (var r = t._children, a = 0; a < r.length; a++) {
                            var o = r[a];
                            t.__dirty && (o.__dirty = !0), this._updateAndAddDisplayable(o, e, n)
                        }
                        t.__dirty = !1
                    } else t.__clipPaths = e, this._displayList[this._displayListLen++] = t
                }
            }, addRoot: function (t) {
                this._elements[t.id] || (t instanceof o && t.addChildrenToStorage(this), this.addToMap(t), this._roots.push(t))
            }, delRoot: function (t) {
                if (null == t) {
                    for (var e = 0; e < this._roots.length; e++) {
                        var n = this._roots[e];
                        n instanceof o && n.delChildrenFromStorage(this)
                    }
                    return this._elements = {}, this._roots = [], this._displayList = [], void(this._displayListLen = 0)
                }
                if (t instanceof Array)for (var e = 0, i = t.length; e < i; e++)this.delRoot(t[e]); else {
                    var a;
                    a = "string" == typeof t ? this._elements[t] : t;
                    var s = r.indexOf(this._roots, a);
                    s >= 0 && (this.delFromMap(a.id), this._roots.splice(s, 1), a instanceof o && a.delChildrenFromStorage(this))
                }
            }, addToMap: function (t) {
                return t instanceof o && (t.__storage = this), t.dirty(!1), this._elements[t.id] = t, this
            }, get: function (t) {
                return this._elements[t]
            }, delFromMap: function (t) {
                var e = this._elements, n = e[t];
                return n && (delete e[t], n instanceof o && (n.__storage = null)), this
            }, dispose: function () {
                this._elements = this._renderList = this._roots = null
            }, displayableSortFunc: i
        }, t.exports = l
    }, function (t, e, n) {
        var i = n(1), r = n(24).Dispatcher, a = n(61), o = n(60), s = function (t) {
            t = t || {}, this.stage = t.stage || {}, this.onframe = t.onframe || function () {
                }, this._clips = [], this._running = !1, this._time, this._pausedTime, this._pauseStart, this._paused = !1, r.call(this)
        };
        s.prototype = {
            constructor: s, addClip: function (t) {
                this._clips.push(t)
            }, addAnimator: function (t) {
                t.animation = this;
                for (var e = t.getClips(), n = 0; n < e.length; n++)this.addClip(e[n])
            }, removeClip: function (t) {
                var e = i.indexOf(this._clips, t);
                e >= 0 && this._clips.splice(e, 1)
            }, removeAnimator: function (t) {
                for (var e = t.getClips(), n = 0; n < e.length; n++)this.removeClip(e[n]);
                t.animation = null
            }, _update: function () {
                for (var t = (new Date).getTime() - this._pausedTime, e = t - this._time, n = this._clips, i = n.length, r = [], a = [], o = 0; o < i; o++) {
                    var s = n[o], l = s.step(t);
                    l && (r.push(l), a.push(s))
                }
                for (var o = 0; o < i;)n[o]._needsRemove ? (n[o] = n[i - 1], n.pop(), i--) : o++;
                i = r.length;
                for (var o = 0; o < i; o++)a[o].fire(r[o]);
                this._time = t, this.onframe(e), this.trigger("frame", e), this.stage.update && this.stage.update()
            }, _startLoop: function () {
                function t() {
                    e._running && (a(t), !e._paused && e._update())
                }

                var e = this;
                this._running = !0, a(t)
            }, start: function () {
                this._time = (new Date).getTime(), this._pausedTime = 0, this._startLoop()
            }, stop: function () {
                this._running = !1
            }, pause: function () {
                this._paused || (this._pauseStart = (new Date).getTime(), this._paused = !0)
            }, resume: function () {
                this._paused && (this._pausedTime += (new Date).getTime() - this._pauseStart, this._paused = !1)
            }, clear: function () {
                this._clips = []
            }, animate: function (t, e) {
                e = e || {};
                var n = new o(t, e.loop, e.getter, e.setter);
                return n
            }
        }, i.mixin(s, r), t.exports = s
    }, function (t, e, n) {
        function i(t) {
            this._target = t.target, this._life = t.life || 1e3, this._delay = t.delay || 0, this._initialized = !1, this.loop = null != t.loop && t.loop, this.gap = t.gap || 0, this.easing = t.easing || "Linear", this.onframe = t.onframe, this.ondestroy = t.ondestroy, this.onrestart = t.onrestart
        }

        var r = n(145);
        i.prototype = {
            constructor: i, step: function (t) {
                this._initialized || (this._startTime = t + this._delay, this._initialized = !0);
                var e = (t - this._startTime) / this._life;
                if (!(e < 0)) {
                    e = Math.min(e, 1);
                    var n = this.easing, i = "string" == typeof n ? r[n] : n, a = "function" == typeof i ? i(e) : e;
                    return this.fire("frame", a), 1 == e ? this.loop ? (this.restart(t), "restart") : (this._needsRemove = !0, "destroy") : null
                }
            }, restart: function (t) {
                var e = (t - this._startTime) % this._life;
                this._startTime = t - e + this.gap, this._needsRemove = !1
            }, fire: function (t, e) {
                t = "on" + t, this[t] && this[t](this._target, e)
            }
        }, t.exports = i
    }, function (t, e) {
        var n = {
            linear: function (t) {
                return t
            }, quadraticIn: function (t) {
                return t * t
            }, quadraticOut: function (t) {
                return t * (2 - t)
            }, quadraticInOut: function (t) {
                return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
            }, cubicIn: function (t) {
                return t * t * t
            }, cubicOut: function (t) {
                return --t * t * t + 1
            }, cubicInOut: function (t) {
                return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
            }, quarticIn: function (t) {
                return t * t * t * t
            }, quarticOut: function (t) {
                return 1 - --t * t * t * t
            }, quarticInOut: function (t) {
                return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2)
            }, quinticIn: function (t) {
                return t * t * t * t * t
            }, quinticOut: function (t) {
                return --t * t * t * t * t + 1
            }, quinticInOut: function (t) {
                return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
            }, sinusoidalIn: function (t) {
                return 1 - Math.cos(t * Math.PI / 2)
            }, sinusoidalOut: function (t) {
                return Math.sin(t * Math.PI / 2)
            }, sinusoidalInOut: function (t) {
                return .5 * (1 - Math.cos(Math.PI * t))
            }, exponentialIn: function (t) {
                return 0 === t ? 0 : Math.pow(1024, t - 1)
            }, exponentialOut: function (t) {
                return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
            }, exponentialInOut: function (t) {
                return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (-Math.pow(2, -10 * (t - 1)) + 2)
            }, circularIn: function (t) {
                return 1 - Math.sqrt(1 - t * t)
            }, circularOut: function (t) {
                return Math.sqrt(1 - --t * t)
            }, circularInOut: function (t) {
                return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
            }, elasticIn: function (t) {
                var e, n = .1, i = .4;
                return 0 === t ? 0 : 1 === t ? 1 : (!n || n < 1 ? (n = 1, e = i / 4) : e = i * Math.asin(1 / n) / (2 * Math.PI), -(n * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / i)))
            }, elasticOut: function (t) {
                var e, n = .1, i = .4;
                return 0 === t ? 0 : 1 === t ? 1 : (!n || n < 1 ? (n = 1, e = i / 4) : e = i * Math.asin(1 / n) / (2 * Math.PI), n * Math.pow(2, -10 * t) * Math.sin((t - e) * (2 * Math.PI) / i) + 1)
            }, elasticInOut: function (t) {
                var e, n = .1, i = .4;
                return 0 === t ? 0 : 1 === t ? 1 : (!n || n < 1 ? (n = 1, e = i / 4) : e = i * Math.asin(1 / n) / (2 * Math.PI), (t *= 2) < 1 ? -.5 * (n * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / i)) : n * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / i) * .5 + 1)
            }, backIn: function (t) {
                var e = 1.70158;
                return t * t * ((e + 1) * t - e)
            }, backOut: function (t) {
                var e = 1.70158;
                return --t * t * ((e + 1) * t + e) + 1
            }, backInOut: function (t) {
                var e = 2.5949095;
                return (t *= 2) < 1 ? .5 * (t * t * ((e + 1) * t - e)) : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2)
            }, bounceIn: function (t) {
                return 1 - n.bounceOut(1 - t)
            }, bounceOut: function (t) {
                return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
            }, bounceInOut: function (t) {
                return t < .5 ? .5 * n.bounceIn(2 * t) : .5 * n.bounceOut(2 * t - 1) + .5
            }
        };
        t.exports = n
    }, function (t, e, n) {
        var i = n(62).normalizeRadian, r = 2 * Math.PI;
        t.exports = {
            containStroke: function (t, e, n, a, o, s, l, h, u) {
                if (0 === l)return !1;
                var c = l;
                h -= t, u -= e;
                var f = Math.sqrt(h * h + u * u);
                if (f - c > n || f + c < n)return !1;
                if (Math.abs(a - o) % r < 1e-4)return !0;
                if (s) {
                    var d = a;
                    a = i(o), o = i(d)
                } else a = i(a), o = i(o);
                a > o && (o += r);
                var p = Math.atan2(u, h);
                return p < 0 && (p += r), p >= a && p <= o || p + r >= a && p + r <= o
            }
        }
    }, function (t, e, n) {
        var i = n(17);
        t.exports = {
            containStroke: function (t, e, n, r, a, o, s, l, h, u, c) {
                if (0 === h)return !1;
                var f = h;
                if (c > e + f && c > r + f && c > o + f && c > l + f || c < e - f && c < r - f && c < o - f && c < l - f || u > t + f && u > n + f && u > a + f && u > s + f || u < t - f && u < n - f && u < a - f && u < s - f)return !1;
                var d = i.cubicProjectPoint(t, e, n, r, a, o, s, l, u, c, null);
                return d <= f / 2
            }
        }
    }, function (t, e, n) {
        function i(t, e) {
            return Math.abs(t - e) < _
        }

        function r() {
            var t = b[0];
            b[0] = b[1], b[1] = t
        }

        function a(t, e, n, i, a, o, s, l, h, u) {
            if (u > e && u > i && u > o && u > l || u < e && u < i && u < o && u < l)return 0;
            var c = g.cubicRootAt(e, i, o, l, u, x);
            if (0 === c)return 0;
            for (var f, d, p = 0, v = -1, m = 0; m < c; m++) {
                var y = x[m], _ = 0 === y || 1 === y ? .5 : 1, w = g.cubicAt(t, n, a, s, y);
                w < h || (v < 0 && (v = g.cubicExtrema(e, i, o, l, b), b[1] < b[0] && v > 1 && r(), f = g.cubicAt(e, i, o, l, b[0]), v > 1 && (d = g.cubicAt(e, i, o, l, b[1]))), p += 2 == v ? y < b[0] ? f < e ? _ : -_ : y < b[1] ? d < f ? _ : -_ : l < d ? _ : -_ : y < b[0] ? f < e ? _ : -_ : l < f ? _ : -_)
            }
            return p
        }

        function o(t, e, n, i, r, a, o, s) {
            if (s > e && s > i && s > a || s < e && s < i && s < a)return 0;
            var l = g.quadraticRootAt(e, i, a, s, x);
            if (0 === l)return 0;
            var h = g.quadraticExtremum(e, i, a);
            if (h >= 0 && h <= 1) {
                for (var u = 0, c = g.quadraticAt(e, i, a, h), f = 0; f < l; f++) {
                    var d = 0 === x[f] || 1 === x[f] ? .5 : 1, p = g.quadraticAt(t, n, r, x[f]);
                    p < o || (u += x[f] < h ? c < e ? d : -d : a < c ? d : -d)
                }
                return u
            }
            var d = 0 === x[0] || 1 === x[0] ? .5 : 1, p = g.quadraticAt(t, n, r, x[0]);
            return p < o ? 0 : a < e ? d : -d
        }

        function s(t, e, n, i, r, a, o, s) {
            if (s -= e, s > n || s < -n)return 0;
            var l = Math.sqrt(n * n - s * s);
            x[0] = -l, x[1] = l;
            var h = Math.abs(i - r);
            if (h < 1e-4)return 0;
            if (h % y < 1e-4) {
                i = 0, r = y;
                var u = a ? 1 : -1;
                return o >= x[0] + t && o <= x[1] + t ? u : 0
            }
            if (a) {
                var l = i;
                i = p(r), r = p(l)
            } else i = p(i), r = p(r);
            i > r && (r += y);
            for (var c = 0, f = 0; f < 2; f++) {
                var d = x[f];
                if (d + t > o) {
                    var g = Math.atan2(s, d), u = a ? 1 : -1;
                    g < 0 && (g = y + g), (g >= i && g <= r || g + y >= i && g + y <= r) && (g > Math.PI / 2 && g < 1.5 * Math.PI && (u = -u), c += u)
                }
            }
            return c
        }

        function l(t, e, n, r, l) {
            for (var u = 0, p = 0, g = 0, y = 0, _ = 0, x = 0; x < t.length;) {
                var b = t[x++];
                switch (b === h.M && x > 1 && (n || (u += v(p, g, y, _, r, l))), 1 == x && (p = t[x], g = t[x + 1], y = p, _ = g), b) {
                    case h.M:
                        y = t[x++], _ = t[x++], p = y, g = _;
                        break;
                    case h.L:
                        if (n) {
                            if (m(p, g, t[x], t[x + 1], e, r, l))return !0
                        } else u += v(p, g, t[x], t[x + 1], r, l) || 0;
                        p = t[x++], g = t[x++];
                        break;
                    case h.C:
                        if (n) {
                            if (c.containStroke(p, g, t[x++], t[x++], t[x++], t[x++], t[x], t[x + 1], e, r, l))return !0
                        } else u += a(p, g, t[x++], t[x++], t[x++], t[x++], t[x], t[x + 1], r, l) || 0;
                        p = t[x++], g = t[x++];
                        break;
                    case h.Q:
                        if (n) {
                            if (f.containStroke(p, g, t[x++], t[x++], t[x], t[x + 1], e, r, l))return !0
                        } else u += o(p, g, t[x++], t[x++], t[x], t[x + 1], r, l) || 0;
                        p = t[x++], g = t[x++];
                        break;
                    case h.A:
                        var w = t[x++], M = t[x++], T = t[x++], S = t[x++], A = t[x++], I = t[x++], C = (t[x++], 1 - t[x++]), L = Math.cos(A) * T + w, k = Math.sin(A) * S + M;
                        x > 1 ? u += v(p, g, L, k, r, l) : (y = L, _ = k);
                        var P = (r - w) * S / T + w;
                        if (n) {
                            if (d.containStroke(w, M, S, A, A + I, C, e, P, l))return !0
                        } else u += s(w, M, S, A, A + I, C, P, l);
                        p = Math.cos(A + I) * T + w, g = Math.sin(A + I) * S + M;
                        break;
                    case h.R:
                        y = p = t[x++], _ = g = t[x++];
                        var O = t[x++], D = t[x++], L = y + O, k = _ + D;
                        if (n) {
                            if (m(y, _, L, _, e, r, l) || m(L, _, L, k, e, r, l) || m(L, k, y, k, e, r, l) || m(y, k, y, _, e, r, l))return !0
                        } else u += v(L, _, L, k, r, l), u += v(y, k, y, _, r, l);
                        break;
                    case h.Z:
                        if (n) {
                            if (m(p, g, y, _, e, r, l))return !0
                        } else u += v(p, g, y, _, r, l);
                        p = y, g = _
                }
            }
            return n || i(g, _) || (u += v(p, g, y, _, r, l) || 0), 0 !== u
        }

        var h = n(28).CMD, u = n(84), c = n(147), f = n(85), d = n(146), p = n(62).normalizeRadian, g = n(17), v = n(86), m = u.containStroke, y = 2 * Math.PI, _ = 1e-4, x = [-1, -1, -1], b = [-1, -1];
        t.exports = {
            contain: function (t, e, n) {
                return l(t, 0, !1, e, n)
            }, containStroke: function (t, e, n, i) {
                return l(t, e, !0, n, i)
            }
        }
    }, function (t, e, n) {
        function i(t) {
            var e = t[1][0] - t[0][0], n = t[1][1] - t[0][1];
            return Math.sqrt(e * e + n * n)
        }

        function r(t) {
            return [(t[0][0] + t[1][0]) / 2, (t[0][1] + t[1][1]) / 2]
        }

        var a = n(24), o = function () {
            this._track = []
        };
        o.prototype = {
            constructor: o, recognize: function (t, e, n) {
                return this._doTrack(t, e, n), this._recognize(t)
            }, clear: function () {
                return this._track.length = 0, this
            }, _doTrack: function (t, e, n) {
                var i = t.touches;
                if (i) {
                    for (var r = {points: [], touches: [], target: e, event: t}, o = 0, s = i.length; o < s; o++) {
                        var l = i[o], h = a.clientToLocal(n, l, {});
                        r.points.push([h.zrX, h.zrY]), r.touches.push(l)
                    }
                    this._track.push(r)
                }
            }, _recognize: function (t) {
                for (var e in s)if (s.hasOwnProperty(e)) {
                    var n = s[e](this._track, t);
                    if (n)return n
                }
            }
        };
        var s = {
            pinch: function (t, e) {
                var n = t.length;
                if (n) {
                    var a = (t[n - 1] || {}).points, o = (t[n - 2] || {}).points || a;
                    if (o && o.length > 1 && a && a.length > 1) {
                        var s = i(a) / i(o);
                        !isFinite(s) && (s = 1), e.pinchScale = s;
                        var l = r(a);
                        return e.pinchX = l[0], e.pinchY = l[1], {type: "pinch", target: t[0].target, event: e}
                    }
                }
            }
        };
        t.exports = o
    }, function (t, e) {
        var n = function () {
            this.head = null, this.tail = null, this._len = 0
        }, i = n.prototype;
        i.insert = function (t) {
            var e = new r(t);
            return this.insertEntry(e), e
        }, i.insertEntry = function (t) {
            this.head ? (this.tail.next = t, t.prev = this.tail, this.tail = t) : this.head = this.tail = t, this._len++
        }, i.remove = function (t) {
            var e = t.prev, n = t.next;
            e ? e.next = n : this.head = n, n ? n.prev = e : this.tail = e, t.next = t.prev = null, this._len--
        }, i.len = function () {
            return this._len
        };
        var r = function (t) {
            this.value = t, this.next, this.prev
        }, a = function (t) {
            this._list = new n, this._map = {}, this._maxSize = t || 10
        }, o = a.prototype;
        o.put = function (t, e) {
            var n = this._list, i = this._map;
            if (null == i[t]) {
                var r = n.len();
                if (r >= this._maxSize && r > 0) {
                    var a = n.head;
                    n.remove(a), delete i[a.key]
                }
                var o = n.insert(e);
                o.key = t, i[t] = o
            }
        }, o.get = function (t) {
            var e = this._map[t], n = this._list;
            if (null != e)return e !== n.tail && (n.remove(e), n.insertEntry(e)), e.value
        }, o.clear = function () {
            this._list.clear(), this._map = {}
        }, t.exports = a
    }, function (t, e, n) {
        function i(t) {
            return "mousewheel" === t && f.browser.firefox ? "DOMMouseScroll" : t
        }

        function r(t, e, n) {
            var i = t._gestureMgr;
            "start" === n && i.clear();
            var r = i.recognize(e, t.handler.findHover(e.zrX, e.zrY, null), t.dom);
            if ("end" === n && i.clear(), r) {
                var a = r.type;
                e.gestureEvent = a, t.handler.dispatchToElement(r.target, a, r.event)
            }
        }

        function a(t) {
            t._touching = !0, clearTimeout(t._touchTimer), t._touchTimer = setTimeout(function () {
                t._touching = !1
            }, 700)
        }

        function o() {
            return f.touchEventsSupported
        }

        function s(t) {
            function e(t, e) {
                return function () {
                    if (!e._touching)return t.apply(e, arguments)
                }
            }

            for (var n = 0; n < _.length; n++) {
                var i = _[n];
                t._handlers[i] = u.bind(x[i], t)
            }
            for (var n = 0; n < y.length; n++) {
                var i = y[n];
                t._handlers[i] = e(x[i], t)
            }
        }

        function l(t) {
            function e(e, n) {
                u.each(e, function (e) {
                    p(t, i(e), n._handlers[e])
                }, n)
            }

            c.call(this), this.dom = t, this._touching = !1, this._touchTimer, this._gestureMgr = new d, this._handlers = {}, s(this), o() && e(_, this), e(y, this)
        }

        var h = n(24), u = n(1), c = n(20), f = n(11), d = n(149), p = h.addEventListener, g = h.removeEventListener, v = h.normalizeEvent, m = 300, y = ["click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"], _ = ["touchstart", "touchend", "touchmove"], x = {
            mousemove: function (t) {
                t = v(this.dom, t), this.trigger("mousemove", t)
            }, mouseout: function (t) {
                t = v(this.dom, t);
                var e = t.toElement || t.relatedTarget;
                if (e != this.dom)for (; e && 9 != e.nodeType;) {
                    if (e === this.dom)return;
                    e = e.parentNode
                }
                this.trigger("mouseout", t)
            }, touchstart: function (t) {
                t = v(this.dom, t), t.zrByTouch = !0, this._lastTouchMoment = new Date, r(this, t, "start"), x.mousemove.call(this, t), x.mousedown.call(this, t), a(this)
            }, touchmove: function (t) {
                t = v(this.dom, t), t.zrByTouch = !0, r(this, t, "change"), x.mousemove.call(this, t), a(this)
            }, touchend: function (t) {
                t = v(this.dom, t), t.zrByTouch = !0, r(this, t, "end"), x.mouseup.call(this, t), +new Date - this._lastTouchMoment < m && x.click.call(this, t), a(this)
            }
        };
        u.each(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function (t) {
            x[t] = function (e) {
                e = v(this.dom, e), this.trigger(t, e)
            }
        });
        var b = l.prototype;
        b.dispose = function () {
            for (var t = y.concat(_), e = 0; e < t.length; e++) {
                var n = t[e];
                g(this.dom, i(n), this._handlers[n])
            }
        }, b.setCursor = function (t) {
            this.dom.style.cursor = t || "default"
        }, u.mixin(l, c), t.exports = l
    }, function (t, e, n) {
        var i = n(7);
        t.exports = i.extend({
            type: "compound", shape: {paths: null}, _updatePathDirty: function () {
                for (var t = this.__dirtyPath, e = this.shape.paths, n = 0; n < e.length; n++)t = t || e[n].__dirtyPath;
                this.__dirtyPath = t, this.__dirty = this.__dirty || t
            }, beforeBrush: function () {
                this._updatePathDirty();
                for (var t = this.shape.paths || [], e = this.getGlobalScale(), n = 0; n < t.length; n++)t[n].path.setScale(e[0], e[1])
            }, buildPath: function (t, e) {
                for (var n = e.paths || [], i = 0; i < n.length; i++)n[i].buildPath(t, n[i].shape, !0)
            }, afterBrush: function () {
                for (var t = this.shape.paths, e = 0; e < t.length; e++)t[e].__dirtyPath = !1
            }, getBoundingRect: function () {
                return this._updatePathDirty(), i.prototype.getBoundingRect.call(this)
            }
        })
    }, function (t, e, n) {
        var i = n(1), r = n(37), a = function (t, e, n, i, a) {
            this.x = null == t ? .5 : t, this.y = null == e ? .5 : e, this.r = null == n ? .5 : n, this.type = "radial", this.global = a || !1, r.call(this, i)
        };
        a.prototype = {constructor: a}, i.inherits(a, r), t.exports = a
    }, function (t, e) {
        t.exports = {
            buildPath: function (t, e) {
                var n, i, r, a, o = e.x, s = e.y, l = e.width, h = e.height, u = e.r;
                l < 0 && (o += l, l = -l), h < 0 && (s += h, h = -h), "number" == typeof u ? n = i = r = a = u : u instanceof Array ? 1 === u.length ? n = i = r = a = u[0] : 2 === u.length ? (n = r = u[0], i = a = u[1]) : 3 === u.length ? (n = u[0], i = a = u[1], r = u[2]) : (n = u[0], i = u[1], r = u[2], a = u[3]) : n = i = r = a = 0;
                var c;
                n + i > l && (c = n + i, n *= l / c, i *= l / c), r + a > l && (c = r + a, r *= l / c, a *= l / c), i + r > h && (c = i + r, i *= h / c, r *= h / c), n + a > h && (c = n + a, n *= h / c, a *= h / c), t.moveTo(o + n, s), t.lineTo(o + l - i, s), 0 !== i && t.quadraticCurveTo(o + l, s, o + l, s + i), t.lineTo(o + l, s + h - r), 0 !== r && t.quadraticCurveTo(o + l, s + h, o + l - r, s + h), t.lineTo(o + a, s + h), 0 !== a && t.quadraticCurveTo(o, s + h, o, s + h - a), t.lineTo(o, s + n), 0 !== n && t.quadraticCurveTo(o, s, o + n, s)
            }
        }
    }, function (t, e, n) {
        var i = n(5), r = i.min, a = i.max, o = i.scale, s = i.distance, l = i.add;
        t.exports = function (t, e, n, h) {
            var u, c, f, d, p = [], g = [], v = [], m = [];
            if (h) {
                f = [1 / 0, 1 / 0], d = [-(1 / 0), -(1 / 0)];
                for (var y = 0, _ = t.length; y < _; y++)r(f, f, t[y]), a(d, d, t[y]);
                r(f, f, h[0]), a(d, d, h[1])
            }
            for (var y = 0, _ = t.length; y < _; y++) {
                var x = t[y];
                if (n)u = t[y ? y - 1 : _ - 1], c = t[(y + 1) % _]; else {
                    if (0 === y || y === _ - 1) {
                        p.push(i.clone(t[y]));
                        continue
                    }
                    u = t[y - 1], c = t[y + 1]
                }
                i.sub(g, c, u), o(g, g, e);
                var b = s(x, u), w = s(x, c), M = b + w;
                0 !== M && (b /= M, w /= M), o(v, g, -b), o(m, g, w);
                var T = l([], x, v), S = l([], x, m);
                h && (a(T, T, f), r(T, T, d), a(S, S, f), r(S, S, d)), p.push(T), p.push(S)
            }
            return n && p.push(p.shift()), p
        }
    }, function (t, e, n) {
        function i(t, e, n, i, r, a, o) {
            var s = .5 * (n - t), l = .5 * (i - e);
            return (2 * (e - n) + s + l) * o + (-3 * (e - n) - 2 * s - l) * a + s * r + e
        }

        var r = n(5);
        t.exports = function (t, e) {
            for (var n = t.length, a = [], o = 0, s = 1; s < n; s++)o += r.distance(t[s - 1], t[s]);
            var l = o / 2;
            l = l < n ? n : l;
            for (var s = 0; s < l; s++) {
                var h, u, c, f = s / (l - 1) * (e ? n : n - 1), d = Math.floor(f), p = f - d, g = t[d % n];
                e ? (h = t[(d - 1 + n) % n], u = t[(d + 1) % n], c = t[(d + 2) % n]) : (h = t[0 === d ? d : d - 1], u = t[d > n - 2 ? n - 1 : d + 1], c = t[d > n - 3 ? n - 1 : d + 2]);
                var v = p * p, m = p * v;
                a.push([i(h[0], g[0], u[0], c[0], p, v, m), i(h[1], g[1], u[1], c[1], p, v, m)])
            }
            return a
        }
    }, function (t, e, n) {
        t.exports = n(7).extend({
            type: "arc",
            shape: {cx: 0, cy: 0, r: 0, startAngle: 0, endAngle: 2 * Math.PI, clockwise: !0},
            style: {stroke: "#000", fill: null},
            buildPath: function (t, e) {
                var n = e.cx, i = e.cy, r = Math.max(e.r, 0), a = e.startAngle, o = e.endAngle, s = e.clockwise, l = Math.cos(a), h = Math.sin(a);
                t.moveTo(l * r + n, h * r + i), t.arc(n, i, r, a, o, !s)
            }
        })
    }, function (t, e, n) {
        function i(t, e, n) {
            var i = t.cpx2, r = t.cpy2;
            return null === i || null === r ? [(n ? c : h)(t.x1, t.cpx1, t.cpx2, t.x2, e), (n ? c : h)(t.y1, t.cpy1, t.cpy2, t.y2, e)] : [(n ? u : l)(t.x1, t.cpx1, t.x2, e), (n ? u : l)(t.y1, t.cpy1, t.y2, e)]
        }

        var r = n(17), a = n(5), o = r.quadraticSubdivide, s = r.cubicSubdivide, l = r.quadraticAt, h = r.cubicAt, u = r.quadraticDerivativeAt, c = r.cubicDerivativeAt, f = [];
        t.exports = n(7).extend({
            type: "bezier-curve",
            shape: {x1: 0, y1: 0, x2: 0, y2: 0, cpx1: 0, cpy1: 0, percent: 1},
            style: {stroke: "#000", fill: null},
            buildPath: function (t, e) {
                var n = e.x1, i = e.y1, r = e.x2, a = e.y2, l = e.cpx1, h = e.cpy1, u = e.cpx2, c = e.cpy2, d = e.percent;
                0 !== d && (t.moveTo(n, i), null == u || null == c ? (d < 1 && (o(n, l, r, d, f), l = f[1], r = f[2], o(i, h, a, d, f), h = f[1], a = f[2]), t.quadraticCurveTo(l, h, r, a)) : (d < 1 && (s(n, l, u, r, d, f), l = f[1], u = f[2], r = f[3], s(i, h, c, a, d, f), h = f[1], c = f[2], a = f[3]), t.bezierCurveTo(l, h, u, c, r, a)))
            },
            pointAt: function (t) {
                return i(this.shape, t, !1)
            },
            tangentAt: function (t) {
                var e = i(this.shape, t, !0);
                return a.normalize(e, e)
            }
        })
    }, function (t, e, n) {
        t.exports = n(7).extend({
            type: "circle", shape: {cx: 0, cy: 0, r: 0}, buildPath: function (t, e, n) {
                n && t.moveTo(e.cx + e.r, e.cy), t.arc(e.cx, e.cy, e.r, 0, 2 * Math.PI, !0)
            }
        })
    }, function (t, e, n) {
        t.exports = n(7).extend({
            type: "line",
            shape: {x1: 0, y1: 0, x2: 0, y2: 0, percent: 1},
            style: {stroke: "#000", fill: null},
            buildPath: function (t, e) {
                var n = e.x1, i = e.y1, r = e.x2, a = e.y2, o = e.percent;
                0 !== o && (t.moveTo(n, i), o < 1 && (r = n * (1 - o) + r * o, a = i * (1 - o) + a * o), t.lineTo(r, a))
            },
            pointAt: function (t) {
                var e = this.shape;
                return [e.x1 * (1 - t) + e.x2 * t, e.y1 * (1 - t) + e.y2 * t]
            }
        })
    }, function (t, e, n) {
        var i = n(66);
        t.exports = n(7).extend({
            type: "polygon",
            shape: {points: null, smooth: !1, smoothConstraint: null},
            buildPath: function (t, e) {
                i.buildPath(t, e, !0)
            }
        })
    }, function (t, e, n) {
        var i = n(66);
        t.exports = n(7).extend({
            type: "polyline",
            shape: {points: null, smooth: !1, smoothConstraint: null},
            style: {stroke: "#000", fill: null},
            buildPath: function (t, e) {
                i.buildPath(t, e, !1)
            }
        })
    }, function (t, e, n) {
        var i = n(154);
        t.exports = n(7).extend({
            type: "rect",
            shape: {r: 0, x: 0, y: 0, width: 0, height: 0},
            buildPath: function (t, e) {
                var n = e.x, r = e.y, a = e.width, o = e.height;
                e.r ? i.buildPath(t, e) : t.rect(n, r, a, o), t.closePath()
            }
        })
    }, function (t, e, n) {
        t.exports = n(7).extend({
            type: "ring", shape: {cx: 0, cy: 0, r: 0, r0: 0}, buildPath: function (t, e) {
                var n = e.cx, i = e.cy, r = 2 * Math.PI;
                t.moveTo(n + e.r, i), t.arc(n, i, e.r, 0, r, !1), t.moveTo(n + e.r0, i), t.arc(n, i, e.r0, 0, r, !0)
            }
        })
    }, function (t, e, n) {
        t.exports = n(7).extend({
            type: "sector",
            shape: {cx: 0, cy: 0, r0: 0, r: 0, startAngle: 0, endAngle: 2 * Math.PI, clockwise: !0},
            buildPath: function (t, e) {
                var n = e.cx, i = e.cy, r = Math.max(e.r0 || 0, 0), a = Math.max(e.r, 0), o = e.startAngle, s = e.endAngle, l = e.clockwise, h = Math.cos(o), u = Math.sin(o);
                t.moveTo(h * r + n, u * r + i), t.lineTo(h * a + n, u * a + i), t.arc(n, i, a, o, s, !l), t.lineTo(Math.cos(s) * r + n, Math.sin(s) * r + i), 0 !== r && t.arc(n, i, r, s, o, l), t.closePath()
            }
        })
    }, function (t, e, n) {
        var i = n(60), r = n(1), a = r.isString, o = r.isFunction, s = r.isObject, l = n(48), h = function () {
            this.animators = []
        };
        h.prototype = {
            constructor: h, animate: function (t, e) {
                var n, a = !1, o = this, s = this.__zr;
                if (t) {
                    var h = t.split("."), u = o;
                    a = "shape" === h[0];
                    for (var c = 0, f = h.length; c < f; c++)u && (u = u[h[c]]);
                    u && (n = u)
                } else n = o;
                if (!n)return void l('Property "' + t + '" is not existed in element ' + o.id);
                var d = o.animators, p = new i(n, e);
                return p.during(function (t) {
                    o.dirty(a)
                }).done(function () {
                    d.splice(r.indexOf(d, p), 1)
                }), d.push(p), s && s.animation.addAnimator(p), p
            }, stopAnimation: function (t) {
                for (var e = this.animators, n = e.length, i = 0; i < n; i++)e[i].stop(t);
                return e.length = 0, this
            }, animateTo: function (t, e, n, i, r) {
                function s() {
                    h--, h || r && r()
                }

                a(n) ? (r = i, i = n, n = 0) : o(i) ? (r = i, i = "linear", n = 0) : o(n) ? (r = n, n = 0) : o(e) ? (r = e, e = 500) : e || (e = 500), this.stopAnimation(), this._animateToShallow("", this, t, e, n, i, r);
                var l = this.animators.slice(), h = l.length;
                h || r && r();
                for (var u = 0; u < l.length; u++)l[u].done(s).start(i)
            }, _animateToShallow: function (t, e, n, i, a) {
                var o = {}, l = 0;
                for (var h in n)if (n.hasOwnProperty(h))if (null != e[h])s(n[h]) && !r.isArrayLike(n[h]) ? this._animateToShallow(t ? t + "." + h : h, e[h], n[h], i, a) : (o[h] = n[h], l++); else if (null != n[h])if (t) {
                    var u = {};
                    u[t] = {}, u[t][h] = n[h], this.attr(u)
                } else this.attr(h, n[h]);
                return l > 0 && this.animate(t, !1).when(null == i ? 500 : i, o).delay(a || 0), this
            }
        }, t.exports = h
    }, function (t, e) {
        function n() {
            this.on("mousedown", this._dragStart, this), this.on("mousemove", this._drag, this), this.on("mouseup", this._dragEnd, this), this.on("globalout", this._dragEnd, this)
        }

        n.prototype = {
            constructor: n, _dragStart: function (t) {
                var e = t.target;
                e && e.draggable && (this._draggingTarget = e, e.dragging = !0, this._x = t.offsetX, this._y = t.offsetY, this.dispatchToElement(e, "dragstart", t.event))
            }, _drag: function (t) {
                var e = this._draggingTarget;
                if (e) {
                    var n = t.offsetX, i = t.offsetY, r = n - this._x, a = i - this._y;
                    this._x = n, this._y = i, e.drift(r, a, t), this.dispatchToElement(e, "drag", t.event);
                    var o = this.findHover(n, i, e), s = this._dropTarget;
                    this._dropTarget = o, e !== o && (s && o !== s && this.dispatchToElement(s, "dragleave", t.event), o && o !== s && this.dispatchToElement(o, "dragenter", t.event))
                }
            }, _dragEnd: function (t) {
                var e = this._draggingTarget;
                e && (e.dragging = !1), this.dispatchToElement(e, "dragend", t.event), this._dropTarget && this.dispatchToElement(this._dropTarget, "drop", t.event), this._draggingTarget = null, this._dropTarget = null
            }
        }, t.exports = n
    }, function (t, e, n) {
        function i(t, e, n, i, r, a, o, s, l, h, u) {
            var g = l * (p / 180), y = d(g) * (t - n) / 2 + f(g) * (e - i) / 2, _ = -1 * f(g) * (t - n) / 2 + d(g) * (e - i) / 2, x = y * y / (o * o) + _ * _ / (s * s);
            x > 1 && (o *= c(x), s *= c(x));
            var b = (r === a ? -1 : 1) * c((o * o * (s * s) - o * o * (_ * _) - s * s * (y * y)) / (o * o * (_ * _) + s * s * (y * y))) || 0, w = b * o * _ / s, M = b * -s * y / o, T = (t + n) / 2 + d(g) * w - f(g) * M, S = (e + i) / 2 + f(g) * w + d(g) * M, A = m([1, 0], [(y - w) / o, (_ - M) / s]), I = [(y - w) / o, (_ - M) / s], C = [(-1 * y - w) / o, (-1 * _ - M) / s], L = m(I, C);
            v(I, C) <= -1 && (L = p), v(I, C) >= 1 && (L = 0), 0 === a && L > 0 && (L -= 2 * p), 1 === a && L < 0 && (L += 2 * p), u.addData(h, T, S, o, s, A, L, g, a)
        }

        function r(t) {
            if (!t)return [];
            var e, n = t.replace(/-/g, " -").replace(/  /g, " ").replace(/ /g, ",").replace(/,,/g, ",");
            for (e = 0; e < u.length; e++)n = n.replace(new RegExp(u[e], "g"), "|" + u[e]);
            var r, a = n.split("|"), o = 0, l = 0, h = new s, c = s.CMD;
            for (e = 1; e < a.length; e++) {
                var f, d = a[e], p = d.charAt(0), g = 0, v = d.slice(1).replace(/e,-/g, "e-").split(",");
                v.length > 0 && "" === v[0] && v.shift();
                for (var m = 0; m < v.length; m++)v[m] = parseFloat(v[m]);
                for (; g < v.length && !isNaN(v[g]) && !isNaN(v[0]);) {
                    var y, _, x, b, w, M, T, S = o, A = l;
                    switch (p) {
                        case"l":
                            o += v[g++], l += v[g++], f = c.L, h.addData(f, o, l);
                            break;
                        case"L":
                            o = v[g++], l = v[g++], f = c.L, h.addData(f, o, l);
                            break;
                        case"m":
                            o += v[g++], l += v[g++], f = c.M, h.addData(f, o, l), p = "l";
                            break;
                        case"M":
                            o = v[g++], l = v[g++], f = c.M, h.addData(f, o, l), p = "L";
                            break;
                        case"h":
                            o += v[g++], f = c.L, h.addData(f, o, l);
                            break;
                        case"H":
                            o = v[g++], f = c.L, h.addData(f, o, l);
                            break;
                        case"v":
                            l += v[g++], f = c.L, h.addData(f, o, l);
                            break;
                        case"V":
                            l = v[g++], f = c.L, h.addData(f, o, l);
                            break;
                        case"C":
                            f = c.C, h.addData(f, v[g++], v[g++], v[g++], v[g++], v[g++], v[g++]), o = v[g - 2], l = v[g - 1];
                            break;
                        case"c":
                            f = c.C, h.addData(f, v[g++] + o, v[g++] + l, v[g++] + o, v[g++] + l, v[g++] + o, v[g++] + l), o += v[g - 2], l += v[g - 1];
                            break;
                        case"S":
                            y = o, _ = l;
                            var I = h.len(), C = h.data;
                            r === c.C && (y += o - C[I - 4], _ += l - C[I - 3]), f = c.C, S = v[g++], A = v[g++], o = v[g++], l = v[g++], h.addData(f, y, _, S, A, o, l);
                            break;
                        case"s":
                            y = o, _ = l;
                            var I = h.len(), C = h.data;
                            r === c.C && (y += o - C[I - 4], _ += l - C[I - 3]), f = c.C, S = o + v[g++], A = l + v[g++], o += v[g++], l += v[g++], h.addData(f, y, _, S, A, o, l);
                            break;
                        case"Q":
                            S = v[g++], A = v[g++], o = v[g++], l = v[g++], f = c.Q, h.addData(f, S, A, o, l);
                            break;
                        case"q":
                            S = v[g++] + o, A = v[g++] + l, o += v[g++], l += v[g++], f = c.Q, h.addData(f, S, A, o, l);
                            break;
                        case"T":
                            y = o, _ = l;
                            var I = h.len(), C = h.data;
                            r === c.Q && (y += o - C[I - 4], _ += l - C[I - 3]), o = v[g++], l = v[g++], f = c.Q, h.addData(f, y, _, o, l);
                            break;
                        case"t":
                            y = o, _ = l;
                            var I = h.len(), C = h.data;
                            r === c.Q && (y += o - C[I - 4], _ += l - C[I - 3]), o += v[g++], l += v[g++], f = c.Q, h.addData(f, y, _, o, l);
                            break;
                        case"A":
                            x = v[g++], b = v[g++], w = v[g++], M = v[g++], T = v[g++], S = o, A = l, o = v[g++], l = v[g++], f = c.A, i(S, A, o, l, M, T, x, b, w, f, h);
                            break;
                        case"a":
                            x = v[g++], b = v[g++], w = v[g++], M = v[g++], T = v[g++], S = o, A = l, o += v[g++], l += v[g++], f = c.A, i(S, A, o, l, M, T, x, b, w, f, h)
                    }
                }
                "z" !== p && "Z" !== p || (f = c.Z, h.addData(f)), r = f
            }
            return h.toStatic(), h
        }

        function a(t, e) {
            var n, i = r(t);
            return e = e || {}, e.buildPath = function (t) {
                t.setData(i.data), n && l(t, n);
                var e = t.getContext();
                e && t.rebuildPath(e)
            }, e.applyTransform = function (t) {
                n || (n = h.create()), h.mul(n, t, n), this.dirty(!0)
            }, e
        }

        var o = n(7), s = n(28), l = n(169), h = n(19), u = ["m", "M", "l", "L", "v", "V", "h", "H", "z", "Z", "c", "C", "q", "Q", "t", "T", "s", "S", "a", "A"], c = Math.sqrt, f = Math.sin, d = Math.cos, p = Math.PI, g = function (t) {
            return Math.sqrt(t[0] * t[0] + t[1] * t[1])
        }, v = function (t, e) {
            return (t[0] * e[0] + t[1] * e[1]) / (g(t) * g(e))
        }, m = function (t, e) {
            return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(v(t, e))
        };
        t.exports = {
            createFromString: function (t, e) {
                return new o(a(t, e))
            }, extendFromString: function (t, e) {
                return o.extend(a(t, e))
            }, mergePath: function (t, e) {
                for (var n = [], i = t.length, r = 0; r < i; r++) {
                    var a = t[r];
                    a.__dirty && a.buildPath(a.path, a.shape, !0), n.push(a.path)
                }
                var s = new o(e);
                return s.buildPath = function (t) {
                    t.appendPath(n);
                    var e = t.getContext();
                    e && t.rebuildPath(e)
                }, s
            }
        }
    }, function (t, e, n) {
        function i(t, e) {
            var n, i, a, u, c, f, d = t.data, p = r.M, g = r.C, v = r.L, m = r.R, y = r.A, _ = r.Q;
            for (a = 0, u = 0; a < d.length;) {
                switch (n = d[a++], u = a, i = 0, n) {
                    case p:
                        i = 1;
                        break;
                    case v:
                        i = 1;
                        break;
                    case g:
                        i = 3;
                        break;
                    case _:
                        i = 2;
                        break;
                    case y:
                        var x = e[4], b = e[5], w = l(e[0] * e[0] + e[1] * e[1]), M = l(e[2] * e[2] + e[3] * e[3]), T = h(-e[1] / M, e[0] / w);
                        d[a++] += x, d[a++] += b, d[a++] *= w, d[a++] *= M, d[a++] += T, d[a++] += T, a += 2, u = a;
                        break;
                    case m:
                        f[0] = d[a++], f[1] = d[a++], o(f, f, e), d[u++] = f[0], d[u++] = f[1], f[0] += d[a++], f[1] += d[a++], o(f, f, e), d[u++] = f[0], d[u++] = f[1]
                }
                for (c = 0; c < i; c++) {
                    var f = s[c];
                    f[0] = d[a++], f[1] = d[a++], o(f, f, e), d[u++] = f[0], d[u++] = f[1]
                }
            }
        }

        var r = n(28).CMD, a = n(5), o = a.applyTransform, s = [[], [], []], l = Math.sqrt, h = Math.atan2;
        t.exports = i
    }])
});
define("job/tmpl.resume.feedback_tip", ["./util.artTemplate"], function (artTemplate) {
    var template = '<div class="feedback-tip">' + '<div class="feedback-tip-content">' + '<span class="triangle-up"></span>' + '<span class="icon-inform"></span>' + "<span>{{tipInfo}}" + '<a id="{{watchId}}" class="watch-feedback-tip">点击查看</a>' + "</span>" + '<span id="{{closeId}}" class="close-feedback-tip"></span>' + "</div>" + "</div>";
    return artTemplate.compile(template)
});
define("job/busi.resume.jobInform", ["./util.echarts", "./util.cookie", "./tmpl.resume.feedback_tip"], function (echarts, cookie, feedback_tip) {
    $(function () {
        var pageJson = ____global.pageJson, resumeid = pageJson.rid, updateDays = pageJson.resume.updateDays, bizState = pageJson.bizState, updateDate = $("#updateDate").val(), followparam = pageJson.followparam;
        $(".update-time").text(updateDate);
        feedback(function (lowfeed) {
            showStatics(resumeid, updateDays, followparam, lowfeed)
        })
    });
    $(function () {
        var $body = $("body");
        $body.on("click", "#nowAdvance", function (event) {
            window.clickLog && window.clickLog("from=pc_jlxiangqing_daifankui_ljts");
            var clickFlag = window.parent.location.hostname;
            window.open("//jianli.58.com/resumefeedback/tonotfeedbackresumes?from=" + clickFlag)
        });
        $body.on("click", ".jobInformTopFeed", function (event) {
            window.clickLog && window.clickLog("from=pc_jlxiangqing_fankuiyindao");
            setbg("反馈率", 815, 540, "//jianli.58.com/resumefeedback/whatisfeedback?showBtn=true")
        });
        $body.on("click", ".watch-feedback-tip", function (event) {
            var btnId = $(this).attr("id");
            if (btnId == "watch-feedback-tip1") {
                window.clickLog && window.clickLog("from=pc-tishi1-click");
                setbg("反馈率", 815, 480, "//jianli.58.com/resumefeedback/whatisfeedback?showBtn=false")
            } else {
                window.clickLog && window.clickLog("from=pc-tishi2-click");
                setbg("反馈率", 815, 540, "//jianli.58.com/resumefeedback/whatisfeedback?showBtn=true")
            }
            cookie.setCookie("feedbackTip", "1", 1)
        });
        $body.on("click", ".close-feedback-tip", function (event) {
            var btnId = $(this).attr("id");
            if (btnId == "close-feedback-tip1") {
                window.clickLog && window.clickLog("from=pc-tishiguanbi1-click")
            } else {
                window.clickLog && window.clickLog("from=pc-tishiguanbi2-click")
            }
            $(".feedback-tip").hide();
            cookie.setCookie("feedbackTip", "1", 1)
        })
    });
    function feedback(callback) {
        var feedbackFlag = cookie.getCookie("feedbackcookie");
        var domFlag = $("#getContact").length;
        $.ajax({
            url: "//jianli.58.com/resumefeedback/getenterprisefeedbackrate",
            type: "GET",
            dataType: "JSON",
            success: function (data) {
                var feedbackNum = parseInt(data["entity"].efrate);
                var lowfeed = 0;
                if (feedbackNum < 50 && feedbackNum != "-1") {
                    $(".feedback").hide();
                    $(".feedbackone").show();
                    $(".feedbacknum").html(feedbackNum + "%");
                    window.clickLog && window.clickLog("from=pc_jlxiangqing_daifankui");
                    lowfeed = 1
                } else {
                    var pageJson = ____global.pageJson, bizState = pageJson.bizState, feedbackTipHtml = "", feedbackTip = cookie.getCookie("feedbackTip");
                    if (bizState == 2 || bizState == 4) {
                        if (feedbackNum == -1 && feedbackTip != "1") {
                            window.clickLog && window.clickLog("from=pc-tishi1-show");
                            feedbackTipHtml = feedback_tip({
                                tipInfo: "标记简历可提升反馈率，反馈率不足50% 将无法查看下方的简历活跃度/关注度数据，更多特权",
                                watchId: "watch-feedback-tip1",
                                closeId: "close-feedback-tip1"
                            })
                        } else if (feedbackNum <= 55 && feedbackTip != "1") {
                            window.clickLog && window.clickLog("from=pc-tishi2-show");
                            feedbackTipHtml = feedback_tip({
                                tipInfo: "当前反馈率为" + feedbackNum + "%，不足50%将无法查看活跃/关注度数据了哦，请及时进行标记反馈~更多特权",
                                watchId: "watch-feedback-tip2",
                                closeId: "close-feedback-tip2"
                            })
                        }
                        $(".telephone").after(feedbackTipHtml)
                    }
                }
                callback(lowfeed)
            },
            error: function () {
            }
        })
    }

    var calcQyActivity = function (updateDays, recv, down, favCount) {
        var score = 0;
        var updateDaysArray = [5, 5, 4, 4, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 0];
        var otherArray = [0, 5, 5, 5, 8, 8, 12, 12, 12, 15, 15];
        var scoreArray = [1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 4];
        if (updateDays < 15 && updateDays >= 0) {
            score += updateDaysArray[updateDays]
        }
        var otherCount = recv + down + favCount;
        if (0 < otherCount && 9 >= otherCount) {
            score += otherArray[otherCount]
        } else if (9 < otherCount) {
            score += 15
        }
        if (0 < score && score > 15) {
            return 5
        } else if (0 < score) {
            return scoreArray[score]
        }
        return 1
    };
    var calcQzActivity = function (updateDays, deliveryCount, phoneClickCount) {
        var score = 0;
        var updateDaysArray = [10, 10, 6, 6, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0];
        var otherArray = [0, 2, 2, 2, 3, 3, 3, 4, 4, 4, 4, 15];
        var scoreArray = [1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5];
        if (updateDays < 15 && updateDays >= 0) {
            score += updateDaysArray[updateDays]
        }
        var otherCount = deliveryCount + phoneClickCount;
        if (0 < otherCount && 9 >= otherCount) {
            score += otherArray[otherCount]
        } else if (9 < otherCount) {
            score += 5
        }
        if (0 < score && score > 11) {
            return 5
        } else if (0 < score) {
            return scoreArray[score]
        }
        return 1
    };
    var calLevel = function (level) {
        switch (level) {
            case 1:
            case 2:
            case 3:
                level = "低";
                break;
            case 4:
                level = "中";
                break;
            default:
                level = "高";
                break
        }
        return level
    };

    function showStatics(rid, updateDays, followparam, lowfeed) {
        var url = "//statisticszp.58.com/resume/statics/" + rid + "?followparam=" + followparam + "&lowfeed=" + lowfeed + "&v=1&callback=?";
        $.getJSON(url, function (data) {
            if (typeof data != "undefined" && data != null) {
                if (data.returnMessage == "success") {
                    var statics = eval("(" + data.entity + ")");
                    if (null != statics) {
                        if (statics.d > 0) {
                            $("#deliveryCount").text(statics.d)
                        }
                        if (statics.c > 0) {
                            $("#contactCount").text(statics.c)
                        }
                        if (statics.re > 0) {
                            $("#recvCount").text(statics.re)
                        }
                        if (statics.dw > 0) {
                            $("#downCount").text(statics.dw)
                        }
                        if (statics.f > 0) {
                            $("#favCount").text(statics.f)
                        }
                        if (statics.b > 0) {
                            $("#browseCount").text(statics.b)
                        }
                        var qyStar = calcQyActivity(updateDays, statics.re, statics.dw, statics.f);
                        var qzStar = calcQzActivity(updateDays, statics.d, statics.c);
                        showCharts($(".ua-chart")[0], qzStar);
                        showCharts($(".qy-chart")[0], qyStar);
                        $("#activety-live-level").text(calLevel(qzStar));
                        $("#activety-follow-level").text(calLevel(qyStar));
                        if (qzStar <= 2 && window.searchJob == 1) {
                            if (qzStar == 1) {
                                $("#resume-tips").text("TA最近不常来，有可能找到工作咯～建议您下载新简历")
                            } else {
                                $("#resume-tips").text("TA最近不太活跃哦，您可以试试运气，或下载近两天的新简历")
                            }
                            if (window.clickLog) {
                                clickLog("from=zhaopin_jianli_badtip")
                            }
                            if (bizState == 1) {
                                $("#hasFound-tip").show()
                            }
                        }
                    }
                }
            }
        })
    }

    function showCharts($ele, star) {
        var chartInit = echarts.init($ele), colorStyle = ["#fd8c74", "#e0e4eb"];
        var option = {
            color: colorStyle,
            series: [{
                type: "pie",
                radius: ["90%", "100%"],
                hoverAnimation: false,
                label: {normal: {position: "center"}},
                data: [{value: star}, {value: 5 - star}],
                emphasis: {color: colorStyle}
            }]
        };
        chartInit.setOption(option)
    }
});
!function () {
    function a(a) {
        return a.replace(t, "").replace(u, ",").replace(v, "").replace(w, "").replace(x, "").split(y)
    }

    function b(a) {
        return "'" + a.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'"
    }

    function c(c, d) {
        function e(a) {
            return m += a.split(/\n/).length - 1, k && (a = a.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")), a && (a = s[1] + b(a) + s[2] + "\n"), a
        }

        function f(b) {
            var c = m;
            if (j ? b = j(b, d) : g && (b = b.replace(/\n/g, function () {
                    return m++, "$line=" + m + ";"
                })), 0 === b.indexOf("=")) {
                var e = l && !/^=[=#]/.test(b);
                if (b = b.replace(/^=[=#]?|[\s;]*$/g, ""), e) {
                    var f = b.replace(/\s*\([^\)]+\)/, "");
                    n[f] || /^(include|print)$/.test(f) || (b = "$escape(" + b + ")")
                } else b = "$string(" + b + ")";
                b = s[1] + b + s[2]
            }
            return g && (b = "$line=" + c + ";" + b), r(a(b), function (a) {
                if (a && !p[a]) {
                    var b;
                    b = "print" === a ? u : "include" === a ? v : n[a] ? "$utils." + a : o[a] ? "$helpers." + a : "$data." + a, w += a + "=" + b + ",", p[a] = !0
                }
            }), b + "\n"
        }

        var g = d.debug, h = d.openTag, i = d.closeTag, j = d.parser, k = d.compress, l = d.escape, m = 1, p = {
            $data: 1,
            $filename: 1,
            $utils: 1,
            $helpers: 1,
            $out: 1,
            $line: 1
        }, q = "".trim, s = q ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"], t = q ? "$out+=text;return $out;" : "$out.push(text);", u = "function(){var text=''.concat.apply('',arguments);" + t + "}", v = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + t + "}", w = "var $utils=this,$helpers=$utils.$helpers," + (g ? "$line=0," : ""), x = s[0], y = "return new String(" + s[3] + ");";
        r(c.split(h), function (a) {
            a = a.split(i);
            var b = a[0], c = a[1];
            1 === a.length ? x += e(b) : (x += f(b), c && (x += e(c)))
        });
        var z = w + x + y;
        g && (z = "try{" + z + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + b(c) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");
        try {
            var A = new Function("$data", "$filename", z);
            return A.prototype = n, A
        } catch (B) {
            throw B.temp = "function anonymous($data,$filename) {" + z + "}", B
        }
    }

    var d = function (a, b) {
        return "string" == typeof b ? q(b, {filename: a}) : g(a, b)
    };
    d.version = "3.0.0", d.config = function (a, b) {
        e[a] = b
    };
    var e = d.defaults = {
        openTag: "<%",
        closeTag: "%>",
        escape: !0,
        cache: !0,
        compress: !1,
        parser: null
    }, f = d.cache = {};
    d.render = function (a, b) {
        return q(a, b)
    };
    var g = d.renderFile = function (a, b) {
        var c = d.get(a) || p({filename: a, name: "Render Error", message: "Template not found"});
        return b ? c(b) : c
    };
    d.get = function (a) {
        var b;
        if (f[a])b = f[a]; else if ("object" == typeof document) {
            var c = document.getElementById(a);
            if (c) {
                var d = (c.value || c.innerHTML).replace(/^\s*|\s*$/g, "");
                b = q(d, {filename: a})
            }
        }
        return b
    };
    var h = function (a, b) {
        return "string" != typeof a && (b = typeof a, "number" === b ? a += "" : a = "function" === b ? h(a.call(a)) : ""), a
    }, i = {"<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "&": "&#38;"}, j = function (a) {
        return i[a]
    }, k = function (a) {
        return h(a).replace(/&(?![\w#]+;)|[<>"']/g, j)
    }, l = Array.isArray || function (a) {
            return "[object Array]" === {}.toString.call(a)
        }, m = function (a, b) {
        var c, d;
        if (l(a))for (c = 0, d = a.length; d > c; c++)b.call(a, a[c], c, a); else for (c in a)b.call(a, a[c], c)
    }, n = d.utils = {$helpers: {}, $include: g, $string: h, $escape: k, $each: m};
    d.helper = function (a, b) {
        o[a] = b
    };
    var o = d.helpers = n.$helpers;
    d.onerror = function (a) {
        var b = "Template Error\n\n";
        for (var c in a)b += "<" + c + ">\n" + a[c] + "\n\n";
        "object" == typeof console && console.error(b)
    };
    var p = function (a) {
        return d.onerror(a), function () {
            return "{Template Error}"
        }
    }, q = d.compile = function (a, b) {
        function d(c) {
            try {
                return new i(c, h) + ""
            } catch (d) {
                return b.debug ? p(d)() : (b.debug = !0, q(a, b)(c))
            }
        }

        b = b || {};
        for (var g in e)void 0 === b[g] && (b[g] = e[g]);
        var h = b.filename;
        try {
            var i = c(a, b)
        } catch (j) {
            return j.filename = h || "anonymous", j.name = "Syntax Error", p(j)
        }
        return d.prototype = i.prototype, d.toString = function () {
            return i.toString()
        }, h && b.cache && (f[h] = d), d
    }, r = n.$each, s = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined", t = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g, u = /[^\w$]+/g, v = new RegExp(["\\b" + s.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"), w = /^\d[^,]*|,\d[^,]*/g, x = /^,+|,+$/g, y = /^$|,+/;
    e.openTag = "{{", e.closeTag = "}}";
    var z = function (a, b) {
        var c = b.split(":"), d = c.shift(), e = c.join(":") || "";
        return e && (e = ", " + e), "$helpers." + d + "(" + a + e + ")"
    };
    e.parser = function (a) {
        a = a.replace(/^\s/, "");
        var b = a.split(" "), c = b.shift(), e = b.join(" ");
        switch (c) {
            case"if":
                a = "if(" + e + "){";
                break;
            case"else":
                b = "if" === b.shift() ? " if(" + b.join(" ") + ")" : "", a = "}else" + b + "{";
                break;
            case"/if":
                a = "}";
                break;
            case"each":
                var f = b[0] || "$data", g = b[1] || "as", h = b[2] || "$value", i = b[3] || "$index", j = h + "," + i;
                "as" !== g && (f = "[]"), a = "$each(" + f + ",function(" + j + "){";
                break;
            case"/each":
                a = "});";
                break;
            case"echo":
                a = "print(" + e + ");";
                break;
            case"print":
            case"include":
                a = c + "(" + b.join(",") + ");";
                break;
            default:
                if (/^\s*\|\s*[\w\$]/.test(e)) {
                    var k = !0;
                    0 === a.indexOf("#") && (a = a.substr(1), k = !1);
                    for (var l = 0, m = a.split("|"), n = m.length, o = m[l++]; n > l; l++)o = z(o, m[l]);
                    a = (k ? "=" : "=#") + o
                } else a = d.helpers[c] ? "=#" + c + "(" + b.join(",") + ");" : "=" + a
        }
        return a
    }, "function" == typeof define ? define("job/core.artTemplate", [], function () {
        return d
    }) : "undefined" != typeof exports ? module.exports = d : this.template = d
}();
define("job/config.resume.templates", [], function () {
    var templates = {};
    templates["recommendPosition"] = '<div class="recommend-position" tongji_id="ZP_job_detail_div_recPosition" style=""><div class="recPos-header"><p><i></i><%= isPost ? \'与您同行业的求职者申请了以下职位\' : \'申请该职位的人还申请了以下职位\' %></p></div><div class="recPos-body"><div class="recPos-list"><ul><% for(var i = 0, len = entity.length; i < len; i++) { %><% var position = entity[i]; %><li class="recPos-item <%= (i % 2 === 0 ? \'recPos-odd\' : \'recPos-even\') %>"><div class="recPos-select"><a data-id="<%= position.infoid %>" href="javascript:void(0);"><i></i></a></div><div class="recPos-info"><div class="recPos-detail"><div><h4 title="<%= position.title %>（<%= position.workAddress %>）"><a class="recPos-title" href="<%= position.url %>" target="_blank"><%= position.title %></a><span class="recPos-count">（<%= position.workAddress %>）</span></h4><p class="recPos-company" title="<%= position.enterpriseName %>"><a href="<%= position.qyUrl %>" target="_blank" onclick="clickLog(\'from=pc_detail_tjqiyemingcheng\')"><%= position.enterpriseName %></a></p></div><div class="recPos-salary"><div class="recPos-money"></div><p><strong><%= position.salary %></strong></p></div></div><div class="recPos-welfare"><ul><% if(position.welfare) { %><% for(var wfIdx = 0; wfIdx < position.welfare.length; wfIdx++) { %><li><%= position.welfare[wfIdx] %></li><% } %><% } %></ul></div></div></li><% } %><% if(entity.length % 2 === 1) { %><li class="recPos-item recPos-even"><a class="recPos-info recPos-more" href="<%= more %>" target="_blank" onclick="clickLog(\\\'from=xxx\\\')"><strong>＋</strong>查看更多&gt;&gt;</a></li><% } %></ul></div></div><div class="recPos-footer"><div class="recPos-button"><a href="javascript:void(0)" class="disabled">立即申请</a></div></div></div>';
    templates["recommendResume"] = '<div class="recommend-resume"><div class="recRsm-header"><a href="javascript:void(0);" class="recRsm-refresh" onclick="clickLog(\'from=recommendlist-change\')">换一换<i></i></a><p class="recRsm-title">您的同行还查看了以下简历<i class="recRsm-new"></i></p></div><div class="recRsm-body"><% for(var i = 0, len = entity.length; i < len; i++) { %><% var resume = entity[i]; %><% if(i % 8 === 0) { %><ul class="recRsm-list"><% } %><li class="recRsm-item <%= (i % 2 === 0 ? \'recRsm-odd\' : \'recRsm-even\') %>"><a class="recRsm-card" href="http://jianli.58.com/resume/<%= resume.rid %>" target="_blank"><div class="recRsm-detail"><p class="recRsm-intro" title="<%= resume.name %> <%= resume.gender %>|<%= resume.age %>|<%= resume.education %>|<%= resume.workYears %>"><span class="recRsm-name"><%= resume.name %></span><span class="recRsm-info"><%= resume.gender %>|<%= resume.age %>|<%= resume.education %>|<%= resume.workYears %></span></p><p class="recRsm-intention" title="<%= resume.tartgetPosition %>">期望职位：<%= resume.tartgetPosition %></p><ul class="recRsm-light"><% if(resume.advantageList) { %><% for(var alIdx = 0; alIdx < resume.advantageList.length; alIdx++) { %><li title="<%= resume.advantageList[alIdx] %>"><span><%= resume.advantageList[alIdx] %></span></li><% } %><% } %></ul></div><div class="recRsm-meta"><p class="recRsm-location"><i class="recRsm-icon recRsm-icon-location"></i><%= resume.targetArea %></p><p class="recRsm-date"><%= resume.updateTime %>更新</p><p class="recRsm-identification"><% if(resume.authMobile) { %><i class="recRsm-icon recRsm-icon-phone" title="手机已认证"></i><span>手机已认证</span><% } %></p></div></a><div class="recRsm-select"><a href="javascript:void(0)" rid="<%= resume.rid %>"><i></i></a></div></li><% if(i % 8 === 7 || i === len - 1) { %></ul><% } %><% } %></div><div class="recRsm-footer"><div class="recRsm-select" id="checkAll"><a href="javascript:void(0)"><i></i>&nbsp;&nbsp;全选</a></div><div class="recRsm-button"><a id="viewAll" href="javascript:void(0)" target="_blank" onclick="clickLog(\'from=recommendlist-batch\')">批量查看简历</a></div><a class="recRsm-more" href="<%= more %>" onclick="clickLog(\'from=recommendlist-morejianli\')" target="_blank">不满意？更多海量优质简历看这里&gt;&gt</a></div></div>';
    return templates
});
define("job/busi.resume.recommendResume_new", ["./core.artTemplate", "./config.resume.templates"], function (template, templates) {
    var recommendResume = {};
    recommendResume.index = 0;
    recommendResume.pageNum = 0;
    recommendResume.$list = null;
    recommendResume.bindEvents = function ($el) {
        var $selectAll = $el.find("#checkAll");
        $el.delegate(".recRsm-item", "mouseover", function (e) {
            $(this).addClass("recRsm-item-hover")
        }).delegate(".recRsm-item", "mouseout", function (e) {
            $(this).removeClass("recRsm-item-hover")
        });
        $el.find(".recRsm-list .recRsm-select").on("click", function (e) {
            var $t = $(this);
            var $selectList = $el.find(".recRsm-list .recRsm-select a");
            var hasUnSelected = true;
            $t.find("a").toggleClass("recRsm-checked");
            hasUnSelected = $selectList.not(".recRsm-checked").size() > 0;
            $selectAll.find("a").toggleClass("recRsm-checked", !hasUnSelected);
            e.stopPropagation()
        });
        $el.find(".recRsm-refresh").on("click", function (e) {
            var $t = $(this);
            var $checkAll = $("#checkAll .recRsm-checked");
            if ($checkAll.length > 0) {
                $checkAll.removeClass("recRsm-checked")
            }
            if (!$t.hasClass("recRsm-animation"))$t.addClass("recRsm-animation");
            setTimeout(function () {
                $t.removeClass("recRsm-animation")
            }, 500);
            recommendResume.$list.hide().eq(++recommendResume.index % recommendResume.pageNum).show()
        });
        $selectAll.on("click", function (e) {
            var $t = $(this);
            var $selectList = $el.find(".recRsm-list:visible .recRsm-select a");
            var selected = $t.find("a").hasClass("recRsm-checked");
            $selectList.toggleClass("recRsm-checked", !selected);
            $t.find("a").toggleClass("recRsm-checked", !selected)
        });
        $el.delegate(".recRsm-card", "click", function (e) {
            if ("function" === typeof window.clickLog)window.clickLog("from=recommendlist-tuijian");
            $(this).addClass("recRsm-visited")
        });
        $el.find("#viewAll").on("click", function (e) {
            var $selectList = $el.find(".recRsm-list .recRsm-select a"), $selected = $selectList.filter(".recRsm-checked"), urlArray = [];
            if ($selected.size() == 0) {
                alert("请选择简历!");
                return false
            } else if ($selected.size() == 1) {
                var singleUrl = $selected.parent().prev(".recRsm-card").attr("href");
                window.open(singleUrl)
            } else {
                var firstRid = $selected.eq(0).attr("rid"), url = "//jianli.58.com/resumedetail/batch/" + firstRid + "?page=0", userArray = [], userArrayStr = "";
                $selected.each(function (index) {
                    var rid = $(this).attr("rid"), name = $(this).parents(".recRsm-item").find(".recRsm-name").text(), rName = {
                        rid: rid,
                        name: name
                    };
                    userArray.push(rName)
                });
                userArrayStr = JSON.stringify(userArray);
                if ($("#batchWatch_rec").length > 0) {
                    $("#batchWatch_rec").attr("action", url);
                    $("#batchRidNames").val(userArrayStr)
                } else {
                    formHtml = "<form id='batchWatch_rec' action='" + url + "' method='post' target='_blank' style='display:none'>" + "<input id='batchRidNames' name='batchRidNames' value='" + userArrayStr + "'/>" + "</form>";
                    $("body").append(formHtml)
                }
                $("#batchWatch_rec").submit()
            }
        })
    };
    recommendResume.getRecommendDOM = function (params, callback) {
        $.ajax({
            url: "//zprecommend.58.com/api/abtest",
            data: {rid: params.rid, ptype: "pcresumedetail", fontKey: ____global.fontkey ? ____global.fontkey : ""},
            dataType: "jsonp",
            success: function (data) {
                if (data.state == "1" && data.bottom) {
                    var tmp = data.bottom;
                    $(".vipResContent").after(tmp).show();
                    var $main = $(".recommend-resume");
                    if ("function" === typeof window.clickLog)window.clickLog("from=pc-jlxqy-jltj");
                    recommendResume.$list = $main.find(".recRsm-list");
                    recommendResume.pageNum = recommendResume.$list.size();
                    recommendResume.$list.hide().eq(recommendResume.index).show();
                    recommendResume.bindEvents($main);
                    if ("function" === typeof callback)callback($main)
                }
            }
        })
    };
    return recommendResume
});
define("job/tmpl.resume.photos_small", ["./util.artTemplate"], function (artTemplate) {
    var template = '<div id="photoList">' + '<ul class="photos-ul">' + "{{each picList as value index}}" + '<li class="picItem">' + '<img src="{{value}}">' + '<div class="hover_bg" style="display:none">' + "</div>" + "</li>" + "{{/each}}" + "</ul>" + '<div class="prePic" style="display:none">' + '<span class="icon-page-left"></span>' + "</div>" + '<div class="nextPic" style="display:none">' + '<span class="icon-page-right"></span>' + "</div>" + "</div>";
    return artTemplate.compile(template)
});
define("job/tmpl.resume.photos_big", ["./util.artTemplate"], function (artTemplate) {
    var template = '<div class="bigPic_view" id="{{id}}" style="display:none">' + '<div class="bigPic-bg"></div>' + '<div class="bigPic-content">' + '<div class="prePic_big">' + '<span class="icon-page-left" style="display: none"></span>' + "</div>" + '<div class="viewPic_big">' + '<div class="picture_big">' + '<ul class="viewPic_ul">' + "{{each picList as value index}}" + '<li class="picItem">' + '<img src="{{value}}">' + "</li>" + "{{/each}}" + "</ul>" + "</div>" + '<div class="picInfo">' + '<p>{{title}}（<span id="currPage"></span>/<span id="totalPage"></span>）</p>' + "</div>" + '<div class="preview-pic">' + '<ul class="preview-ul">' + "{{each picList as value index}}" + '<li class="picItem">' + '<img src="{{value}}">' + "</li>" + "{{/each}}" + "</ul>" + "</div>" + "</div>" + '<div class="nextPic_big">' + '<span class="icon-page-right" style="display: none"></span>' + "</div>" + '<div class="close-picView">' + '<span class="icon-close"></span>' + "</div>" + "</div>" + "</div>";
    return artTemplate.compile(template)
});
define("job/busi.resume.displayBigPic", ["./tmpl.resume.photos_big"], function (photos_big) {
    var displayBigPic = {
        currPicNum: 1,
        totalPicNum: 1,
        move_width_big: 610,
        imgTagSize: 610 / 453,
        previewPicWidth: 65,
        clickFlag: false,
        init: function (id, photoUrls, title) {
            var photosBigHtml = photos_big({
                id: id,
                picList: photoUrls,
                title: title
            }), $photos = $(".photos"), _this = this;
            if ($photos.length == 0) {
                $photos = $(".big_photos")
            }
            $photos.append(photosBigHtml);
            $(".viewPic_ul").css("width", _this.move_width_big * _this.totalPicNum + "px");
            $(".viewPic_ul li img").each(function (index) {
                var $this = $(this), imgSize = $this[0].naturalWidth / $this[0].naturalHeight, imgTagSize = _this.imgTagSize;
                if (imgSize > imgTagSize) {
                    $this.css("width", "100%")
                } else {
                    $this.css("height", "100%")
                }
            });
            this.bindEvent(id, $photos)
        },
        bindEvent: function (id, $photos) {
            var leftBtn = "#" + id + " .icon-page-left", rightBtn = "#" + id + " .icon-page-right", closeBtn = "#" + id + " .close-picView", previewLi = "#" + id + " .preview-ul li", _this = this;
            $photos.off("click", leftBtn);
            $photos.off("click", rightBtn);
            $photos.off("click", closeBtn);
            $photos.off("click", previewLi);
            $photos.on("click", leftBtn, function (event) {
                if (!_this.clickFlag) {
                    _this.clickFlag = true;
                    _this.prePic_big();
                    setTimeout(function () {
                        _this.clickFlag = false
                    }, 200)
                }
            });
            $photos.on("click", rightBtn, function (event) {
                if (!_this.clickFlag) {
                    _this.clickFlag = true;
                    _this.nextPic_big();
                    setTimeout(function () {
                        _this.clickFlag = false
                    }, 200)
                }
            });
            $photos.on("click", closeBtn, function (event) {
                $(".bigPic_view").hide()
            });
            $photos.on("click", previewLi, function (event) {
                if (!$(this).hasClass("active")) {
                    var index = $("#" + id + " .preview-ul li").index(this);
                    _this.switch_bigPic(index)
                }
            })
        },
        watchBigPic: function (id, photoUrls, title, currPicNum, move_width_big, previewPicWidth, imgTagSize) {
            var totalPicNum = photoUrls.length, _this = this;
            _this.currPicNum = currPicNum;
            _this.totalPicNum = totalPicNum;
            _this.move_width_big = move_width_big ? move_width_big : _this.move_width_big;
            _this.imgTagSize = imgTagSize ? imgTagSize : _this.imgTagSize;
            _this.previewPicWidth = previewPicWidth ? previewPicWidth : _this.previewPicWidth;
            if (!$("#" + id).length) {
                $(".bigPic_view").remove();
                this.init(id, photoUrls, title, currPicNum, totalPicNum, move_width_big, imgTagSize, previewPicWidth)
            }
            var $pageRight = $(".nextPic_big .icon-page-right"), $pageLeft = $(".prePic_big .icon-page-left");
            $("#currPage").text(currPicNum);
            $("#totalPage").text(totalPicNum);
            $(".preview-ul").css("width", _this.previewPicWidth * _this.totalPicNum + "px");
            $(".preview-ul li").removeClass("active");
            $(".preview-ul li").eq(currPicNum - 1).addClass("active");
            $(".viewPic_ul").css("left", -(_this.currPicNum - 1) * _this.move_width_big + "px");
            if (_this.currPicNum < _this.totalPicNum) {
                $pageRight.show()
            } else {
                $pageRight.hide()
            }
            if (_this.currPicNum > 1) {
                $pageLeft.show()
            } else {
                $pageLeft.hide()
            }
            $(".bigPic_view").show()
        },
        prePic_big: function () {
            var picLeft = $(".viewPic_ul").position().left, _this = this;
            if (_this.currPicNum > 1) {
                picLeft += _this.move_width_big;
                $(".viewPic_ul").animate({left: picLeft + "px"}, 200);
                _this.currPicNum--;
                $("#currPage").text(_this.currPicNum);
                $(".preview-ul .active").removeClass("active").prev("li").addClass("active")
            } else {
                return false
            }
            if (_this.currPicNum == 1) {
                $(".prePic_big .icon-page-left").hide()
            }
            $(".nextPic_big .icon-page-right").show()
        },
        nextPic_big: function () {
            var picLeft = $(".viewPic_ul").position().left, _this = this;
            if (_this.currPicNum < _this.totalPicNum) {
                picLeft -= _this.move_width_big;
                $(".viewPic_ul").animate({left: picLeft + "px"}, 200);
                _this.currPicNum++;
                $("#currPage").text(_this.currPicNum);
                $(".preview-ul .active").removeClass("active").next("li").addClass("active")
            } else {
                return false
            }
            if (_this.currPicNum == _this.totalPicNum) {
                $(".nextPic_big .icon-page-right").hide()
            }
            $(".prePic_big .icon-page-left").show()
        },
        switch_bigPic: function (index) {
            var activeIndex = $(".preview-ul li").index($(".preview-ul .active")), picLeft = $(".viewPic_ul").position().left, diffNum = index - activeIndex, _this = this;
            picLeft = picLeft - diffNum * _this.move_width_big;
            $(".viewPic_ul").animate({left: picLeft + "px"}, 200);
            _this.currPicNum = index + 1;
            $("#currPage").text(_this.currPicNum);
            $(".preview-ul .active").removeClass("active");
            $(".preview-ul li").eq(index).addClass("active");
            if (_this.currPicNum == _this.totalPicNum) {
                $(".nextPic_big .icon-page-right").hide()
            } else {
                $(".nextPic_big .icon-page-right").show()
            }
            if (_this.currPicNum == 1) {
                $(".prePic_big .icon-page-left").hide()
            } else {
                $(".prePic_big .icon-page-left").show()
            }
        }
    };
    return displayBigPic
});
define("job/busi.resume.photos", ["./tmpl.resume.photos_small", "./busi.resume.displayBigPic"], function (photos_small, displayBigPic) {
    var currPicNum = 1, totalPicNum = 1, move_width = 212;
    $(function () {
        var pageJson = ____global.pageJson, photoUrls = pageJson.resume.photos, smallPhotoUrls = [], photosSmallHtml = "", $photos = $(".photos"), clickFlag = false;
        for (var i = 0, length = photoUrls.length; i < length; i++) {
            var smallPhotoUrl = photoUrls[i].replace(/\/big\//, "/small/");
            smallPhotoUrls.push(smallPhotoUrl)
        }
        photosSmallHtml = photos_small({picList: smallPhotoUrls});
        $photos.append(photosSmallHtml);
        totalPicNum = photoUrls.length;
        $(".photos-ul").css("width", totalPicNum * move_width + "px");
        if (totalPicNum > 4) {
            $(".nextPic").show()
        }
        $photos.on("click", ".photos-ul .picItem", function (event) {
            currPicNum = $(".photos-ul li").index(this) + 1;
            displayBigPic.watchBigPic("photos_big", photoUrls, "照片作品", currPicNum)
        });
        $photos.on("mouseenter", ".photos-ul .picItem, .prePic, .nextPic", function (event) {
            $(this).find(".hover_bg").show();
            $(".prePic, .nextPic").addClass("active")
        });
        $photos.on("mouseleave", ".photos-ul .picItem, .prePic, .nextPic", function () {
            $(this).find(".hover_bg").hide();
            $(".prePic, .nextPic").removeClass("active")
        });
        $photos.on("click", ".download-pic", function (event) {
            event.preventDefault();
            event.stopPropagation();
            var picUrl = $(this).parents(".picItem").find("img").attr("src").replace(/\/small\//, "/big/");
            SaveAs5(picUrl)
        });
        $photos.on("click", ".nextPic", function (event) {
            if (!clickFlag) {
                clickFlag = true;
                nextPic();
                setTimeout(function () {
                    clickFlag = false
                }, 200)
            }
        });
        $photos.on("click", ".prePic", function (event) {
            if (!clickFlag) {
                clickFlag = true;
                prePic();
                setTimeout(function () {
                    clickFlag = false
                }, 200)
            }
        })
    });
    function prePic() {
        var picLeft = $(".photos-ul").position().left;
        if (picLeft < 0) {
            picLeft += move_width;
            $(".photos-ul").animate({left: picLeft + "px"}, 200)
        }
        if (picLeft == 0) {
            $(".prePic").hide()
        }
        $(".nextPic").show()
    }

    function nextPic() {
        var picLeft = $(".photos-ul").position().left, maxLeft = $(".photos-ul").width() - 4 * move_width;
        if (picLeft > -maxLeft) {
            picLeft -= move_width;
            $(".photos-ul").animate({left: picLeft + "px"}, 200)
        }
        if (picLeft == -maxLeft) {
            $(".nextPic").hide()
        }
        $(".prePic").show()
    }

    function SaveAs5(imgURL) {
        var oPop = window.open(imgURL, "", "width=1, height=1, top=5000, left=5000");
        for (; oPop.document.readyState != "complete";) {
            if (oPop.document.readyState == "complete")break
        }
        oPop.document.execCommand("SaveAs");
        alert("aa");
        oPop.close()
    }
});
define("job/busi.resume.certificate", ["./busi.resume.displayBigPic"], function (displayBigPic) {
    $(function () {
        $(".certificate-item").on("click", ".watch-img", function (event) {
            var title = $(this).parent().find(".certificate-name").text(), photoUrls = [], $lis = $(this).next("ul").find("li"), index = $(".watch-img").index(this);
            $lis.each(function (index, el) {
                var picUrl = $(this).attr("data-url");
                photoUrls.push(picUrl)
            });
            displayBigPic.watchBigPic("certificate-" + index, photoUrls, title, 1)
        })
    })
});
define("job/busi.resume.report", ["./api.resume.printResume", "./api.resume.saveResume", "./api.resume.getSecret", "./api.resume.hasInterestIn", "./tmpl.resume.telprotectTip", "./tmpl.resume.backTop", "./busi.resume.telprotectUI", "./util.cookie"], function (printResume, saveResume, getSecret, hasInterestIn, telprotectTip, backTop, telprotectUI, cookie) {
    $(function () {
        var pageJson = ____global.pageJson, resumeid = pageJson.rid;
        $(".inform").on("click", function (event) {
            report(resumeid)
        });
        $(".inform").on("mouseover", function () {
            $(".inform-tip").show()
        }).on("mouseout", function () {
            $(".inform-tip").hide()
        })
    });
    function report(resumeid) {
        window.clickLog && clickLog("from=clk_error_reporta");
        window.setbg("举报简历", 380, 170, "/resumefeedback/reportview/?rid=" + resumeid + "&rand_code=" + Math.random())
    }
});
define("job/busi.resume.detailMaidian", [], function () {
    $(function () {
        var pageJson = ____global.pageJson, resumeid = pageJson.rid, bizState = pageJson.bizState, bizId = pageJson.feedback.bizId || "", bizType = pageJson.feedback.bizType || "";
        if (bizState == 1) {
            window.clickLog && window.clickLog("from=pc-jianlixiangqing-notdowna")
        } else if (bizState == 3) {
            window.clickLog && window.clickLog("from=pc-jlxiangqing-receiveda")
        } else if (bizState == 2 || bizState == 4) {
            window.clickLog && window.clickLog("from=pc-jianlixiangqing-downa")
        }
        if ($(".ceping_report").length > 0) {
            window.clickLog && window.clickLog("from=pc-resume-detail-cepingbuttona")
        }
    })
});
define("job/tmpl.resume.selfDeliver", ["./util.artTemplate"], function (artTemplate) {
    var template = '<div class="selfDeliver">' + '<span class="icon-deliver-self"></span>' + "<span>主动投递</span>" + '<span class="deliver-title">应聘职位：</span>' + '<span class="deliver-info">{{deliveryJob}}</span>' + '<span class="deliver-title">投递时间：</span>' + '<span class="deliver-info">{{deliverTime}}</span>' + "</div>";
    return artTemplate.compile(template)
});
define("common/cookie", [], function () {
    return {
        get: function (name, encode) {
            var arg = name + "=";
            var alen = arg.length;
            var clen = document.cookie.length;
            var i = 0;
            var j = 0;
            while (i < clen) {
                j = i + alen;
                if (document.cookie.substring(i, j) == arg)return this.getCookieVal(j, encode);
                i = document.cookie.indexOf(" ", i) + 1;
                if (i == 0)break
            }
            return null
        }, set: function (name, value, expires, path, domain, secure) {
            var argv = arguments;
            var argc = arguments.length;
            var now = new Date;
            var expires = argc > 2 ? argv[2] : new Date(now.getFullYear(), now.getMonth() + 1, now.getUTCDate());
            var path = argc > 3 ? argv[3] : "/";
            var domain = argc > 4 ? argv[4] : ".58.com";
            var secure = argc > 5 ? argv[5] : false;
            document.cookie = name + "=" + escape(value) + (expires == null ? "" : "; expires=" + expires.toGMTString()) + (path == null ? "" : "; path=" + path) + (domain == null ? "" : "; domain=" + domain) + (secure == true ? "; secure" : "")
        }, remove: function (name) {
            if (this.get(name))this.set(name, "", new Date(1970, 1, 1))
        }, getCookieVal: function (offset, encode) {
            var endstr = document.cookie.indexOf(";", offset);
            if (endstr == -1) {
                endstr = document.cookie.length
            }
            if (encode == false)return document.cookie.substring(offset, endstr); else return unescape(document.cookie.substring(offset, endstr))
        }
    }
});
define("job/util.58timeTrak", ["../common/cookie"], function (cookie) {
    var timeTrak = window.timeTrak ? window.timeTrak : {};
    timeTrak.creatSrcipt = function () {
        var city = cookie.get("mcity") || "bj";
        var src = "//status.58.com/zhaopin?bp_time=" + timeTrak.bp_time + "&sp_time=" + timeTrak.sp_time + "&cz_time=" + timeTrak.cz_time + "&pagetype=" + timeTrak.pagetype + "&template_type=" + timeTrak.template_type + "&net_type=" + timeTrak.net_type + "&load_time=" + timeTrak.load_time + "&net_speed=" + timeTrak.net_speed + "&cdn_time=" + timeTrak.cdn_time + "&city=" + city;
        var x = document.createElement("SCRIPT");
        x.src = src;
        document.getElementsByTagName("body")[0].appendChild(x)
    };
    timeTrak.imgLoad = function () {
        var imgNullSrc = "//nocdn.58cdn.com.cn/net_small.png", imgSrc = "//nocdn.58cdn.com.cn/net_big.png", imgSize = 22.6, timeLine = "", imgNull_node = document.createElement("img"), imgNode = document.createElement("img");
        imgNode.onload = function () {
            var netTime = timeTrak.gettime() - timeLine;
            timeTrak.net_speed = (imgSize * 1e3 / netTime).toFixed(2);
            timeTrak.creatSrcipt()
        };
        imgNull_node.onload = function () {
            timeLine = timeTrak.gettime();
            imgNode.src = imgSrc
        };
        imgNull_node.src = imgNullSrc
    }
});
define("job/tmpl.resume.shanxinDetail", ["./util.artTemplate"], function (artTemplate) {
    var template = '<div class="shanxin-resume-info">' + "<ul>" + '<li><span class="shanxin-detail-tag">闪信投递</span>（倒计时：<i>{{remainTime}}</i>）</li>' + "<li>应聘职位：<span>{{posName}}</span></li>" + "<li>投递时间：<span>{{addDate}}</span></li>" + "</ul>" + "</div>";
    return artTemplate.compile(template)
});
define("job/main.resume.detailpage", ["../common/popup", "./busi.resume.showTips", "./busi.resume.showMoreExpect", "./busi.resume.cepingReport", "./busi.resume.getJingzhun", "./busi.resume.telephoneProtect", "./busi.resume.jobInform", "./busi.resume.recommendResume_new", "./busi.resume.photos", "./busi.resume.certificate", "./busi.resume.report", "./busi.resume.detailMaidian", "./tmpl.resume.selfDeliver", "./tmpl.resume.bottomOperation", "./util.cookie", "./util.58timeTrak", "./api.resume.detaliShanxin", "./tmpl.resume.shanxinDetail"], function (popup, showTips, showMoreExpect, cepingReport, getJingzhun, telephoneProtect, jobInform, recommendResume, photos, certificate, report, detailMaidian, selfDeliver, bottomOperation, cookie, timeTrak, ISshanXin, shanXinDom) {
    $(function () {
        var pageJson = ____global.pageJson, resumeid = pageJson.rid, bizState = pageJson.bizState, deliveryJob = pageJson.resumeDelivery.title, deliverTime = pageJson.resumeDelivery.date, haveIndustry = $(".pc-industry-job-box").text(), expectjob = $("#expectJob").text();
        if (bizState == 3 && haveIndustry != "") {
            window.clickLog && clickLog("from=pc-jlxiangqing-receivedad")
        }
        if (bizState == 1 && haveIndustry != "") {
            window.clickLog && clickLog("from=pc-jianlixiangqing-notdownad")
        }
        if ($(".highLights li").length == 0) {
            $(".expectInfo").addClass("no-highLights")
        }
        if (bizState == 1) {
            $("#links").show()
        }
        ISshanXin(function (dataShanXin) {
            if (dataShanXin.IsShanxin) {
                var remainTime = dataShanXin.remainTime, posName = dataShanXin.posName, addDate = dataShanXin.addDate, domm = shanXinDom({
                    remainTime: remainTime,
                    posName: posName,
                    addDate: addDate
                });
                $(".resDetailRight .basicInfo").before(domm);
                window.clickLog && clickLog("from=jianli_detail_sx")
            }
        });
        if (ISshanXin() == false) {
            if (bizState == 3 || bizState == 4) {
                var delfDeliverHtml = selfDeliver({deliveryJob: deliveryJob, deliverTime: deliverTime});
                $(delfDeliverHtml).insertBefore(".basicInfo");
                $(".inform").addClass("inform-deliver")
            }
        }
        if (bizState == 2 || bizState == 4) {
            var bottomOperationHtml = bottomOperation({resumeid: resumeid});
            $("#bottomTipID").html(bottomOperationHtml).show();
            window.clickLog && window.clickLog("from=pc_jlxiangqing_caozuotancenga")
        }
        $("#bottomTipID").on("click", ".operationHide", function (event) {
            $(".bottomOperationMask").hide();
            $(".operationShow").show()
        });
        $("#bottomTipID").on("click", ".operationShow", function (event) {
            $(".operationShow").hide();
            $(".bottomOperationMask").show()
        });
        $(".experience").last().css("border-bottom", 0)
    });
    $(function () {
        var pageJson = ____global.pageJson, resumeid = pageJson.rid, userid = getUid("PPU", "UID"), localid = pageJson.resume.localId, cateid = pageJson.resume.cateId;
        recommendResume.getRecommendDOM({
            rid: resumeid,
            userid: userid,
            localid: localid,
            cateid: cateid
        }, function ($el) {
        })
    });
    $(function () {
        var userid = getUid("PPU", "UID");
        var ljrzCookieFlag = cookie.getCookie("ljrzfc" + userid);
        if (ljrzCookieFlag != 1) {
            $(".piaofu").show();
            cookie.setCookie("ljrzfc", 1, 1)
        }
        $(".piaofu i").click(function () {
            $(".piaofu").hide()
        })
    });
    function getUid(cookieName, name) {
        var uid, reg = new RegExp("(^| )" + cookieName + "=([^;]*)(;|$)"), cookie = document.cookie.match(reg), reg2 = new RegExp(name);
        if (cookie == null) {
            return
        }
        uid = cookie[2].split("&");
        for (var i = 0; i < uid.length; i++) {
            if (reg2.test(uid[i])) {
                return uid[i].split("=")[1]
            }
        }
    }
});
function newCouponPageReturn(couponCodeStr, sumValue, promotionId, couponType) {
    if ($("#couponType").length) {
        $("#couponType").val(couponType)
    }
    if (couponCodeStr != "") {
        $("#coupon_hide").val(couponCodeStr);
        $("#coupon_hide").attr("sum", sumValue)
    } else {
        $("#coupon_hide").val("");
        $("#coupon_hide").attr("sum", "")
    }
    var url = "/resumemsg/?resumeid=" + $("#rid_hide").val();
    if ($("#coupon_hide").val() != "") {
        url += "&gobuy=true&couponcode=" + $("#coupon_hide").val() + "&couponsum=" + $("#coupon_hide").attr("sum")
    }
    setbg("查看联系方式", 600, 360, url + "&rand_code=" + Math.random())
}
define("_pkg/job/job_resume_detailpage", ["job/main.resume.detailpage"], function (job_main_resume_detailpage) {
});