// JavaScript Document

// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
function onDeviceReady() {
    
    ResizeImage("Sample.jpg", 100, 100, ResizeFinished);

}


function ResizeFinished(dataUrl)
{
    console.log(dataUrl.length);
	document.getElementById('b').src = dataUrl;
}

function ResizeImage(image, maxWidth, maxHeight, onSuccess)
{
    var img = new Image();
	var canvas=document.getElementById("myCanvas");
	var ctx=canvas.getContext("2d");	
    var canvasCopy = document.createElement("canvas");
    var copyContext = canvasCopy.getContext("2d");

    img.onload = function()
    {
        var ratioX = maxWidth / img.width;
        var ratioY = maxHeight / img.height;
        var ratio;
        
        if (ratioX < ratioY)
            ratio = ratioX;
        else
            ratio = ratioY;
        
        canvasCopy.width = img.width;
        canvasCopy.height = img.height;
        copyContext.drawImage(img, 0, 0);

        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);
		onSuccess(canvas.toDataURL("image/jpg"));		
    };

    img.src = image;
}