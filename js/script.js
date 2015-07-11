//http://photo.stackexchange.com/questions/35089/how-can-i-measure-luminance-values-from-different-cameras
//http://www.sekonic.com/support/evluxfootcandleconversionchart.aspx
//http://www.calculator.org/calculate-online/photography/exposure.aspx
//
//http://www.fredparker.com/ultexp1.htm
//http://www.scantips.com/lights/fstop.html
//http://home.earthlink.net/~kitathome/LunarLight/moonlight_gallery/technique/LightAndCamera.htm
//http://en.wikipedia.org/wiki/Exposure_value#EV_as_a_measure_of_luminance_and_illuminance
//http://www.calculator.org/calculate-online/photography/exposure.aspx
//http://www.fredparker.com/ultexp1.htm


function round(value, exp) {
  if (typeof exp === 'undefined' || +exp === 0)
    return Math.round(value);

  value = +value;
  exp  = +exp;

  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
    return NaN;

  // Shift
  value = value.toString().split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
}



////--------------

var ApertureValues = [0.7,0.8,0.9, 1.0,1.1,1.2, 1.4,1.6,1.8, 2,2.2,2.5, 2.8,3.2,3.5, 4,4.5,5.0, 5.6,6.3,7.1, 8,9,10, 11,13,14, 16,18,20, 22];
var ApertureIndex = 6;

var currentEv = "?";
var prevEvValue = "?";
var Lux = [1.25, 1.75, 2.5, 3.5, 5, 7, 10, 14, 20, 28, 40, 56, 80, 112, 160, 225, 320, 450, 640, 900, 1280, 1800, 2600, 3600, 5120, 7200, 10240, 14400, 20480, 28900, 40960, 57800, 81900, 116000, 164000, 232000, 328000, 464000, 656000 ];


var IsoValues =       [6,8,10,        12,16,20,       25,32,40,       50,64,80,       100,125,160, 200,250,320, 400,500,640, 800,1000,1280, 1600,2000,2500,  3200,4000,5000,  6400 ];
var IsoEvCorrection = [-4,-3.67,3.33, -3,-2.67,-2.33, -2,-1.67,-1.33, -1,-0.67,-0.33, 0,0.33,0.67, 1,1.33,1.67, 2,2.33,2.67, 3,3.33,3.67,   4,4.33,4.67,     5,5.33,5.67,     6];

var Ev =              [-1,-0.67, -0.5,-0.33, 0,0.33,  0.5,0.67, 1,1.33, 1.5,1.67, 2,2.33, 2.5,2.67, 3,3.5,  4,4.5, 5,5.5, 6,6.5,7, 7.5,8,8.5,       9,9.5,10, 10.5, 11, 11.5, , 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18];

var IsoIndex = 2;

// if minus then it is seconds else it is fractions 1/n
var SpeedValues = [-30,-25,-20 ,-15,-13,-10, -8,-6,-5, -4,-3,-2.5, -2,-1.6,-1.3, -1,1.3,1.6, 2,2.5,3, 4,5,6, 8,10,13, 15,20,25, 30,40,50, 60,80,100, 125,160,200, 250,320,400, 500,640,800, 1000,1250,1600,  2000,2500,3200,  4000,5000,6400, 8000];
var SpeedIndex = 0;



/*

EV = log2(E * S / C) 

E = lux
S = iso
C = constant 

adjustedEV = log2(lux * iso100 / C) + log2( iso /100)

----
LV = log2 (f-number^2 / shutter speed / ISO/100)
LV:
1

hemispherical receptor with C = 330
flat receptor with C = 250
--------------------------------- 
N2/t = (E * S) / C 

EV = log2( apperture2 / t) 

N is the relative aperture (f-number)
t is the exposure time (“shutter speed”) in seconds
L is the average scene luminance
S is the ISO arithmetic speed
K is the reflected-light meter calibration constant

 */



var Ev2 = round( Math.log2( (250 * 100) / 250 ) + Math.log2( 100/100) , 2);
console.log( Ev2 );




var Iso100 = 100;
var CConstant = 125;
var CurrentLux = 77;
var adjustedEV = 0;

var swiperspeed;
var swiperiso;
var swiperaperture;



/*
j=0;
Ev.forEach( function(EvValue) { 
    console.log(EvValue+" = "+Lux[j]);
    j++;
});
*/

