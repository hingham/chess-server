const kn = require("./chess-models/knight.js");
const p = require("./chess-models/pawns.js");
const r = require("./chess-models/rook.js");
const b = require("./chess-models/bishop.js");
const k = require("./chess-models/king.js");
const q = require("./chess-models/queen.js");

module.exports = function makeBoard() {
  //i need to create the pieces in here so that each game has it's own nodes
  let lightBishop1 = new b.Bishop("&#9815;", 3, 1, "light");
  let lightBishop2 = new b.Bishop("&#9815;", 6, 1, "light");
  let darkBishop1 = new b.Bishop("&#9821;", 3, 8, "dark");
  let darkBishop2 = new b.Bishop("&#9821;", 6, 8, "dark");

  let lightKing = new k.King("&#9813;", 5, 1, "light", 'king');
  let darkKing = new k.King("&#9819;", 4, 8, "dark", 'king');

  let lightKnight1 = new kn.Knight("&#9816;", 2, 1, "light");
  let lightKnight2 = new kn.Knight("&#9816;", 7, 1, "light");
  let darkKnight1 = new kn.Knight("&#9822;", 2, 8, "dark");
  let darkKnight2 = new kn.Knight("&#9822;", 7, 8, "dark");

  let lightPawn1 = new p.LightPawn("&#9817;", 1, 2, "light");
  let lightPawn2 = new p.LightPawn("&#9817;", 2, 2, "light");
  let lightPawn3 = new p.LightPawn("&#9817;", 3, 2, "light");
  let lightPawn4 = new p.LightPawn("&#9817;", 4, 2, "light");
  let lightPawn5 = new p.LightPawn("&#9817;", 5, 2, "light");
  let lightPawn6 = new p.LightPawn("&#9817;", 6, 2, "light");
  let lightPawn7 = new p.LightPawn("&#9817;", 7, 2, "light");
  let lightPawn8 = new p.LightPawn("&#9817;", 8, 2, "light");

  let darkPawn1 = new p.DarkPawn("&#9823;", 1, 7, "dark");
  let darkPawn2 = new p.DarkPawn("&#9823;", 2, 7, "dark");
  let darkPawn3 = new p.DarkPawn("&#9823;", 3, 7, "dark");
  let darkPawn4 = new p.DarkPawn("&#9823;", 4, 7, "dark");
  let darkPawn5 = new p.DarkPawn("&#9823;", 5, 7, "dark");
  let darkPawn6 = new p.DarkPawn("&#9823;", 6, 7, "dark");
  let darkPawn7 = new p.DarkPawn("&#9823;", 7, 7, "dark");
  let darkPawn8 = new p.DarkPawn("&#9823;", 8, 7, "dark");

  let lightQueen = new q.Queen("&#9812;", 4, 1, "light");
  let darkQueen = new q.Queen("&#9818", 5, 8, "dark");

  let lightRook1 = new r.Rook("&#9814;", 1, 1, "light");
  let lightRook2 = new r.Rook("&#9814;", 8, 1, "light");
  let darkRook1 = new r.Rook("&#9820;", 1, 8, "dark");
  let darkRook2 = new r.Rook("&#9820;", 8, 8, "dark");

  return [
    [null, "a", "b", "c", "d", "e", "f", "h", "i"],
    [
      1,
      lightRook1,
      lightKnight1,
      lightBishop1,
      lightQueen,
      null,
      lightBishop2,
      lightKnight2,
      lightRook2
    ],
    [
      2,
      lightPawn1,
      lightPawn2,
      lightPawn3,
      lightPawn4,
      lightPawn5,
      lightPawn6,
      lightPawn7,
      lightPawn8
    ],
    [3, null, null, null, null, null, null, null, null],
    [4, null, null, null, null, null, null, null, null],
    [5, null, null, null, null, lightKing, null, null, null],
    [6, null, null, null, null, null, null, null, null],
    [
      7,
      darkPawn1,
      darkPawn2,
      darkPawn3,
      darkPawn4,
      darkPawn5,
      darkPawn6,
      darkPawn7,
      darkPawn8
    ],
    [
      8,
      darkRook1,
      darkKnight1,
      darkBishop1,
      darkKing,
      darkQueen,
      darkBishop2,
      darkKnight2,
      darkRook2
    ]
  ];
};
