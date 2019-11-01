import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from "@angular/core";
import {confirm, ConfirmOptions} from "tns-core-modules/ui/dialogs";
import {ActivatedRoute, Router} from "@angular/router";
import {double, miss, single, triple, X01} from "~/app/games/x01";
import {RadListView} from "nativescript-ui-listview";
import {PlayersViewModel} from "~/app/gamex01/playersViewModel";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import {RadListViewComponent} from "nativescript-ui-listview/angular";

interface Player {
    name: string,
    selected: boolean
}

interface Contestant {
    name: string,
    remaining: number
}

enum HitType { SINGLE, DOUBLE, TRIPLE }

interface PlayerListItem {
    isCurrent: boolean,
    name: string,
    score: number
}

@Component({
    selector: "ns-details",
    templateUrl: "./gamex01.component.html",
    styleUrls: ["./gamex01.component.css"]
})
export class GameX01Component implements OnInit {

    game: X01;

    hitType: HitType = HitType.SINGLE;
    hitTypeEnum = HitType;

    @ViewChild('playerView', { static: true }) playerView: RadListViewComponent;
    playerListItems = new ObservableArray<PlayerListItem>();

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(
            p => this.game = new X01(p.players, p.gameType)
        );
        this.updatePlayerList();
    }

    onHit(value: number) {
        switch (this.hitType) {
            case HitType.SINGLE:
                this.game.perform(single(value));
                break;
            case HitType.DOUBLE:
                this.game.perform(double(value));
                break;
            case HitType.TRIPLE:
                this.game.perform(triple(value));
                break;
        }
        this.hitType = HitType.SINGLE;

        this.updatePlayerList();
        this.scrollCurrentPlayerIntoView();
    }

    onDoubleTapped() {
        this.hitType = this.hitType != HitType.DOUBLE ? HitType.DOUBLE: HitType.SINGLE;
    }

    onTripleTapped() {
        this.hitType = this.hitType != HitType.TRIPLE ? HitType.TRIPLE: HitType.SINGLE;
    }

    onMiss() {
        this.game.perform(miss());
        this.hitType = HitType.SINGLE;

        this.updatePlayerList();
        this.scrollCurrentPlayerIntoView();
    }

    private updatePlayerList() {
        this.playerListItems = new ObservableArray<PlayerListItem>(this.game.players.map((player, idx) => ({
            name: player,
            isCurrent: idx == this.game.state.currentPlayer,
            score: this.game.state.scores[idx]
        })));
    }

    private scrollCurrentPlayerIntoView() {
    }


}
