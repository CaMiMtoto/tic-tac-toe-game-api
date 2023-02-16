"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let playGame = (board) => {
    if (board.length !== 9) {
        return {
            message: "Invalid tic-tac-toe board length (9 characters required !)",
            code: 400
        };
    }
    // board characters (x,o,space) allowed
    let allMatch = board.match(/^[xo ]+$/g) !== null;
    if (!allMatch) {
        return {
            message: "Invalid tic-tac-toe board characters (x,o,space) allowed !",
            code: 400
        };
    }
    const turns = Array.from(board).map((char) => char.charCodeAt(0));
    if (checkWinner(turns, 'X')) {
        return {
            message: "Player win a game !",
            code: 200
        };
    }
    if (checkWinner(turns, 'O')) {
        return {
            message: "Rival win a game !",
            code: 200
        };
    }
    return {
        message: buildNewBoard(board, turns),
        code: 200
    };
};
let buildNewBoard = (board, turns) => {
    const index = checkPossibleRivalWin(turns);
    //If index greater than -1 means that we found line that contains 2 rival positions we need to replace remaining space with o
    if (index > -1) {
        return board.substring(0, index) + 'O' + board.substring(index + 1);
    }
    const nextMoveIndex = checkPossibleNextMoveIndex(turns);
    //If index greater than -1 mean that we have free line to play and win the game
    // We do this after checking our rival potential move which can lead to their win
    if (nextMoveIndex > -1) {
        return board.substring(0, nextMoveIndex) + 'O' + board.substring(nextMoveIndex + 1);
    }
    //Else we check if there is any remaining place to play
    const position = getPlayerEmptyPosition(turns);
    //If position greater than one means that we found empty position
    if (position > -1) {
        return board.substring(0, position) + 'O' + board.substring(position + 1);
    }
    //Finally, if none of above conditions succeeded we return the normal board
    return board;
};
let checkPossibleRivalWin = (turns) => {
    const moveWinIndex = getPossibleNextMoveWinIndex();
    const combinationIndex = getPossibleCombinationIndex();
    for (const players of moveWinIndex) {
        for (const indexes of combinationIndex) {
            const validRow = checkValidRow(turns, indexes, players);
            const emptyPosition = getPlayerEmptyPosition(players);
            if (validRow && emptyPosition >= 0) {
                return indexes[emptyPosition];
            }
        }
    }
    return -1;
};
let checkPossibleNextMoveIndex = (turns) => {
    const playIndex = getPossibleToPlayIndex();
    const possibleCombinationIndex = getPossibleCombinationIndex();
    for (const players of playIndex) {
        for (const indexes of possibleCombinationIndex) {
            const validRow = checkValidRow(turns, indexes, players);
            if (validRow) {
                const emptyPosition = getPlayerEmptyPosition(players);
                if (emptyPosition >= 0) {
                    return indexes[emptyPosition];
                }
            }
        }
    }
    return -1;
};
let getPlayerEmptyPosition = (players) => {
    let index = 0;
    for (const player of players) {
        if (player === ' '.charCodeAt(0)) {
            return index;
        }
        index++;
    }
    return -1;
};
// This function receive board characters array and indexes and play characters (x,o,space) to check their position and existence on row
let checkValidRow = (turns, indexes, plays) => {
    let index = 0;
    for (const play of plays) {
        if (turns[indexes[index]] !== play) {
            return false;
        }
        index++;
    }
    return true;
};
//Get all possibilities where rival can can win a game
let getPossibleNextMoveWinIndex = () => {
    return [
        ['X'.charCodeAt(0), 'X'.charCodeAt(0), ' '.charCodeAt(0)],
        [''.charCodeAt(0), 'X'.charCodeAt(0), 'X'.charCodeAt(0)],
        ['X'.charCodeAt(0), ' '.charCodeAt(0), 'X'.charCodeAt(0)],
    ];
};
//Get all possibilities where you have two empty spaces to play
let getPossibleToPlayIndex = () => {
    return [
        ['O'.charCodeAt(0), ' '.charCodeAt(0), ' '.charCodeAt(0)],
        [' '.charCodeAt(0), 'O'.charCodeAt(0), ' '.charCodeAt(0)],
        [' '.charCodeAt(0), ' '.charCodeAt(0), 'O'.charCodeAt(0)],
    ];
};
let getPossibleCombinationIndex = () => {
    return [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6], // Player wins on the second diagonal line of tic-tac-toe board
    ];
};
function checkWinner(turns, player) {
    const players = [player.charCodeAt(0), player.charCodeAt(0), player.charCodeAt(0)];
    const combinationIndex = getPossibleCombinationIndex();
    return combinationIndex.some(indexes => checkValidRow(turns, indexes, players));
}
function charToNum(char) {
    return char === 'x' ? 1 : char === 'o' ? 2 : 0;
}
exports.default = playGame;
