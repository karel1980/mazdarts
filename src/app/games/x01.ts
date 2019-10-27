import {convertToParamMap} from "@angular/router";

enum ActionType {
    HIT, MISS
}

interface Action {
    type: ActionType;
    payload?: any;
}

interface HitAction extends Action {
    type: ActionType.HIT,
    payload: { value: number, multiplyer: number }
}
interface MissAction extends Action {
    type: ActionType.MISS
}

export const single = (value: number): Action => ({type: ActionType.HIT, payload: {multiplyer: 1, value}});
export const double = (value: number): Action => ({type: ActionType.HIT, payload: {multiplyer: 2, value}});
export const triple = (value: number): Action => ({type: ActionType.HIT, payload: {multiplyer: 3, value}});
export const miss = (): Action => ({type: ActionType.MISS});

interface GameState {
    scores: number[],
    currentPlayer: number,
    currentTurnMoves: number,
    winner: number;
}

const applyAction = (state: GameState, action: Action): GameState => {
    if (action.type == ActionType.HIT) {
        return applyHit(state, action as HitAction);
    }
    if (action.type == ActionType.MISS) {
        return applyMiss(state);
    }
};

function applyHit(state: GameState, action: HitAction): GameState {
    if (state.winner !== undefined) {
        return state;
    }
    let score = state.scores[state.currentPlayer];

    let hitValue = action.payload.value * action.payload.multiplyer;

    if (hitValue > score) {
        return {
            ...state,
            currentPlayer: (state.currentPlayer + 1) % state.scores.length,
            currentTurnMoves: 0
        };
    }

    return {
        ...state,
        scores: state.scores.map((item, index) => index == state.currentPlayer ? item - hitValue : item),
        currentPlayer: (state.currentPlayer + state.currentTurnMoves == 2 ? 1 : 0) % state.scores.length,
        currentTurnMoves: (state.currentTurnMoves + 1) % 3,
        winner: hitValue == score ? state.currentPlayer : undefined
    };
}

function applyMiss(state: GameState): GameState {
    if (state.winner !== undefined) {
        return state;
    }

    return {
        ...state,
        currentPlayer: (state.currentPlayer + state.currentTurnMoves == 2 ? 1 : 0) % state.scores.length,
        currentTurnMoves: (state.currentTurnMoves + 1) % 3
    }
}

export class X01 {
    state;

    constructor(public players: string[], private initialScore: number) {
        this.state = {
            scores: players.map(() => initialScore),
            currentPlayer: 0,
            currentTurnMoves: 0,
            winner: undefined
        };
    }

    perform(action: Action) {
        this.state = applyAction(this.state, action);
    }

}
