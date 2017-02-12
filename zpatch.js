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
	this._tags=function(c){
		var ask=[];
		var bid=[];
		for(var i=0;i<c;i++){
			ask.push({
				"root":$("#ask" + i),
				"price":$("#ask_price" + i),
				"amount":$("#ask_amount" + i),
				"total":$("#ask_total" + i),
				"sell_line_box_bar":$("#ask" + i + " .sell_line_box .bar")
			});
			bid.push({
				"root":$("#bid" + i),
				"price":$("#bid_price" + i),
				"amount":$("#bid_amount" + i),
				"total":$("#bid_total" + i),
				"buy_line_box_bar":$("#bid" + i + " .buy_line_box .bar")
				});
		}
		//取引履歴のログ
		var tlog=[];
		var tds=$("#table-log tbody tr td");
		for(var i=0;i<tds.length;i+=3){
			tlog.push({"time":$(tds[i+0]),"price":$(tds[i+1]),"amount":$(tds[i+2])});
		}
		return{
			"ask":ask,
			"bid":bid,
			"table_log":tlog
		}
	}(10);
	this._g_log=function(c){
		var r=[];
		for(var i=0;i<c.length;i++){
			r.push({"timestamp":c[i].time.text(),"colored_price":c[i].price.html(),"amount":c[i].amount.text(),"_id":0});
		}
		return r;
	}(this._tags.table_log);
	$(".note").append("<div class=\"note-wrapper\" style=\"color:red\">&#9889;表示高速化パッチが有効です。</div>")
}
FpsCtrl.prototype={
	_g_log:[],
	_buffer: null,
	_timer: null,
	_tags:null,
	update: function(a) {
		this._buffer = a, LIMIT_FPS && null != this._timer || this.render()
	},
	render: function() {
		clearTimeout(this._timer), null !== this._buffer ? (this.draw(this._buffer), this._buffer = null, this._timer = setTimeout(this.render.bind(this), REFRESH_RATE_IN_MS)) : this._timer = null
	},
	draw: function(a)
	{
		var tags=this._tags;
		animation_reset_timer && clearTimeout(animation_reset_timer);
		for (var b = 0; 10 > b; b++){
			tags.ask[b].price.html("&nbsp;");
			tags.ask[b].amount.html("&nbsp;");
			tags.bid[b].price.html("&nbsp;");
			tags.bid[b].amount.html("&nbsp;");
			tags.ask[b].total.attr("title", "").attr("data-original-title", "");
			tags.bid[b].total.attr("title", "").attr("data-original-title", "");
		}
		$(".sell_line_box .bar").css("width", "0%");
		$(".buy_line_box .bar").css("width", "0%");
		$(".change").removeClass("change");

		var c = JSON.parse(a.data);
		var e = Math.min(c.bid_data.length, 10);
		for (var d = function(a, b, d) {
			if (!trade.last_board) return !1;
				try {
					return data1 = "bid" == a ? c.bid_data : c.ask_data, data2 = "bid" == a ? trade.last_board.bid_data : trade.last_board.ask_data, data1[b][d] != data2[b][d]
				} catch (e) {
					return !1
				}
			}, b = 0; e > b; b++){
			tags.bid[b].price.text(c.bid_data[b].price);
			tags.bid[b].amount.text(c.bid_data[b].amount);
			tags.bid[b].buy_line_box_bar.css("width", c.bid_data[b].amount_rate + "%");
			tags.bid[b].total.attr("data-original-title", c.bid_data[b].total + trade.aux.toUpperCase());
		}

		for (var b = 0; e > b; b++) d("bid", b, "price") ? (tags.bid[b].price.addClass("change"), tags.bid[b].root.addClass("change")) : d("bid", b, "amount") && tags.bid[b].buy_line_box_bar.addClass("change");
		var e = Math.min(c.ask_data.length, 10);
		for (var b = 0; e > b; b++){
			 tags.ask[b].price.text(c.ask_data[b].price);
			 tags.ask[b].amount.text(c.ask_data[b].amount);
			 tags.ask[b].sell_line_box_bar.css("width", c.ask_data[b].amount_rate + "%");
			 tags.ask[b].total.attr("data-original-title", c.ask_data[b].total + trade.aux.toUpperCase());
		}
		for (var b = 0; e > b; b++){
			d("ask", b, "price") ? (tags.ask[b].price.addClass("change"), tags.ask[b].root.addClass("change")) : d("ask", b, "amount") && tags.ask[b].sell_line_box_bar.addClass("change");
		}
		for (var b = c.log_data.length-1; b >=0 ; b--) {
			var h = c.log_data[b];
			if(this._g_log[0]._id<h._id){
				this._g_log.unshift(h);
			}
		}
		var updates=0;
		while(this._g_log.length>tags.table_log.length){
			updates++;
			this._g_log.pop();
		}
		if(updates>0){
			for(var b=0;b<this._g_log.length;b++){
				tags.table_log[b].time.text(this._g_log[b].timestamp);
				tags.table_log[b].price.html(this._g_log[b].colored_price);
				tags.table_log[b].amount.text(this._g_log[b].amount);
			}
		}
		if(updates>tags.table_log.length){
			updates=tags.table_log.length;
		}
//		for(var b=0;b<updates;b++){
//			var t=$(tags.table_log[b].price.parent());
//			t.stop().fadeOut(0).fadeIn(800);
//		}
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
