$(document).ready(function(){
	var game_start=0;
	var canvas = document.getElementById('playground');
	if (canvas.getContext){
		var ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, 1200, 1000);
		ctx.beginPath();
		ctx.arc(250,250,200,0,Math.PI*2,true); // Outer circle
		ctx.stroke();
		ctx.font="42px Verdana";
		var time_display="00:00";
		var time_display_width=ctx.measureText(time_display).width;
		ctx.fillText(time_display,(canvas.width/2) - (time_display_width / 2),250);
	}
	else
	{
		alert("Canvas Not Supported!");
	}
	function StartGame(){
		game_start=1;
		$(".start-btn").fadeOut(10);
		$("#humon").focus();
		Game();
	}
	$(".start-btn").click(StartGame);
	$(document).keyup(function(e){
		if(!game_start){
			if(e.which==72){
				StartGame();
			}
		}
	});
	function Game(){
	var StartTime = new Date().getTime();
	var time   = 0;
	var completed  = false;
	var canvas = document.getElementById('playground');	
	var CurrentTime=new Date().getTime();
	time=CurrentTime-StartTime;
	time=new Date().getTime();
	time-=StartTime;
	var seconds=(time/1000).toFixed();
	var minutes = String((seconds/60).toFixed());
	var seconds = String((seconds%60).toFixed());
	if(minutes.length<2){
		minutes="0"+minutes;
	}
	if (seconds.length<2)
	{
		seconds="0"+seconds;
	}
	time_text = minutes+":"+seconds;
	var engine=setInterval(function(){
		if(completed){
			clearInterval(engine);
		}
		else
		{
			CurrentTime=new Date().getTime();
			time=CurrentTime-StartTime;
			time=new Date().getTime();
			time-=StartTime;
			seconds=(time/1000).toFixed();
			minutes = String(Math.floor(seconds / 60));
			seconds = String(seconds - minutes * 60);
			if(minutes.length<2){
				minutes="0"+minutes;
			}
			if (seconds.length<2)
			{
				seconds="0"+seconds;
			}
			time_text = minutes+":"+seconds;
			var ctx = canvas.getContext('2d');
			ctx.clearRect(120, 200, 200, 100);
			ctx.font="42px Verdana";
			var time_display=String(time_text);
			var time_display_width=ctx.measureText(time_display).width;
			ctx.fillText(String(time_text),(canvas.width/2) - (time_display_width / 2),250);
		}
	},500);
	engine;
	var key = 'HUMON';
	var ukey = '';
	var display_key = '';
	var origin=[250,250];
	var radius=200;
	var deg=Math.PI;
	var x=origin[0]+Math.sin(deg)*radius-50;
	var y=origin[1]+Math.cos(deg)*radius-50;
	var check_point=Math.PI;
	var check_points=[Math.PI+2*Math.PI/3,Math.PI+4*Math.PI/3];
	var zone=1;
	var runner = document.getElementById("runner");
	var flag = document.getElementById("flag");
	if (canvas.getContext){
		var ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, 1200, 1000);
		ctx.beginPath();
		ctx.arc(250,250,200,0,Math.PI*2,true); // Outer circle
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(origin[0]+Math.sin(check_points[0])*radius,origin[0]+Math.cos(check_points[0])*radius,10,0,2*Math.PI,false);
		ctx.fillStyle='green';
		ctx.fill();
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(origin[0]+Math.sin(check_points[1])*radius,origin[0]+Math.cos(check_points[1])*radius,10,0,2*Math.PI,false);
		ctx.fillStyle='green';
		ctx.fill();
		ctx.stroke();
		ctx.drawImage(flag, 245, 0,50,50);
		ctx.drawImage(runner, x, y,100,100);
		ctx.clearRect(120, 200, 200, 100);
		ctx.font="42px Verdana";
		var time_display=String(time_text);
		var time_display_width=ctx.measureText(time_display).width;
		ctx.fillText(String(time_text),(canvas.width/2) - (time_display_width / 2),250);
		$("#humon").keydown(function(e) {
			if(!completed){
				if(e.which>64 && e.which<91){
					if(ukey.length<key.length){
						ukey+=String.fromCharCode(e.which);
						if (ukey==key)
						{
							console.log(ukey);
							deg+=0.4;
							ukey='';
						}
						if((ukey.length>1)&&(ukey!=key.substring(0,ukey.length))){
							deg=check_point;
							ukey='';
						}
					}
					else
					{
						console.log(ukey);
						if (ukey==key)
						{
							deg+=0.4;
						}
						else
						{
							deg=check_point;
						}
						ukey='';
					}
				}
				else if(e.which==13){deg+=0.4;}
				display_key='';
				for (i=0;i<ukey.length;i++)
				{
					display_key+=ukey[i]+' ';
				}
				for (i=0;i<(key.length-ukey.length);i++)
				{
					display_key+="- ";
				}
				$("#humon").val(display_key);
				if(deg>=(check_point+2*Math.PI/3)){
					check_point=check_point+2*Math.PI/3;
					zone+=1;
					if(zone==2){
						runner = document.getElementById("swim");
					}
					else if(zone==3){
						runner = document.getElementById("cycle");
					}
					else if(zone==4){
						completed=true;
					}
					console.log("Reached Check Point");
				}
				ctx.clearRect(0, 0, 1200, 1000);
				ctx.beginPath();
				ctx.arc(250,250,200,0,Math.PI*2,true); // Outer circle
				ctx.stroke();
				ctx.beginPath();
				ctx.arc(origin[0]+Math.sin(Math.PI)*radius,origin[0]+Math.cos(Math.PI)*radius,10,0,2*Math.PI,false);
				ctx.fillStyle='green';
				ctx.fill();
				ctx.stroke();
				ctx.beginPath();
				ctx.arc(origin[0]+Math.sin(check_points[0])*radius,origin[0]+Math.cos(check_points[0])*radius,10,0,2*Math.PI,false);
				ctx.fillStyle='green';
				ctx.fill();
				ctx.stroke();
				ctx.beginPath();
				ctx.arc(origin[0]+Math.sin(check_points[1])*radius,origin[0]+Math.cos(check_points[1])*radius,10,0,2*Math.PI,false);
				ctx.fillStyle='green';
				ctx.fill();
				ctx.stroke();
				ctx.drawImage(flag, 245, 0,50,50);
				x=origin[0]+Math.sin(deg)*radius-50;
				y=origin[1]+Math.cos(deg)*radius-50;
					ctx.save();
					ctx.translate(x+50,y+50);
					ctx.rotate(-deg+Math.PI);
					ctx.drawImage(runner,-50,-50,100,100);
					ctx.restore();
				//ctx.drawImage(runner, x, y,100,100);
				ctx.clearRect(120, 200, 200, 100);
				ctx.font="42px Verdana";
				if(completed){
					ctx.font="60px Verdana";
					ctx.fillStyle='red';
					var endmsg="Finished";
					ctx.fillText(endmsg,(canvas.width/2) - (ctx.measureText(endmsg).width/2),320);
				}
				var time_display=String(time_text);
				var time_display_width=ctx.measureText(time_display).width;
				ctx.fillText(String(time_text),(canvas.width/2) - (time_display_width / 2),250);
				e.preventDefault(); // prevent the default action (scroll / move caret)
			}
		});
	}
	else {
		alert("Canvas Not Supported! ");
	}
	}
});