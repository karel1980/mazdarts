import {Component, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {
    capitalizationType,
    confirm,
    ConfirmOptions,
    inputType,
    prompt,
    PromptOptions,
    PromptResult
} from "tns-core-modules/ui/dialogs";
import {NavigationExtras, Router} from "@angular/router";

interface Player {
    name: string,
    selected: boolean
}

interface Contestant {
    name: string,
    remaining: number
}

@Component({
    selector: "ns-details",
    templateUrl: "./game301.component.html",
    styleUrls: ["./game301.component.css"]
})
export class Game301Component implements OnInit, OnChanges {

    players: Player[] = [];
    selectedPlayerCount = 0;

    contestants: Contestant[] = [{name: 'karel', remaining: 301}];

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateSelectedPlayerCount();
    }

    addPlayer() {
        let options: PromptOptions = {
            title: "New player",
            defaultText: "",
            message: "Player name",
            okButtonText: "OK",
            cancelButtonText: "Cancel",
            cancelable: true,
            inputType: inputType.text, // email, number, text, password, or email
            capitalizationType: capitalizationType.sentences // all. none, sentences or words
        };

        prompt(options).then((result: PromptResult) => {
            if (result.result && result.text.trim().length != 0) {
                this.players.push({
                    name: result.text,
                    selected: true
                });
                this.updateSelectedPlayerCount();
            }
        });
    }

    togglePlayer(player: Player) {
        player.selected = !player.selected;
        this.updateSelectedPlayerCount();
    }

    private updateSelectedPlayerCount() {
        this.selectedPlayerCount = this.players.filter(p => p.selected).length;
    }

    startGame() {
        this.contestants = this.players.filter(p => p.selected).map(({name}) => ({name, remaining: 301}));
    }

    removePlayer(player: Player) {
        let options: ConfirmOptions = {
            message: `Remove ${player.name}?`,
            cancelable: true
        };
        confirm(options).then(result => {
            console.log(result);
        });
    }
}
