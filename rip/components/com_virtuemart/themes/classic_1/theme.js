/**
 * This file holds javscript functions that are used by the templates in the Theme
 * 
 */
 
 // AJAX FUNCTIONS 
 
var t = 0;
function loadNewPage( el, url ) {
	
	var theEl = $(el);
	var callback = {
		success : function(responseText) {
			theEl.innerHTML = responseText;
			if( Lightbox ) Lightbox.init();
		}
	}
	var opt = {
	    // Use POST
	    method: 'post',
	    // Handle successful response
	    onComplete: callback.success
    }
	//new Ajax( url + '&only_page=1', opt ).request();
}

function handleGoToCart() { document.location = 'index.php?option=com_virtuemart&page=shop.cart&product_id=' + formCartAdd.product_id.value ; }

function handleAddToCart(formId) {
	$('myOnPageContent').innerHTML = 'A quantidade dos produtos est&aacute; sendo atualizada no carrinho. Aguarde...<br /><center><img border="0" style="margin-top:6px;" src="components/com_virtuemart/js/slimbox/css/loading.gif" /></center>';
	TB_show("Aten&ccedil;&atilde;o", "#TB_inline?height=80&width=300&inlineId=myOnPageContent");
	t = setTimeout( 'TB_remove()', 3000 );
	var req = new Request({
		method: 'post',
		url: 'index2.php?ajax_request=1',
		data: $(formId),
		onRequest: function() { },
		onComplete: function(response) { 
			updateMiniCarts();
		}
	}).send();	
	
}

function handleRemoveFromCart(formId) {
	if(confirm("Deseja remover este produto do carrinho?")){
		var req = new Request({
			method: 'post',
			url: 'index2.php?ajax_request=1',
			data: $(formId),
			onRequest: function() { },
			onComplete: function(response) { 
				updateMiniCarts();
			}
		}).send();
	}
}

function updateMiniCarts() {
	var callbackCart = function(responseText) {
		carts = $$( '.vmCartModule' );
		if( carts ) {
			try { 
				for (var i=0; i<carts.length; i++){
					carts[i].innerHTML = responseText;
					carts[i].set('tween',{duration: 1000});
					carts[i].tween('background-color', '#fff68f', '#ffffff'); 
				}
			} catch(e) {}
		}
	}	
	var req2 = new Request({
		method: 'post',
		url: 'index2.php?only_page=1&page=shop.basket_short&option=com_virtuemart',
		data: '',
		onRequest: function() { },
		onComplete: function(response) { callbackCart(response) }
		}).send();
}




//////////////////Fechar Carrinho //////////////////////////////////


