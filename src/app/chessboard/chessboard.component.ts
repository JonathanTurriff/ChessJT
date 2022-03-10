import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  whiteSquareRed = '#FF7F7F';
  blackSquareRed = '#FF6863';
  moves: any = [];
  positions: any = [];
  @Input() pickColor: boolean = false;
  @Input() botName: string = 'Opponent'
  @Input() playerColor = 'wb';
  @Input() incomingMove: any;
  @Output() moveRequest = new EventEmitter<any>();
  currentMoves: number = 1;
  notCurrent: boolean = false;
  promotion: boolean = false;
  loaded: boolean = false;
  isPromoting: any;
  source: any;
  target: any;

  constructor() { }

  ngOnInit(): void {
   this.setupBoard()
  }

  /**
   * Sets up the board
   */
  setupBoard(){
    this.loaded=false
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
    this.loaded = true
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
    if(this.game.game_over() || this.notCurrent || this.pickColor){
      return false;
    }
    return this.game.turn() == piece.charAt(0) && this.playerColor.includes(piece.charAt(0));
  }

  /***
   * Gets called when a piece gets put down
   * Returns snap back, which returns the piece to its origin if the move is invalid
   */
  validateMove(source: any, target: any, piece: any){
    this.removeSquares()
    // see if the move is legal
    if(piece.charAt(1) == 'P' && (target.includes(8) || target.includes(1))){
      this.promotion = true;
      this.source = source
      this.target = target
      this.isPromoting = true
      return;
    }
    let move = this.game.move({
      from: source,
      to: target,
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
    let x = $('#board .square-55d63')
    for(let square of x){
      if(square.getAttribute('style') != null){
        // console.log(square)
        let style = square.getAttribute('style')
        // @ts-ignore
        if(style.includes("rgb(105, 105, 105)")){
          // @ts-ignore
          square.setAttribute('style', style.replace('background: rgb(105, 105, 105);', ''))
        // @ts-ignore
        }else if(style.includes("rgb(169, 169, 169)")){
          // @ts-ignore
          square.setAttribute('style', style.replace('background: rgb(169, 169, 169);', ''))

        }
      }
    }
  }

  /**
   * Removes the CSS for the highlighting of all squares
   **/
  removeSquares(){
    $('#board .square-55d63').css('background', '')

  }

  /**
   * Adds the CSS for the highlighting of grey squares
   **/
  addGreySquares(square: any){
    if(!this.notCurrent && this.playerColor.includes(this.game.turn()) && !this.pickColor){
      let $square = $('#board .square-' + square)
      let x = $square.css('background')
      if($square.css('background').includes('rgb(181, 136, 99)') || $square.css('background').includes('rgb(240, 217, 181)')  ){
        let background = this.whiteSquareGrey
        if($square.hasClass('black-3c85d')){
          background = this.blackSquareGrey
        }
        $square.css('background', background)
      }

    }

  }
  /**
   * Adds the CSS for the highlighting of grey squares
   **/
  addRedSquares(square: any){
    if(!this.notCurrent && this.playerColor.includes(this.game.turn()) && !this.pickColor){
      let $square = $('#board .square-' + square)
      let background = this.whiteSquareRed
      if($square.hasClass('black-3c85d')){
        background = this.blackSquareRed
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
   * Loads the position on the board and logs the position
   */
  onSnapEnd(){
    if(this.isPromoting){
      this.isPromoting = false
      return
    }
    this.board.position(this.game.fen())
    this.positions.push(this.game.fen())
    let pgn = this.game.pgn().split(' ')
    let moves = []
    for(let move of pgn){
      if(!move.includes('.')){
        moves.push(move)
      }
    }
    if(moves.length%2 != 0){
      console.log('yes')
      this.moves.push({white: moves[moves.length-1], black: '', whiteMove: '', blackMove: ''});
      this.moves[this.moves.length-1].whiteMove = this.positions.length-1

    }else{
      console.log('no')
      this.moves[this.moves.length-1]['black'] = moves[moves.length-1];
      this.moves[this.moves.length-1].blackMove = this.positions.length-1
    }
    console.log(this.moves)
    let elem = document.getElementById('table');
    if(elem){
      elem.scrollTop = elem.scrollHeight
    }
    if(((this.playerColor == 'b' && this.game.turn() == 'w') || (this.playerColor == 'w' && this.game.turn() == 'b') )){
      this.requestMove()
    }
    if(this.game.in_check()){
      let position = this.board.position()
      for(let pos of Object.keys(position)){
        if(position[pos] == this.game.turn()+'K'){
          this.addRedSquares(pos)
        }
      }
    }

    if(this.game.game_over()){
      if(this.game.in_checkmate()){

      }else if(this.game.in_draw()){

      }else if(this.game.in_stalemate()){

      }else if(this.game.in_threefold_repetition()){

      }else if(this.game.insufficient_material()){

      }
    }
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

  /***
   * Called when clicking on a piece in the promotion dialog
   * @param piece piece passed by the dialog
   */
  promotionSelect(piece: string){
    let move = this.game.move({
      from: this.source,
      to: this.target,
      promotion: piece
    })
    if(move){
      this.currentMoves++;
      this.onSnapEnd()
      this.promotion = false
    }
  }

  /**
   * called when picking color from p-dialog
   * @param color passed by the dialog
   */
  selectColor(color: string) {
    this.playerColor=color;
    if(this.playerColor == 'b'){
      this.flipBoard()
      this.requestMove()
    }
    this.pickColor = false;
  }

  /***
   * Sends an EventEmitter to the parent component requesting a move,
   * called when the player plays their move or if the user picks black
   */
  requestMove(){
    this.moveRequest.emit(this.game)
  }

  /***
   * Gets called when a parent passes it a new value for an input
   * This one checks if its null and plays the move given by the parent component
   */
  ngOnChanges(){
    if(this.incomingMove){
      this.game.move(this.incomingMove)
      this.currentMoves++
      this.onSnapEnd()
    }
  }
}
