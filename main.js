song="";
scoreleftwrist=0;
scorerightwrist=0;
function preload()
{
    song=loadSound("music.mp3")
}

function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video,modelloaded);
    posenet.on('pose',gotposes)
}
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
function gotposes(results)
{


 leftwristx=results[0].pose.leftWrist.x;
 leftwristy=results[0].pose.leftWrist.y;
 scoreleftwrist=results[0].pose.keypoints[9].score;

 rightwristx=results[0].pose.rightWrist.x;
 rightwristy=results[0].pose.rightWrist.y;

 console.log("leftwristx ="+leftwristx+" and leftwristy="+leftwristy);
 console.log("rightwristx ="+rightwristx+" and rightwristy="+rightwristy);
}

function draw()
{
    image(video,0,0,600,500);
    fill("#ff0000");
    stroke("#ff0000");

    if(scoreleftwrist>0.2)
    {
        circle(leftwristx,leftwristy,20);
        innumberleftwristy=Number(leftwristy);
        remove_decimals=floor(innumberleftwristy);
        volume=remove_decimals/500;
        document.getElementById("volume").innerhtml="volume="+volume;
        song.setVolume(volume);
        console.log("hi")
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelloaded()
{
    console.log("model is loaded");
}

