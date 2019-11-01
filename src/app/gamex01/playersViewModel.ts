import { ObservableArray } from "tns-core-modules/data/observable-array";
import { Observable } from "tns-core-modules/data/observable";

export class PlayersViewModel extends Observable {

    constructor() {
        super();
        this.dataItems = new ObservableArray<PlayerItem>();

        for (let i = 0; i < 10; i++) {
            this.dataItems.push(new PlayerItem(i%3 == 0, "Item " + i, i * 10));
        }
    }

    get dataItems(): ObservableArray<PlayerItem> {
        return this.get("_dataItems");
    }

    set dataItems(value: ObservableArray<PlayerItem>) {
        this.set("_dataItems", value);
    }
}

export class PlayerItem {
    public isCurrent: boolean;
    public name: string;
    public score: number;

    constructor(isCurrent: boolean, name: string, score: number) {
        this.isCurrent = isCurrent;
        this.name = name;
        this.score = score;
    }
}
