import {Component, OnInit} from '@angular/core';
import * as dialogs from "tns-core-modules/ui/dialogs";
import {Router} from "@angular/router";

interface Player {
    name: string,
    checked: boolean
}

@Component({
    selector: 'ns-choose-players',
    templateUrl: './choose-players.component.html',
    styleUrls: ['./choose-players.component.css']
})
export class ChoosePlayersComponent implements OnInit {

    players = [
        {name: "karel", checked: true},
        {name: "felix", checked: true}
    ];
    hasPlayers: boolean;

    constructor(private router: Router) {
    }

    ngOnInit() {
        this.updateHasPlayers();
    }

    addPlayer() {
        let self = this;
        dialogs.prompt({
            title: "Add player",
            message: "Player name",
            okButtonText: "Add",
            cancelButtonText: "Cancel",
            defaultText: "",
            inputType: dialogs.inputType.text
        }).then((r) => {
            if (r.result) {
                this.players.push({name: r.text, checked: true});
                this.updateHasPlayers();
            }
        });
    }

    deletePlayer(index: number) {
        this.players.splice(index, 1);
    }

    togglePlayer(player: Player) {
        player.checked = !player.checked;
        this.updateHasPlayers();
    }

    startGame() {
        if (this.hasPlayers) {
            this.router.navigate(['/games/x01'], {
                queryParams: { gameType: '301', players: this.players.filter(p => p.checked).map(p => p.name) }
            })
        }
    }

    updateHasPlayers() {
        this.hasPlayers = this.players.some(player => player.checked);
    }
}
