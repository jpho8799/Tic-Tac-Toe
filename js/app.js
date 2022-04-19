
const gameBoard = ()=>{
    'use strict';
    const boardAry = new Array(9).fill(null);
    const boardTiles = Array.from(document.querySelectorAll(".board_tiles"));

    const updateBoard = ()=>{
        boardTiles.forEach((tile, index)=>{
            if(boardAry[index]=== null){
                tile.textContent = "__";
            }else{
                tile.textContent = boardAry[index];
            }
        })
    }

    const clearBoard = ()=>{
        boardAry.fill(null);
        boardTiles.forEach((tile)=>{
            tile.classList.remove("board_tiles_winner");
        })
        updateBoard();
    }

    const playerMove = (player, index)=>{
        boardAry[index] = player;
        updateBoard();
    }

    const winner = (winningAry)=>{
        winningAry.forEach((index)=>{
            boardTiles[index].classList.add("board_tiles_winner");
        })
        
    }

    return {boardTiles,clearBoard, playerMove, winner, boardAry}
}
const game = (()=>{
    const boardTiles = document.querySelectorAll(".board_tiles");
    const restart = document.getElementById("restart");
    let board = gameBoard();
    let turn = "X";
    let winningAry = [];
    const winningMoves = [ 
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]


    const nextTurn = ()=>{
        let nextTurn = turn === "X" ? "O" : "X";
        turn = nextTurn;
    }

    const checkforWinner = ()=>{
        winningMoves.forEach((subAry)=>{
            const [a,b,c] = subAry;
            if(board.boardAry[a] === board.boardAry[b] && board.boardAry[b] === board.boardAry[c] && board.boardAry[a] != null){
                winningAry = subAry;
            }
        })

       
    }


    restart.addEventListener('click', ()=>{
        turn = "X";
        winningAry = [];
        board.clearBoard();
    })
    
    boardTiles.forEach((tile)=>{
        tile.addEventListener('click', ()=>{
            const index = tile.dataset.index;
            console.log(board.boardAry[index]);
            if(board.boardAry[index] == null && winningAry.length === 0){
                board.playerMove(turn, index);
                checkforWinner();
                if(winningAry.length > 0){
                    board.winner(winningAry);
                
                }else{
                    board.playerMove(turn, index);
                    nextTurn();
                }
                
            }
            

        })
    })


    

})();



