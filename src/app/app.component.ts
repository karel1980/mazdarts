import {Component, OnInit} from "@angular/core";
import {AndroidActivityBackPressedEventData, AndroidApplication, isAndroid} from "@nativescript/core";
import * as application from "tns-core-modules/application";
import {Router} from "@angular/router";
import {RouterExtensions} from "nativescript-angular";

var dialogs = require("tns-core-modules/ui/dialogs");

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {


    constructor(private router: Router, private routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
        this.preventBackButton();
    }

    private preventBackButton() {
        if (!isAndroid) {
            return;
        }

        application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
            if (this.router.isActive('/games', false)) {
                data.cancel = true;
                dialogs.confirm('Quit this game?').then((response) => {
                    if (response) {
                        this.routerExtensions.backToPreviousPage();
                    }
                });
            }
        });
    }

}
