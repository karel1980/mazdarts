import {Component, EventEmitter, OnInit, Output} from '@angular/core';

const platformModule = require("tns-core-modules/platform");

@Component({
    selector: 'ns-score-input',
    templateUrl: './score-input.component.html',
    styleUrls: ['./score-input.component.css']
})
export class ScoreInputComponent implements OnInit {

    @Output() hit = new EventEmitter<number>();
    @Output() undoTapped = new EventEmitter<number>();
    @Output() doubleTapped = new EventEmitter<number>();
    @Output() tripleTapped = new EventEmitter<number>();

    columnWidth = platformModule.screen.mainScreen.widthDIPs / 5;

    constructor() {
    }

    ngOnInit() {
    }

    onTapValue(value: number) {
        this.hit.emit(value);
    }

    onTapUndo() {
        this.undoTapped.emit();
    }
    onTapDouble() {
        this.undoTapped.emit();
    }
    onTapTriple() {
        this.undoTapped.emit();
    }
    onTapBull() {
        this.hit.emit(25);
    }
}
