import { Component, OnInit } from '@angular/core';

declare var ChessBoard: any;
declare var Chess: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  items: any;
  board: any;
  game: any;
  // board2: any;
  ruyLopez = 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R';

  constructor() { }


  ngOnInit(): void {
    this.items = [
      {
        label: 'Bots',
        icon: 'pi pi-user',
        items: [
          {label: 'JawnBotV1', icon: 'pi pi-android',},
        ]
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
      }];
    this.game = new Chess()
    // console.log(this.game)
    this.game.fen()
    this.board = ChessBoard('board1', {showNotation: true, position: 'start', draggable: true})
    let i = 0
    while(i<15){
        const moves = this.game.moves()
        const move = moves[Math.floor(Math.random()*moves.length)]
        this.game.move(move)
        this.board.position(this.game.fen())
      i++
    }
    console.log(this.game.pgn())
    console.log(this.game.fen())
    // this.board2 = ChessBoard('board2', {showNotation: true, position: 'start', draggable: true})

  }

  clearBoard() {
    this.board.clear()
    this.game.clear()
    this.board.start()
  }

  flipBoard() {
    this.board.flip()
  }
}
