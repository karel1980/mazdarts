import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: "ns-items",
    templateUrl: "./main.component.html"
})
export class MainComponent implements OnInit {
    showGames: boolean = false;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    startNewGame() {
        this.showGames = true;
    }

    start301() {
        this.router.navigate(["/games/301"]);
    }
}
