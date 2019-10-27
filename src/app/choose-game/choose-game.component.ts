import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: "ns-choose-game",
    templateUrl: "./choose-game.component.html"
})
export class ChooseGameComponent implements OnInit {
    showGames: boolean = false;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    startNewGame() {
        this.showGames = true;
    }

    start301() {
        this.router.navigate(["/choose-players"], { queryParams: { gameType: '301' }});
    }

    start501() {
        this.router.navigate(["/choose-players"], { queryParams: { gameType: '501' }});
    }
}
