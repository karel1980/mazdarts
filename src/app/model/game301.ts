
interface Game301 {
    players: string[];
    currentPlayer: number;
    commands: GameAction[]
}

interface GameAction {
    apply(game: Game301): Game301;
}
