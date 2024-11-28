const RUNNER_COUNT = 8;
let runners = [];
let isMousePressed = false;
let runnerImgs = [];

function preload() {
    for (let i = 0; i < RUNNER_COUNT; i++) {
        runnerImgs[i] = loadImage('/assets/runner_' + i + '.png');
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    cursor('/assets/stop.png');

    for (let i = 0; i < RUNNER_COUNT; i++) {
        let r = new Runner(0, i / RUNNER_COUNT * windowHeight, random(2, 4), runnerImgs[i]);
        runners.push(r);
    }

    circle(windowWidth / 2, windowHeight / 2, 20);
}

function draw() {
    background(255);
    let mouse = createVector(mouseX, mouseY);

    fill(127);
    stroke(0);
    strokeWeight(2);

    if (isMousePressed) {
        for (let runner of runners) {
            runner.arrive(mouse);
            runner.update();
            runner.show();
        }
    } else {
        for (let runner of runners) {
            runner.show();
        }
    }
}

function mousePressed() {
    if (isMousePressed) {
        cursor('/assets/stop.png');
    } else {
        cursor('/assets/finish.png');
    }
    isMousePressed = !isMousePressed;
}
