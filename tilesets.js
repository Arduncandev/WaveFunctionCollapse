var demo = {
  numberOfTiles: 2,
  tileConnections: [
    ["A", "A", "A", "A"],
    ["A", "B", "B", "B"],
  ],
  tileRotations: [false, true],
  path: "tiles/demo",
};

var circuit = {
  numberOfTiles: 13,
  tileConnections: [
    ["AAA", "AAA", "AAA", "AAA"],
    ["BBB", "BBB", "BBB", "BBB"],
    ["BBB", "BCB", "BBB", "BBB"],
    ["BBB", "BDB", "BBB", "BDB"],
    ["ABB", "BCB", "BBA", "AAA"],
    ["ABB", "BBB", "BBB", "BBA"],
    ["BBB", "BCB", "BBB", "BCB"],
    ["BDB", "BCB", "BDB", "BCB"],
    ["BDB", "BBB", "BCB", "BBB"],
    ["BCB", "BCB", "BBB", "BCB"],
    ["BCB", "BCB", "BCB", "BCB"],
    ["BCB", "BCB", "BBB", "BBB"],
    ["BBB", "BCB", "BBB", "BCB"],
  ],
  tileRotations: [
    false,
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ],
  path: "tiles/circuit",
};

var demoTracks = {
  numberOfTiles: 2,
  tileConnections: [
    ["A", "A", "A", "A"],
    ["A", "B", "B", "B"],
  ],
  tileRotations: [false, true],
  path: "tiles/demo-tracks",
};

var mountains = {
  numberOfTiles: 2,
  tileConnections: [
    ["A", "A", "A", "A"],
    ["A", "B", "B", "B"],
  ],
  tileRotations: [false, true],
  path: "tiles/mountains",
};

var circuitCodingTrain = {
  numberOfTiles: 13,
  tileConnections: [
    ["AAA", "AAA", "AAA", "AAA"],
    ["BBB", "BBB", "BBB", "BBB"],
    ["BBB", "BCB", "BBB", "BBB"],
    ["BBB", "BDB", "BBB", "BDB"],
    ["ABB", "BCB", "BBA", "AAA"],
    ["ABB", "BBB", "BBB", "BBA"],
    ["BBB", "BCB", "BBB", "BCB"],
    ["BDB", "BCB", "BDB", "BCB"],
    ["BDB", "BBB", "BCB", "BBB"],
    ["BCB", "BCB", "BBB", "BCB"],
    ["BCB", "BCB", "BCB", "BCB"],
    ["BCB", "BCB", "BBB", "BBB"],
    ["BBB", "BCB", "BBB", "BCB"],
  ],
  tileRotations: [
    false,
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ],
  path: "tiles/circuit-coding-train",
};

var pipes = {
  numberOfTiles: 2,
  tileConnections: [
    ["A", "A", "A", "A"],
    ["A", "B", "B", "B"],
  ],
  tileRotations: [false, true],
  path: "tiles/pipes",
};

var polka = {
  numberOfTiles: 2,
  tileConnections: [
    ["A", "A", "A", "A"],
    ["A", "B", "B", "B"],
  ],
  tileRotations: [false, true],
  path: "tiles/polka",
};

var roads = {
  numberOfTiles: 2,
  tileConnections: [
    ["A", "A", "A", "A"],
    ["A", "B", "B", "B"],
  ],
  tileRotations: [false, true],
  path: "tiles/roads",
};

var rail = {
  numberOfTiles: 7,
  tileConnections: [
    ["AAA", "AAA", "AAA", "AAA"],
    ["BAB", "BAB", "BAB", "BBB"],
    ["BAA", "AAB", "AAA", "AAA"],
    ["BAA", "AAA", "AAB", "AAA"],
    ["ABA", "ABA", "AAA", "AAA"],
    ["ABA", "AAA", "ABA", "AAA"],
    ["ABA", "ABA", "ABA", "ABA"],
  ],
  tileRotations: [false, true, true, true, true, true, false],
  path: "tiles/rail",
};
