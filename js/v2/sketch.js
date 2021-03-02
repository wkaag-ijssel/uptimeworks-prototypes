let elements = [];
let months = 5;
let assets = 10;

function setup(canvas) {
    let myCanvas = createCanvas(500, 500);
    myCanvas.parent("heatmapCanvas");

    // Create the heatmap
    for (let asset = 0; asset < assets; asset++) {
        let row = [] 
        for (let month = 0; month < months; month++) {
            row[month] = new Element(asset, month);
        }
        elements[asset] = row;
    }
}

function draw() {
  background(51);
  for (let asset = 0; asset < elements.length; asset++) {
    for (let month = 0; month < elements[asset].length; month++) {
        elements[asset][month].run(elements);
    }
  }
}

// Boid class
// Methods for Separation, Cohesion, Alignment added
class Element {
  constructor(x, y) {
    this.width = canvas.width / months;
    this.height = canvas.height / assets;
    this.position = createVector(x * this.width, y * this.width);
    this.state = 1;
  }

  run(elements) {
    this.update();
    this.render();
  }
  // Method to update location
  update() {
    this.position.add(this.velocity);
  }
  
  // Draw boid as a circle
  render() {
    fill(127, 127);
    stroke(200);
    rect(this.position.x, this.position.y, width, height);
  }
}