function abreFormEnvio(validate) {
	var titulo = 'Aten&ccedil;&atilde;o';
	var texto = '<div style="background-color:#ffffff;padding:4px;font-weight:normal">Para finalizar o seu pedido de or&ccedil;amento preencha o formul&aacute;rio abaixo:<form action="http://www.alfaeletro.com.br/index.php" method="post" name="adminForm" id="adminForm">';
	texto += '<div id="first_name_div" class="formLabel "><label for="first_name_field">Nome</label></div><div class="formField" id="first_name_input"><input type="text" id="first_name_field" name="first_name" size="30" value="" class="inputbox" maxlength="32" /></div><br style="clear:both;" />';
	texto += '<div id="email_div" class="formLabel "><label for="email_field">E-mail</label></div><div class="formField" id="email_input"><input type="text" id="email_field" name="email" size="30" value="" class="inputbox" maxlength="100" /></div><br style="clear:both;" />';
	texto += '<div id="phone_1_div" class="formLabel "><label for="phone_1_field">Telefone</label></div><div class="formField" id="phone_1_input"><input type="text" id="phone_1_field" name="phone_1" size="30" value="" class="inputbox" maxlength="32" /></div><br style="clear:both;" />';
	if(BrowserDetect.browser == "Explorer"){
		texto += '<div id="city_div" class="formLabel "><label for="city_field">Cidade</label></div><div class="formField" id="city_input"><input type="text" id="city_field" name="city" size="30" value="" class="inputbox" maxlength="32" /></div><br style="clear:both;" />';
		texto += '<div id="state_div" class="formLabel "><label for="state_field">Estado</label></div><div class="formField" id="state_input"><input type="text" id="state_field" name="state" size="30" value="" class="inputbox" maxlength="100" /></div><br style="clear:both;" />';
	}
	else{
		texto += '<div id="state_div" class="formLabel "><label for="state_field">Estado</label></div><div class="formField" id="state_input"><select id="state_field" name="state"></select></div><br style="clear:both;" />';
		texto += '<div id="city_div" class="formLabel "><label for="city_field">Cidade</label></div><div class="formField" id="city_input"><select id="city_field" name="city"></select></div><br style="clear:both;" />';
	}
	
	texto += '<div>Por favor deixe uma nota para n&oacute;s com seu pedido se assim desejar:<br /><textarea cols="60" style="height:100px;" name="customer_note"></textarea><br /></div>';
	texto += '<input type="hidden" id="last_name_field" name="last_name" value="Sobrenome" />';
	texto += '<input type="hidden" id="company_field" name="company" value="" />';
	texto += '<input type="hidden" id="middle_name_field" name="middle_name" value="" />';
	texto += '<input type="hidden" id="address_2_field" name="address_2" value="" />';
	texto += '<input type="hidden" id="phone_2_field" name="phone_2" value="" />';
	texto += '<input type="hidden" id="fax_field" name="fax" value="" />';
	texto += '<input type="hidden" id="address_1_field" name="address_1" value="Endereco" />';
	texto += '<input type="hidden" id="zip_field" name="zip" value="89000000" />';
	texto += '<input type="hidden" id="country_field" name="country" value="BRA" />';
	texto += '<input type="hidden" id="agreed_field" name="agreed" value="1" />';
	texto += '<input type="hidden" name="remember" value="" />';
	texto += '<input type="hidden" name="Itemid" value="68" />';
	texto += '<input type="hidden" name="gid" value="0" />';
	texto += '<input type="hidden" name="id" value="0" />';
	texto += '<input type="hidden" name="user_id" value="0" />';
	texto += '<input type="hidden" name="option" value="com_virtuemart" />';
	texto += '<input type="hidden" name="'+validate+'" value="1" />';
	texto += '<input type="hidden" name="useractivation" value="1" />';
	texto += '<input type="hidden" name="func" value="shopperadd" />';
	texto += '<input type="hidden" name="page" value="checkout.index" />';
	texto += '</form></div>';

	texto += '<p style="text-align:center"><input type="button" value="Cancelar" onclick="TB_remove()" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" value="Enviar" onclick="handleAddUserAjax(\'adminForm\');" /></p>';
	
	
	
	$('myOnPageContent').innerHTML = texto;
	TB_show("Aten&ccedil;&atilde;o", "#TB_inline?height=400&width=400&inlineId=myOnPageContent");
	$('myOnPageContent').innerHTML = "";

	new dgCidadesEstados({
		cidade: $('city_field'),
		estado: $('state_field')
	})
}




function handleAddUserAjax(formId) {
	var temp = "";
	var userId = "";
	var zone_qty = "";
	var ship_to_info_id = "";
	var costumerNote = $(formId).customer_note.value;
	$('TB_ajaxContent').innerHTML = 'Aguarde...<img border="0" style="margin-top:155px;margin-left:180px;" src="components/com_virtuemart/js/slimbox/css/loading.gif" />';
	
	
	var req = new Request({
		method: 'post',
		url: 'index2.php?ajax_request=1',
		data:$(formId),
		onRequest: function() { },
		onComplete: function(response) {
			temp = new String(response);
			temp = temp.split('user_id" value="');
			temp = new String(temp[1]);
			temp = temp.split('"');
			userId = temp[0];
			
			temp = new String(response);
			temp = temp.split('zone_qty" value="');
			temp = new String(temp[1]);
			temp = temp.split('"');
			zone_qty = temp[0];	
			
			temp = new String(response);
			temp = temp.split('<!--ship_to_info_id-->');
			temp = new String(temp[1]);
			temp = temp.split('<label for="');
			temp = new String(temp[1]);
			temp = temp.split('"');
			ship_to_info_id = temp[0];
			
			handleFazerCheckout1(userId, zone_qty, ship_to_info_id, costumerNote);
		}
	}).send();	
	
}

