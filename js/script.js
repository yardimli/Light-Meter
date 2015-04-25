
function updateConnectText(newtext) {
	$("#ConnectButtonText").html(" "+newtext);
}

function updateDataText(newtext) {
	$("#luxreading").html(" "+newtext);
}


$(document).ready( function() 
{
//	alert(screen.width+" "+screen.height);

	$("#SelectBLEDevice").on('click', function ()
	{
		Android.OpenBLEDialog2();
	});
});