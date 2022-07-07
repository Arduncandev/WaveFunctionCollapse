const tiles = [];

let grid = [];

const DIM = 20;

const BLANK = 0;
const NORTH = 1;
const EAST = 2;
const SOUTH = 3;
const WEST = 4;

const rules = [
  [
    [BLANK, NORTH],
    [BLANK, EAST],
    [BLANK, SOUTH],
    [BLANK, WEST],
  ],
  [
    [EAST, WEST, SOUTH],
    [WEST, NORTH, SOUTH],
    [BLANK, SOUTH],
    [EAST, NORTH, SOUTH],
  ],
  [
    [EAST, WEST, SOUTH],
    [WEST, NORTH, SOUTH],
    [EAST, WEST, NORTH],
    [BLANK, WEST],
  ],
  [
    [BLANK, NORTH],
    [WEST, NORTH, SOUTH],
    [EAST, WEST, NORTH],
    [EAST, NORTH, SOUTH],
  ],
  [
    [EAST, WEST, SOUTH],
    [BLANK, EAST],
    [EAST, WEST, NORTH],
    [NORTH, SOUTH, EAST],
  ],
];

function preload() {
  tiles[0] = loadImage("tiles/pipes/blank.png");
  tiles[1] = loadImage("tiles/pipes/north.png");
  tiles[2] = loadImage("tiles/pipes/east.png");
  tiles[3] = loadImage("tiles/pipes/south.png");
  tiles[4] = loadImage("tiles/pipes/west.png");
}

function setup() {
  createCanvas(800, 800);

  for (let i = 0; i < DIM * DIM; i++) {
    grid[i] = {
      collapsed: false,
      options: [BLANK, NORTH, EAST, SOUTH, WEST],
    };
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

// function mousePressed() {
//   redraw();
// }

function draw() {
  background(0);

  const w = width / DIM;
  const h = height / DIM;

  for (let i = 0; i < DIM; i++) {
    for (let j = 0; j < DIM; j++) {
      let cell = grid[j + i * DIM];
      if (cell.collapsed) {
        let index = cell.options[0];
        image(tiles[index], j * w, i * h, w, h);
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
        let options = [BLANK, NORTH, EAST, SOUTH, WEST];

        //check north
        if (i > 0) {
          let north = grid[j + (i - 1) * DIM];
          let validOptions = [];
          for (let option of north.options) {
            let valid = rules[option][2];
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

            let valid = rules[option][3];
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }

        //check south
        if (i < DIM - 1) {
          let south = grid[j + (i + 1) * DIM];
          let validOptions = [];
          for (let option of south.options) {
            let valid = rules[option][0];
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }

        //check west
        if (j > 0) {
          let west = grid[j - 1 + i * DIM];
          let validOptions = [];
          for (let option of west.options) {
            let valid = rules[option][1];
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }

        nextGrid[index] = {
          options,
          collapsed: false,
        };
      }
    }
  }

  grid = nextGrid;

  //noLoop();
}
