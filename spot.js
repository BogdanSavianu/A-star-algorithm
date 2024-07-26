class Spot {
    constructor(i, j, rows, cols) {
      this.j = j;
      this.i = i;
      this.f = 0;
      this.g = 0;
      this.h = 0;
      this.neighbours = [];
      this.parent = null;
      this.isWall = false;
      if(random(1) < 0.45 && !this.isStartOrEnd(i,j))
        this.isWall = true;
    }

    isStartOrEnd(i, j){
      return (i == 0 && j == 0) || (i == rows-1 && j == cols-1);
    }
  
    show(w, h, col) {
      fill(col);
      if(this.isWall)
        fill(0);
      noStroke();
      rect(this.j * w, this.i * h, w-1, h-1);
    }

    addNeighbours(grid){
      if(this.i < rows - 1)
        this.neighbours.push(grid[this.i+1][this.j]);
      if(this.i > 0)
        this.neighbours.push(grid[this.i-1][this.j]);
      if(this.j < cols - 1)
        this.neighbours.push(grid[this.i][this.j+1]);
      if(this.j > 0)
        this.neighbours.push(grid[this.i][this.j-1]);
      if(this.i > 0 && this.j > 0)
        this.neighbours.push(grid[this.i-1][this.j-1]);
      if(this.i > 0 && this.j < cols - 1)
        this.neighbours.push(grid[this.i-1][this.j+1]);
      if(this.i < rows-1 && this.j < cols - 1)
        this.neighbours.push(grid[this.i+1][this.j+1]);
      if(this.i < rows-1 && this.j > 0)
        this.neighbours.push(grid[this.i+1][this.j-1]);
    }
  }