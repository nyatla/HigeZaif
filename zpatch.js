function zp_waitfor(){
	if((typeof FPS_CTRL == "undefined")){
		setTimeout(zp_waitfor,3000);
		return;
	}
	setTimeout(function(){
		FPS_CTRL=new FpsCtrl();
	},1000);
}
setTimeout(zp_waitfor(),3000);


function FpsCtrl()
{
	alert("");
}
FpsCtrl.prototype={
	_buffer: null,
	_timer: null,
	update: function(a) {
		this._buffer = a, LIMIT_FPS && null != this._timer || this.render()
	},
	render: function() {
		clearTimeout(this._timer), null !== this._buffer ? (this.draw(this._buffer), this._buffer = null, this._timer = setTimeout(this.render.bind(this), REFRESH_RATE_IN_MS)) : this._timer = null
	},
	draw: function(a)
	{
		animation_reset_timer && clearTimeout(animation_reset_timer);
		for (var b = 0; 10 > b; b++) document.getElementById("ask_price" + b).innerHTML = "&nbsp;", document.getElementById("ask_amount" + b).innerHTML = "&nbsp;", document.getElementById("bid_price" + b).innerHTML = "&nbsp;", document.getElementById("bid_amount" + b).innerHTML = "&nbsp;", $("#ask_total" + b).attr("title", "").attr("data-original-title", ""), $("#bid_total" + b).attr("title", "").attr("data-original-title", "");
		$(".sell_line_box .bar").css("width", "0%"), $(".buy_line_box .bar").css("width", "0%"), $(".change").removeClass("change");
		for (var c = JSON.parse(a.data), d = function(a, b, d) {
				if (!trade.last_board) return !1;
				try {
					return data1 = "bid" == a ? c.bid_data : c.ask_data, data2 = "bid" == a ? trade.last_board.bid_data : trade.last_board.ask_data, data1[b][d] != data2[b][d]
				} catch (e) {
					return !1
				}
			}, e = Math.min(c.bid_data.length, 10), b = 0; e > b; b++) document.getElementById("bid_price" + b).textContent = c.bid_data[b].price, document.getElementById("bid_amount" + b).textContent = c.bid_data[b].amount, $("#bid" + b + " .buy_line_box .bar").css("width", c.bid_data[b].amount_rate + "%"), $("#bid_total" + b).attr("data-original-title", c.bid_data[b].total + trade.aux.toUpperCase());
		for (var b = 0; e > b; b++) d("bid", b, "price") ? ($("#bid_price" + b).addClass("change"), $("#bid" + b).addClass("change")) : d("bid", b, "amount") && $("#bid" + b + " .buy_line_box .bar").addClass("change");
		e = Math.min(c.ask_data.length, 10);
		for (var b = 0; e > b; b++) document.getElementById("ask_price" + b).textContent = c.ask_data[b].price, document.getElementById("ask_amount" + b).textContent = c.ask_data[b].amount, $("#ask" + b + " .sell_line_box .bar").css("width", c.ask_data[b].amount_rate + "%"), $("#ask_total" + b).attr("data-original-title", c.ask_data[b].total + trade.aux.toUpperCase());
		for (var b = 0; e > b; b++) d("ask", b, "price") ? ($("#ask_price" + b).addClass("change"), $("#ask" + b).addClass("change")) : d("ask", b, "amount") && $("#ask" + b + " .sell_line_box .bar").addClass("change");
		for (var f = $(".log_row").map(function() {
				return $(this).data("id")
			}), g = [], b = 0; b < c.log_data.length; b++) {
			var h = c.log_data[b];
			if (-1 !== $.inArray(h._id, f)) break;
			g.push(h)
		}
		for (var i = $("#table-log tbody"), b = g.length - 1; b >= 0; b--) {
			var h = g[b],
				j = $('<tr class="log_row enter"></tr>').append($('<td class="text-right"/>').text(h.timestamp)).append($('<td class="text-right"/>').html(h.colored_price)).append($('<td class="text-right"/>').text(h.amount));
			j.attr("data-id", h._id), i.children().last().remove(), i.prepend(j)
		}
		var k = "";
		switch (c.last_price.action) {
			case "bid":
				k = '<span class="label label-success">' + trade.translation_buy + "</span>";
				break;
			case "ask":
				k = '<span class="label label-danger">' + trade.translation_sell + "</span>";
				break;
			default:
				k = '<span class="label label-warning">' + trade.translation_unknown + "</span>"
		}
		if (document.getElementById("last_price").innerHTML = k + " " + c.last_price.price, trade.is_user) {
			var l = $.cookie("userhash");
			if (!l && 0 == trade.userhash_retry) {
				var m = {
					url: "/user_hash_xhr",
					method: "GET"
				};
				$.ajax(m).done(function(a) {
					l = a.user_hash
				}).fail(function(a) {
					trade.userhash_retry++, trade.exchange_show_toast("danger", "session out", trade.translation_session_time_out)
				})
			}
			l && (l = l.substr(0, 10), $.inArray(l, c.target_users) > -1 ? trade.exchange_update_user_status(trade.currency_pair) : $.inArray("refresh", c.target_users) > -1 && trade.exchange_update_user_status(trade.currency_pair))
		}
	    c.last_price.price != trade.last_price_price && (trade.last_price_price = c.last_price.price, trade.last_price_action = c.last_price.action, trade.chart.set_trend(trade.last_price_action), trade.chart.push(c.candles)), trade.last_board = c, document.title = c.last_price.price_raw.format(trade.aux_unit_point) + trade.aux_unit + ("bid" == c.last_price.action ? trade.translation_buy : trade.translation_sell) + trade.item.toUpperCase() + "/" + trade.aux.toUpperCase() + " - " + trade.page_title, animation_reset_timer = setTimeout(function() {
	        $(".change").removeClass("change")
	    }, 800);
	}
};
