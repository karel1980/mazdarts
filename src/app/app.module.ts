import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {ChooseGameComponent} from "./choose-game/choose-game.component";
import {GameX01Component} from "./gamex01/gamex01.component";

import {NativeScriptFormsModule} from "nativescript-angular/forms";
import { ScoreInputComponent } from './score-input/score-input.component';
import { ChoosePlayersComponent } from './choose-players/choose-players.component';
import {NativeScriptUIListViewModule} from "nativescript-ui-listview/angular";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        AppComponent,
        ChooseGameComponent,
        ChoosePlayersComponent,
        GameX01Component,
        ScoreInputComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/* Pass your application module to the bootstrapModule function located in main.ts to start your app */
export class AppModule {
}
