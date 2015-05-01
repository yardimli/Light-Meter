//http://photo.stackexchange.com/questions/35089/how-can-i-measure-luminance-values-from-different-cameras
//http://www.sekonic.com/support/evluxfootcandleconversionchart.aspx
//http://www.calculator.org/calculate-online/photography/exposure.aspx



var AperatureValuesOld = [1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22, 32];
var AperatureIndexOld = 0;

var EvOld = [-1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, , 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18];
var currentEvOld = "?";
var prevEvValueOld = "?";

//http://www.fredparker.com/ultexp1.htm
var IsoValuesOld = [25,50,100,200,400,800,1600,3200,6400];
var IsoEvCorrectionOld = [2,1,0,-1,-2,-3,-4,-5,-6];
var IsoIndexOld = 2;

var SpeedValuesOld = [-1920,-960,-480,-240,-120,-60,-30,-15,-8,-4,-2,-1, 2, 4, 8, 15, 30, 60, 125, 250, 500, 1000, 2000, 4000, 8000, 15000, 30000, 60000, 125000, 250000, 500000, 1000000 ];
var SpeedIndexOld = 0;
// Index 9 of SpeedValues = 4 sec
// Index 15 of SpeedValues = 1/15 sec


////--------------

var AperatureValues = [0.7,0.8,0.9, 1.0,1.1,1.2, 1.4,1.6,1.8, 2,2.2,2.5, 2.8,3.2,3.5, 4,4.5,5.0, 5.6,6.3,7.1, 8,9,10, 11,13,14, 16,18,20, 22];
var AperatureIndex = 6;

var currentEv = "?";
var prevEvValue = "?";
var Lux = [1.25, 1.75, 2.5, 3.5, 5, 7, 10, 14, 20, 28, 40, 56, 80, 112, 160, 225, 320, 450, 640, 900, 1280, 1800, 2600, 3600, 5120, 7200, 10240, 14400, 20480, 28900, 40960, 57800, 81900, 116000, 164000, 232000, 328000, 464000, 656000 ];

//http://www.fredparker.com/ultexp1.htm

var IsoValues =       [6,8,10,        12,16,20,       25,32,40,       50,64,80,       100,125,160, 200,250,320, 400,500,640, 800,1000,1280, 1600,2000,2500,  3200,4000,5000,  6400 ];
var IsoEvCorrection = [-4,-3.67,3.33, -3,-2.67,-2.33, -2,-1.67,-1.33, -1,-0.67,-0.33, 0,0.33,0.67, 1,1.33,1.67, 2,2.33,2.67, 3,3.33,3.67,   4,4.33,4.67,     5,5.33,5.67,     6];

var Ev =              [-1,-0.67, -0.5,-0.33, 0,0.33,  0.5,0.67, 1,1.33, 1.5,1.67, 2,2.33, 2.5,2.67, 3,3.5,  4,4.5, 5,5.5, 6,6.5,7, 7.5,8,8.5,       9,9.5,10, 10.5, 11, 11.5, , 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18];

var IsoIndex = 2;

// if minus then it is seconds else it is fractions 1/n
var SpeedValues = [-30,-25,-20 ,-15,-13,-10, -8,-6,-5, -4,-3,-2.5, -2,-1.6,-1.3, -1,1.3,1.6, 2,2.5,3, 4,5,6, 8,10,13, 15,20,25, 30,40,50, 60,80,100, 125,160,200, 250,320,400, 500,640,800, 1000,1250,1600,  2000,2500,3200,  4000,5000,6400, 8000];
var SpeedIndex = 0;










/*
j=0;
Ev.forEach( function(EvValue) { 
    console.log(EvValue+" = "+Lux[j]);
    j++;
});
*/


SpeedValues.forEach( function(ShutterSpeed) { 
	
	if (ShutterSpeed<0) { ShutterSpeed = ShutterSpeed*(-1); } else { ShutterSpeed = 1/ShutterSpeed; }

    var outputStr = "ShutterSpeed:"+ShutterSpeed+" -- ";
    
    AperatureValues.forEach( function(Apperature) { 
        outputStr += "Ap:" + (Math.round(Apperature*100,2)/100) + "  EV:" + (Math.round( Math.log2(Math.pow(Apperature,2) / ShutterSpeed )*100 ,2 ) /100) + ", ";
    });
    
    console.log(outputStr);
});

IsoIndex=4;
for (var AperatureLIndex = 0;  AperatureLIndex < AperatureValues.length; AperatureLIndex++)
{
    var SpeedStr = "";
    for (var EvLIndex=-1; EvLIndex<21; EvLIndex++)
    {
        // Index 9 of SpeedValues = 4 sec
        SpeedStr += "EV:"+(EvLIndex+IsoEvCorrection[IsoIndex])+" S:"+ SpeedValues[9-(AperatureLIndex-1)+(EvLIndex)] + ", ";
    }
    console.log("Aperature: "+AperatureLIndex+" "+AperatureValues[AperatureLIndex]+" == "+SpeedStr);
}    


