import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ChooseGameComponent } from "./choose-game/choose-game.component";
import { GameX01Component } from "./gamex01/gamex01.component";
import {ChoosePlayersComponent} from "~/app/choose-players/choose-players.component";

const routes: Routes = [
    { path: "", redirectTo: "/choose-game", pathMatch: "full" },
    { path: "choose-game", component: ChooseGameComponent },
    { path: "choose-players", component: ChoosePlayersComponent },
    { path: "games/x01", component: GameX01Component }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