function handleFazerCheckout1(userId, zone_qty, ship_to_info_id, costumerNote) {
	var temp = "";
	
	var postData = {
		"Itemid": "68",
		"user_id": userId,
		"option": "com_virtuemart",
		"func": "checkoutProcess",
		"zone_qty": zone_qty,
		"page": "checkout.index",
		"ship_to_info_id": ship_to_info_id,
		"shipping_rate_id": "",
		"payment_method_id": "",
		"checkout_last_step": "1",
		"checkout_this_step[]": "CHECK_OUT_GET_SHIPPING_ADDR"		
	};
	
	var req = new Request({
		method: 'post',
		url: 'index.php',
		data: postData,
		onRequest: function() { },
		onComplete: function(response) {
			handleFazerCheckout2(userId, zone_qty, ship_to_info_id, costumerNote);
		}
	}).send();	
	
}

function handleFazerCheckout2(userId, zone_qty, ship_to_info_id, costumerNote) {
	var temp = "";
	
	var postData = {
		"Itemid": "68",
		"user_id": userId,
		"option": "com_virtuemart",
		"func": "checkoutProcess",
		"customer_note": costumerNote,
		"zone_qty": zone_qty,
		"page": "checkout.index",
		"ship_to_info_id": ship_to_info_id,
		"shipping_rate_id": "flex%7CSTD%7CStandard+Shipping+under+25.00%7C12",
		"payment_method_id": "2",
		"checkout_last_step": "4",
		"checkout_this_step[]": "CHECK_OUT_GET_FINAL_CONFIRMATION"		
	};
	
	var req = new Request({
		method: 'post',
		url: 'index.php',
		data: postData,
		onRequest: function() { },
		onComplete: function(response) {
			updateMiniCarts();
			$('TB_ajaxContent').innerHTML = 'Seu or&ccedil;amento foi enviado. Voc&ecirc; receber&aacute; um email com a confirma&ccedil;&atilde;o do pedido.';
		}
	}).send();	
	
}


//////////////////////FIM FECHAR CARRINHO //////////////////////////























