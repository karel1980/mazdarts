import {Component, OnInit} from '@angular/core';
import * as dialogs from "tns-core-modules/ui/dialogs";
import {ActivatedRoute, Router} from "@angular/router";
import { ObservableArray } from '@nativescript/core';
import {ListViewEventData} from "nativescript-ui-listview";
import {PlayerService} from "~/app/service/player.service";

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

    players = new ObservableArray([]);
    hasPlayers: boolean;

    gameType: string;

    constructor(private router: Router, private route: ActivatedRoute, private playerService: PlayerService) {
        //TODO: move to ngOnInit and unsubscribe in onDestroy
        route.queryParams.subscribe((params) => {
            this.gameType = params['gameType'];
        })
    }

    ngOnInit() {
        this.players = new ObservableArray<Player>(this.playerService.getPlayers());
        this.updateHasPlayers();
    }

    public onItemReordered(args: ListViewEventData) {
        this.savePlayers();
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
                this.savePlayers();
            }
        });
    }

    deletePlayer(index: number) {
        this.players.splice(index, 1);
        this.updateHasPlayers();
        this.savePlayers();
    }

    savePlayers() {
        this.playerService.updatePlayers(this.players.map(p => p));
    }

    togglePlayer(player: Player) {
        player.checked = !player.checked;
        this.updateHasPlayers();
        this.savePlayers();
    }

    startGame() {
        if (this.hasPlayers) {
            this.router.navigate(['/games/x01'], {
                queryParams: { gameType: this.gameType, players: this.players.filter(p => p.checked).map(p => p.name) }
            })
        }
    }

    updateHasPlayers() {
        this.hasPlayers = this.players.some(player => player.checked);
    }
}