/*
SpeedValues.forEach( function(ShutterSpeed) { 
	
	if (ShutterSpeed<0) { ShutterSpeed = ShutterSpeed*(-1); } else { ShutterSpeed = 1/ShutterSpeed; }

    var outputStr = "ShutterSpeed:"+ShutterSpeed+" -- ";
    
    ApertureValues.forEach( function(Apperture) { 
        outputStr += "Ap:" + (Math.round(Apperture*100,2)/100) + "  EV:" + (Math.round( Math.log2(Math.pow(Apperture,2) / ShutterSpeed )*100 ,2 ) /100) + ", ";
    });
    
//    console.log(outputStr);
});

IsoIndex=4;
for (var ApertureLIndex = 0;  ApertureLIndex < ApertureValues.length; ApertureLIndex++)
{
    var SpeedStr = "";
    for (var EvLIndex=-1; EvLIndex<21; EvLIndex++)
    {
        // Index 9 of SpeedValues = 4 sec
        SpeedStr += "EV:"+(EvLIndex+IsoEvCorrection[IsoIndex])+" S:"+ SpeedValues[9-(ApertureLIndex-1)+(EvLIndex)] + ", ";
    }
//    console.log("Aperture: "+ApertureLIndex+" "+ApertureValues[ApertureLIndex]+" == "+SpeedStr);
}    
*/

console.log("--------------");

function evToLux(ev) {
    return pow(2, ev) * 2.5;
}








//-------------------------------------------------------------------------------------------------------------------------------------------------
function DecideISO( ApertureVal, SpeedVal, UpdateDisplay )
{
	
}

//-------------------------------------------------------------------------------------------------------------------------------------------------
function DecideAperture( SpeedIndexX,UpdateDisplay )
{
	var FoundApertureIndex =-1;
	var PrevApertureIndex = 0;
	
	var SpeedValue = SpeedValues[SpeedIndexX];
	if (SpeedValue<0) { SpeedValue = SpeedValue*(-1); } else { SpeedValue = 1/SpeedValue; }
	
	for (var i=0; i<ApertureValues.length; i++)
	{
		var Ev3 = Math.log2( Math.pow(ApertureValues[i],2) / SpeedValue );
		
		if (Ev3>adjustedEV) {
			FoundApertureIndex = PrevApertureIndex;
			break;
		}
		PrevApertureIndex = i;
		console.log(SpeedValue+" "+Ev3+" "+ApertureValues[i]);
	}
	
	if ((FoundApertureIndex>=0) && (UpdateDisplay))
	{
		console.log("Found Index: "+FoundApertureIndex);
		ApertureIndex = FoundApertureIndex;
		swiperaperture.slideTo(ApertureIndex, 500);
		
	}
	
	return FoundApertureIndex;
}

//-------------------------------------------------------------------------------------------------------------------------------------------------
function DecideSpeed( ApertureIndexX,UpdateDisplay )
{
	var FoundSpeedIndex =-1;
	var PrevSpeedIndex = 0;
	var ApertureVal = ApertureValues[ApertureIndexX];
	for (var i=0; i<SpeedValues.length; i++)
	{
		var SpeedValue = SpeedValues[i];
		if (SpeedValue<0) { SpeedValue = SpeedValue*(-1); } else { SpeedValue = 1/SpeedValue; }
		var Ev3 = Math.log2( Math.pow(ApertureVal,2) / SpeedValue );
		
		if (Ev3>adjustedEV) {
			FoundSpeedIndex = PrevSpeedIndex;
			break;
		}
		PrevSpeedIndex = i;
//		console.log(ApertureVal+" "+Ev3+" "+SpeedValues[i]);
	}
	
	if ((FoundSpeedIndex>=0) && (UpdateDisplay))
	{
		SpeedIndex = FoundSpeedIndex;
		swiperspeed.slideTo(SpeedIndex, 500);
	}
	
	return FoundSpeedIndex;
}


//-------------------------------------------------------------------------------------------------------------------------------------------------
function updateConnectText(newtext) {
	$("#ConnectButtonText").html(" "+newtext);
}


//-------------------------------------------------------------------------------------------------------------------------------------------------
function UpdateEV()
{
	adjustedEV = round( Math.log2(CurrentLux * Iso100 / CConstant) + Math.log2( IsoValues[IsoIndex] /100) , 2);
	$("#evvalue").html(adjustedEV);
	
}

//--------------------------------
function updateDataText(newtext) {
	newtext = newtext.substr(1);
//	$("#debugdata").html(" "+newtext);
	
	var MeterData = JSON.parse(newtext);
	
	$("#kelvinreading").html(MeterData["Color Temp."]);
	$("#luxreading").html(MeterData["Lux"]);
	
	CurrentLux = parseInt( MeterData["Lux"], 10);
	UpdateEV();
}