var smooth_timer;
	
	
	
		var BrowserDetect = {
		init: function () {
			this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
			this.version = this.searchVersion(navigator.userAgent)
				|| this.searchVersion(navigator.appVersion)
				|| "an unknown version";
			this.OS = this.searchString(this.dataOS) || "an unknown OS";
		},
		searchString: function (data) {
			for (var i=0;i<data.length;i++)	{
				var dataString = data[i].string;
				var dataProp = data[i].prop;
				this.versionSearchString = data[i].versionSearch || data[i].identity;
				if (dataString) {
					if (dataString.indexOf(data[i].subString) != -1)
						return data[i].identity;
				}
				else if (dataProp)
					return data[i].identity;
			}
		},
		searchVersion: function (dataString) {
			var index = dataString.indexOf(this.versionSearchString);
			if (index == -1) return;
			return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
		},
		dataBrowser: [
			{
				string: navigator.userAgent,
				subString: "Chrome",
				identity: "Chrome"
			},
			{ 	string: navigator.userAgent,
				subString: "OmniWeb",
				versionSearch: "OmniWeb/",
				identity: "OmniWeb"
			},
			{
				string: navigator.vendor,
				subString: "Apple",
				identity: "Safari",
				versionSearch: "Version"
			},
			{
				prop: window.opera,
				identity: "Opera"
			},
			{
				string: navigator.vendor,
				subString: "iCab",
				identity: "iCab"
			},
			{
				string: navigator.vendor,
				subString: "KDE",
				identity: "Konqueror"
			},
			{
				string: navigator.userAgent,
				subString: "Firefox",
				identity: "Firefox"
			},
			{
				string: navigator.vendor,
				subString: "Camino",
				identity: "Camino"
			},
			{		// for newer Netscapes (6+)
				string: navigator.userAgent,
				subString: "Netscape",
				identity: "Netscape"
			},
			{
				string: navigator.userAgent,
				subString: "MSIE",
				identity: "Explorer",
				versionSearch: "MSIE"
			},
			{
				string: navigator.userAgent,
				subString: "Gecko",
				identity: "Mozilla",
				versionSearch: "rv"
			},
			{ 		// for older Netscapes (4-)
				string: navigator.userAgent,
				subString: "Mozilla",
				identity: "Netscape",
				versionSearch: "Mozilla"
			}
		],
		dataOS : [
			{
				string: navigator.platform,
				subString: "Win",
				identity: "Windows"
			},
			{
				string: navigator.platform,
				subString: "Mac",
				identity: "Mac"
			},
			{
				   string: navigator.userAgent,
				   subString: "iPhone",
				   identity: "iPhone/iPod"
			},
			{
				string: navigator.platform,
				subString: "Linux",
				identity: "Linux"
			}
		]
	
	};
	BrowserDetect.init();




	function handleViewPInfo(i, href) {		
		var browser = BrowserDetect.browser;
		var trObj = (document.getElementById) ? document.getElementById('ihtr' + i) : eval("document.all['ihtr" + i + "']");
		var nameObj = (document.getElementById) ? document.getElementById('name' + i) : eval("document.all['name" + i + "']");
	
		if (browser == "Firefox" || browser == "Mozilla" || browser == "Netscape" || browser == "Gecko" || browser == "Seamonkey"){
			trObj.addEventListener("click", stopEvent, false);
			nameObj.addEventListener("click", stopEvent, false);
		}
		else {
			window.event.cancelBubble = true;
		}; 
		
				
		if (trObj != null) {
			if (trObj.style.display=="none") {
				trObj.style.height = "0px";
				trObj.style.display="";
				nameObj.style.background="#ECECD9";
				
				
				trObj.innerHTML = '<img style="margin-top:85px;margin-left:240px;" src="components/com_virtuemart/js/slimbox/css/loading.gif" />';
				smoothHeight('ihtr' + i, 0, 210, 42, 'o');
			}
			else {     
				nameObj.style.background ='';
				smoothHeight('ihtr' + i, 210, 0, 42, 'ihtr' + i);
			}
		}
	
		var req = new Request({
			method: 'get',
			url: href,
			onRequest: function() { },
			onComplete: function(response) { 
				servOC(i, response);
			}
		}).send();	
	}


	function servOC(i, html) {
		var trObj = (document.getElementById) ? document.getElementById('ihtr' + i) : eval("document.all['ihtr" + i + "']");

		var browser = BrowserDetect.browser;
		
		//if (trObj.innerHTML == '<img src="components/com_virtuemart/js/slimbox/css/loading.gif" />'){
			trObj.innerHTML = html;
			$$("#ihtr" + i +" a[href^='http://www.alfaeletro.com.br/components/com_virtuemart/shop_image/product/']").slimbox(); 
		//}
		//else alert(trObj.innerHTML);
	}
	
	function stopEvent(ev) {
		ev.stopPropagation();
		return false;
	}
	
	function smoothHeight(id, curH, targetH, stepH, mode) {
		diff = targetH - curH;
		if (diff != 0) {
			newH = (diff > 0) ? curH + stepH : curH - stepH;
			((document.getElementById) ? document.getElementById(id) : eval("document.all['" + id + "']")).style.height = newH + "px";
			if (smooth_timer) window.clearTimeout(smooth_timer);
				smooth_timer = window.setTimeout( "smoothHeight('" + id + "'," + newH + "," + targetH + "," + stepH + ",'" + mode + "')", 16 );
		}
		else if (mode != "o") ((document.getElementById) ? document.getElementById(mode) : eval("document.all['" + mode + "']")).style.display="none";
	}