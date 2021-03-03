status = "";
list_of_objects = [];
song = '';

function preload() {
    song = loadSound('song.mp3');
}

function setup() {
    canvas = createCanvas(380, 380); //Code to create a canvas
    canvas.center(); //this is to center the canvas
    video = createCapture(VIDEO);
    video.hide();
    //console.log(list_of_objects);
    objectDetector = ml5.objectDetector("cocossd", modelLoaded); //this is to call the function and the cocossd in a variable
    // document.getElementById("status").innerHTML = "Status : Detecting Objects"; //this is used to Show the status Detecting in a label
    document.getElementById("baby").innerHTML = "Status : Detecting People";
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(video, gotResult);
}


function draw() {
    image(video, 0, 0, 640, 420); //this is to identify that img is the webcam/main picture


    if (status != "") {
        // r = random(255);
        // g = random(255);
        // b = random(255);
        objectDetector.detect(video, gotResult);
     
        for (var i = 0; i < list_of_objects.length; i++) {

            if (list_of_objects.length<=1 && list_of_objects[i].label=="person"){
                song.stop();
                document.getElementById("baby").innerHTML = "Status : People Detected";

            } else {
                song.play();
                song.loop(); 
            }
   
            // document.getElementById("status").innerHTML = "Status : Object Detected";
            // document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+list_of_objects.length;

            fill("#FF0000");
            percent = floor(list_of_objects[i].confidence * 100);
            text(list_of_objects[i].label + " " + percent + "%", list_of_objects[i].x + 15, list_of_objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(list_of_objects[i].x, list_of_objects[i].y, list_of_objects[i].width, list_of_objects[i].height);
        }
    }
}


function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
    console.log(results);
    list_of_objects = results;
    console.log("---"+list_of_objects);
}}