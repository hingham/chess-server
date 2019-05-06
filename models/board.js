const kn = require( "./chess-models/knight.js");
const p = require( "./chess-models/pawns.js");
const  r = require( "./chess-models/rook.js");
const  b = require( "./chess-models/bishop.js");
const  k = require( "./chess-models/king.js");
const  q = require( "./chess-models/queen.js");

module.exports = function makeBoard() {
  return [
  [null, 'a', 'b', 'c', 'd', 'e', 'f', 'h', 'i'],
  [
    1,
    r.lightRook1,
    kn.lightKnight1,
    b.lightBishop1,
    q.lightQueen,
    k.lightKing,
    b.lightBishop2,
    kn.lightKnight2,
    r.lightRook2
  ],
  [
    2,
    p.lightPawn1,
    p.lightPawn2,
    p.lightPawn3,
    p.lightPawn4,
    p.lightPawn5,
    p.lightPawn6,
    p.lightPawn7,
    p.lightPawn8
  ],
  [3, null, null, null, null, null, null, null, null],
  [4, null, null, null, null, null, null, null, null],
  [5, null, null, null, null, null, null, null, null],
  [6, null, null, null, null, null, null, null, null],
  [
    7,
    p.darkPawn1,
    p.darkPawn2,
    p.darkPawn3,
    p.darkPawn4,
    p.darkPawn5,
    p.darkPawn6,
    p.darkPawn7,
    p.darkPawn8
  ],
  [
    8,
    r.darkRook1,
    kn.darkKnight1,
    b.darkBishop1,
    k.darkKing,
    q.darkQueen,
    b.darkBishop2,
    kn.darkKnight2,
    r.darkRook2
  ]
];
}
