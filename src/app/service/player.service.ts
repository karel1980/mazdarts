import {Injectable} from '@angular/core';
import {Couchbase} from 'nativescript-couchbase-plugin';

@Injectable({
    providedIn: 'root'
})
export class PlayerService {

    database = new Couchbase('mazdarts');

    constructor() {
    }

    getPlayers() {
        return (this.database.getDocument('players') || {players:[]}).players;
    }

    updatePlayers(players: any[]) {
        this.database.createDocument({players}, 'players');
    }
}