//-------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------
$(document).ready( function() 
{
//	alert(screen.width+" "+screen.height);

	setTimeout(function () { 
		updateDataText(" {\"Color Temp.\":5500, \"Lux\":77} "); 
	},500);
			
	setTimeout(function () { 
		DecideSpeed(ApertureIndex,true);
	},2000);

	var flagBLE = false;
	$("#SelectBLEDevice").on('touchstart click', function ()
	{
		if (!flagBLE) {
			flagBLE = true;
			setTimeout(function(){ flagBLE = false; }, 250);
			Android.OpenBLEDialog2();
		}
	});
	

	//------------ ISO Stuff

	for (var i=0; i< IsoValues.length; i++)
	{
		if (IsoValues[i]==100) { IsoIndex=i;}
		$("#iso-swiper-wrapper").append("<div class=\"swiper-slide\">" + IsoValues[i] + "</div>");
	}
	
	var flagISO = false;
	$("#isoButton").on('touchstart click', function () {
		
		if (!flagISO) {
			flagISO = true;
			setTimeout(function(){ flagISO = false; }, 250);

			$("#aperture-container").removeClass("lock-this");
			$("#speed-container").removeClass("lock-this");

			if ($("#iso-container").hasClass("lock-this")) {
				$("#iso-container").removeClass("lock-this");
			} else
			{
				$("#iso-container").addClass("lock-this");
			}

		}
	});
	
	
	swiperiso = new Swiper('#iso-swiper-container', {
		initialSlide: IsoIndex,
		spaceBetween: 50,
		slidesPerView: 1,
		centeredSlides: true,
		slideToClickedSlide: true,
		grabCursor: true,
		nextButton: null,
		prevButton: null,
		scrollbar: null,
		scrollbarHide : true,
	});

	swiperiso.on('slideChangeEnd', function () {
		IsoIndex=swiperiso.activeIndex;
		UpdateEV();
		DecideSpeed(ApertureIndex,true);
	});	

		
		
		


	
	//------------ shutter speed Stuff
	for (var i=0; i< SpeedValues.length; i++)
	{
		if (SpeedValues[i]==125) { SpeedIndex=i;}
		
//						   <div class="swiper-slide"><span style="font-size:25px; vertical-align: super;">1</span>/500</div>
		if (SpeedValues[i]<0) { 
                        if (SpeedValues[i]<=-60)
                        {
                            $("#speed-swiper-wrapper").append("<div class=\"swiper-slide\">" + (SpeedValues[i]*(-1)/60) + "</div>");
                        } else
                        {
                            $("#speed-swiper-wrapper").append("<div class=\"swiper-slide\">" + (SpeedValues[i]*(-1)) + "</div>");
                        }
		} else
		{
			$("#speed-swiper-wrapper").append("<div class=\"swiper-slide\"><span style=\"font-size:25px; vertical-align: super;\">1</span>/"+SpeedValues[i]+"</div>");
		}
	}
	
	var flagspeed = false;
	$("#speedButton").on('touchstart click', function () {
		
		if (!flagspeed) {
			flagspeed = true;
			setTimeout(function(){ flagspeed = false; }, 250);

			$("#iso-container").removeClass("lock-this");
			$("#aperture-container").removeClass("lock-this");

			if ($("#speed-container").hasClass("lock-this")) {
				$("#speed-container").removeClass("lock-this");
			} else
			{
				$("#speed-container").addClass("lock-this");
			}
		}
	});
	
	
    swiperspeed = new Swiper('#speed-swiper-container', {
			initialSlide: SpeedIndex,
            spaceBetween: 50,
            slidesPerView: 1,
            centeredSlides: true,
            slideToClickedSlide: true,
            grabCursor: true,
            nextButton: null,
            prevButton: null,
            scrollbar: null,
			scrollbarHide : true,
        });	
	
	swiperspeed.on('slideChangeEnd', function () {
		SpeedIndex=swiperspeed.activeIndex;
		if ( SpeedValues[SpeedIndex]<=-60 ) {
			$("#funit").html("min");
		} else
		{
			$("#funit").html("sec");
		}
		DecideAperture(SpeedIndex,true);
		
//		$("#evvalue").html(currentEv+IsoEvCorrection[IsoIndex]);
	});	

	
	//------------ aperture Stuff
	for (var i=0; i< ApertureValues.length; i++)
	{
		if (ApertureValues[i]==4) { ApertureIndex=i;}
		$("#aperture-swiper-wrapper").append("<div class=\"swiper-slide\">" + ApertureValues[i] + "</div>");
	}
	
	var flagaperture = false;
	$("#apertureButton").on('touchstart click', function () {
		
		if (!flagaperture) {
			flagaperture = true;
			setTimeout(function(){ flagaperture = false; }, 250);

			$("#iso-container").removeClass("lock-this");
			$("#speed-container").removeClass("lock-this");

			if ($("#aperture-container").hasClass("lock-this")) {
				$("#aperture-container").removeClass("lock-this");
			} else
			{
				$("#aperture-container").addClass("lock-this");
			}
		}
	});
	
	
    swiperaperture = new Swiper('#aperture-swiper-container', {
			initialSlide: ApertureIndex,
            spaceBetween: 50,
            slidesPerView: 1,
            centeredSlides: true,
            slideToClickedSlide: true,
            grabCursor: true,
            nextButton: null,
            prevButton: null,
            scrollbar: null,
			scrollbarHide : true,
        });	
		
	swiperaperture.on('slideChangeEnd', function () {
		ApertureIndex=swiperaperture.activeIndex;
		DecideSpeed(ApertureIndex,true);
	});	
	
		
});