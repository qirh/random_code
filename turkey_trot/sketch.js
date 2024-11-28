const VEHICLE_COUNT = 10;
let vehicles = [];
let isMousePressed = false;

function setup() {
    createCanvas(windowWidth, windowHeight);

    for (let i = 0; i < VEHICLE_COUNT; i++) {
        let v = new Vehicle(0, i / VEHICLE_COUNT * windowHeight, 2.5 + random());
        vehicles.push(v);
    }

    circle(windowWidth / 2, windowHeight / 2, 20);
}

function draw() {
    background(255);
    let mouse = createVector(mouseX, mouseY);

    fill(127);
    stroke(0);
    strokeWeight(2);
    circle(mouse.x, mouse.y, 20);

    if (isMousePressed) {
        for (let vehicle of vehicles) {
            vehicle.arrive(mouse);
            vehicle.update();
            vehicle.show();
        }
    } else {
        for (let vehicle of vehicles) {
            vehicle.show();
        }
    }
}

function mousePressed() {
    isMousePressed = !isMousePressed;
}
