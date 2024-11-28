const RUNNER_COUNT = 10;
let runners = [];
let isMousePressed = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    cursor('🏁');

    for (let i = 0; i < RUNNER_COUNT; i++) {
        let r = new Runner(0, i / RUNNER_COUNT * windowHeight, 2.5 + random());
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
        // cursor('https://avatars0.githubusercontent.com/u/1617169?s=16');
    } else {

        cursor('assets/finish.png');
    }
    isMousePressed = !isMousePressed;
}
