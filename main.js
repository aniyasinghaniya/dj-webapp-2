 song=""

function preload(){
  song=loadSound("m.mp3")

}

scorerightW=0;
scoreleftW=0;

rightwristX=0;
rightwristY=0;

leftwristX=0;
leftwristY=0;


function setup(){
  canvas=createCanvas(400,300)
  canvas.center()
  webcam=createCapture(VIDEO)
  webcam.hide()

  poseNet=ml5.poseNet(webcam,modelLoaded);
  poseNet.on('pose',gotPoses)
}
function modelLoaded(){
 console.log("mode Loaded succesfully")
}

function gotPoses(result){
  if(result.length>0){
    console.log(result);
    scorerightW = result[0].pose.keypoints[10].score;
    scoreleftW= result[0].pose.keypoints[9].score;
  console.log("scorerightw="+scorerightW + "scoreleftw="+scoreleftW);

    rightwristX=result[0].pose.rightWrist.x;
    rightwristY=result[0].pose.rightWrist.y;
    console.log("rightwristX = "+rightwristX + "rightwristy = "+rightwristY);

    leftwristX=result[0].pose.leftWrist.x;
    leftwristY=result[0].pose.leftWrist.y;
  console.log("leftwristX= "+ leftwristX +"leftwristY=" + leftwristY);

    
  }
  
  
}

function draw(){
 image(webcam,0,0,400,300)
 fill("darkslategray");
 stroke("darkslategray")

 if(scorerightW >0){
  circle(rightwristX , rightwristY,20);
   
  if(rightwristY >0 && rightwristY<=100 ){
    document.getElementById("speed").innerHTML="speed=0.5x";
    song.rate(0.5);
  }
  else if(rightwristY >100 && rightwristY<=200 ){
    document.getElementById("speed").innerHTML="speed=1x";
    song.rate(1.0);
  }
    else if(rightwristY >200  && rightwristY<=300 ){
    document.getElementById("speed").innerHTML="speed=1.5x";
    song.rate(1.5);
  }
  else if(rightwristY >300  && rightwristY<=400 ){
    document.getElementById("speed").innerHTML="speed=2x";
    song.rate(2.0);
  }
  else if(rightwristY >400){
    document.getElementById("speed").innerHTML="speed=2.5x";
    song.rate(2.5);
  }
 }
 if(scoreleftW >0){
  circle(leftwristX,leftwristY,20);
  num=Number(leftwristY);
  remove_decimals=Math.floor(num);
  volume=remove_decimals/300;
 document.getElementById("volume").innerHTML ="volume"+volume;
 song.setVolume(volume);
 }

}

function play(){
  song.play();
  song.setVolume(1);
  song.rate(1);
}
