import { Injectable } from '@angular/core';
const appSettings = require("tns-core-modules/application-settings");

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor() { }

    getPlayers() {
      return []; //TODO
    }
}
