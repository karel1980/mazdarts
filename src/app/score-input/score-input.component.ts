import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

const platformModule = require("tns-core-modules/platform");

@Component({
    selector: 'ns-score-input',
    templateUrl: './score-input.component.html',
    styleUrls: ['./score-input.component.css']
})
export class ScoreInputComponent implements OnInit {

    @Input() highlightDouble: boolean;
    @Input() highlightTriple: boolean;
    @Output() hit = new EventEmitter<number>();
    @Output() miss = new EventEmitter<void>();
    @Output() doubleTapped = new EventEmitter<void>();
    @Output() tripleTapped = new EventEmitter<void>();

    columnWidth = platformModule.screen.mainScreen.widthDIPs / 5;

    constructor() {
    }

    ngOnInit() {
    }

    onTapValue(value: number) {
        this.hit.emit(value);
    }

    onTapDouble() {
        this.doubleTapped.emit();
    }
    onTapTriple() {
        this.tripleTapped.emit();
    }
    onTapBull() {
        this.hit.emit(25);
    }

    onTapMiss() {
        this.miss.emit();
    }
}