console.log("--------------");

function evToLux(ev) {
    return pow(2, ev) * 2.5;
}


function FindAperature( EvLIndex, IsoLIndex, SpeedLIndex )
{
    for (var AperatureLIndex = 0;  AperatureLIndex < AperatureValues.length; AperatureLIndex++)
    {
        var SpeedStr = "";
        // Index 9 of SpeedValues = 4 sec
        SpeedStr += "EV:"+(EvLIndex+IsoEvCorrection[IsoLIndex])+" S:"+ SpeedValues[9-(AperatureLIndex-1)+(EvLIndex)] + ", ";
        
        console.log("Aperature: "+AperatureLIndex+" "+AperatureValues[AperatureLIndex]+" == "+SpeedStr);
    }    
}

//ISO 100, EV: 4.5, Speed: 1/15
FindAperature( 11, 2, 15 );

function FindSpeed( EvLIndex,  AperatureLIndex)
{
    
}







function updateConnectText(newtext) {
	$("#ConnectButtonText").html(" "+newtext);
}

function updateDataText(newtext) {
	newtext = newtext.substr(1);
//	$("#debugdata").html(" "+newtext);
	
	var MeterData = JSON.parse(newtext);
	
	$("#kelvinreading").html(MeterData["Color Temp."]);
	$("#luxreading").html(MeterData["Lux"]);
	
	LuxInt = parseInt( MeterData["Lux"], 10);
	
	j=0;
	currentEv = "?";
	prevEvValue = "?";
	Ev.forEach( function(EvValue) { 
		if ( (Lux[j]>LuxInt) && (currentEv=="?") ) { currentEv = prevEvValue; }
		prevEvValue = EvValue;
//		console.log(EvValue+" = "+Lux[j]);
		j++;
	});
	
	$("#evvalue").html(currentEv+IsoEvCorrection[IsoIndex]);
	
	
	
	
	
}


$(document).ready( function() 
{
//	alert(screen.width+" "+screen.height);

	setTimeout(function () { updateDataText(" {\"Color Temp.\":5500, \"Lux\":250} "); },500);
			

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
	var iso100number = 0;
	
	for (var i=0; i< IsoValues.length; i++)
	{
		if (IsoValues[i]==100) { iso100number=i;}
		$("#iso-swiper-wrapper").append("<div class=\"swiper-slide\">" + IsoValues[i] + "</div>");
	}
	
	var flagISO = false;
	$("#isoButton").on('touchstart click', function () {
		
		if (!flagISO) {
			flagISO = true;
			setTimeout(function(){ flagISO = false; }, 250);

			$("#aperature-container").removeClass("lock-this");
			$("#speed-container").removeClass("lock-this");

			if ($("#iso-container").hasClass("lock-this")) {
				$("#iso-container").removeClass("lock-this");
			} else
			{
				$("#iso-container").addClass("lock-this");
			}

		}
	});
	
	
    var swiperiso = new Swiper('#iso-swiper-container', {
			initialSlide: iso100number,
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
                $("#evvalue").html(currentEv+IsoEvCorrection[IsoIndex]);
        });	

		
		
		
	//------------ aperture Stuff
	var aperturedefnumber = 0;
	
	for (var i=0; i< AperatureValues.length; i++)
	{
		if (AperatureValues[i]==4) { aperturedefnumber=i;}
		$("#aperture-swiper-wrapper").append("<div class=\"swiper-slide\">" + AperatureValues[i] + "</div>");
	}
	
	var flagaperture = false;
	$("#apertureButton").on('touchstart click', function () {
		
		if (!flagaperture) {
			flagaperture = true;
			setTimeout(function(){ flagaperture = false; }, 250);

			$("#iso-container").removeClass("lock-this");
			$("#speed-container").removeClass("lock-this");

			if ($("#aperature-container").hasClass("lock-this")) {
				$("#aperature-container").removeClass("lock-this");
			} else
			{
				$("#aperature-container").addClass("lock-this");
			}
		}
	});
	
	
    var swiperaperature = new Swiper('#aperature-swiper-container', {
			initialSlide: aperturedefnumber,
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
		
	swiperaperature.on('slideChangeEnd', function () {
		AperatureIndex=swiperaperature.activeIndex;
//		$("#evvalue").html(currentEv+IsoEvCorrection[IsoIndex]);
	});	


	
	//------------ shutter speed Stuff
	var speeddefnumber = 0;
	
	for (var i=0; i< SpeedValues.length; i++)
	{
		if (SpeedValues[i]==125) { speeddefnumber=i;}
		
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
			$("#aperature-container").removeClass("lock-this");

			if ($("#speed-container").hasClass("lock-this")) {
				$("#speed-container").removeClass("lock-this");
			} else
			{
				$("#speed-container").addClass("lock-this");
			}
		}
	});
	
	
    var swiperspeed = new Swiper('#speed-swiper-container', {
			initialSlide: speeddefnumber,
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
//		$("#evvalue").html(currentEv+IsoEvCorrection[IsoIndex]);
	});	
		
		
});