class displayTitle {  
  constructor(lat,lng, x, y, wimg, himg, title, img) {
    this.lat = lat;
    this.lng = lng;
    this.x = x;
    this.y = y;
    this.wimg = wimg;
    this.himg = himg;
    this.title = title;
    this.img = img; 
  }

  over(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.w) {
      this.y = this.y-10;
      textSize(30);
      fill('#4082F7');
      text(this.title,this.x+25,this.y);
    } 
  }

  show() {
    stroke(255);
    //fill(color);
    imageMode(CENTER);
    image(this.img,this.x,this.y-this.h/2,this.wimg,this.himg);

  }

  updatePos(_x, _y, _zoom) {
    //adjust if map is moved
    let zoomExpWidth = map(_zoom,0,22,0,5);
    let zoomExpHeight = map(_zoom,0,22,0,5);
    this.x = _x;
    this.y = _y;
    this.w = exp(zoomExpWidth);
    this.h = exp(zoomExpHeight);

  }

}
