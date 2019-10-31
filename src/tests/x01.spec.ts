import {double, miss, single, X01} from "~/app/games/x01";

describe("X01", function () {
    let game: X01;
    beforeEach(() => {
        game = new X01(['alice', 'bob'], 501);
    });

    describe('initial state', () => {
        it("initializes scores", function () {
            expect(game.state.scores).toEqual([501, 501]);
        });

        it("starts with the first player", function () {
            expect(game.state.currentPlayer).toEqual(0);
        });
    });

    describe('hit', () => {
        it('updates the current player score', () => {
            game.perform(single(10));
            expect(game.state.scores).toEqual([491, 501]);
        });

        it('changes the current player after 3 hits', () => {
            game.perform(single(10));
            expect(game.state.currentPlayer).toBe(0);

            game.perform(single(10));
            expect(game.state.currentPlayer).toBe(0);

            game.perform(single(10));
            expect(game.state.currentPlayer).toBe(1);
        });

        it('does not change scores and moves to the next player when burned', () => {
            game.perform(single(1000));
            expect(game.state.scores).toEqual([501, 501]);
            expect(game.state.currentPlayer).toBe(1);
        });

        it('sets the winner when player lands on 0', () => {
            game.perform(single(1));
            game.perform(double(250));  // It's a miracle
            expect(game.state.winner).toEqual(0);
        });

        it('does not change state when there already is a winner', () => {
            game.perform(single(1));
            game.perform(double(250));  // It's a miracle
            expect(game.state.winner).toEqual(0);

            game.perform(single(1));
            expect(game.state.winner).toEqual(0);
            expect(game.state.currentPlayer).toEqual(0);

            game.perform(single(1));
            expect(game.state.currentPlayer).toEqual(0);
        });

        it('burns user if remaining value = 1', () => {
            game.perform(single(500));

            expect(game.state).toEqual({
                currentPlayer: 1,
                currentTurnMoves: 0,
                scores: [ 501, 501 ],
                winner: undefined
            })
        });
    });

    describe('miss', () => {
        it('updates currentTurnMoves', () => {
           game.perform(miss());
           expect(game.state.currentTurnMoves).toBe(1);
        });
        it('moves to the next player after 3 turns', () => {
           game.perform(miss());
           game.perform(miss());
           game.perform(miss());
           expect(game.state.currentTurnMoves).toBe(0);
           expect(game.state.currentPlayer).toBe(1);
        });
    });

});
