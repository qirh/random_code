const RUNNER_COUNT = 8;
const runners = [];
const runnerImgs = [];
let isMousePressed = false;

function preload() {
    for (let i = 0; i < RUNNER_COUNT; i++) {
        runnerImgs[i] = loadImage('https://github.com/qirh/random_code/blob/main/turkey_trot/assets/runner_' + i + '.png');
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    updateCursor();

    for (let i = 0; i < RUNNER_COUNT; i++) {
        let r = new Runner(0, i / RUNNER_COUNT * windowHeight, random(2, 4), runnerImgs[i]);
        runners.push(r);
    }
}

function draw() {
    background(255);
    const mouse = createVector(mouseX, mouseY);

    runners.forEach((runner) => {
        if (isMousePressed) {
            runner.arrive(mouse);
            runner.update();
        }
        runner.show();
    });
}

function mousePressed() {
    isMousePressed = !isMousePressed;
    updateCursor();
}

function updateCursor() {
    cursor(isMousePressed ? 'https://github.com/qirh/random_code/blob/main/turkey_trot/assets/stop.png' : 'https://github.com/qirh/random_code/blob/main/turkey_trot/assets/finish.png');
}
