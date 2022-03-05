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
  board: any;
  game: any;
  whiteSquareGrey = '#a9a9a9';
  blackSquareGrey = '#696969';
  height: any = '600px';
  moves: any;



  constructor() { }

  ngOnInit(): void {
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
  }

  /***
   * Clears the board and logic and resets the board to initial position
   */
  clearBoard() {
    this.board.clear()
    this.game.clear()
    this.board.start()
  }

  /***
   * Flips the board
   */
  flipBoard() {
    this.board.flip()
  }

  /***
   * Gets called when a piece gets picked up
   * Returns true if the color of the piece that is being moved coordinates with the color of who's turn it is
   */
  isTurn(source: any, piece: any){
    if(this.game.game_over()){
      return false;
    }
    return this.game.turn() == piece.charAt(0);
  }

  /***
   * Gets called when a piece gets put down
   * Returns snapback if which returns the piece to its origin if the move is invalid
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
    this.moves++;
    this.changeHeight()
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
    let $square = $('#board .square-' + square)
    let background = this.whiteSquareGrey
    if($square.hasClass('black-3c85d')){
      background = this.blackSquareGrey
    }
    $square.css('background', background)
  }

  /**
   * Gets called when hovering a square
   * This function looks for the moves possible of the piece that is hovered and highlights the squares
   **/
  onMouseoverSquare(square: any, piece: any){
    let moves = this.game.moves({
      square: square,
      verbose: true
    })
    if (moves.length === 0) return
    this.addGreySquares(square)
    for (var i = 0; i < moves.length; i++) {
      this.addGreySquares(moves[i].to)
    }
  }

  /**
   * Gets called when unhovering a square
   * This function unhighlights the squares that were highlighted
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
  }

  changeHeight(){
    let base = 600
    if(this.moves > 30){
      for(let i = 0; i<this.moves-30; i++){
        base += 10
      }
    }
    this.height = base + 'px'
  }

}
