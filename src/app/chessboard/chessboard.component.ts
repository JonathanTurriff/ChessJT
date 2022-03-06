import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery'

declare var ChessBoard: any;
declare var Chess: any;
@Component({
  selector: 'chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.css']
})

export class ChessboardComponent implements OnInit {

  //Instance variables
  board: any;
  game: any;
  whiteSquareGrey = '#a9a9a9';
  blackSquareGrey = '#696969';
  moves: any = [];
  positions: any = [];
  botName: string = 'JawnBot'
  currentMoves: number = 1;
  notCurrent: boolean = false;
  promotion: boolean = false;

  constructor() { }

  ngOnInit(): void {
   this.setupBoard()
  }

  /**
   * Sets up the board
   */
  setupBoard(){
    //Setup Chess logic
    this.game = new Chess()

    //Setup ChessBoard
    let config = {
      showNotation: true,
      position: 'start',
      draggable: true,
      onDragStart: this.isTurn.bind(this),
      onDrop: this.validateMove.bind(this),
      onMouseoutSquare: this.onMouseoutSquare.bind(this),
      onMouseoverSquare: this.onMouseoverSquare.bind(this),
      onSnapEnd: this.onSnapEnd.bind(this)
    }
    //Create Board for UI
    this.board = ChessBoard('board', config)
    this.notCurrent = false;
    this.currentMoves = 1
    this.positions = []
    this.moves = []
    this.positions.push(this.game.fen())
  }


  /***
   * Flips the board
   */
  flipBoard() {
    this.board.flip()
  }

  /***
   * Gets called when a piece gets picked up
   * Returns true if the color of the piece that is being moved coordinates with the color of whose turn it is
   */
  isTurn(source: any, piece: any){
    if(this.game.game_over()){
      return false;
    }
    if(this.notCurrent){
      return false;
    }
    return this.game.turn() == piece.charAt(0);
  }

  /***
   * Gets called when a piece gets put down
   * Returns snap back, which returns the piece to its origin if the move is invalid
   */
  validateMove(source: any, target: any){
    this.removeGreySquares()
    // see if the move is legal
    let move = this.game.move({
      from: source,
      to: target,
      promotion: 'q'
    })
    // illegal move
    if (move === null) return 'snapback'
    this.currentMoves++;
    return;
    }

  /**
   * Removes the CSS for the highlighting of grey squares
   **/
  removeGreySquares(){
    $('#board .square-55d63').css('background', '')
  }

  /**
   * Adds the CSS for the highlighting of grey squares
   **/
  addGreySquares(square: any){
    if(!this.notCurrent){
      let $square = $('#board .square-' + square)
      let background = this.whiteSquareGrey
      if($square.hasClass('black-3c85d')){
        background = this.blackSquareGrey
      }
      $square.css('background', background)
    }

  }

  /**
   * Gets called when hovering a square
   * This function looks for the moves possible of the piece that is hovered and highlights the squares
   **/
  onMouseoverSquare(square: any){
    let moves = this.game.moves({
      square: square,
      verbose: true
    })
    if (moves.length === 0) return
    this.addGreySquares(square)
    for (let i = 0; i < moves.length; i++) {
      this.addGreySquares(moves[i].to)
    }
  }

  /**
   * Gets called when you stop hovering a square
   * This function turns off the highlight of the squares that were highlighted
   **/
  onMouseoutSquare () {
    this.removeGreySquares()
  }

  /**
   * Gets called when dropping a piece, after validation.
   * Loads the position on the board
   */
  onSnapEnd(){
    this.board.position(this.game.fen())
    this.positions.push(this.game.fen())
    let pgn = this.game.pgn().split(' ')
    let moves = []
    for(let move of pgn){
      if(move.charAt(1) != '.'){
        moves.push(move)
      }
    }
    if(moves.length%2 != 0){
      this.moves.push({white: moves[moves.length-1], black: '', whiteMove: '', blackMove: ''});
      this.moves[this.moves.length-1].whiteMove = this.positions.length-1
    }else{
      this.moves[this.moves.length-1]['black'] = moves[moves.length-1];
      this.moves[this.moves.length-1].blackMove = this.positions.length-1

    }
    let elem = document.getElementById('table');
    if(elem){
      elem.scrollTop = elem.scrollHeight
    }
    // console.log(this.game.is_check())

  }

  /***
   * This function gets called when pressing the right most button of the move selector
   * It returns the board to the correct current move.
   */
  returnToCurrentMove() {
    this.currentMoves = this.positions.length
    this.board.position(this.positions[this.currentMoves-1])
    this.notCurrent =false;
  }

  /***
   * This function gets called when pressing the middle right button of the move selector
   * It positions the board a move forward from the current move.
   */
  moveForward(){
    if(this.currentMoves != this.positions.length){
      this.currentMoves++
      this.board.position(this.positions[this.currentMoves-1])
    }else{
      this.notCurrent = false;
    }
    this.notCurrent = this.currentMoves != this.positions.length;
  }

  /***
   * This function gets called when pressing the middle left button of the move selector
   * It positions the board a move backwards from the current move.
   */
  moveBackwards(){
    if(this.currentMoves > 1){
      this.notCurrent = true
      this.currentMoves--
      this.board.position(this.positions[this.currentMoves-1])
    }
    if(this.positions.length == 1){
      this.notCurrent = false;
    }
  }

  /***
   * This function gets called when pressing the right most button of the move selector
   * It returns the board to the first move (starting position).
   */
  returnToInitialMove() {
    if(!(this.positions.length == 1)){
      this.currentMoves = 1
      this.board.position(this.positions[this.currentMoves-1])
      this.notCurrent =true;
    }
  }

  /***
   * Gets called when the user clicks on the cell containing a move
   * it sets the position to the one clicked by the user in the table
   * @param i the index of the move that was selected
   */
  loadMove(i: any){
    this.board.position(this.positions[i])
    this.currentMoves = i+1;
    this.notCurrent = i != this.positions.length - 1;
  }
}
