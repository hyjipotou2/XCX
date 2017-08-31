var page = 1;
$(function() {
	var userToken = GetQueryString('user_token'),
			app_count;
	// $('.top_manage_info').height($(window).width()*70/1354);
	// $(window).resize(function(){
	// 	$('.top_manage_info').css({'height':$(window).width()*70/1354, 'padding-top':$(window).width()*35/1354, 'padding-bottom':$(window).width()*35/1354});

	// });
	getData({ page : page++, page_size: 10, user_token: userToken});
	$('#app-container').on('mouseenter', '.info', function(event) {
		var _this = $(this);
		if (_this.find('.is_delete').length) {return;}
		_this.find('.tool-show').show();
	}).on('mouseleave', '.info', function(event) {
		var _this = $(this);
		if(! isenterbutton){
			_this.find('.tool-show').hide();
		}
	}).on('mouseenter', '.qrcode' ,function(){
		var _this = $(this),
			_parent = _this.parent().parent();
		_parent.find('.share_code').show();
		_parent.find('.qrcode_div').show();
		_parent.find('.btn_bar, .share_div').hide();
		_this.siblings('.share').children('.share_link').hide();
	}).on('mouseleave', '.qrcode', function(){
		var _this = $(this),
			_parent = _this.parent().parent();
		_parent.find('.share_code').hide();
		_parent.find('.qrcode_div').hide();
		_parent.find('.btn_bar').show();

	}).on('mouseenter', '.share', function(){
		var _this = $(this),
			_parent = _this.parent().parent();
		_parent.find('.share_link').show();
		_parent.find('.share_div').show();
		_parent.find('.btn_bar').hide();
	}).on('mouseleave', '.tool-show', function(event){
		
		if(! isenterbutton && !$(event.target).hasClass('copy_link')){
			var _this = $(this);
			_this.find('.share_link, .share_div').hide();
			_this.find('.btn_bar').show();
		}

	}).on('click', '.copy', function(event) {
		var _this = $(this);
		if(_this.hasClass('requesting')){
			return ;
		}
		_this.addClass('requesting');

		var $li = _this.closest('li'),
			param = {
				app_name : $li.find('.info-bottom').find('p').eq(0).text(),
				description: $li.attr("data-desc") ,
				logo : $li.attr("data-logo") ,
				cover: $li.find('.info-pic').attr("src") ,
				f_app_id : $li.attr("data-id")
		};
		$ajax('/index.php?r=pc/AppData/add', 'post', param,'json', function(data) {
			if (data.status == 0) {
				confirmTip({
					text : "复制成功，是否去编辑？", 
					ConfirmFunction : function(){
						window.open('/index.php?r=pc/Webapp/edit&id='+data.data );
						window.location.reload();
					},
					CancelFunction : function(){
						window.location.reload();
					},
					CloseFunction :  function(){
						window.location.reload();
					}
				})
			} else if (data.status == 3){
				confirmTip({
					text : data.data + "<h3>是否升级VIP？</h3>", 
					ConfirmFunction : function(){
						window.open('/index.php?r=pc/Index/appVipPacket')
					},
					CancelFunction : function(){
						
					},
					CloseFunction :  function(){
						
					}
				})
			}
			 else {
				alertTip(data.data);
			}
			_this.removeClass('requesting');
		}, function(data) {
			alertTip(data.data);
			_this.removeClass('requesting');
		});
	});
	//转让弹窗模块
	
	$('#app-container').on('click', '.transfer', function(event) {
		transferToUser($(this).parent().parent().parent().parent().attr('data-id'), 1);
	});
	//转让弹窗模块--end

	  //出售模态框点击事件
    $("#apply-template-dialog").on("click",".zhichi-close",function(){
      $("#apply-template-dialog").hide();
      $("#template-desc").val("");
      $("#template-tel").val("");
      $("#template-price").val("");
    }).on("click",".zhichi-submit-btn",function(){
        var price = Number($("#template-price").val()),
        description = $("#template-desc").val(),
        phoneReg = /^1[34578]\d{9}$/,
        phone = $("#template-tel").val().trim(),
        phoneflag = false,
        priceflag = false,
        descflag = false;
        if(price < 500 || price > 2000 || isNaN(price)){
          alertTip("价格在500～2000之内！");
          $("#template-price").focus();
          return;
        }else{
          priceflag = true;
        }
        if(description.length>50){
          alertTip("简介不能超过50个字符！");
          $("#template-desc").focus();
          return;
        }else{
          descflag = true;
        }
        if(!phoneReg.test(phone)){
          alertTip("手机号码输入有误！");
          $("#template-tel").focus();
          return;
        }else{
           phoneflag = true;
        }
        if(priceflag && descflag && phoneflag){
           $.ajax({
                url:"/index.php?r=pc/Webapp/SellApp",
                type:'POST',
                data:{
                  app_id:$(".zhichi-submit-btn").attr("data-id"),
                  price:price,
                  cate_id:$("#template-cates").val(),
                  phone:phone,
                  description:description
                },
                dataType:'json',
                success:function(data){
                    if (data.status !== 0) {alertTip(data.data);return;};
                    alertTip("提交成功，我们会尽快审核！");
                    $("#apply-template-dialog").hide();
                },
                error:function(data){
                   alertTip(data.data);
                }
        });
        }
    });
    $("#sale-app-tip").on("click",".zhichi-close,.sale-tip-container .content a:first-child",function(){
       $("#sale-app-tip").hide();
    });
	   $.ajax({
        url:"/index.php?r=pc/AppData/AppCategoryList",
        type:'GET',
        data:{},
        dataType:'json',
        success:function(data){
          if (data.status !== 0) {alertTip(data.data);return;};
          var tempOption = '';
          $.each(data.data,function(index,ele){
            tempOption+="<option value="+ele.id+">"+ele.name+"</option>"
             $.each(ele.cate,function(i,e){
                  tempOption+="<option value="+e.id+">"+e.name+"</option>"
             });
          });
          $("#template-cates").append(tempOption);
        },
        error:function(data){
          alertTip(data.data)
        }
      });
	getUserWeibi();
	$.ajax({
		url:'/index.php?r=pc/InvitationNew/GetMyInvitationCount',
		type:'get',
		data:{},
		dataType:'json',
		success:function(data){
			if(data.status == 0){
				app_count = data.data.app_count;
				$('#app-amount').text(+data.data.app_count >= 10000 ? parseInt(+data.data.app_count/10000)+'万': data.data.app_count);
				$('#app-view-amount').text(+data.data.app_view_count >= 10000 ? parseInt(+data.data.app_view_count/10000)+'万' : data.data.app_view_count);
			}else{
				alertTip(data.data);
			}
		},
		error:function(data){
			alertTip(data.data);
		}
	});
	var isenterbutton = false;
	$("body").on('mouseenter','#global-zeroclipboard-html-bridge' ,function(event) {
		isenterbutton = true;

	}).on('mouseleave', '#global-zeroclipboard-html-bridge', function(event) {
		isenterbutton = false;
	});

	$(window).on('scroll', function(e){
		if($('#app-container').hasClass('no-more')||$('#app-container').hasClass('requesting')){
			return;
		}
		var ifRequest = $(document).height()-($(window).height()+$(this).scrollTop()) < 10;
		if(ifRequest){
			var param = { page : page++, page_size: 10, user_token: userToken };
			getData(param);
		}
	});

	$('#app-container').on('click', '.add', function(event) {
		event.preventDefault();
		window.open('/index.php?r=pc/Webapp/AppTpl');
	}).on('click', '.delete', function(event) {
		if (confirm('您确定要删除这个app吗？')) {
			var $this = $(this),
				$app = $this.parent().parent().parent().parent();
			$ajax('/index.php?r=pc/AppData/Delete', 'post', {
					app_id: $app.attr('data-id')
				}, 'json',
				function(data) {
					if (data.status == 0) {
						$app.remove();
						$app = null;
						alertTip('删除成功');
					} else {
						alertTip(data.data);
					}
				}, function(data) {
					alertTip(data.data);
				});
		}
	}).on('click', '.isonline', function(event) {
		var $this = $(this),
			$app = $this.parent().parent().parent().parent(),
			status = 1,
			tip = '下架成功',
			text='小程序上线';
		if( $this.hasClass('isoffline') ){
			status = 0;
			tip = '上线成功';
			text = '小程序下架';
		}		
		$ajax('/index.php?r=pc/AppData/Update', 'post', {
				app_id: $app.attr('data-id'),
				status: status
			}, 'json',
			function(data) {
				if (data.status == 0) {
					$this.toggleClass('isoffline').children().text(text);
					if ($this.children().hasClass('online_app')) {
						$this.children().addClass('offline').removeClass('online_app');
					} else {
						$this.children().addClass('online_app').removeClass('offline');
					}
					alertTip(tip);
				} else {
					alertTip(data.data);
				}
			}, function(data) {
				alertTip(data.data);
			});
	}).on("click",".isoffline",function(){
		  var is_designer = $("body").attr("is_designer"), 
		  	  app_id = $(this).attr("data-id"),
		  	  vend_status = $(this).closest("li").attr("data-vend_status"),
		  	  vend_price = $(this).closest("li").attr("data-vend_price");
	      if(is_designer != "1"){
	          $("#sale-app-tip").css({
	          	"z-index":"9999999"
	          }).show();
	      }else{
	      	  if(vend_status == 0 && Number(vend_price) != 0 && vend_price != 'null'){
	      	  	alertTip("正在审核中,不可再出售！");
	      	  }else{
	      	  	/* $("#apply-template-dialog").css({
	          	"z-index":"9999999"
		          }).show();
		          $(".zhichi-submit-btn").attr("data-id",app_id);*/
		          window.location.href = "/index.php?r=pc/Webapp/AppSale&app_id="+app_id+"&vend_status="+vend_status+"&vend_price="+vend_price;
	      	  }
	      }        
	}).on('copy','.copy_link', function(e){
		var $this = $(this);
		e.clipboardData.clearData();
  		e.clipboardData.setData('text/plain', $this.siblings('input').val());
  		e.preventDefault();
	}).on('aftercopy', '.copy_link', function(e){
		alertTip('复制成功');
	}).on('click', '.is_delete', function(event) {
		$('#shield-panel').find('.preview').attr('href', '/index.php?r=pc/Webapp/preview&id='+$(this).attr('data-id'));
		$('#shield-panel').find('.edit').attr('href', '/index.php?r=pc/Webapp/edit&id='+$(this).attr('data-id'));
		$('#shield-panel').find('.shield-id').text($(this).attr('data-id'));
		$('#shield-panel').find('.shield-reason').text($(this).attr('data-reason'));
		$('#shield-panel').show();
	});

//微币余额
function getUserWeibi(){
	$.ajax({
		url:'/index.php?r=Usercenter/getIntegralInfo',
		dataType:'json',
		type:'get',
		data:{},
		success:function(data){
			if (data.status !== 0) {alertTip(data.data);return;};
			$('#balance').text(data.data.integral);
		},
		error:function(data){alertTip(data.data)}
	})
}
function getData(param){
	var $container = $('#app-container');
	$container.addClass('requesting');
	$ajax('/index.php?r=pc/AppData/mylist','get',param,'json',
		function(data){
	    if(data.is_more==0){
	  		$container.addClass('no-more');
	    }
	    if(data.status == 0){
		    var invs = data.data,
		    		is_delete = '',
		    		invsStr = '',
		    		permission_html = '';
		    // if(page==2 && invs.length==0){
		    // 	$('#app-container').append('<div class="no-data-tip">没有相关app应用哦</div>');
		    // 	return;
		    // }
		    $.each(invs ,function(index, inv) {
		    	if (inv.is_deleted == 1 && inv.status == 3) {
			    	switch(+inv.appeal_status){
			    		// 0屏蔽 1申诉通过  2申诉失败 3申诉中
			    		case -1:
			    		case 0:
			    			is_delete = '<div class="is_delete" data-id="'+inv.app_id+'"  data-reason="'+inv.reason+'"><span>已屏蔽</span></div>';
			    		break;
			    		case 1:
			    		break;
			    		case 2:
			    			is_delete = '<div class="is_delete" data-id="'+inv.app_id+'"  data-reason="'+inv.reason+'"><span>已驳回</span></div>';
			    		break;
			    		case 3:
			    			is_delete = '<div class="appealing" data-id="'+inv.app_id+'"  data-reason="'+inv.reason+'"><span>申诉中</span></div>';
			    		break;
			    	}
			    }else{
			    	is_delete = '';
			    }
			    if (inv.just_mgr == 0) {
			    	permission_html = '';
			    } else if(inv.just_mgr == 1) {
			    	permission_html = '<div class="permission_sign">管理员</div>';
			    }

			    invsStr +='<li class="info" data-vend_status="'+inv.vend_status+'" data-vend_price='+inv.vend_price+' data-id="' + inv.app_id+ '" data-logo="'+ inv.logo +'" data-desc="'+inv.description+'">'
							+is_delete+permission_html+'';
							
			    if(inv.vend_status == 1){
			    	invsStr += '<div class="info-top"><div class="price"><span>'+inv.vend_price+'元</span></div><div class="tool-show">'
										+'<div class="btn_bar"><a class="prev_btn" target="_blank" href="/index.php?r=pc/Webapp/preview&id='+inv.app_id+'"><span class="icon-app-preview"></span>预览</a>'
										+'<a class="massage_btn" target="_blank" href="/index.php?r=pc/AppMgr/manager&_app_id='+inv.app_id+'"><span class="icon-app-manage"></span>管理</a>'
								    +'<a class="edit_btn" style="display:none;" target="_blank" href="/index.php?r=pc/Webapp/edit&id='+inv.app_id+'"><span class="icon-app-edit"></span>编辑</a></div>'
										+'<div class="menu_bar"><span class="qrcode"><span class="share_code">扫码分享</span></span><span class="share"><span class="share_link">查看链接</span></span>'
										+'<span class="delete"><span class="delete_app">删除应用</span></span><!--<span class="isoffline"  style="display:none;" data-id="' + inv.app_id+ '"><span class="offline">出售</span></span>-->';
				}else if(inv.vend_status == 0 && Number(inv.vend_price) != 0){
					 	invsStr += '<div class="info-top"><div class="verify"><span>审核中</span></div><div class="tool-show">'
										+'<div class="btn_bar"><a class="prev_btn" target="_blank" href="/index.php?r=pc/Webapp/preview&id='+inv.app_id+'"><span class="icon-app-preview"></span>预览</a>'
										+'<a class="massage_btn" target="_blank" href="/index.php?r=pc/AppMgr/manager&_app_id='+inv.app_id+'"><span class="icon-app-manage"></span>管理</a>'
								    +'<a class="edit_btn"  target="_blank" href="/index.php?r=pc/Webapp/edit&id='+inv.app_id+'"><span class="icon-app-edit"></span>编辑</a></div>'
										+'<div class="menu_bar"><span class="qrcode"><span class="share_code">扫码分享</span></span><span class="share"><span class="share_link">查看链接</span></span>'
										+'<span class="delete"><span class="delete_app">删除应用</span></span><!--<span class="isoffline"  data-id="' + inv.app_id+ '"><span class="offline">出售</span></span>-->';
				}else if(inv.vend_status == 2){
						invsStr += '<div class="info-top"><div class="verify-failure"><span>审核失败</span></div><div class="tool-show">'
										+'<div class="btn_bar"><a class="prev_btn" target="_blank" href="/index.php?r=pc/Webapp/preview&id='+inv.app_id+'"><span class="icon-app-preview"></span>预览</a>'
										+'<a class="massage_btn" target="_blank" href="/index.php?r=pc/AppMgr/manager&_app_id='+inv.app_id+'"><span class="icon-app-manage"></span>管理</a>'
								    +'<a class="edit_btn"  target="_blank" href="/index.php?r=pc/Webapp/edit&id='+inv.app_id+'"><span class="icon-app-edit"></span>编辑</a></div>'
										+'<div class="menu_bar"><span class="qrcode"><span class="share_code">扫码分享</span></span><span class="share"><span class="share_link">查看链接</span></span>'
										+'<span class="delete"><span class="delete_app">删除应用</span></span><!--<span class="isoffline"  data-id="' + inv.app_id+ '"><span class="offline">出售</span></span>-->';
				}else{
			    		invsStr += '<div class="info-top"><div class="tool-show">'
											+'<div class="btn_bar"><a class="prev_btn" target="_blank" href="/index.php?r=pc/Webapp/preview&id='+inv.app_id+'"><span class="icon-app-preview"></span>预览</a>'
											+'<a class="massage_btn" target="_blank" href="/index.php?r=pc/AppMgr/manager&_app_id='+inv.app_id+'"><span class="icon-app-manage"></span>管理</a>'
							    		+'<a class="edit_btn" target="_blank" href="/index.php?r=pc/Webapp/edit&id='+inv.app_id+'"><span class="icon-app-edit"></span>编辑</a></div>'
											+'<div class="menu_bar"><span class="qrcode"><span class="share_code">扫码分享</span></span><span class="share"><span class="share_link">查看链接</span></span>'
											+'<span class="delete"><span class="delete_app">删除应用</span></span><!--<span class="isoffline" data-id="' + inv.app_id+ '"><span class="offline">出售</span></span>-->';
			    }
			    invsStr += '<span class="copy"><span class="copy_app">复制小程序</span></span><span class="transfer"><span class="transfer_app">转让应用</span></span></div>'
									+'<div class="qrcode_div"><img src="'+inv.qrcode+'"></div><div class="share_div"><div class="shareLink">推广链接：</div><input id="sharelink" type="text" value="' + inv.url+ '" ><div class="copy_link">复制</div><div class="truecopy"></div></div></div><img class="info-pic" src="'+inv.cover+'"></div>'
									+'<div class="info-bottom"><a href="/index.php?r=pc/AppMgr/manager&_app_id='+inv.app_id+'" target="_blank"><p>'+inv.app_name+'</p></a><p class="info-title"><label class="detail"><span class="add_time"></span>'+inv.add_time+'</label><label class="viewCou"><span class="prev_count"></span>' +(+inv.view_count >=10000 ? parseInt(inv.view_count / 10000) + '万+' : inv.view_count)+ '</label></p></div></li>';

		    });
		    $container.append(invsStr);
	    }else{
	    	alertTip(data.data);
	    }
	    $container.removeClass('requesting');
		},function(data){
			$container.removeClass('requesting');
	    alertTip(data.data);
	});
}
function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}
});
//是否确认提示函数
function confirmTip(data){
	var options = {
		text : data.text || "",   //提示文字
		CancelText : data.CancelText || '取消',  //取消按钮文字
		ConfirmText : data.ConfirmText || '确定', //确定按钮文字
		CancelFunction : data.CancelFunction || function(){}, //取消按钮回调
		ConfirmFunction : data.ConfirmFunction || function(){}, //确定按钮回调
		CloseFunction : data.CloseFunction || function(){}, //关闭×按钮回调
	}

	var _div = '<div style="position: fixed;left: 0;top: 0;width: 100%;height: 100%;'
			+'background:rgba(0,0,0,0.5); z-index: 99999;">'
			+'<div style="position: absolute; left: 50%; top: 25%; max-width: 50%; min-width: 250px; border-radius: 5px; opacity: 1;'
			+' box-shadow: rgba(0, 0, 0, 0.498039) 0px 5px 15px; background: #fff; padding: 20px 0;text-align: center;">'
			+'<p style="border-radius: 5px; font-size: 16px; padding: 20px 10px;text-align: center;">'
			+ options.text + '</p><span class="tip-close" style="position: absolute; display: block; width: 30px; height: 30px;'
			+' top: 0; right: 0; text-align: center; cursor: pointer; font-size: 30px; color: #A5A5A5;">×</span>'
			+'<button class="tip-combtn" style="width: 89px; height: 35px;font-size: 18px;border: 1px solid #bbb;color: #FFF;cursor: pointer;'
			+'margin-left: 20px;margin-top: 10px;background-color: #03d7a4;">确定</button>'
			+'<button class="tip-canbtn" style="width: 89px; height: 35px;font-size: 18px;border: 1px solid #bbb;color: #FFF;cursor: pointer;'
			+'margin-left: 20px;margin-top: 10px;background-color: #B4B4B4;">取消</button></div></div>';

	_div = $(_div);
	_div.find('.tip-combtn').click(function(event) {
		options.ConfirmFunction();
		_div.remove();
	});
	_div.find('.tip-canbtn').click(function(event) {
		options.CancelFunction();
		_div.remove();
	});
	_div.find('.tip-close').click(function(event) {
		options.CloseFunction();
		_div.remove();
	});
	$('body').append(_div);
	_div.children('div').css('margin-left', '-'+_div.children('div').width()/2+'px')
}
// 悬浮窗
//底部导航
	$(".nav_top").on("mouseover",".nav_help",function(){
		$('.help_con').show();
	}).on("mouseout",".nav_help",function(){
		$('.help_con').hide();
	}).on("mouseover",".nav_video",function(){
		$('.video_con').show();
	}).on("mouseout",".nav_video",function(){
		$('.video_con').hide();
	})
	$('body').on("click",".scrollTop",function(){
		$(window).scrollTop(0);
	})