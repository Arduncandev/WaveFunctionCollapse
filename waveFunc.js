const tiles = [];
const tileImages = [];

let grid = [];

const DIM = 20;

function preload() {
  const path = "tiles/pipes";
  tileImages[0] = loadImage(`${path}/blank.png`);
  tileImages[1] = loadImage(`${path}/north.png`);
  //   tiles[2] = loadImage(`${path}/east.png`);
  //   tiles[3] = loadImage(`${path}/south.png`);
  //   tiles[4] = loadImage(`${path}/west.png`);
}

function setup() {
  createCanvas(800, 800);

  //loaded tiles
  tiles[0] = new Tile(tileImages[0], [0, 0, 0, 0]);
  tiles[1] = new Tile(tileImages[1], [1, 1, 0, 1]);
  tiles[2] = tiles[1].rotate(1);
  tiles[3] = tiles[1].rotate(2);
  tiles[4] = tiles[1].rotate(3);

  // Generate adjacency rules
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    tile.analyze(tiles);
  }

  // made a cell for each spot on the grid
  for (let i = 0; i < DIM * DIM; i++) {
    grid[i] = new Cell(tiles.length);
  }
}

function checkValid(arr, valid) {
  for (let i = arr.length - 1; i >= 0; i--) {
    let element = arr[i];
    if (!valid.includes(element)) {
      arr.splice(i, 1);
    }
  }
}

function draw() {
  background(0);

  const w = width / DIM;
  const h = height / DIM;

  for (let i = 0; i < DIM; i++) {
    for (let j = 0; j < DIM; j++) {
      let cell = grid[j + i * DIM];
      if (cell.collapsed) {
        let index = cell.options[0];
        image(tiles[index].img, j * w, i * h, w, h);
      } else {
        fill(0);
        stroke(255);
        rect(j * w, i * h, w, h);
      }
    }
  }

  //choose adjacent cell with least entropy
  let gridCopy = grid.slice();
  gridCopy = gridCopy.filter((a) => !a.collapsed);

  if (gridCopy.length == 0) {
    return;
  }

  gridCopy.sort((a, b) => {
    return a.options.length - b.options.length;
  });

  let len = gridCopy[0].options.length;
  let stopIndex = 0;

  for (let i = 1; i < gridCopy.length; i++) {
    if (gridCopy[i].options.length > len) {
      stopIndex = i;
      break;
    }
  }

  if (stopIndex > 0) gridCopy.splice(stopIndex);
  const cell = random(gridCopy);
  cell.collapsed = true;
  const pick = random(cell.options);
  cell.options = [pick];

  const nextGrid = [];
  for (let i = 0; i < DIM; i++) {
    for (let j = 0; j < DIM; j++) {
      let index = j + i * DIM;

      if (grid[index].collapsed) {
        nextGrid[index] = grid[index];
      } else {
        let options = new Array(tiles.length).fill(0).map((x, i) => i);

        //check north
        if (i > 0) {
          let north = grid[j + (i - 1) * DIM];
          let validOptions = [];
          for (let option of north.options) {
            let valid = tiles[option].south;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }

        //check east
        if (j < DIM - 1) {
          let east = grid[j + 1 + i * DIM];
          let validOptions = [];
          for (let option of east.options) {
            //            console.log(rules[option][3]);

            let valid = tiles[option].west;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }

        //check south
        if (i < DIM - 1) {
          let south = grid[j + (i + 1) * DIM];
          let validOptions = [];
          for (let option of south.options) {
            let valid = tiles[option].north;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }

        //check west
        if (j > 0) {
          let west = grid[j - 1 + i * DIM];
          let validOptions = [];
          for (let option of west.options) {
            let valid = tiles[option].east;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }

        nextGrid[index] = new Cell(options);
      }
    }
  }

  grid = nextGrid;

  //noLoop();
}
