
let data;
//let timestamp = [];
let userdata;
const access_key = 'pk.eyJ1IjoicmVzZWRhIiwiYSI6ImNrc21rNDFlaTBneGcycG1yeGVubnNyYWIifQ.Afk2N0wGtFeHEAb-7yVCGQ';
const style = "mapbox://styles/reseda/cksmkssg41u5618loe7coakn1";
const options = {};

// Create an instance of MapboxGL
const mappa = new Mappa('MapboxGL', access_key);  
let myMap;

let tripLocation = [] ;
let totaldistance = [];
let startTime = []; 
var w = window.innerWidth;
var h = window.innerHeight;  
var pin;
var route;
var time;
var dollar;
var titleList = [];
var titleName;

function preload(){
  
  data = loadJSON('info.json');
  userdata = loadJSON('userdata.json')
  pin  = loadImage("pin.png");
  route  = loadImage("route.png");
  time  = loadImage("time.png");
  dollar  = loadImage("dollar.png");
 
}

function setup() {
  options['lat'] = userdata.geometry.coordinates[0][1];
 // console.log(userdata.geometry.coordinates[0][1]);
  options['lng'] = userdata.geometry.coordinates[0][0];
  options['zoom'] = 15;
  options['style'] = style;
 // console.log(options);
  canvas = createCanvas(w,h);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  //console.log(userdata.properties.Location);
 // console.log(userdata.geometry.coordinates)
  
}

var loaded = false;

function draw() {
   clear();

    if (myMap.ready && !loaded) {
    loadTitles();
  }

  if (loaded) {

    for(let i=0; i<titleList.length; i++){
      
      var pos = myMap.latLngToPixel(titleList[i].lat,     titleList[i].lng);
      titleList[i].updatePos(pos.x,pos.y, myMap.zoom());
      titleList[i].over(mouseX,mouseY);
      titleList[i].show();      
      
    }
  }
  
}

var pin;
var route;
var time;
var dollar;

//display of the information
function loadTitles() {

  
      var pos =  myMap.latLngToPixel(options.lat, options.lng);

      titleName = new displayTitle(
        //lat, lng, x, y, w, h, title
        options.lat+ 0.003,
        options.lng+0.007,
        pos.x,
        pos.y,
        70,
        70,
        userdata.properties.Location,
        pin
      );

      titleList.push(titleName);
  
  
      titleName = new displayTitle(
        //lat, lng, x, y, w, h, title
        options.lat+0.001,
        options.lng+0.007,
        pos.x,
        pos.y,
        70,
        70,
        userdata.properties.start_time,
        time
      );

      titleList.push(titleName);
  
      titleName = new displayTitle(
        //lat, lng, x, y, w, h, title
        options.lat-0.001,
        options.lng+0.007,
        pos.x,
        pos.y,
        70,
        70,
        '5.52 km',
        route
      );

      titleList.push(titleName);
  
  
      titleList.push(titleName);
  
      titleName = new displayTitle(
        //lat, lng, x, y, w, h, title
        options.lat-0.003,
        options.lng+0.007,
        pos.x,
        pos.y,
        70,
        70,
        '$10',
        dollar
      );

      titleList.push(titleName);
    
    loaded = true;
  
}


 
