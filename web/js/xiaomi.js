/*! www.xiaomi.com - v1.1.0 - 2014 */if("undefined"==typeof XIAOMI||!XIAOMI)var XIAOMI={};
XIAOMI.namespace=function(){
	var i,j,d,a=arguments,o=null;
	for(i=0;i<a.length;i+=1)for(d=(""+a[i]).split("."),o=XIAOMI,j="XIAOMI"==d[0]?1:0;
	j<d.length;
	j+=1)o[d[j]]=o[d[j]]||{},o=o[d[j]];
	return o
}
,XIAOMI.lang=XIAOMI.lang||{},function(){
	var L=XIAOMI.lang,OP=Object.prototype,ARRAY_TOSTRING="[object Array]",FUNCTION_TOSTRING="[object Function]",OBJECT_TOSTRING="[object Object]",NOTHING=[],HTML_CHARS={
		"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;","`":"&#x60;"
	}
	,ADD=["toString","valueOf"],OB={
		isArray:function(o){
			return OP.toString.apply(o)===ARRAY_TOSTRING
		}
		,isBoolean:function(o){
			return"boolean"==typeof o
		}
		,isFunction:function(o){
			return"function"==typeof o||OP.toString.apply(o)===FUNCTION_TOSTRING
		}
		,isNull:function(o){
			return null===o
		}
		,isNumber:function(o){
			return"number"==typeof o&&isFinite(o)
		}
		,isObject:function(o){
			return o&&("object"==typeof o||L.isFunction(o))||!1
		}
		,isString:function(o){
			return"string"==typeof o
		}
		,isUndefined:function(o){
			return"undefined"==typeof o
		}
		,_IEEnumFix:-[1]?function(){}:function(r,s){
			var i,fname,f;
			for(i=0;i<ADD.length;i+=1)fname=ADD[i],f=s[fname],L.isFunction(f)&&f!=OP[fname]&&(r[fname]=f)
		}
		,escapeHTML:function(html){
			return html.replace(/[&<>"'\/`]/g,function(match){
				return HTML_CHARS[match]
			})
		}
		,preventDefault:function(e){
			e.preventDefault?e.preventDefault():e.returnValue=!1
		}
		,extend:function(subc,superc,overrides){
			if(!superc||!subc)throw new Error("extend failed, please check that all dependencies are included.");
			var i,F=function(){};
			if(F.prototype=superc.prototype,subc.prototype=new F,subc.prototype.constructor=subc,subc.superclass=superc.prototype,superc.prototype.constructor==OP.constructor&&(superc.prototype.constructor=superc),overrides){
				for(i in overrides)L.hasOwnProperty(overrides,i)&&(subc.prototype[i]=overrides[i]);
				L._IEEnumFix(subc.prototype,overrides)
			}
		}
		,augmentObject:function(r,s){
			if(!s||!r)throw new Error("Absorb failed, verify dependencies.");
			var i,p,a=arguments,overrideList=a[2];
			if(overrideList&&overrideList!==!0)for(i=2;i<a.length;i+=1)r[a[i]]=s[a[i]];
			else{
				for(p in s)!overrideList&&p in r||(r[p]=s[p]);
				L._IEEnumFix(r,s)
			}
			return r
		}
		,augmentProto:function(r,s){
			if(!s||!r)throw new Error("Augment failed, verify dependencies.");
			var i,a=[r.prototype,s.prototype];
			for(i=2;i<arguments.length;i+=1)a.push(arguments[i]);
			return L.augmentObject.apply(this,a),r
		}
		,dump:function(o,d){
			var i,len,s=[],OBJ="{...}",FUN="f(){...}",COMMA=", ",ARROW=" => ";
			if(!L.isObject(o))return o+"";
			if(o instanceof Date||"nodeType"in o&&"tagName"in o)return o;
			if(L.isFunction(o))return FUN;
			if(d=L.isNumber(d)?d:3,L.isArray(o)){
				for(s.push("["),i=0,len=o.length;
				len>i;
				i+=1)s.push(L.isObject(o[i])?d>0?L.dump(o[i],d-1):OBJ:o[i]),s.push(COMMA);
				s.length>1&&s.pop(),s.push("]")
			}
			else{
				s.push("{");
				for(i in o)L.hasOwnProperty(o,i)&&(s.push(i+ARROW),s.push(L.isObject(o[i])?d>0?L.dump(o[i],d-1):OBJ:o[i]),s.push(COMMA));
				s.length>1&&s.pop(),s.push("}")
			}
			return s.join("")
		}
		,substitute:function(s,o,f,recurse){
			for(var i,j,k,key,v,meta,token,dump,objstr,saved=[],lidx=s.length,DUMP="dump",SPACE=" ",LBRACE="{",RBRACE="}";(i=s.lastIndexOf(LBRACE,lidx),!(0>i))&&(j=s.indexOf(RBRACE,i),!(i+1>j));
			)token=s.substring(i+1,j),key=token,meta=null,k=key.indexOf(SPACE),k>-1&&(meta=key.substring(k+1),key=key.substring(0,k)),v=o[key],f&&(v=f(key,v,meta)),L.isObject(v)?L.isArray(v)?v=L.dump(v,parseInt(meta,10)):(meta=meta||"",dump=meta.indexOf(DUMP),dump>-1&&(meta=meta.substring(4)),objstr=v.toString(),v=objstr===OBJECT_TOSTRING||dump>-1?L.dump(v,parseInt(meta,10)):objstr):L.isString(v)||L.isNumber(v)||(v="~-"+saved.length+"-~",saved[saved.length]=token),s=s.substring(0,i)+v+s.substring(j+1),recurse===!1&&(lidx=i-1);
			for(i=saved.length-1;i>=0;i-=1)s=s.replace(new RegExp("~-"+i+"-~"),"{"+saved[i]+"}","g");
			return s
		}
		,trim:function(s){
			try{
				return s.replace(/^\s+|\s+$/g,"")
			}
			catch(e){
				return s
			}
		}
		,merge:function(){
			var i,o={},a=arguments,l=a.length;
			for(i=0;l>i;i+=1)L.augmentObject(o,a[i],!0);
			return o
		}
		,later:function(when,o,fn,data,periodic){
			when=when||0,o=o||{};
			var f,r,m=fn,d=data;
			if(L.isString(fn)&&(m=o[fn]),!m)throw new TypeError("method undefined");
			return L.isUndefined(data)||L.isArray(d)||(d=[data]),f=function(){
				m.apply(o,d||NOTHING)
			}
			,r=periodic?setInterval(f,when):setTimeout(f,when),{
				interval:periodic,cancel:function(){
					this.interval?clearInterval(r):clearTimeout(r)
				}
			}
		}
		,isValue:function(o){
			return L.isObject(o)||L.isString(o)||L.isNumber(o)||L.isBoolean(o)
		}
	};
	L.hasOwnProperty=OP.hasOwnProperty?function(o,prop){
		return o&&o.hasOwnProperty&&o.hasOwnProperty(prop)
	}
	:function(o,prop){
		return!L.isUndefined(o[prop])&&o.constructor.prototype[prop]!==o[prop]
	}
	,OB.augmentObject(L,OB,!0),L.augment=L.augmentProto,XIAOMI.augment=L.augmentProto,XIAOMI.extend=L.extend
}();
;
(function(){
	function parse(s,buf,offset){
		var i=buf&&offset||0,ii=0;
		for(buf=buf||[],s.toLowerCase().replace(/[0-9a-f]{2}/g,function(oct){
			16>ii&&(buf[i+ii++]=_hexToByte[oct])
		});
		16>ii;
		)buf[i+ii++]=0;
		return buf
	}
	function unparse(buf,offset){
		var i=offset||0,bth=_byteToHex;
		return bth[buf[i++]]+bth[buf[i++]]+bth[buf[i++]]+bth[buf[i++]]+"-"+bth[buf[i++]]+bth[buf[i++]]+"-"+bth[buf[i++]]+bth[buf[i++]]+"-"+bth[buf[i++]]+bth[buf[i++]]+"-"+bth[buf[i++]]+bth[buf[i++]]+bth[buf[i++]]+bth[buf[i++]]+bth[buf[i++]]+bth[buf[i++]]
	}
	function v1(options,buf,offset){
		var i=buf&&offset||0,b=buf||[];
		options=options||{};
		var clockseq=null!=options.clockseq?options.clockseq:_clockseq,msecs=null!=options.msecs?options.msecs:(new Date).getTime(),nsecs=null!=options.nsecs?options.nsecs:_lastNSecs+1,dt=msecs-_lastMSecs+(nsecs-_lastNSecs)/1e4;
		if(0>dt&&null==options.clockseq&&(clockseq=clockseq+1&16383),(0>dt||msecs>_lastMSecs)&&null==options.nsecs&&(nsecs=0),nsecs>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
		_lastMSecs=msecs,_lastNSecs=nsecs,_clockseq=clockseq,msecs+=122192928e5;
		var tl=(1e4*(268435455&msecs)+nsecs)%4294967296;
		b[i++]=tl>>>24&255,b[i++]=tl>>>16&255,b[i++]=tl>>>8&255,b[i++]=255&tl;
		var tmh=msecs/4294967296*1e4&268435455;
		b[i++]=tmh>>>8&255,b[i++]=255&tmh,b[i++]=tmh>>>24&15|16,b[i++]=tmh>>>16&255,b[i++]=clockseq>>>8|128,b[i++]=255&clockseq;
		for(var node=options.node||_nodeId,n=0;6>n;n++)b[i+n]=node[n];
		return buf?buf:unparse(b)
	}
	function v4(options,buf,offset){
		var i=buf&&offset||0;
		"string"==typeof options&&(buf="binary"==options?new BufferClass(16):null,options=null),options=options||{};
		var rnds=options.random||(options.rng||_rng)();
		if(rnds[6]=15&rnds[6]|64,rnds[8]=63&rnds[8]|128,buf)for(var ii=0;16>ii;ii++)buf[i+ii]=rnds[ii];
		return buf||unparse(rnds)
	}
	var _rng,_global=this;
	if("function"==typeof require)try{
		var _rb=require("crypto").randomBytes;
		_rng=_rb&&function(){
			return _rb(16)
		}
	}
	catch(e){}if(!_rng&&_global.crypto&&crypto.getRandomValues){
		var _rnds8=new Uint8Array(16);
		_rng=function(){
			return crypto.getRandomValues(_rnds8),_rnds8
		}
	}
	if(!_rng){
		var _rnds=new Array(16);
		_rng=function(){
			for(var r,i=0;16>i;i++)0===(3&i)&&(r=4294967296*Math.random()),_rnds[i]=r>>>((3&i)<<3)&255;
			return _rnds
		}
	}
	for(var BufferClass="function"==typeof Buffer?Buffer:Array,_byteToHex=[],_hexToByte={},i=0;256>i;i++)_byteToHex[i]=(i+256).toString(16).substr(1),_hexToByte[_byteToHex[i]]=i;
	var _seedBytes=_rng(),_nodeId=[1|_seedBytes[0],_seedBytes[1],_seedBytes[2],_seedBytes[3],_seedBytes[4],_seedBytes[5]],_clockseq=16383&(_seedBytes[6]<<8|_seedBytes[7]),_lastMSecs=0,_lastNSecs=0,uuid=v4;
	if(uuid.v1=v1,uuid.v4=v4,uuid.parse=parse,uuid.unparse=unparse,uuid.BufferClass=BufferClass,_global.define&&define.amd)define(function(){
		return uuid
	});
	else if("undefined"!=typeof module&&module.exports)module.exports=uuid;
	else{
		var _previousRoot=_global.uuid;
		uuid.noConflict=function(){
			return _global.uuid=_previousRoot,uuid
		}
		,_global.uuid=uuid
	}
}).call(this);
;
XIAOMI.namespace("app.analytics"),XIAOMI.app.analytics=function(element,options){
	this.options={
		page:"首页",position:["A1"],url:!0,BDurl:!0,mstSite:"CN-WW",mstPage:"PC",mstArea:"RM",mstPosition:["A"],mstHostParams:"",isMst:!1,JQelement:!1
	};
	for(var p in options)this.options[p]=options[p];
	for(var _this=this,isUrl=_this.options.url?!0:!1,isBDurl=_this.options.BDurl?!0:!1,bindFunction=function(links){
		$.each(links,function(k,v){
			var mstParamString=isUrl?$(v).attr("href"):XIAOMI.lang.trim($(v).text()),BDparamString=isBDurl?$(v).attr("href"):XIAOMI.lang.trim($(v).text()),paramIndex=k,BDparmas_1=_this.options.page,BDparmas_2=BDparmas_1+"_"+_this.options.position[i]+"_"+paramIndex,BDparmas_3=BDparmas_2+"_"+BDparamString,BDparmas="'PC','"+BDparmas_3+"'",mstParmas="'"+_this.options.mstSite+"-"+_this.options.mstPage+"-"+_this.options.mstArea+"-"+_this.options.mstPosition[i]+paramIndex+"', '"+mstParamString;
			mstParmas=mstParmas+=""===_this.options.mstHostParams?"', '"+paramIndex+"'":"', '"+_this.options.mstHostParams+"'",_this.options.isMst?$(v).attr("onclick","_msq.push(['trackEvent',"+mstParmas+"]);_hmt.push(['_trackEvent',"+BDparmas+"]);"):$(v).attr("onclick","_hmt.push(['_trackEvent',"+BDparmas+"]);")
		})
	}
	,i=0;
	i<element.length;
	i++){
		var links=_this.options.JQelement?element[i]:$(element[i]).find("a");
		bindFunction(links)
	}
}
,XIAOMI.namespace("app.updateMiniCart, app.addShopCart, app.addShopCartEvent"),XIAOMI.app.updateMiniCart=function(){
	var num=XIAOMI.app.cookie("xm_user_www_num");
	return num&&parseFloat(num)>0?($(".J_cartNum").html("("+num+")").show(),num):($(".J_cartNum").html("").hide(),0)
}
,XIAOMI.app.addShopCart=function(gid,callback,obj){
	if(gid&&"function"==typeof callback){
		var ajaxUrl=XIAOMI.GLOBAL_CONFIG.orderSite+"/cart/add/"+gid;
		$.ajax({
			url:ajaxUrl,dataType:"jsonp",jsonp:"jsonpcallback",success:function(data){
				callback(data,obj),XIAOMI.app.updateMiniCart()
			}
		})
	}
}
,XIAOMI.app.addShopCartEvent=function(options){
	var op={
		obj:".xmAddShopCart",callback:null
	};
	$.extend(op,options||{}),$(document).on("click",op.obj,function(){
		var gid=$(this).attr("data-gid"),isDisabled=$(this).attr("data-disabled"),isPackage=$(this).attr("data-package");
		if("false"===isDisabled){
			if($(this).attr("data-disabled","true"),!gid||"true"===isPackage||null===op.callback)return!0;
			var dmSkuArr=XIAOMI.GLOBAL_CONFIG.damiaoGoodsId?XIAOMI.GLOBAL_CONFIG.damiaoGoodsId:!1,isToDm=!1;
			if(dmSkuArr!==!1&&"object"==typeof dmSkuArr)for(var i=0;i<dmSkuArr.length;i+=1)if(gid===dmSkuArr[i]){
				isToDm=!0;
				break
			}
			if(isToDm===!0){
				var dmLogin=new XIAOMI.app.miniLogin;
				XIAOMI.app.cookie("serviceToken")?XIAOMI.app.dmFun.init({
					sku:gid,callback:op.callback,obj:$(this)
				}):XIAOMI.app.cookie("userId")?(dmLogin._proxyiframe(),XIAOMI.app.dmFun.init({
					sku:gid,callback:op.callback,obj:$(this)
				})):dmLogin._toLogin()
			}
			else XIAOMI.app.addShopCart(gid,op.callback,$(this))
		}
		return!1
	})
}
,function(){
	for(var method,noop=function(){},methods=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeStamp","trace","warn"],length=methods.length,console=window.console=window.console||{};
	length--;
	)method=methods[length],console[method]||(console[method]=noop)
}(),XIAOMI.namespace("app.cookie"),XIAOMI.app.cookie=function(key,value,options){
	if(arguments.length>1&&"[object Object]"!==String(value)){
		if(options=jQuery.extend({},options),(null===value||void 0===value)&&(options.expires=-1),"number"==typeof options.expires){
			var days=options.expires,t=options.expires=new Date;
			t.setDate(t.getDate()+days)
		}
		return value=String(value),document.cookie=[encodeURIComponent(key),"=",options.raw?value:encodeURIComponent(value),options.expires?"; expires="+options.expires.toUTCString():"",options.path?"; path="+options.path:"",options.domain?"; domain="+options.domain:"",options.secure?"; secure":""].join("")
	}
	options=value||{};
	var result,decode=options.raw?function(s){
		return s
	}
	:decodeURIComponent;
	return(result=new RegExp("(?:^|; )"+encodeURIComponent(key)+"=([^;]*)").exec(document.cookie))?decode(result[1]):null
}
,XIAOMI.namespace("app.dmFun"),XIAOMI.app.dmFun={
	init:function(options){
		this.config={
			sku:null,callback:null,obj:null,sourceVal:"bigtap"
		}
		,this.inTheQueue=!1,$.extend(this.config,options),this.startQueue(),this.getDmSys();
		var _this=this;
		$("#xmDmReload").on("click",function(){
			_this.config.obj.trigger("click")
		})
	}
	,getDmSys:function(){
		var _this=this,hdget=XIAOMI.GLOBAL_CONFIG.damiaoSite+"hdget/cn?source="+_this.config.sourceVal+"&product="+_this.config.sku+"&addcart=1&m=1&_="+(new Date).getTime();
		$.ajax({
			type:"GET",url:hdget,dataType:"jsonp",jsonp:"jsonpcallback",jsonpCallback:"hdcontrol",timeout:3e4,error:function(){
				return _this.inTheQueue?(_this.stopQueue(),void $("#xmDmError").modal({
					show:!0,backdrop:"static"
				})):!1
			}
			,success:function(data){
				var jsonStr=data.status,token=jsonStr[_this.config.sku].hdurl,isOver=jsonStr[_this.config.sku].hdstart===!1&&jsonStr[_this.config.sku].hdstop===!0?!0:!1,speed=data.d22a51?1e3*data.d22a51:5e3;
				return _this.inTheQueue?isOver===!0?(_this.stopQueue(),alert("抱歉，商品已售罄！"),!1):(_this.getDmTimer&&clearInterval(_this.getDmTimer),void(token?_this.getShopCart(token):(_this.inTheQueue||_this.startQueue(),_this.getDmTimer=setInterval(function(){
					_this.getDmSys()
				}
				,speed)))):!1
			}
		})
	}
	,getShopCart:function(token){
		if(!token)return!1;
		var _this=this,addCart=XIAOMI.GLOBAL_CONFIG.orderSite+"/cart/add/"+this.config.sku+"?source="+_this.config.sourceVal+"&token="+token;
		$.ajax({
			type:"GET",url:addCart,dataType:"jsonp",jsonp:"jsonpcallback",success:function(data){
				_this.stopQueue(),_this.config.callback(data,_this.config.obj),XIAOMI.app.updateMiniCart()
			}
		})
	}
	,startQueue:function(){
		var _this=this;
		$("#xmDmError").modal("hide"),$("#xmDmQueue").modal({
			show:!0,backdrop:"static"
		}),_this.queueAnimate(),_this.inTheQueue=!0,$("#xmDmQueue").on("hidden.bs.modal",function(){
			_this.stopQueue(),_this.config.obj.attr("data-disabled","false")
		})
	}
	,stopQueue:function(){
		$("#xmDmQueue").modal("hide"),this.inTheQueue=!1,this.getDmTimer&&clearInterval(this.getDmTimer),window.queueAnimateTimer&&clearInterval(queueAnimateTimer)
	}
	,queueAnimate:function(){
		var flag=0,speed=200,loop=function(){
			flag-=90,-900>=flag&&(flag=0),$("#mituWalking").css({
				"background-position":flag+"px 0"
			})
		};
		window.queueAnimateTimer=setInterval(loop,speed)
	}
	,showLoading:function(){
		var _this=this;
		$("#getDmLoading").modal("show"),$("#getDmLoading").on("hidden.bs.modal",function(){
			_this.config.obj.attr("data-disabled","false")
		})
	}
	,hideLoading:function(){
		$("#getDmLoading").modal("hide")
	}
}
,XIAOMI.namespace("app.footer"),XIAOMI.app.footer={
	init:function(){
		var _this=this;
		_this.retinizer(),_this.weixin(),_this.siteList(),_this.conference0722(),XIAOMI.app.analytics([".J_menuNavMain"],{
			page:"导航",position:["A"],mstPage:"HP",mstArea:"NV",mstPosition:["A"],isMst:!0
		})
	}
	,conference0722:function(){
		function showCountLogo(ttime){
			var $text,remainTime=targetTime.getTime()-1e3*ttime,remainDays=Math.floor(remainTime/864e5),remainHours=Math.floor(remainTime/36e5)-24*remainDays;
			if(remainDays>0)$text='<span class="remain">倒计时<span class="time">'+remainDays+"</span>天</span>";
			else{
				if(!(remainHours>9))return!1;
				$text='<span class="remain remain-today">将于<span class="time">14:00</span>开始</span>'
			}
			window.setTimeout(function(){
				$('<div class="event-0722 clearfix"><a href="http://bbs.xiaomi.cn/thread-10330385-1-1.html" target="_blank"><span class="title">距小米年度发布会</span>'+$text+"</a></div>").insertAfter(".site-logo .logo").fadeIn(1e3)
			}
			,1e3)
		}
		var targetTime=new Date("2014/07/22 23:59:59");
		$.ajax({
			dataType:"script",url:"http://tp.hd.mi.com/gettimestamp",error:function(){
				showCountLogo((new Date).getTime()/1e3)
			}
			,success:function(){
				showCountLogo(servertime)
			}
		})
	}
	,retinizer:function(){
		var img=new Image;
		if("srcset"in img)return!1;
		if("undefined"==typeof window.devicePixelRatio||window.devicePixelRatio<=1.5)return!1;
		var $img=$("img");
		$img.each(function(){
			var srcset=$(this).attr("srcset");
			srcset&&srcset.split(" 2x")[0]&&$(this).attr("src",srcset.split(" 2x")[0])
		})
	}
	,siteList:function(){
		$(".J_globalList").on({
			mouseenter:function(){
				$(this).find(".global-site-list").show()
			}
			,mouseleave:function(){
				$(this).find(".global-site-list").hide()
			}
		})
	}
	,weixin:function(){
		$(".J_modalWeixin").on("click",function(){
			var $modalWeixin=$("#J_modalWeixin");
			$modalWeixin.css({
				width:$modalWeixin.attr("data-width"),height:$modalWeixin.attr("data-height")
			}).modal({
				backdrop:!0,keyboard:!0,show:!0
			})
		})
	}
}
,XIAOMI.namespace("app.getRegions"),XIAOMI.app.getRegions={
	getUrl:"/region/index",getData:function(parent,target,sId){
		var _this=this;
		$.ajax({
			type:"GET",url:_this.getUrl,data:"parent="+parent,dataType:"json",success:function(data){
				data&&_this.formatData(data,target,sId)
			}
		})
	}
	,formatData:function(jsonData,target,sId){
		for(var dataArray=jsonData.regions,lens=dataArray.length,obj=$("#"+target),options="<option value='0'>"+obj.children("option").eq(0).html()+"</option>",i=0;
		lens>i;
		i+=1){
			var isSelected=dataArray[i].region_id===sId?"selected":"";
			options+="<option zipcode='"+dataArray[i].zipcode+"' value='"+dataArray[i].region_id+"'"+isSelected+">"+dataArray[i].region_name+"</option>"
		}
		$("#"+target).html(options).attr("disabled",!1)
	}
}
,XIAOMI.namespace("app.History"),XIAOMI.app.History=function(){
	var historyVal=XIAOMI.app.cookie("XM_scan_history"),itemArray=null,goodsUrl=null;
	if(!historyVal)return!1;
	historyVal=historyVal.split("#m#");
	for(var lens=historyVal.length-1,objArr=[],i=0;lens>i;i++){
		itemArray=historyVal[i].split(","),goodsUrl=XIAOMI.GLOBAL_CONFIG.wwwSite+"/item/"+itemArray[3];
		var pro={};
		pro.imgUrl=itemArray[0],pro.goodsUrl=goodsUrl,pro.name=itemArray[1],pro.price=itemArray[2],pro.starClass=itemArray[4],pro.gid=itemArray[3],objArr.push(pro)
	}
	return objArr
}
,XIAOMI.namespace("app.lazyLoad"),XIAOMI.app.lazyLoad=function(option){
	var settings={
		defObj:"#lazyLoad-box",defHeight:50
	};
	settings=$.extend(settings,option||{});
	var defObj=(settings.defHeight,"object"==typeof settings.defObj?settings.defObj.find("img"):$(settings.defObj).find("img")),isIpad="ipad"===navigator.userAgent.toLowerCase().match(/iPad/i)?!0:!1,pageTop=function(){
		var d=document,y=isIpad?window.pageYOffset:Math.max(d.documentElement.scrollTop,d.body.scrollTop);
		return isIpad&&(settings.defHeight=0),d.documentElement.clientHeight+y+settings.defHeight
	}
	,rechangeSrc=function(obj){
		var src2=obj.attr("src2");
		src2&&obj.css({
			opacity:"0.3"
		}).attr("src",src2).removeAttr("src2").animate({
			opacity:"1"
		})
	}
	,imgLoad=function(){
		defObj.each(function(){
			isIpad?rechangeSrc($(this)):$(this).offset().top<=pageTop()&&rechangeSrc($(this))
		})
	};
	imgLoad(),$(window).bind("scroll",function(){
		imgLoad()
	}),$(window).bind("resize",function(){
		imgLoad()
	})
}
,XIAOMI.namespace("app.miniCart"),XIAOMI.app.miniCart={
	elmCartBtn:$("#J_miniCart"),elmCartList:$("#J_miniCartList"),loadingStr:'<p class="loading">数据加载中，请稍后...</p>',speed:500,init:function(){
		var _this=this,timeOut=null;
		return"undefined"!=typeof miniCartDisable&&miniCartDisable?!1:"undefined"!=typeof XIAOMI.GLOBAL_CONFIG.closeMiniCart&&"1"===XIAOMI.GLOBAL_CONFIG.closeMiniCart?!1:(_this.elmCartBtn.on({
			mouseenter:function(){
				clearTimeout(timeOut),$(this).hasClass("mini-cart-on")||($(this).addClass("mini-cart-on"),_this.show(),_this.getData())
			}
			,mouseleave:function(){
				timeOut=setTimeout(function(){
					_this.close()
				}
				,_this.speed)
			}
		}),_this.elmCartList.on({
			mouseenter:function(){
				clearTimeout(timeOut)
			}
			,mouseleave:function(){
				timeOut=setTimeout(function(){
					_this.close()
				}
				,_this.speed)
			}
		}),void _this.elmCartList.on("click",".delItem",function(e){
			var gId=$(this).attr("gid"),isBigtap=$(this).attr("data-isbigtap");
			return"true"!==isBigtap||confirm("您正在删除开放购买活动商品\n\n删除后您失去本次开放购买资格，无法下单购买此商品。\n确认删除此商品吗？")?(e.preventDefault(),void _this.delGoods(gId)):!1
		}))
	}
	,show:function(){
		var _this=this;
		_this.elmCartList.show()
	}
	,close:function(){
		var _this=this;
		_this.elmCartBtn.removeClass("mini-cart-on"),_this.elmCartList.html(this.loadingStr).hide()
	}
	,delGoods:function(gId){
		var _this=this;
		$.ajax({
			type:"POST",url:XIAOMI.GLOBAL_CONFIG.orderSite+"/cart/delete/"+gId,dataType:"jsonp",jsonp:"jsonpcallback",cache:"false",success:function(data){
				1===data.deleteBatch&&(_this.getData(),XIAOMI.app.updateMiniCart())
			}
		})
	}
	,getData:function(){
		var _this=this;
		$.ajax({
			type:"POST",url:XIAOMI.GLOBAL_CONFIG.orderSite+"/cart/miniNew",dataType:"jsonp",jsonp:"jsonpcallback",cache:!1,success:function(data){
				_this.formatData(data),XIAOMI.app.updateMiniCart()
			}
		})
	}
	,formatData:function(data){
		var _this=this;
		if(0===data.errorno&&data.totalItem>0){
			var lens=data.items.length,goodsUrl=null,listHtml="<ul>",countHtml='<div class="count clearfix"><span class="total">共计 <em>'+data.total+"</em> 件商品<strong>合计：<em>"+data.totalPrice+'元</em></strong></span><a href="'+XIAOMI.GLOBAL_CONFIG.orderSite+'/cart"  class="btn btn-primary">去购物车结算</a></div>';
			if(data.totalItem>5){
				var listHeight=335;
				listHtml='<ul style="height:'+listHeight+'px;overflow-x:hidden;overflow-y:scroll">'
			}
			for(var i=0;lens>i;i+=1){
				var isCos="",cosMask="",price=data.items[i].salePrice+"元 x "+data.items[i].num;
				data.items[i].is_cos===!0&&(isCos="is-cos",cosMask='<div class="cos-mask"></div>',price="暂时缺货"),0===data.items[i].noLink?(goodsUrl=XIAOMI.GLOBAL_CONFIG.orderSite+"/item/"+data.items[i].product_id,listHtml+='<li class="clearfix '+isCos+'"><a href="'+goodsUrl+'" class="pic"><img alt="" src="'+data.items[i].image_url+'?width=60&height=60"></a><a href="'+goodsUrl+'" class="name">'+data.items[i].product_name+'</a><span class="price">'+price+'</span><a class="btn-del delItem" href="javascript: void(0);" gid="'+data.items[i].itemId+'" data-isBigtap="'+data.items[i].is_bigtap+'"><i class="iconfont">&#xe607;</i></a>'+cosMask+"</li>"):listHtml+='<li class="clearfix '+isCos+'"><span class="pic"><img alt="" src="'+data.items[i].image_url+'"></span><span   class="name">'+data.items[i].product_name+'</span><span class="price">'+price+'</span><a class="btn-del delItem" href="javascript: void(0);" gid="'+data.items[i].itemId+'" data-isBigtap="'+data.items[i].is_bigtap+'"><i class="iconfont">&#xe607;</i></a>'+cosMask+"</li>"
			}
			listHtml+="</ul>",_this.elmCartList.html(listHtml+countHtml)
		}
		else 0===data.errorno&&_this.elmCartList.html('<p class="loading">购物车中还没有商品，赶紧选购吧！</p>')
	}
}
,XIAOMI.namespace("app.miniLogin"),XIAOMI.app.miniLogin=function(){
	this.orderSite=XIAOMI.GLOBAL_CONFIG.orderSite,this.quickLoginUrl=XIAOMI.GLOBAL_CONFIG.quickLoginUrl
}
,XIAOMI.app.miniLogin.prototype={
	constructor:XIAOMI.app.miniLogin,_proxyiframe:function(){
		var iframesrc=this.orderSite+"/user/proxy/stop/1",iframebody="<iframe src='"+iframesrc+"' width='0' height='0' name='proxy' id='proxy' frameborder='0' scrolling='no'></iframe>";
		$(document.body).append(iframebody),$("iframe[name='proxy']").load(function(){
			$("iframe[name='proxy']").remove()
		})
	}
	,_toLogin:function(rel){
		function appendTobody(url){
			var iframeURL=url?url:_this.quickLoginUrl,content="<iframe src='"+iframeURL+"' width='100%' height='100%' name='miniLoginFrame' id='miniLoginFrame' frameborder='0' scrolling='no'></iframe>",boxWidth=$("#loginBox").attr("data-width"),boxHeight=$("#loginBox").attr("data-Height");
			$("#loginBox-con").css({
				height:boxHeight
			}).html(content),$("#loginBox").css({
				width:boxWidth,"margin-left":-boxWidth/2
			}).modal({
				backdrop:!0,keyboard:!0,show:!0
			})
		}
		function goLocation(){
			clearInterval(timer),rel?window.location.href=rel:window.location.reload(!0)
		}
		function checkHash(){
			-1!==window.location.href.indexOf("order")?XIAOMI.app.cookie("serviceToken")&&goLocation():XIAOMI.app.cookie("userId")&&goLocation()
		}
		var _this=this,shref=encodeURIComponent(window.location.href);
		$.ajax({
			url:_this.orderSite+"/site/loginurl?followup="+shref,dataType:"jsonp",jsonp:"jsonpcallback",success:function(data){
				appendTobody(data.url)
			}
			,Complete:function(){},error:function(){
				appendTobody()
			}
		});
		var timer=window.setInterval(checkHash,1e3)
	}
	,init:function(){
		var _this=this;
		-1!==window.location.pathname.indexOf("cart")&&XIAOMI.app.cookie("userId")&&!XIAOMI.app.cookie("serviceToken")&&_this._proxyiframe(),$("[data-needLogin='true']").on("click",function(){
			window.location.href="https://account.xiaomi.com/pass/serviceLogin"
		})
	}
	,_isLogined:function(rel,e){
		XIAOMI.app.cookie("serviceToken")||(XIAOMI.app.cookie("userId")?this._proxyiframe():(e&&XIAOMI.lang.preventDefault(e),this._toLogin(rel)))
	}
	,autoExec:function(rel){
		this._isLogined(rel)
	}
}
,XIAOMI.namespace("app.navMenus, app.navigation"),XIAOMI.app.navMenus=function(){
	function toggleMenu(elm,curIndex,show,opt){
		var options,$menu,$elm=$(elm);
		return options=$.extend({},defaults,opt),$menu=$elm.children(options.menuSelector),"toggle"===options.effect?show?$menu.removeClass("current").children(options.submenuSelector).hide().end().eq(curIndex).addClass("current").children(options.submenuSelector).show():$menu.removeClass("current").children(options.submenuSelector).hide():"slide"===options.effect?show?($menu.removeClass("current").children(options.submenuSelector).stop(!0,!0).delay(options.speed).slideUp(options.speed),$menu.eq(curIndex).addClass("current").children(options.submenuSelector).stop(!0,!0).slideDown(options.speed)):$menu.removeClass("current").children(options.submenuSelector).stop(!0,!0).slideUp(options.speed):"fade"===options.effect&&(show?($menu.removeClass("current").children(options.submenuSelector).stop(!0,!0).fadeOut(options.speed),$menu.eq(curIndex).children(options.submenuSelector).stop(!0,!0).fadeIn(options.speed)):$menu.removeClass("current").children(options.submenuSelector).stop(!0,!0).fadeOut(options.speed)),$menu.eq(curIndex).children(options.submenuSelector)
	}
	function init(elm,opt){
		function bindToggleEvent(curIndex,show){
			options.delay>0&&"click"!==options.triggerEvent?show?(timeoutToggle&&window.clearTimeout(timeoutToggle),timeoutToggle=window.setTimeout(function(){
				toggleMenu($elm,curIndex,!0,options)
			}
			,options.delay)):(window.clearTimeout(timeoutToggle),timeoutToggle=window.setTimeout(function(){
				toggleMenu($elm,curIndex,!1,options)
			}
			,options.delay)):show?toggleMenu($elm,curIndex,!0,options):toggleMenu($elm,curIndex,!1,options),"function"==typeof options.callback&&options.callback($elm,curIndex,options)
		}
		var options,$menu,timeoutToggle,$elm=$(elm);
		return 0===$elm.length?$elm:$elm.length>1?($elm.each(function(){
			init($(this),opt)
		}),this):(options=$.extend({},defaults,opt),$menu=$elm.children(options.menuSelector),"hover"===options.triggerEvent?$menu.on({
			mouseenter:function(){
				bindToggleEvent($menu.index($(this)),!0)
			}
			,mouseleave:function(){
				bindToggleEvent($menu.index($(this)),!1)
			}
		}):"click"===options.triggerEvent&&$menu.on("click",function(e){
			e.preventDefault(),$(this).hasClass("toggled")?($(this).removeClass("toggled"),bindToggleEvent($menu.index($(this)),!1)):($menu.removeClass("toggled"),$(this).addClass("toggled"),bindToggleEvent($menu.index($(this)),!0))
		}),void(window.ActiveXObject&&!window.XMLHttpRequest&&$menu.find(options.submenuSelector).find("a").on("click",function(){
			window.location.href=$(this).attr("href")
		})))
	}
	var defaults;
	return defaults={
		menuSelector:".menu",submenuSelector:".children",triggerEvent:"hover",effect:"toggle",delay:200,speed:200,callback:function(){}
	}
	,{
		toggleMenu:toggleMenu,init:init
	}
}(),XIAOMI.app.navCategory=function(){
	function toggleCategoryList(option){
		"show"===option?($categoryContainer.addClass("nav-category-toggled"),$categoryTriggerBtn.find(".iconfont").html("&#xe606;"),$categoryList.show()):"static"===option?($categoryContainer.addClass("nav-category-toggled"),$categoryList.show()):($categoryContainer.removeClass("nav-category-toggled"),$categoryTriggerBtn.find(".iconfont").html("&#xe608;"),$categoryList.hide().find(".nav-category-list").children("li").removeClass("current"))
	}
	function bindChildrenList(){
		var timeoutChildrenList;
		$categoryList.find(".nav-category-list").children("li").on({
			mouseenter:function(){
				var $this=$(this);
				window.clearTimeout(timeoutChildrenList),$this.hasClass("current")||(timeoutChildrenList=window.setTimeout(function(){
					$this.addClass("current").siblings("li").removeClass("current");
					var $children=$this.find(".nav-category-children");
					if($children.length&&$children.offset().top-$categoryContainer.offset().top-$categoryContainer.height()+$children.height()>$categoryList.height()){
						var bottomFix=$children.offset().top-$categoryContainer.offset().top-$categoryContainer.height()+73-$categoryList.height();
						$children.css({
							top:"auto",bottom:bottomFix
						})
					}
				}
				,100))
			}
			,mouseleave:function(){
				var $this=$(this);
				window.clearTimeout(timeoutChildrenList),$this.hasClass("current")&&(timeoutChildrenList=window.setTimeout(function(){
					$this.removeClass("current")
				}
				,100))
			}
		})
	}
	function init(){
		function addSrcset(elm){
			var $imgs=elm.find("img");
			$imgs.each(function(){
				if(/40x40/.test($(this).attr("src"))){
					var url2x=$(this).attr("src").replace("40x40","80x80");
					$(this).attr("srcset",url2x+" 2x")
				}
			})
		}
		var isCategoryStatic="undefined"!=typeof isCategoryToggled?isCategoryToggled:!1,templateHtml='{{? it.children}}<li class="nav-category-item nav-category-item-first"><div class="nav-category-content"><a class="title" href="'+XIAOMI.GLOBAL_CONFIG.wwwSite+'/event/buyphone">购买手机</a><div class="links"><a href="'+XIAOMI.GLOBAL_CONFIG.wwwSite+'/buyphone/mi3">小米3</a><a href="'+XIAOMI.GLOBAL_CONFIG.wwwSite+'/buyphone/mi2s">小米2S</a><a href="'+XIAOMI.GLOBAL_CONFIG.wwwSite+'/buyphone/hongmi1s">红米</a><a href="'+XIAOMI.GLOBAL_CONFIG.wwwSite+'/buyphone/note">红米Note</a></div></div></li>{{~it.children :value:index}} {{? index < 6}}<li class="nav-category-item"><div class="nav-category-content"><a class="title" href="'+XIAOMI.GLOBAL_CONFIG.wwwSite+'/accessories/{{= value.cat_id }}">{{= value.name_alias || value.cat_name }}</a><div class="links">{{~value.highlight_children :highlight_value:highlight_index}}<a href="'+XIAOMI.GLOBAL_CONFIG.wwwSite+'/accessories/{{= highlight_value.cat_id }}">{{= highlight_value.cat_name }}</a>{{~}}</div>{{? value.children}}<div class="nav-category-children"><ul class="children-list">{{~value.children :children_value:children_index}}<li><a href="'+XIAOMI.GLOBAL_CONFIG.wwwSite+'/accessories/{{= children_value.cat_id }}"><img src="{{= children_value.cat_icon }}" alt="{{= children_value.cat_name }}"><span class="text">{{= children_value.cat_name }}</span></a></li>{{~}}</ul>{{? value.topsales.length > 0 }}<div class="children-special-section"><h4>热门商品</h4><ul>{{~value.topsales :topsales_value:topsales_index}}<li><a href="'+XIAOMI.GLOBAL_CONFIG.wwwSite+'/item/{{= topsales_value.id}}">{{= topsales_value.name_alias || topsales_value.name }} {{= topsales_value.price_max }}元</a></li>{{~}}</ul></div>{{?}}</div>{{?}}</div></li>{{?}} {{~}}<li class="nav-category-item"><div class="nav-category-content"><a class="title" href="'+XIAOMI.GLOBAL_CONFIG.wwwSite+'">多看图书与MIUI主题</a><div class="links"><a href="http://www.duokan.com/list/1-1?from=xiaomi">多看图书</a><a href="http://zhuti.xiaomi.com/?from=mi">MIUI主题</a></div><div class="nav-category-children"><ul class="children-list"><li><a href="http://www.duokan.com/list/14-1?from=xiaomi" target="_blank"><img src="http://img03.mifile.cn/webfile/images/2014/cn/nav/category-duokan-xs.jpg?width=40&height=40" srcset="http://img03.mifile.cn/webfile/images/2014/cn/nav/category-duokan-xs.jpg?width=80&height=80 2x" alt="" /><span class="text">多看图书 - 小说</span></a></li><li><a href="http://www.duokan.com/list/9-1?from=xiaomi" target="_blank"><img src="http://img03.mifile.cn/webfile/images/2014/cn/nav/category-duokan-zz.jpg?width=40&height=40" srcset="http://img03.mifile.cn/webfile/images/2014/cn/nav/category-duokan-zz.jpg?width=80&height=80 2x" alt="" /><span class="text">多看图书 - 杂志</span></a></li><li><a href="http://www.duokan.com/list/1-1?from=xiaomi" target="_blank"><img src="http://img03.mifile.cn/webfile/images/2014/cn/nav/category-all.png?width=40&height=40" srcset="http://img03.mifile.cn/webfile/images/2014/cn/nav/category-all.png?width=80&height=80 2x" alt="" /><span class="text">更多多看图书</span></a></li></ul><hr/><ul class="children-list"><li><a href="http://zhuti.xiaomi.com/compound?from=mi" target="_blank"><img src="http://img03.mifile.cn/webfile/images/2014/cn/nav/category-miui-compound.png?width=40&height=40" srcset="http://img03.mifile.cn/webfile/images/2014/cn/nav/category-miui-compound.png?width=80&height=80 2x" alt="" /><span class="text">MIUI热门主题</span></a></li><li><a href="http://zhuti.xiaomi.com/lockstyle?from=mi" target="_blank"><img src="http://img03.mifile.cn/webfile/images/2014/cn/nav/category-miui-lockstyle.png?width=40&height=40" srcset="http://img03.mifile.cn/webfile/images/2014/cn/nav/category-miui-lockstyle.png?width=80&height=80 2x" alt="" /><span class="text">MIUI百变锁屏</span></a></li><li><a href="http://zhuti.xiaomi.com/?from=mi" target="_blank"><img src="http://img03.mifile.cn/webfile/images/2014/cn/nav/category-all.png?width=40&height=40" srcset="http://img03.mifile.cn/webfile/images/2014/cn/nav/category-all.png?width=80&height=80 2x" alt="" /><span class="text">更多MIUI主题</span></a></li></ul></div></div></li>{{?}}',templateCategory=doT.template(templateHtml);
		if("undefined"==typeof categoryTree)return!1;
		if($("#J_categoryContainer").find(".nav-category-list").html(templateCategory(categoryTree)),XIAOMI.app.analytics([$(".nav-category-content > a"),$(".nav-category-content .links").find("a"),$(".nav-category-content .children-list").find("a"),$(".nav-category-content .children-special-section").find("a")],{
			page:"分类导航",position:["A","B","C","D"],mstPage:"HP",mstArea:"PC",mstPosition:["A","B","C","D"],JQelement:!0,isMst:!0,BDurl:!1
		}),addSrcset($(".nav-category-list")),isCategoryStatic)toggleCategoryList("static");
		else{
			$categoryTriggerBtn.append('<i class="iconfont">&#xe608;</i>');
			var timeoutCategory;
			$categoryContainer.on({
				mouseenter:function(){
					window.clearTimeout(timeoutCategory),$(this).hasClass("nav-category-toggled")||(timeoutCategory=window.setTimeout(function(){
						toggleCategoryList("show")
					}
					,200))
				}
				,mouseleave:function(){
					window.clearTimeout(timeoutCategory),$(this).hasClass("nav-category-toggled")&&(timeoutCategory=window.setTimeout(function(){
						toggleCategoryList("hide")
					}
					,200))
				}
			})
		}
		bindChildrenList()
	}
	var $categoryContainer=$("#J_categoryContainer"),$categoryTriggerBtn=$categoryContainer.children(".btn-category-list"),$categoryList=$categoryContainer.children(".nav-category-section");
	return{
		init:init
	}
}(),XIAOMI.namespace("app.placeholder"),XIAOMI.app.placeholder=function(el,opt){
	var defaults,options,elmPlaceholder,elm=$(el),isPlaceholderSupported="placeholder"in document.createElement("input");
	return 0===elm.length?elm:elm.length>1?(elm.each(function(){
		XIAOMI.app.placeholder($(this),opt)
	}),this):(defaults={
		blurClass:"xm-ph-blur"
	}
	,options=$.extend({},defaults,opt),elmPlaceholder=elm.attr("placeholder"),void(!isPlaceholderSupported&&elmPlaceholder&&(elm.is("textarea")?""===elm.html()&&elm.addClass(options.blurClass).html(elmPlaceholder):""===elm.val()&&elm.addClass(options.blurClass).val(elmPlaceholder),elm.on({
		focus:function(){
			$(this).is("textarea")?$(this).html()===elmPlaceholder&&$(this).removeClass(options.blurClass).html(""):$(this).val()===elmPlaceholder&&$(this).removeClass(options.blurClass).val("")
		}
		,blur:function(){
			$(this).is("textarea")?""===$(this).html()&&$(this).addClass(options.blurClass).html(elmPlaceholder):""===$(this).val()&&$(this).addClass(options.blurClass).val(elmPlaceholder)
		}
	}))))
}
,XIAOMI.namespace("app.carousel"),XIAOMI.app.carousel=function(){
	function init(elm,opt){
		function slideList(targetPage){
			var offsetX="-"+targetPage*itemWidth*itemPerSlide+"px";
			$list.animate({
				"margin-left":offsetX
			}
			,options.speed),targetPage>0&&countPage-1>targetPage?($btnPrev.removeClass("page-btn-prev-disabled"),$btnNext.removeClass("page-btn-next-disabled")):0===targetPage?($btnPrev.addClass("page-btn-prev-disabled"),$btnNext.removeClass("page-btn-next-disabled")):targetPage===countPage-1&&($btnPrev.removeClass("page-btn-prev-disabled"),$btnNext.addClass("page-btn-next-disabled"))
		}
		function autoPlay(){
			return 0>=countPage?!1:void(timeoutAuto=setInterval(function(){
				curIndex+=1,curIndex>countPage-1&&(curIndex=0),slideList(curIndex)
			}
			,options.delay))
		}
		var options,$listWrap,$list,$btnPrev,$btnNext,itemLength,itemWidth,itemHeight,itemPerSlide,countPage,timeoutAuto,$elm=$(elm),curIndex=0;
		return 0===$elm.length?$elm:$elm.length>1?($elm.each(function(){
			init($(this),opt)
		}),this):(options=$.extend({},defaults,opt),$listWrap=$elm.find(options.listWrapSelector),$list=$listWrap.find(options.listSelector),$btnPrev=$elm.find(options.prevBtnSelector),$btnNext=$elm.find(options.nextBtnSelector),itemWidth=options.itemWidth||$list.children(options.itemSelector).outerWidth(),itemHeight=options.itemHeight||$list.children(options.itemSelector).outerHeight()-1,itemLength=$list.children(options.itemSelector).length,itemPerSlide=4!==itemLength?Math.ceil($listWrap.width()/itemWidth):4,countPage=Math.ceil(itemLength/itemPerSlide),1===countPage&&($btnPrev.hide(),$btnNext.hide()),$listWrap.css({
			height:itemHeight
		}),$list.css({
			width:itemWidth*itemLength,"margin-left":0
		}),$btnPrev.addClass("page-btn-prev-disabled"),1>=countPage&&$btnNext.addClass("page-btn-next-disabled"),options.autoPlay&&(autoPlay(),$elm.on({
			mouseenter:function(){
				timeoutAuto&&clearInterval(timeoutAuto)
			}
			,mouseleave:function(){
				autoPlay()
			}
		})),$btnPrev.off().on("click",function(e){
			e.preventDefault(),$(this).hasClass("page-btn-prev-disabled")||(curIndex-=1,0>=curIndex&&(curIndex=0,$(this).addClass("page-btn-prev-disabled")),$btnNext.removeClass("page-btn-next-disabled"),slideList(curIndex))
		}),void $btnNext.off().on("click",function(e){
			e.preventDefault(),$(this).hasClass("page-btn-next-disabled")||(curIndex+=1,curIndex>countPage-1&&(curIndex=countPage-1,$(this).addClass("page-btn-next-disabled")),$btnPrev.removeClass("page-btn-prev-disabled"),slideList(curIndex))
		}))
	}
	var defaults;
	return defaults={
		listWrapSelector:".J_carouselWrap",listSelector:".J_carouselList",itemSelector:"li",prevBtnSelector:".J_carouselPrev",nextBtnSelector:".J_carouselNext",itemWidth:null,itemHeight:null,autoPlay:!0,speed:500,delay:5e3
	}
	,{
		init:init
	}
}(),XIAOMI.namespace("app.search"),XIAOMI.app.search={
	speed:200,inputObj:null,keyword:null,init:function(){
		var timeoutFocus,_this=this,timeOut=null,$searchForm=$("#J_searchForm"),searchConfig={};
		_this.inputObj=$searchForm.find(".search-text"),_this.inputObj.data("search-config")&&(searchConfig=$.parseJSON(_this.inputObj.data("search-config").replace(/'/g,'"'))),$searchForm.append($('<div id="J_keywordList" class="keyword-list hide"><ul class="result-list"></ul></div>')),_this.inputObj.on({
			focus:function(){
				window.clearTimeout(timeoutFocus),$("#J_keywordList").css("opacity",1),$searchForm.addClass("search-form-focus"),!$(this).val()&&searchConfig.defaultWords&&_this.formatData(searchConfig.defaultWords)
			}
			,blur:function(){
				$("#J_keywordList").css("opacity",0),timeoutFocus=window.setTimeout(function(){
					$searchForm.removeClass("search-form-focus")
				}
				,200)
			}
			,keyup:function(e){
				$.trim($(this).val()).length<=0&&searchConfig.defaultWords&&(_this.keyword=null,_this.formatData(searchConfig.defaultWords)),_this.focusMove(e.which),clearTimeout(timeOut),40!==e.which&&38!==e.which&&(timeOut=setTimeout(function(){
					_this.keyword=_this.inputObj.val(),_this.getResult(_this.keyword)
				}
				,_this.speed))
			}
		}),$searchForm.on("mouseenter","#J_keywordList li",function(){
			$(this).addClass("current").siblings().removeClass("current")
		}),_this.submit()
	}
	,getResult:function(k){
		var _this=this;
		k&&$.ajax({
			type:"GET",url:XIAOMI.GLOBAL_CONFIG.wwwSite+"/search/tips?keyword="+encodeURIComponent(k),dataType:"jsonp",jsonp:"jsonpcallback",jsonpCallback:"xmsearch",cache:!0,success:function(data){
				data.length>0?_this.inputObj.val()&&_this.formatData(data):_this.removeList()
			}
		})
	}
	,formatData:function(data){
		for(var listHtml="",i=0,lens=data.length;lens>i;i+=1){
			var keywordStr=data[i].replace(this.keyword,'<span class="keyword">'+this.keyword+"</span> ");
			listHtml+='<li data-key="'+data[i]+'"><a href="'+XIAOMI.GLOBAL_CONFIG.wwwSite+"/search_"+encodeURIComponent(data[i])+'">'+keywordStr+"</a></li>"
		}
		$("#J_keywordList").removeClass("hide").children(".result-list").html(listHtml)
	}
	,focusMove:function(keyCode){
		var _this=this,$keywordList=$("#J_keywordList"),$items=$keywordList.find("li"),i=$keywordList.find(".current").index()||0,lens=$items.length-1;
		if(38===keyCode){
			if(i-=1,0>i)return i=0,!1;
			$items.eq(i).addClass("current").siblings().removeClass("current"),_this.inputObj.val($items.eq(i).attr("data-key"))
		}
		else if(40===keyCode){
			if(i+=1,i>lens)return i=lens,!1;
			$items.eq(i).addClass("current").siblings().removeClass("current"),_this.inputObj.val($items.eq(i).attr("data-key"))
		}
	}
	,removeList:function(){
		$("#J_keywordList").addClass("hide").children(".result-list").html("")
	}
	,submit:function(){
		var _this=this;
		$("#J_searchForm").on("submit",function(){
			var val=$.trim(_this.inputObj.val());
			return""!==val&&(val=val.replace(/[\-_'=+|\\\/]/g," "),window.location.href=XIAOMI.GLOBAL_CONFIG.wwwSite+"/search_"+encodeURIComponent(val)),!1
		})
	}
}
,XIAOMI.namespace("app.selector"),XIAOMI.app.selector={
	defaultOption:{
		reorder:!1,buildLI:function(index,obj,elmUL){
			var objLI=$('<li data-index="'+index+'"><span>'+obj.text+"</span></li>");
			obj.selected&&objLI.addClass("selected"),elmUL.append(objLI)
		}
		,afterChange:function(){}
	}
	,init:function(elm,opt){
		function reorderList(elm){
			elm.insertBefore(elm.closest("ul").children("li")[0]),elmText.text(elm.text())
		}
		var options,elmSelect,elmWrap,elmText,elmList,elmArrow,_this=this,data=[];
		return 0===elm.length?elm:elm.length>1?(elm.each(function(){
			_this.init($(this),opt)
		}),this):(options=$.extend({},_this.defaultOption,opt),elmSelect=elm,elmWrap=$('<div class="xm-select"></div>').insertAfter(elmSelect),elmText=$('<div class="dropdown-text"></div>'),elmList=$('<ul class="dropdown-menu"></ul>'),elmArrow=$('<span class="arrow-down"></span>'),elmSelect.children("option").each(function(){
			data.push({
				text:$(this).text(),value:$(this).attr("value"),selected:$(this).attr("selected")
			})
		}),$(data).each(function(index,obj){
			options.buildLI(index,obj,elmList)
		}),elmWrap.append(elmText,elmList,elmArrow,elmSelect),elmSelect.hide(),options.reorder===!0&&0!==elmList.children("li").index(elmList.children(".selected"))?reorderList(elmList.children(".selected")):elmText.text(data[0].text),elmList.on("click","li",function(){
			var val=elmSelect.children("option").eq($(this).attr("data-index")).val();
			elmSelect.val(val).change(),$(this).addClass("selected").siblings("li").removeClass("selected"),options.reorder===!0?0!==elmList.children("li").index(this)&&(reorderList($(this)),elmList.hide()):(elmText.text($(this).text()),elmList.hide()),options.afterChange(val)
		}),void elmWrap.on({
			mouseover:function(){
				elmWrap.addClass("toggled"),elmList.show()
			}
			,mouseout:function(){
				elmWrap.removeClass("toggled"),elmList.hide()
			}
		}))
	}
}
,XIAOMI.namespace("app.setLoginInfo"),XIAOMI.app.setLoginInfo={
	data:{
		userId:0,userName:"",goodsNum:0
	}
	,miid:XIAOMI.app.cookie("userId"),defautConfig:{},init:function(globalConfig){
		var _this=this;
		this.config=$.extend({},globalConfig,this.defautConfig),this.uuidCookie(),this.miid&&0!=this.miid?(this.data.userName=this.miid?XIAOMI.app.cookie("XM_"+this.miid+"_UN"):"",this.data.goodsNum=XIAOMI.app.cookie("xm_user_www_num"),this.data.goodsNum=null==this.data.goodsNum?0:this.data.goodsNum,null==this.data.userName||""===this.data.userName?_this.createScript(this.miid):this.updateDom(this.miid)):$.ajax({
			dataType:"JSONP",url:"http://userid.xiaomi.com/userId",jsonpCallback:"userLogincallback",success:function(data){
				if(0!=data.userId&&null!=data.userId){
					var option={
						path:"/",domain:".mi.com"
					};
					XIAOMI.app.cookie("userId",data.userId,option),_this.createScript(data.userId)
				}
			}
		})
	}
	,createScript:function(uid){
		this.updateDom(uid);
		var script=document.createElement("script");
		script.src="https://account.xiaomi.com/pass/userInfoJsonP?userId="+uid+"&callback=setLoginInfo_getAccountInfo",script.type="text/javascript",script.async=!0,document.getElementsByTagName("head")[0].appendChild(script)
	}
	,updateDom:function(uid){
		var displayName=this.data.userName;
		null!=displayName&&""!==displayName?displayName.length>7&&(displayName=displayName.substr(0,7)+"…"):displayName=uid;
		var randomStr="undefined"!=typeof XIAOMI.app.cookie("userId")?XIAOMI.app.cookie("userId"):"";
		randomStr+="_t"+(new Date).getTime();
		var timeoutUserMenu,html='欢迎您 <b class="user-name">'+displayName+'<span class="arrow"></span></b><span class="sep">|</span><a href="'+this.config.orderSite+"/user/order?r="+randomStr+'">我的订单</a><span class="sep">|</span><a href="http://account.xiaomi.com/" target="_blank">我的小米账户</a>',$userInfoMenu=$('<div class="user-info-menu"><ul><li><a href="http://my.mi.com/portal" target="_blank">个人中心</a></li><li><a href="'+XIAOMI.GLOBAL_CONFIG.orderSite+'/user/favorite">我的收藏</a></li><li><a href="'+this.config.logoutUrl+'">退出登录</a></li></ul><span class="menu-arrow"></span></div>');
		$(".J_userInfo").html(html).append($userInfoMenu).on({
			mouseenter:function(){
				timeoutUserMenu&&window.clearTimeout(timeoutUserMenu),$userInfoMenu.show()
			}
			,mouseleave:function(){
				timeoutUserMenu=window.setTimeout(function(){
					$userInfoMenu.hide()
				}
				,200)
			}
		}
		,".user-name"),$userInfoMenu.on({
			mouseenter:function(){
				timeoutUserMenu&&window.clearTimeout(timeoutUserMenu)
			}
			,mouseleave:function(){
				timeoutUserMenu=window.setTimeout(function(){
					$userInfoMenu.hide()
				}
				,200)
			}
		})
	}
	,uuidCookie:function(){
		var myUuidValue=("xmguest-"+uuid.v1()).toUpperCase(),myUuid=XIAOMI.app.cookie("xmuuid");
		if(!myUuid){
			var option={
				path:"/",domain:".mi.com",expires:18250
			};
			XIAOMI.app.cookie("xmuuid",myUuidValue,option)
		}
	}
};
var setLoginInfo_getAccountInfo=function(data){
	var _this=XIAOMI.app.setLoginInfo;
	if(data.userId){
		_this.data.userName=data.uniqName?data.uniqName:data.userId;
		var option={
			path:"/",domain:".mi.com"
		};
		XIAOMI.app.cookie("XM_"+_this.miid+"_UN",_this.data.userName,option),_this.updateDom(data.userId)
	}
};
XIAOMI.namespace("setRecommend"),XIAOMI.app.setRecommend=function(options){
	var option={
		obj:$("#item-recommend-box"),tmpl:$("#item-recommend-template"),url:XIAOMI.GLOBAL_CONFIG.sideBarApiUrl+"cart/get/id/1134900361,1134900465,1135000458,1140400001/callback/itemRecommend/cid/2",max:5,min:0,callback:null
	};
	$.extend(option,options||{}),$(option.obj).show(),$.ajax({
		dataType:"JSONP",url:option.url,jsonpCallback:"itemRecommend",success:function(data){
			var template=doT.template($(option.tmpl).html()),result=data.result,itemList=[];
			for(var item in result)item<option.max&&itemList.push(result[item]);
			return itemList.length<option.min?!1:void(0!==itemList.length&&"error"!==result?($(option.obj).html(template(itemList)),null!==option.callback&&"function"==typeof option.callback&&option.callback()):$(option.obj).hide())
		}
	})
};
;
+function($){
	"use strict";
	function transitionEnd(){
		var el=document.createElement("bootstrap"),transEndEventNames={
			WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"
		};
		for(var name in transEndEventNames)if(void 0!==el.style[name])return{
			end:transEndEventNames[name]
		};
		return!1
	}
	$.fn.emulateTransitionEnd=function(duration){
		var called=!1,$el=this;
		$(this).one($.support.transition.end,function(){
			called=!0
		});
		var callback=function(){
			called||$($el).trigger($.support.transition.end)
		};
		return setTimeout(callback,duration),this
	}
	,$(function(){
		$.support.transition=transitionEnd()
	})
}(jQuery);
;
!function($){
	"use strict";
	var Modal=function(element,options){
		this.options=options,this.$element=$(element).delegate('[data-dismiss="modal"]',"click.dismiss.modal",$.proxy(this.hide,this)),this.options.remote&&this.$element.find(".modal-body").load(this.options.remote)
	};
	Modal.prototype={
		constructor:Modal,toggle:function(){
			return this[this.isShown?"hide":"show"]()
		}
		,show:function(){
			var that=this,e=$.Event("show");
			this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.escape(),this.backdrop(function(){
				var transition=$.support.transition&&that.$element.hasClass("fade");
				that.$element.parent().length||that.$element.appendTo(document.body),that.$element.show(),transition&&that.$element[0].offsetWidth,that.$element.addClass("in").attr("aria-hidden",!1),that.enforceFocus(),transition?that.$element.one($.support.transition.end,function(){
					that.$element.focus().trigger("shown")
				}):that.$element.focus().trigger("shown")
			}))
		}
		,hide:function(e){
			e&&e.preventDefault();
			e=$.Event("hide"),this.$element.trigger(e),this.isShown&&!e.isDefaultPrevented()&&(this.isShown=!1,this.escape(),$(document).off("focusin.modal"),this.$element.removeClass("in").attr("aria-hidden",!0),$.support.transition&&this.$element.hasClass("fade")?this.hideWithTransition():this.hideModal())
		}
		,enforceFocus:function(){
			var that=this;
			$(document).on("focusin.modal",function(e){
				that.$element[0]===e.target||that.$element.has(e.target).length||that.$element.focus()
			})
		}
		,escape:function(){
			var that=this;
			this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.modal",function(e){
				27==e.which&&that.hide()
			}):this.isShown||this.$element.off("keyup.dismiss.modal")
		}
		,hideWithTransition:function(){
			var that=this,timeout=setTimeout(function(){
				that.$element.off($.support.transition.end),that.hideModal()
			}
			,500);
			this.$element.one($.support.transition.end,function(){
				clearTimeout(timeout),that.hideModal()
			})
		}
		,hideModal:function(){
			var that=this;
			this.$element.hide(),this.backdrop(function(){
				that.removeBackdrop(),that.$element.trigger("hidden")
			})
		}
		,removeBackdrop:function(){
			this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null
		}
		,backdrop:function(callback){
			var animate=this.$element.hasClass("fade")?"fade":"";
			if(this.isShown&&this.options.backdrop){
				var doAnimate=$.support.transition&&animate,pageHeight=$(document).height(),pageWidth="100%";
				if(this.$backdrop=$('<div class="modal-backdrop '+animate+'" />').appendTo(document.body),this.$backdrop.css({
					width:pageWidth,height:pageHeight
				}).click("static"==this.options.backdrop?$.proxy(this.$element[0].focus,this.$element[0]):$.proxy(this.hide,this)),doAnimate&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!callback)return;
				doAnimate?this.$backdrop.one($.support.transition.end,callback):callback()
			}
			else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),$.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one($.support.transition.end,callback):callback()):callback&&callback()
		}
	};
	var old=$.fn.modal;
	$.fn.modal=function(option){
		return this.each(function(){
			var $this=$(this),data=$this.data("modal"),options=$.extend({},$.fn.modal.defaults,$this.data(),"object"==typeof option&&option);
			data||$this.data("modal",data=new Modal(this,options)),"string"==typeof option?data[option]():options.show&&data.show()
		})
	}
	,$.fn.modal.defaults={
		backdrop:!0,keyboard:!0,show:!0
	}
	,$.fn.modal.Constructor=Modal,$.fn.modal.noConflict=function(){
		return $.fn.modal=old,this
	}
	,$(document).on("click.modal.data-api",'[data-toggle="modal"]',function(e){
		var $this=$(this),href=$this.attr("href"),$target=$($this.attr("data-target")||href&&href.replace(/.*(?=#[^\s]+$)/,"")),option=$target.data("modal")?"toggle":$.extend({
			remote:!/#/.test(href)&&href
		}
		,$target.data(),$this.data());
		e.preventDefault(),$target.modal(option).one("hide",function(){
			$this.focus()
		})
	})
}(window.jQuery);
;
!function(){
	"use strict";
	function encodeHTMLSource(){
		var encodeHTMLRules={
			"&":"&#38;","<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","/":"&#47;"
		}
		,matchHTML=/&(?!#?\w+;)|<|>|"|'|\//g;
		return function(){
			return this?this.replace(matchHTML,function(m){
				return encodeHTMLRules[m]||m
			}):this
		}
	}
	function resolveDefs(c,block,def){
		return("string"==typeof block?block:block.toString()).replace(c.define||skip,function(m,code,assign,value){
			return 0===code.indexOf("def.")&&(code=code.substring(4)),code in def||(":"===assign?(c.defineParams&&value.replace(c.defineParams,function(m,param,v){
				def[code]={
					arg:param,text:v
				}
			}),code in def||(def[code]=value)):new Function("def","def['"+code+"']="+value)(def)),""
		}).replace(c.use||skip,function(m,code){
			c.useParams&&(code=code.replace(c.useParams,function(m,s,d,param){
				if(def[d]&&def[d].arg&&param){
					var rw=(d+":"+param).replace(/'|\\/g,"_");
					return def.__exp=def.__exp||{},def.__exp[rw]=def[d].text.replace(new RegExp("(^|[^\\w$])"+def[d].arg+"([^\\w$])","g"),"$1"+param+"$2"),s+"def.__exp['"+rw+"']"
				}
			}));
			var v=new Function("def","return "+code)(def);
			return v?resolveDefs(c,v,def):v
		})
	}
	function unescape(code){
		return code.replace(/\\('|\\)/g,"$1").replace(/[\r\t\n]/g," ")
	}
	var global,doT={
		version:"1.0.0",templateSettings:{
			evaluate:/\{\{([\s\S]+?\}?)\}\}/g,interpolate:/\{\{=([\s\S]+?)\}\}/g,encode:/\{\{!([\s\S]+?)\}\}/g,use:/\{\{#([\s\S]+?)\}\}/g,useParams:/(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,define:/\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,defineParams:/^\s*([\w$]+):([\s\S]+)/,conditional:/\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,iterate:/\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,varname:"it",strip:!0,append:!0,selfcontained:!1
		}
		,template:void 0,compile:void 0
	};
	"undefined"!=typeof module&&module.exports?module.exports=doT:"function"==typeof define&&define.amd?define(function(){
		return doT
	}):(global=function(){
		return this||(0,eval)("this")
	}(),global.doT=doT),String.prototype.encodeHTML=encodeHTMLSource();
	var startend={
		append:{
			start:"'+(",end:")+'",endencode:"||'').toString().encodeHTML()+'"
		}
		,split:{
			start:"';out+=(",end:");out+='",endencode:"||'').toString().encodeHTML();out+='"
		}
	}
	,skip=/$^/;
	doT.template=function(tmpl,c,def){
		c=c||doT.templateSettings;
		var needhtmlencode,indv,cse=c.append?startend.append:startend.split,sid=0,str=c.use||c.define?resolveDefs(c,tmpl,def||{}):tmpl;
		str=("var out='"+(c.strip?str.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g," ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,""):str).replace(/'|\\/g,"\\$&").replace(c.interpolate||skip,function(m,code){
			return cse.start+unescape(code)+cse.end
		}).replace(c.encode||skip,function(m,code){
			return needhtmlencode=!0,cse.start+unescape(code)+cse.endencode
		}).replace(c.conditional||skip,function(m,elsecase,code){
			return elsecase?code?"';}else if("+unescape(code)+"){out+='":"';}else{out+='":code?"';if("+unescape(code)+"){out+='":"';}out+='"
		}).replace(c.iterate||skip,function(m,iterate,vname,iname){
			return iterate?(sid+=1,indv=iname||"i"+sid,iterate=unescape(iterate),"';var arr"+sid+"="+iterate+";if(arr"+sid+"){var "+vname+","+indv+"=-1,l"+sid+"=arr"+sid+".length-1;while("+indv+"<l"+sid+"){"+vname+"=arr"+sid+"["+indv+"+=1];out+='"):"';} } out+='"
		}).replace(c.evaluate||skip,function(m,code){
			return"';"+unescape(code)+"out+='"
		})+"';return out;").replace(/\n/g,"\\n").replace(/\t/g,"\\t").replace(/\r/g,"\\r").replace(/(\s|;|\}|^|\{)out\+='';/g,"$1").replace(/\+''/g,"").replace(/(\s|;|\}|^|\{)out\+=''\+/g,"$1out+="),needhtmlencode&&c.selfcontained&&(str="String.prototype.encodeHTML=("+encodeHTMLSource.toString()+"());"+str);
		try{
			return new Function(c.varname,str)
		}
		catch(e){
			throw"undefined"!=typeof console&&console.log("Could not create a template function: "+str),e
		}
	}
	,doT.compile=function(tmpl,def){
		return doT.template(tmpl,null,def)
	}
}();