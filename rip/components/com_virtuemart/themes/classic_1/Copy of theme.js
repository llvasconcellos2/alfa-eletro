/**
 * This file holds javscript functions that are used by the templates in the Theme
 * 
 */
 
 // AJAX FUNCTIONS 
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

	formCartAdd = document.getElementById( formId );
	
	var req = new Request({
		method: 'post',
		url: 'index2.php?ajax_request=1',
		data: $(formId),
		onRequest: function() { },
		onComplete: function(response) { 
			
			titulo = 'Aten&ccedil;&atilde;o';
			texto = response;
			
			updateMiniCarts();
			if(BrowserDetect.browser == "Explorer"){
				titulo += '<div style="position: absolute; z-index:9999; width:360px;height:130px;margin-top:26px;margin-left:-55px;">'+texto+'<p style="text-align:center"><input type="button" value="'+ok_lbl+'" onclick="$(\'modalWindowContainer\').destroy(); $(\'modalWindowWrapper\').destroy();" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" value="'+cart_title+'" onclick="handleGoToCart()" /></p>'+'</div>';
				texto = "";
			}
			else texto += '<p style="text-align:center"><input type="button" value="'+ok_lbl+'" onclick="document.boxB.close()" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" value="'+cart_title+'" onclick="handleGoToCart()" /></p>';
			document.boxB = new Modal({
				title: titulo,
				html: texto,
				width: 400,
				height: 160,
				closeButton: false,
				windowRadius: 5,
				opacity: 0.30,
				backgroundClickDismissesModal: true,
				animate: true,
				colors: {
					modalBackground: "#000000",
					windowBackground: "#999",
					contentBackground: "#EFEFEF"
			   }
			});
				
			setTimeout( 'document.boxB.close()', 5000 );
		
		}
	}).send();	
	
}



function handleRemoveFromCart(formId) {

	formCartAdd = document.getElementById( formId );
	
	var req = new Request({
		method: 'post',
		url: 'index2.php?ajax_request=1',
		data: $(formId),
		onRequest: function() { },
		onComplete: function(response) { 
			
			//titulo = 'Aten&ccedil;&atilde;o';
			//texto = response;
			
			updateMiniCarts();
			/*if(BrowserDetect.browser == "Explorer"){
				titulo += '<div style="position: absolute; z-index:9999; width:360px;height:130px;margin-top:26px;margin-left:-55px;">'+texto+'<p style="text-align:center"><input type="button" value="'+ok_lbl+'" onclick="$(\'modalWindowContainer\').destroy(); $(\'modalWindowWrapper\').destroy();" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" value="'+cart_title+'" onclick="handleGoToCart()" /></p>'+'</div>';
				texto = "";
			}
			else texto += '<p style="text-align:center"><input type="button" value="'+ok_lbl+'" onclick="document.boxB.close()" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" value="'+cart_title+'" onclick="handleGoToCart()" /></p>';
			document.boxB = new Modal({
				title: titulo,
				html: texto,
				width: 400,
				height: 160,
				closeButton: false,
				windowRadius: 5,
				opacity: 0.30,
				backgroundClickDismissesModal: true,
				animate: true,
				colors: {
					modalBackground: "#000000",
					windowBackground: "#999",
					contentBackground: "#EFEFEF"
			   }
			});*/
				
			//setTimeout( 'document.boxB.close()', 5000 );
		
		}
	}).send();	
	
}




