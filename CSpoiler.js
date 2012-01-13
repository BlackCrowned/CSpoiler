/*+++++++++++++++++++++++++++*/
/* CSpoiler CWeb - Plugi     */
/* Version: 0.0.0            */
/* Rev: 0                    */
/* Credits: Michael Möhrle   */
/*+++++++++++++++++++++++++++*/

var CSpoiler = function() {
	
}
CSpoiler.createSpoiler = function(inhalt, title, Spoiler_ID) {
	var Spoiler = document.createElement("div") ;
	var Spoiler_Head = document.createElement("div") ;
	var Spoiler_Content = document.createElement("div") ;
	var Spoiler_Popup = document.createElement("div") ;
	
	Spoiler.setAttribute("id", Spoiler_ID) ;
	Spoiler_Head.setAttribute("id", Spoiler_ID + "_Head") ;
	Spoiler_Content.setAttribute("id", Spoiler_ID + "_Content") ;
	Spoiler_Popup.setAttribute("id", Spoiler_ID + "_Popup") ;
	
	cWeb(Spoiler_Head).innerText(title + "[+]") ;
	if (typeof inhalt == "string") {
		cWeb(Spoiler_Content).innerHTML(inhalt) ;
		cWeb(Spoiler_Popup).innerHTML(inhalt) ;
	}
	else {
		cWeb(Spoiler_Content).inner(inhalt) ;
		cWeb(Spoiler_Popup).inner(inhalt) ;
	}
	cWeb(Spoiler).append(Spoiler_Head) ;
	cWeb(Spoiler).append(Spoiler_Content) ;
	cWeb(Spoiler).append(Spoiler_Popup) ;
	return Spoiler ;
}

cWeb.fn = cWeb.extend(cWeb.fn, {
	appendSpoiler: function(Inhalt, Title, Group_ID, Opts) {
		var Spoiler_ID = 0 ;
		while(document.getElementById(Group_ID + "_" + Spoiler_ID)) {
			Spoiler_ID++ ;
		}
		if (!Opts) {
			Opts = {} ;
		}
		if (!Opts.isFixed) {
			Opts.width = "auto" ;
			Opts.height = "auto" ;
		}
		if (Opts.noBackground) {
			Opts.background = null ;
		}
		if (!Opts.background && !Opts.noBackground) {
			Opts.background = "gray" ;
		}
		
		if(!Opts.popupAnim) {
			Opts.popupAnim = {} ;
			Opts.popupAnim.text = "fade" ;
		}
		else {
			var text = Opts.popupAnim ;
			Opts.popupAnim = {} ;
			Opts.popupAnim.text = text ;
		}
		if (Opts.popupAnim.text == "fade") {
			Opts.popupAnim.inAnim = function(speed) {
				cWeb("#" + Group_ID + "_" + Spoiler_ID + "_Popup").fadeIn(speed) ;
			}
			Opts.popupAnim.outAnim = function(speed) {
				cWeb("#" + Group_ID + "_" + Spoiler_ID + "_Popup").fadeOut(speed) ;
			}
		}
		else if (Opts.popupAnim.text == "slide") {
			Opts.popupAnim.inAnim = function(speed) {
				cWeb("#" + Group_ID + "_" + Spoiler_ID + "_Popup").slideDown(speed) ;
			}
			Opts.popupAnim.outAnim = function(speed) {
				cWeb("#" + Group_ID + "_" + Spoiler_ID + "_Popup").slideUp(speed) ;
			}
		}
		else if (Opts.popupAnim.text == "show") {
			Opts.popupAnim.inAnim = function(speed) {
				cWeb("#" + Group_ID + "_" + Spoiler_ID + "_Popup").show(speed) ;
			}
			Opts.popupAnim.outAnim = function(speed) {
				cWeb("#" + Group_ID + "_" + Spoiler_ID + "_Popup").hide(speed) ;
			}
		}
		else {
			Opts.popupAnim.inAnim = function(speed) {
				cWeb("#" + Group_ID + "_" + Spoiler_ID + "_Popup").fadeIn(speed) ;
			}
			Opts.popupAnim.outAnim = function(speed) {
				cWeb("#" + Group_ID + "_" + Spoiler_ID + "_Popup").fadeOut(speed) ;
			}
		}
		function MouseOverFunc(event) {
			Opts.popupAnim.inAnim("fast") ;
		}
		function MouseOutFunc(event, fast_hide) {
			if (!fast_hide) {
			setTimeout(Hide, 500) ;
			}
			else {
				Hide() ;
			}
			function Hide() {
				if (!cWeb("#" + Group_ID + "_" + Spoiler_ID + "_Popup")[0].isMouseOver) {
					Opts.popupAnim.outAnim("fast") ;
				}
			}
		}
		if(!Opts.ClassName) {
			ClassName = "" ;
		}
		if (!Opts.PopupClassName) {
			PopupClassName = "" ;
		}
		cWeb(this).append(CSpoiler.createSpoiler(Inhalt, Title, Group_ID + "_" + Spoiler_ID)) ;
		cWeb("#" + Group_ID + "_" + Spoiler_ID + "_Content").slideUp("instant") ;
		if (Opts.popupAnim.text == "slide") {
		cWeb("#" + Group_ID + "_" + Spoiler_ID + "_Popup").slideUp("instant").css("border-style", "double").addClass(Opts.PopupClassName) ;
		}
		else if (Opts.popupAnim.text == "show" && !Opts.isFixed) {
		cWeb("#" + Group_ID + "_" + Spoiler_ID + "_Popup").hide("instant").css("border-style", "double").addClass(Opts.PopupClassName) ;
		}
		else {
					cWeb("#" + Group_ID + "_" + Spoiler_ID + "_Popup").fadeOut("instant").css("border-style", "double").addClass(Opts.PopupClassName) ;

		}
		cWeb("#" + Group_ID + "_" + Spoiler_ID).addClass(Opts.ClassName).css("borderStyle", "double") ;
		cWeb("#" + Group_ID + "_" + Spoiler_ID + "_Popup").css("position", "absolute").css({width: Opts.width, height: Opts.height}).css("background-color", Opts.background).hover(function(event){
			return true ;
			}, function(event) {
			MouseOutFunc(event, 1) ;
		}) ;
		Opts.popupAnim.outAnim("instant") ;
		cWeb("#" + Group_ID + "_" + Spoiler_ID + "_Head").css("borderStyle", "double").toggle(function() {
			cWeb("#" + Group_ID + "_" + Spoiler_ID + "_Content").slideDown("fast") ;
			cWeb("#" + Group_ID + "_" + Spoiler_ID + "_Head").innerText(Title + "[-]") ;
			cWeb("#" + Group_ID + "_" + Spoiler_ID + "_Head").unbindEvent("mouseover", MouseOverFunc) ;
			MouseOutFunc(event, 1) ;
		}, function() {
			cWeb("#" + Group_ID + "_" + Spoiler_ID + "_Content").slideUp("fast") ;
			cWeb("#" + Group_ID + "_" + Spoiler_ID + "_Head").innerText(Title + "[+]") ;
			cWeb("#" + Group_ID + "_" + Spoiler_ID + "_Head").bindEvent("mouseover", MouseOverFunc) ;
		}) ;
		
		cWeb("#" + Group_ID + "_" + Spoiler_ID + "_Head").hover(MouseOverFunc, MouseOutFunc) ;
		return this ;
	}
}) ;