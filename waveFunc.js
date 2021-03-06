const tiles = [];
const tileImages = [];

let grid = [];

//Available tilesets: circuit, mountains, demo, demoTracks, circuitCodingTrain, pipes
//                    polka, roads, rail
console.log(
  sessionStorage.getItem("tileset") === null &&
    sessionStorage.getItem("dimension") === null
);

if (
  sessionStorage.getItem("tileset") === null ||
  sessionStorage.getItem("dimension") === null
) {
  sessionStorage.setItem("tileset", "circuit");
  sessionStorage.setItem("dimension", "10");
}
console.log(sessionStorage.getItem("dimension"));
const DIM = eval(sessionStorage.getItem("dimension"));
var tileSet = eval(sessionStorage.getItem("tileset"));

function preload() {
  for (let i = 0; i < tileSet.numberOfTiles; i++) {
    tileImages[i] = loadImage(`${tileSet.path}/${i}.png`);
  }

  console.log(tileImages);
}

function chooseDimensions() {
  if (eval(document.getElementById("dimension").value) > 0) {
    sessionStorage.setItem(
      "dimension",
      document.getElementById("dimension").value
    );
    location.reload();
  }
}

function chooseTileSet(set) {
  sessionStorage.setItem("tileset", set);
  location.reload();
}

function setup() {
  createCanvas(950, 800);

  for (var i = 0; i < tileSet.numberOfTiles; i++) {
    tiles[i] = new Tile(tileImages[i], tileSet.tileConnections[i]);
  }

  for (let i = 0; i < tileSet.numberOfTiles; i++) {
    if (tileSet.tileRotations[i]) {
      for (let j = 1; j < 4; j++) {
        tiles.push(tiles[i].rotate(j));
      }
    }
  }

  // Generate adjacency rules
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    tile.analyze(tiles);
  }
  startOver();
}

function startOver() {
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
  if (pick === undefined) {
    startOver();
    return;
  }
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
}
