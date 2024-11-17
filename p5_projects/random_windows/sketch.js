const GAP = 5;
const SIZE = 25;
const COLORS = [
  "blue",
  "orange",
  "green",
  "yellow",
  "red",
  "purple",
  "pink",
  "brown",
  "white",
  "gray",
  "cyan",
  "magenta",
  "lime",
  "teal",
  "indigo",
  "violet",
  "turquoise",
  "beige",
  "maroon",
  "navy",
  "gold",
  "silver",
  "lavender",
  "peach",
  "apricot",
  "mint",
  "coral",
  "salmon",
  "chocolate",
  "tan",
  "plum",
  "orchid",
  "amber",
  "olive",
  "khaki",
  "rose",
  "crimson",
  "azure",
  "cerulean",
  "chartreuse",
  "sapphire",
  "emerald",
  "ruby",
  "fuchsia",
  "bronze",
  "copper",
  "jade",
  "scarlet",
  "amethyst",
  "periwinkle",
  "mulberry",
  "charcoal",
  "sand",
  "denim",
  "clay",
  "cherry",
  "pine",
  "mustard",
  "burgundy",
  "auburn",
  "sienna",
  "caramel",
  "pearl",
  "brass",
  "ochre",
  "ruby",
  "terracotta",
];
const updateInterval = 3000; // Update every n milliseconds
let lastUpdateTime = 0;
let winds = [];
let colorCounter = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  let xPointer = 0;

  while (xPointer < windowWidth) {
    let yPointer = 0;
    while (yPointer < windowHeight) {
      winds.push(new Window(xPointer, yPointer, "#393434"));
      yPointer += 2 * SIZE + GAP * 3;
    }
    xPointer += 2 * SIZE + GAP * 3;
  }

  winds.forEach((window) => {
    window.display();
  });
}

function draw() {
  background("black");
  winds.forEach((window) => {
    window.display();
  });

  if (millis() - lastUpdateTime > updateInterval) {
    colorCounter++;
    let randomWindow = Math.floor(Math.random() * winds.length);

    winds[randomWindow].updateColor(COLORS[colorCounter % COLORS.length]);
    winds[randomWindow].addPerson();
  }
}

class Window {
  constructor(x, y, color = "orange") {
    this.x = x;
    this.y = y;
    this.color = color;
    this.hasPerson = false;
  }

  display() {
    fill(this.color);
    stroke(0, 100);
    strokeWeight(3);

    for (let i = 0; i < 4; i++) {
      square(
        (i % 2) * SIZE + this.x,
        Math.floor(i / 2) * SIZE + this.y,
        SIZE - GAP
      );
    }
    if (this.hasPerson) {
      fill("#393434");
      ellipse(this.x + SIZE + 10, this.y + SIZE, 15, 20);
      ellipse(this.x + SIZE + 10, this.y + 20 + SIZE, 15, 20);
    }
  }
  updateColor(color) {
    this.color = color;
  }
  addPerson() {
    this.hasPerson = true;
  }
}
