import {Component, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {confirm, ConfirmOptions} from "tns-core-modules/ui/dialogs";
import {ActivatedRoute, Router} from "@angular/router";
import {double, miss, single, triple, X01} from "~/app/games/x01";

interface Player {
    name: string,
    selected: boolean
}

interface Contestant {
    name: string,
    remaining: number
}

enum HitType { SINGLE, DOUBLE, TRIPLE }

@Component({
    selector: "ns-details",
    templateUrl: "./gamex01.component.html",
    styleUrls: ["./gamex01.component.css"]
})
export class GameX01Component implements OnInit {

    game: X01;

    hitType: HitType = HitType.SINGLE;

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(
            p => this.game = new X01(p.players, p.gameType)
        )
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
    }
}
