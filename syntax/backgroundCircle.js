class backgroundCircle {
  constructor() {
  

    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?

    
    this.x = random(width*.25, width*.75);
    this.y = random(height);
    this.d = random(100, 160);
}

  show() {
    
    strokeWeight(2);
    noFill();
    stroke(30);   
    ellipse(this.x, this.y,this.d, this.d);
  }
}