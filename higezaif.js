function zp_waitfor(){
	if((typeof trade == "undefined")){
		setTimeout(zp_waitfor,3000);
		return;
	}
	setTimeout(function(){
		trade.exchange_ajax_trade_form=exchange_ajax_trade_form_patch;
		trade.send=send_patch;
	},1000);
}
setTimeout(zp_waitfor(),3000);


function exchange_ajax_trade_form_patch(a, b, c) {
    var d = $(b.form);
    b.disabled = !0, d.addClass("sending");
    var e = {
        url: a,
        method: d.attr("method") || "POST",
        data: d.serializeArray()
    };
    $.ajax(e).done(function(a) {
        a.result && d.get(0).reset(), trade.exchange_show_toast(a.result ? "success" : "danger", trade.translation_order, a.message), trade.exchange_update_user_status(c)
		showtime(false);
    }).fail(function() {}).always(function() {
        d.removeClass("sending"), b.disabled = !1
        showtime(false);
    })
}
function send_patch(a) {
	showtime(true);
    trade.exchange_ajax_trade_form("/trade_" + trade.currency_pair + "_xhr", a, trade.currency_pair)
}


var _x_time_id=null;
function showtime(f)
{
	var html="<iframe id=\"hige\" width=\"200\" height=\"113\" src=\"https://www.youtube.com/embed/3zhxCtVW8FI?rel=0&amp;controls=0&amp;showinfo=0&autoplay=1&loop=1&playlist=3zhxCtVW8FI\" frameborder=\"0\"></iframe>";
//	var comwin=$(".commission > div:eq(0) > div:eq(0) > div:eq(1)");
	var comwin=$("#contents");
	if(f){
		console.log("hige open");
		_x_time_id=setTimeout(function(){
			comwin.append(html);
		},3000);
	}else{
		if(_x_time_id!=null){
			console.log("hige close");
			//ＢＧＭの停止
			clearTimeout(_x_time_id);
			$("#hige").remove();
			_x_time_id=null;
		}
	}
}

$(".note").append("<div class=\"note-wrapper\" style=\"color:red\">&#9889;HigeZaifパッチが有効です。</div>")



