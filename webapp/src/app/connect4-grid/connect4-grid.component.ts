import {Component, OnInit} from '@angular/core';
import {GameService} from "../../services";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-connect4-grid',
  templateUrl: './connect4-grid.component.html',
  styleUrls: ['./connect4-grid.component.css']
})

class Player {
  constructor(private color: number) {
  }

  isAi: boolean = false

  toString(): string {
    if (this.color == 1) {
      return "yellow"
    }
    return "red"
  }
}

export class Connect4GridComponent implements OnInit {
  connect4Grid: number[][] = [];
  players: Player[] = [new Player(0), new Player(1)]
  currentPlayer: Player = this.players[0];

  constructor(private service: GameService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.service.getGrid().subscribe(data => {
        this.connect4Grid = data.Grid;
        this.currentPlayer = this.players[data.CurrentPlayerColor];
      },
      error => {
        console.error('Failed to fetch Connect 4 grid data', error);
      })

    this.route.queryParams.subscribe(params => {
      this.players[1].isAi = params['redIsAi'];
      this.players[0].isAi = params['yellowIsAi'];
    });
  }


  addToken(column: number): void {
    this.service.postToken(column).subscribe(response => {
      // Update the grid with the new token
      this.connect4Grid[response.Line][response.Column] = response.Cell;
      if (response.PlayerWon) {
        const winner = response.Cell == 1 ? 'yellow' : 'red';
        alert(`Player ${winner.toUpperCase()} wins!`);
      }
      this.currentPlayer = this.players[response.CurrentPlayerColor];
    }, error => {
      alert(error.error.Reason)
    });
  }


  getColumnIndex(target: EventTarget | null): number {
    const cell = target as HTMLTableCellElement;
    return cell.cellIndex;
  }

  resetGrid(): void {
    this.service.resetGame().subscribe((response) => {
      this.service.getGrid().subscribe(data => {
          this.connect4Grid = data.Grid;
        },
        error => {
          console.error('Failed to fetch Connect 4 grid data', error);
        })
    });
  }

  getColor(color: number): string {
    return color === 1 ? '#ffd500' : 'red';
  }

  getCellStyle(cell: number): string {
    switch (cell) {
      case 2:
        return 'cell-red';
      case 1:
        return 'cell-yellow';
      default:
        return 'cell-empty';
    }
  }


  toggleGameMode(): void {
    if (this.currentPlayer == 2)
      this.yellowIsAi = !this.yellowIsAi;
    else if (this.currentPlayer == 1)
      this.redIsAi = !this.redIsAi;

    // Update the query parameter based on the game mode
    const queryParams = {yellowIsAi: this.yellowIsAi, redIsAi: this.redIsAi};
    this.router.navigate([], {queryParams: queryParams});
  }
}


