let cols = 75;
let rows = 75;
let grid = new Array(rows);
let w;
let h;

let start;
let end;
let path = [];

let openSet = [];
let closedSet = [];

let noSolution = false;

function removeFromSet(arr, element){
  for(let i = arr.length - 1; i >= 0; i--)
    if(arr[i] === element)
      arr.splice(i,1);
}

function heuristic(a,b){
  return dist(a.i, a.j, b.i, b.j);
}

function setup() {
  createCanvas(400, 400);

  w = width / cols;
  h = height / rows;

  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j].addNeighbours(grid);
    }
  }

  start = grid[0][0];
  end = grid[rows - 1][cols - 1];

  openSet.push(start);
}

function draw() {
  background(0);

  let current;
  if (openSet.length > 0) {

    let lowestIndex = 0;
    for(let i = 0; i < openSet.length; i++){
      if(openSet[i].f < openSet[lowestIndex].f)
        lowestIndex = i;
    }

    current = openSet[lowestIndex];

    if(current === end){
      noLoop();
      console.log("DONE!");
    }

    removeFromSet(openSet, current);
    closedSet.push(current);

    let neighbours = current.neighbours;
    for(let i = 0; i < neighbours.length; i++){
      if(!closedSet.includes(neighbours[i]) && !neighbours[i].isWall){
        let tempG = current.g+1;
        let newPath = false;
        if(openSet.includes(neighbours[i])){
          if(tempG < neighbours[i].g){
            neighbours[i].g = tempG;
            newPath = true;
          }
        } else {
          newPath = true;
          neighbours[i].g = tempG;
          openSet.push(neighbours[i]);
        }
        
        if(newPath){
          neighbours[i].h = heuristic(neighbours[i], end);
          neighbours[i].f = neighbours[i].g + neighbours[i].h;
          neighbours[i].parent = current;
        }
      }
    }

  } else {
    console.log("No solution!");
    noSolution = true;
    noLoop();
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j].show(w, h, color(255));
    }
  }

  for(let i = 0; i < closedSet.length; i++){
    closedSet[i].show(w,h,color(255,0,0));
  }

  for(let i = 0; i < openSet.length; i++){
    openSet[i].show(w,h,color(0,255,0));
  }

  if(!noSolution){
    path = [];
    let temp = current;
    path.push(temp);
    while(temp.parent){
      path.push(temp.parent);  
      temp = temp.parent;
    }
  }

  for(let i = 0; i < path.length; i++){
    path[i].show(w,h,color(0,0,255));
  }

}