/**
* This function searches for all elements with the class name "vmCartModule" and
* updates them with the contents of the page "shop.basket_short" after a cart modification event
*/
function updateMiniCarts() {
	var callbackCart = function(responseText) {
		carts = $$( '.vmCartModule' );
		if( carts ) {
			try { 
				for (var i=0; i<carts.length; i++){
					carts[i].innerHTML = responseText;
					
					carts[i].set('tween',{duration: 1000});
					carts[i].tween('background-color', '#fff68f', '#ffffff'); 
					

					//if( parent ) {
						//setTimeout( "carts[" + i + "].setStyle( 'background-color', 'transparent' )", 1000 );
					//}
					//if(confirm('O produto foi adicionado ao carrinho. Deseja visualizar os dados do carrinho?')) document.location = 'index.php?option=com_virtuemart&page=shop.cart' ; 
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
/**
* This function allows you to present contents of a URL in a really nice stylish dhtml Window
* It uses the WindowJS, so make sure you have called
* vmCommonHTML::loadWindowsJS();
* before
*/
function fancyPop( url, parameters ) {
	
	parameters = parameters || {};
	popTitle = parameters.title || '';
	popWidth = parameters.width || 700;
	popHeight = parameters.height || 600;
	popModal = parameters.modal || false;
	
	window_id = new Window('window_id', {className: "mac_os_x", 
										title: popTitle,
										showEffect: Element.show,
										hideEffect: Element.hide,
										width: popWidth, height: popHeight}); 
	window_id.setAjaxContent( url, {evalScripts:true}, true, popModal );
	window_id.setCookie('window_size');
	window_id.setDestroyOnClose();
}












var Rectangle = new Class({
						  
	Implements: [Options],

	//These are defaults that can be overridden by the user.
	options: {
		radius: 0,
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		fill: null,
		easyGradient: null,
		stroke: null,
		canvas: null,
		context: null
	},
	
	initialize: function (options){
		
		if(!options || !options.canvas || !options.width || !options.height || (!options.fill && !options.stroke && !options.easyGradient)){ return false; }
				
		//Pass options to instance
		this.setOptions(options);
		
		//Ensure numbers are rounded
		this.options.width = Math.round(this.options.width);
		this.options.height = Math.round(this.options.height);
		this.options.context = this.options.canvas.getContext('2d') || false;
		
		if(!this.options.context){ return false; }
		
		var opt = this.options; //Shortcut
		
		
		function setGradientFill(obj, height){
			
			var gradientFill = opt.context.createLinearGradient(obj.start_x || 0, obj.start_y || 0, obj.end_x || 0, obj.end_y || height);	
			
			if(obj.stops && $type(obj.stops) === "array"){
				obj.stops.each(function (s){
					if(s.position !== null && s.color){
						gradientFill.addColorStop(s.position, s.color);
					}
				});
			}
			
			return gradientFill;
		
		}


		function configureFill(){
			
			if(opt.easyGradient && opt.easyGradient.length > 0){
				
				opt.fill = { start_x: 0, start_y: 0, end_x: 0, end_y: opt.height, stops: [] };
				
				var stops = opt.easyGradient.length -1;
				
				for(var i=0; i < opt.easyGradient.length; i++){

					var stopPosition = (i === 0) ? 0 : 1 / (stops/i);
					
					opt.fill.stops[i] = {
						color: opt.easyGradient[i],
						position: stopPosition
					};
					
				}

				opt.context.fillStyle = setGradientFill(opt.fill, opt.height);
				
			} else if($type(opt.fill) === "string"){
				
				opt.context.fillStyle = opt.fill;
			
			} else {
				
				opt.context.fillStyle = setGradientFill(opt.fill, opt.height);
			
			}
			
		}
		
		
		function configureStroke(){
			opt.context.lineWidth = Math.round(opt.stroke.width);
			if($type(opt.stroke.color) === "string"){
				opt.context.strokeStyle = opt.stroke.color;
			} else {
				opt.context.strokeStyle = setGradientFill(opt.stroke.color, opt.height);				
			}
		}
		
			
		function draw(){
			
			var edge = { left: opt.x, right: opt.x + opt.width, top: opt.y, bottom: opt.y + opt.height };
			
			opt.context.beginPath();
			
			if(opt.radius){
	
				var isSingleRadius = ($type(opt.radius) === "number");	
				var rad = {
					topLeft: (isSingleRadius) ? opt.radius : (opt.radius.topLeft) ? opt.radius.topLeft : 0,
					topRight: (isSingleRadius) ? opt.radius : (opt.radius.topRight) ? opt.radius.topRight : 0,
					bottomLeft: (isSingleRadius) ? opt.radius : (opt.radius.bottomLeft) ? opt.radius.bottomLeft : 0,
					bottomRight: (isSingleRadius) ? opt.radius : (opt.radius.bottomRight) ? opt.radius.bottomRight : 0
				};
							
				var point = {
					a: opt.y + rad.topLeft,
					b: opt.y + opt.height - rad.bottomLeft,
					c: opt.x + rad.bottomLeft,
					d: opt.x + opt.width - rad.bottomRight,
					e: opt.y + opt.height - rad.bottomRight,
					f: opt.y + rad.topRight,
					g: opt.x + opt.width - rad.topRight,
					h: opt.x + rad.topLeft
				};
		
				opt.context.moveTo(edge.left, point.a);
				opt.context.lineTo(edge.left, point.b);
				opt.context.quadraticCurveTo(edge.left, edge.bottom, point.c, edge.bottom);//Bottom left radius
				opt.context.lineTo(point.d, edge.bottom);
				opt.context.quadraticCurveTo(edge.right, edge.bottom, edge.right, point.e); //Bottom right radius
				opt.context.lineTo(edge.right, point.f);
				opt.context.quadraticCurveTo(edge.right, edge.top, point.g, edge.top); //Top right radius
				opt.context.lineTo(point.h, edge.top);				
				opt.context.quadraticCurveTo(edge.left, edge.top, edge.left, point.a); //Top left radius
		
			} else {
				
				opt.context.moveTo(edge.left, edge.top);
				opt.context.lineTo(edge.left, edge.bottom);
				opt.context.lineTo(edge.right, edge.bottom);
				opt.context.lineTo(edge.right, edge.top);
				opt.context.lineTo(edge.left, edge.top);				
							
			}
			
			if(opt.fill){ opt.context.fill(); }
			if(opt.stroke){ opt.context.stroke(); }
			
		}
				

		if(opt.fill || opt.easyGradient){ 
			configureFill();
		}
		
		if(opt.stroke && opt.stroke.color !== null && opt.stroke.width !== null){
			configureStroke();
		}
		
		draw();
			
	}
		
});











var Modal = new Class({

	Implements: [Options],

	//These are defaults that can be overridden later.
	options: {
		title: "",
		html: "",
		padding: 12,
		font: {
			title: {
				size: "small",
				face: "Verdana, Geneva",
				weight: "bold",
				color: "#333"
			},
			content: {
				size: "small",
				face: "inherit",
				weight: "inherit",
				color: "#333"
			}
		},
		width: 350,
		height: 200,
		shadowSize: 6,
		titlebarHeight: 28,
		edgeMargin: 1,
		opacity: 0.66,
		colors: {
			modalBackground: "#000",
			windowBackground: "#AAA",
			windowTitleBar: { top: "#F5F5F5", bottom: "#AAA" },
			contentBackground: "#F8F8F8",
			closeButton: {
				fill: { top: "#F69", bottom: "#F33" },				
				centerline: { top: "#C00", bottom: "#C33" },
				outline: { top: "#666", bottom: "#DDD" }
			}
		},
		windowRadius: { topLeft: 9, topRight: 9, bottomLeft: 3, bottomRight: 3 },
		closeButton: true,
		backgroundClickDismissesModal: true,
		animate: true,
		showTitleBar: true
	},
	
	elements: { wrapper: null, container: null,	canvas: null, modalBackground: null, textWrapper: null, title: null, maincontent: null },
	
	originalCSS: {
		html: { height: null, overflow: null },
		docBody: { height: null, overflow: null }
	},
	
	initialize: function(options){
		
		if($type(options.windowRadius) === "number" || $type(options.windowRadius) === "string"){
			var num = options.windowRadius;
			options.windowRadius = { topLeft: num, topRight: num, bottomLeft: num, bottomRight: num }
		}
		
		this.setOptions(options);
		
		var that = this, //for private members
			opt = that.options,
			adjustedWidth = opt.width + (opt.shadowSize * 2),
			adjustedHeight = opt.height + (opt.shadowSize * 2),
			content_h = opt.height - (opt.edgeMargin * 2),
			content_y = opt.shadowSize + opt.edgeMargin,
			content_text_h = opt.height - (opt.edgeMargin * 2) - (opt.padding * 2);
		
		if(opt.showTitleBar){
			content_h = opt.height - opt.edgeMargin - opt.titlebarHeight;
			content_y = opt.shadowSize + opt.titlebarHeight;
			content_text_h = opt.height - opt.edgeMargin - (opt.padding * 2) - opt.titlebarHeight - 1; //the -1 is for top border
		}

		//If another modal window is created before this one is removed, queuing it
		if($("modalWindowWrapper")){
			window.modalQueue = window.modalQueue || [];
			window.modalQueue[window.modalQueue.length] = options;
			return;
		}
		
		var modalBackgroundClickHandler = function (e){
			e.stop();
			if(opt.backgroundClickDismissesModal){
				that.close();
			}
		};

		var closeButtonClickHandler = function (e){
			e.stop();
			that.close();
		};
		
		var closeWindow = function (){
			
			//Destroy modal window
			$("modalWindowContainer").destroy();
			
			//var restore = restorePage;
			
			//If there's a queue, launch next window
			if(window.modalQueue && window.modalQueue.length > 0){
				
				$("modalWindowWrapper").destroy();
				new Modal(window.modalQueue[0]);
				window.modalQueue.splice(0,1); //reorder queue
			
			} else {
				
				if(opt.animate){
					//Fade out background then destroy
					var myEffect = new Fx.Morph('modalWindowWrapper', { duration: 250, onComplete: restorePage }).start({'opacity': 0});
				} else {
					//Destroy with no fade
					restorePage();
				}
				
			}	
		}.bind(this);
		
		var prepBodyStyles = function (){
			
			var html = $$("html")[0];
			var docBody = $(document.body);
			
			that.originalCSS.html.height = html.style.height;
			that.originalCSS.html.overflow = html.style.overflow;
			that.originalCSS.docBody.height = docBody.style.height;
			that.originalCSS.docBody.overflow = docBody.style.overflow;
			
			html.setStyles({ height: "100%", overflow: "hidden" });
			docBody.setStyles({ height: "100%", overflow: "hidden" });
			
		};

		var restorePage = function (){
			
			$(document.body).setStyles({
				height: that.originalCSS.docBody.height,
				overflow: that.originalCSS.docBody.overflow
			});
			
			$$("html")[0].setStyles({
				height: that.originalCSS.html.height,
				overflow: that.originalCSS.html.overflow
			});
			
			$("modalWindowWrapper").destroy();
			
		};

		var generate_wrapper = function (){
			return new Element("div", {
				id: "modalWindowWrapper",
				styles: {
					width: "100%",
					height: "100%",
					position: "absolute",
					"z-index": 9000,
					top: 0,
					left: 0
				}
			}).inject(document.body);
		};
		
		var generate_modalBackground = function (){
			return new Element("div", {
				id: "modalWindowBackground",
				styles: {
					width: "100%",
					height: "100%",
					background: opt.colors.modalBackground,
					opacity: opt.opacity
				},
				events: {
					click: modalBackgroundClickHandler.bind(that)
				}
			}).inject(that.elements.wrapper);			
		};
	
		var generate_container = function (){
			var w = adjustedWidth,
				h = adjustedHeight;
			return new Element("div", {
				id: "modalWindowContainer",
				styles: {
					width: w,
					height: h,
					position: "absolute",
					"z-index": 9001,
					left: "50%",
					top: "50%",
					"margin-left": "-" +w/2 +"px",
					"margin-top": "-" +h/2 +"px"
				}
			}).inject(document.body);
		};
	
		var generate_canvas = function (){	
			var canvas = $("modalWindowCanvas");
			if(!canvas){
				var w = adjustedWidth,
					h = adjustedHeight;
				var usesVML = (typeof window.G_vmlCanvasManager !== "undefined");
				canvas = new Element("canvas", {
					id: "modalWindowCanvas",
					width: w,
					height: h,
					styles: {
						position: "absolute",
						"z-index": 9002,
						left: "50%",
						top: "50%",
						"margin-left": "-" +w/2 +"px",
						"margin-top": "-" +h/2 +"px"
					}
				}).inject(that.elements.container);
				
				//IE uses VML not Canvas
				if(usesVML) { canvas = window.G_vmlCanvasManager.initElement(canvas); }
		
				// Make sure we don't execute when canvas isn't supported
				if(!canvas || !canvas.getContext){ 
					alert("Canvas not supported.\ncanvas.getContext: " +canvas.getContext);
					return false;
				}
			}
			return canvas;
		};
	
		//Creates the drop-shadow that appears under the modal window
		var generate_dropShadow = function (){
			var width = adjustedWidth,
				height = adjustedHeight,
				radius = opt.windowRadius;
			var opacity_steps = 1 / opt.shadowSize;
			//Blur is not yet available in canvas. 
			//Workaround is to create drop-shadow 'onion-style'
			for (var x = 0; x < opt.shadowSize; x++){
				var opacity = Math.round((opacity_steps * (x/6)) * 100) /100;
				new Rectangle({
					canvas: that.elements.canvas,
					width: width - (x * 2),
					height: height - (x * 2),
					x: x,
					y: x,
					radius: {
						topLeft: radius.topLeft + x,
						topRight: radius.topRight + x,
						bottomLeft: radius.bottomLeft + x,
						bottomRight: radius.bottomRight + x
					},
					fill: "rgba(50, 50, 50, " +opacity +")"			
				});
			}			
		};
	
		var generate_windowElements = function (){
		
			if(!that.elements.canvas){ return false; }
			
			//Shadow
			generate_dropShadow();
			
			//Window background
			new Rectangle({
				canvas: that.elements.canvas,
				width: opt.width,
				height: opt.height,
				x: opt.shadowSize,
				y: opt.shadowSize,
				radius: opt.windowRadius,
				fill: opt.colors.windowBackground
			});
						
			if(opt.showTitleBar){
								
				//Window title area
				new Rectangle({
					canvas: that.elements.canvas,
					width: opt.width,
					height: opt.titlebarHeight,
					x: opt.shadowSize,
					y: opt.shadowSize,
					radius: {
						topLeft: opt.windowRadius.topLeft,
						topRight: opt.windowRadius.topRight
					},
					fill: {
						start_x: 0,	start_y: 0,	end_x: 0, end_y: opt.titlebarHeight,
						stops: [
							{ position: 0, color: opt.colors.windowTitleBar.top },
							{ position: 1, color: opt.colors.windowTitleBar.bottom }
						]
					}
				});
								
			}
	
			//Content background
			new Rectangle({
				canvas: that.elements.canvas,
				width: opt.width - (opt.edgeMargin * 2),
				height: content_h,
				x: opt.shadowSize + opt.edgeMargin,
				y: content_y,
				radius: {
					topLeft: (opt.showTitleBar) ? 0 : opt.windowRadius.topLeft,
					topRight: (opt.showTitleBar) ? 0 : opt.windowRadius.topRight,
					bottomLeft: opt.windowRadius.bottomLeft,
					bottomRight: opt.windowRadius.bottomRight
				},
				fill: opt.colors.contentBackground
			});
			
			if(opt.showTitleBar && opt.closeButton){
				
				var btnSize = opt.titlebarHeight - 10;
				var btnMargin = (opt.titlebarHeight - btnSize) /2;
												
				//Button outline
				new Rectangle({
					canvas: that.elements.canvas,
					width: btnSize,
					height: btnSize,
					x: opt.width + opt.shadowSize - btnSize - btnMargin,
					y: opt.shadowSize + btnMargin,
					radius: btnSize/2 + 2,
					fill: {
						start_x: 0,
						start_y: opt.shadowSize + btnMargin,	
						end_x: 0, 
						end_y: opt.shadowSize + btnMargin + btnSize,
						stops: [
							{ position: 0, color: opt.colors.closeButton.outline.top },
							{ position: 1, color: opt.colors.closeButton.outline.bottom }
						]
					}
				});

				//Button center line
				new Rectangle({
					canvas: that.elements.canvas,
					width: btnSize -2,
					height: btnSize -2,
					x: opt.width + opt.shadowSize - btnSize - btnMargin + 1,
					y: opt.shadowSize + btnMargin + 1,
					radius: btnSize/2 + 1,
					fill: {
						start_x: 0,
						start_y: opt.shadowSize + btnMargin + 1 - 2,
						end_x: 0, 
						end_y: opt.shadowSize + btnMargin + 1 + btnSize - 2,
						stops: [
							{ position: 0, color: opt.colors.closeButton.centerline.top },
							{ position: 1, color: opt.colors.closeButton.centerline.bottom }
						]
					}
				});
				
				//Button main
				new Rectangle({
					canvas: that.elements.canvas,
					width: btnSize -4,
					height: btnSize -4,
					x: opt.width + opt.shadowSize - btnSize - btnMargin +2,
					y: opt.shadowSize + btnMargin +2,
					radius: btnSize/2,
					fill: {
						start_x: 0, 
						start_y: opt.shadowSize + btnMargin +2, 
						end_x: 0,
						end_y: opt.shadowSize + btnMargin + 2 + btnSize - 4,
						stops: [
							{ position: 0, color: opt.colors.closeButton.fill.top },
							{ position: 1, color: opt.colors.closeButton.fill.bottom }
						]
					}
				});
				
			}
		};
	
		var generate_textWrapper = function (){		
			var w = opt.width,
				h = opt.height;
			return new Element("div", {
				id: "modalWindowTextWrapper",
				styles: {
					position: "absolute",
					"z-index": 9003,
					left: "50%",
					top: "50%",
					width: w,
					height: h,
					"margin-left": "-" +w/2 +"px",
					"margin-top": "-" +h/2 +"px"
				}
			}).inject(that.elements.container);
		};
				
		var generate_title = function (){
			var width = opt.width - 6;
			if(opt.closeButton){
				width = opt.width - opt.titlebarHeight - 10;
			}
			return new Element("h1", {
				id: "modalWindowTitle",
				html: opt.title,
				styles: {
					width: width,
					height: opt.titlebarHeight,
					"line-height": opt.titlebarHeight,
					display: "block",
					margin: "0 0 0 6px",
					padding: 0,
					border: "none",
					"font-size": opt.font.title.size,
					"font-family": opt.font.title.face,
					"font-weight": opt.font.title.weight,
					color: opt.font.title.color,
					overflow: "hidden"
				}
			}).inject(that.elements.textWrapper);		
		};
		
		var generate_closeButton_a = function (){
			var btnSize = opt.titlebarHeight - 10;
			var btnMargin = (opt.titlebarHeight - btnSize) /2;
			return new Element("a", {
				id: "modalWindowCloseBtn",
				href: "#",
				styles: {
					width: btnSize,
					height: btnSize,
					display: "block",
					position: "absolute",
					"z-index": 9005,
					right: btnMargin,
					top: btnMargin,
					border: "none",
					outline: "none",
					margin: 0,
					padding: 0
				},
				events: { click: closeButtonClickHandler.bind(that) }
			}).inject(that.elements.textWrapper);		
		};
				
		var generate_maincontent_div = function (){
			return new Element("div", {
				id: "modalWindowContent",
				html: opt.html,
				styles: {
					width: opt.width - (opt.edgeMargin * 2) - (opt.padding * 2),
					height: content_text_h, 
					display: "block",
					"margin-left": opt.edgeMargin,
					"margin-top": (opt.showTitleBar) ? 0 : opt.edgeMargin +"px",
					padding: opt.padding + "px",
					"font-size": opt.font.content.size,
					"font-family": opt.font.content.face,
					"font-weight": opt.font.content.weight,
					color: opt.font.content.color,
					overflow: "auto",
					"border-top": (opt.showTitleBar) ? "1px solid #777" : "none"
				}
			}).inject(that.elements.textWrapper);
		};

		this.close = closeWindow;

		//Set wrapper and modal background
		this.elements.wrapper = generate_wrapper();

		this.elements.modalBackground = generate_modalBackground();
		prepBodyStyles();
		
		//Create container to hold canvas and text elements
		this.elements.container = generate_container();
		
		// ----- Create canvas -----		
		this.elements.canvas = generate_canvas();
		if(!this.elements.canvas){ return false; }	
		
		// ----- Create window elements in canvas -----
		generate_windowElements();
		
		// ----- Create text overlays -----
		this.elements.textWrapper = generate_textWrapper();
		
		if(opt.showTitleBar){
			generate_title();
		}
		
		if(opt.showTitleBar && opt.closeButton){
			generate_closeButton_a();
		}
		generate_maincontent_div();

	}

});







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




	function handleViewPInfo(i) {

		formCartAdd = document.getElementById( formId );
		
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


	function servOC(i, href) {
		var trObj = (document.getElementById) ? document.getElementById('ihtr' + i) : eval("document.all['ihtr" + i + "']");
		var nameObj = (document.getElementById) ? document.getElementById('name' + i) : eval("document.all['name" + i + "']");
		var ifObj = (document.getElementById) ? document.getElementById('ihif' + i) : eval("document.all['ihif" + i + "']");
		var browser = BrowserDetect.browser;
		
		if (browser == "Firefox" || browser == "Mozilla" || browser == "Netscape" || browser == "Gecko" || browser == "Seamonkey"){
			trObj.addEventListener("click", stopEvent, false);
			nameObj.addEventListener("click", stopEvent, false);
		}
		else {
			window.event.cancelBubble = true;
		}; 
		if (trObj != null) {
			if (trObj.style.display=="none") {
				ifObj.style.height = "0px";
				trObj.style.display="";
				nameObj.style.background="#ECECD9";
				
				if (!ifObj.src) ifObj.src = href;
				smoothHeight('ihif' + i, 0, 210, 42, 'o');
			}
			else {     
				nameObj.style.background ='';
				smoothHeight('ihif' + i, 210, 0, 42, 'ihtr' + i);
			}
		}
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
	
	
	