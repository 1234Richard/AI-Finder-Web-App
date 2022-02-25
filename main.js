status = "";
objects = [];
var synth = window.speechSynthesis;
var utterThis = "";

function setup() {
    canvas = createCanvas(500, 450);
    canvas.position(500, );300
    video = createCapture(VIDEO);
    video.size(500, 450)
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object_name = document.getElementById("object_name").value;
}

function modelLoaded() {
    console.log("Model loaded!");
    status = true;
}

function draw() {
    image(video, 0, 0, 500, 450);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            percent = floor(objects[i].confidence * 100);          label = objects[i].label;
            x = objects[i].x;
            y = objects[i].y;
            width = objects[i].width;
            height = objects[i].height;
            stroke("#FF0000");
            fill("#FF0000");
            noFill();
            rect(x, y, width, height);
            text(label + " " + percent + "%", x - 15, y - 15);
            if (label == object_name) {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML = "Object mentioned found"
                utterThis = new SpeechSynthesisUtterance("Object mentioned found");
                synth.speak(utterThis);
            } else {
                document.getElementById("status").innerHTML = "Object mentioned not found";
            }
        }
    }
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    objects = results;
    console.log(objects);
}