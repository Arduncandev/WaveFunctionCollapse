function compareEdge(a, b) {
  return a == reverseString(b);
}

function reverseString(s) {
  let arr = s.split("");
  arr = arr.reverse();
  return arr.join("");
}

class Tile {
  constructor(img, edges) {
    this.img = img;
    this.edges = edges;

    this.north = [];
    this.east = [];
    this.south = [];
    this.west = [];
  }

  analyze(tiles) {
    for (let i = 0; i < tiles.length; i++) {
      //NORTH
      if (compareEdge(tiles[i].edges[2], this.edges[0])) {
        this.north.push(i);
      }

      // EAST
      if (compareEdge(tiles[i].edges[3], this.edges[1])) {
        this.east.push(i);
      }

      //SOUTH
      if (compareEdge(tiles[i].edges[0], this.edges[2])) {
        this.south.push(i);
      }

      //WEST
      if (compareEdge(tiles[i].edges[1], this.edges[3])) {
        this.west.push(i);
      }
    }
  }

  rotate(num) {
    const w = this.img.width;
    const h = this.img.height;
    const newImg = createGraphics(w, h);
    newImg.imageMode(CENTER);

    newImg.translate(w / 2, h / 2);
    newImg.rotate(HALF_PI * num);
    newImg.image(this.img, 0, 0);

    const newEdges = [];
    const len = this.edges.length;
    for (let i = 0; i < len; i++) {
      newEdges[i] = this.edges[(i - num + len) % len];
    }

    return new Tile(newImg, newEdges);
  }
}
