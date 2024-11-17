const GAP = 5;
const SIZE = 25;
let winds = [];
let counter = 0;
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
  let colors = [
    "blue",
    "orange",
    "green",
    "yellow",
    "red",
    "purple",
    "pink",
    "brown",
    "black",
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
  if (counter < 30) {
    counter++;
  }
  if (counter === 30) {
    colorCounter++;
    let randomSelection = Math.floor(Math.random() * winds.length);

    winds[randomSelection].updateColor(colors[colorCounter % colors.length]);
    winds[randomSelection].addPerson()
    counter = 0;
  }
}

function makeWindow(x, y, color = "orange") {
  for (let i = 0; i < 4; i++) {
    fill(color);
    stroke(0, 100);
    strokeWeight(3);
    square((i % 2) * SIZE + x, Math.floor(i / 2) * SIZE + y, SIZE - GAP);
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
    for (let i = 0; i < 4; i++) {
      fill(this.color);
      stroke(0, 100);
      strokeWeight(3);
      square(
        (i % 2) * SIZE + this.x,
        Math.floor(i / 2) * SIZE + this.y,
        SIZE - GAP
      );
    }
    if (this.hasPerson) {
      fill("#393434");
      ellipse(this.x + SIZE+10, this.y + SIZE, 15, 20)
      ellipse(this.x + SIZE+10, this.y +20+ SIZE, 15, 20)
    }
  }
  updateColor(color) {
    this.color = color;
  }
  addPerson() {
    this.hasPerson = true;
  }
}
