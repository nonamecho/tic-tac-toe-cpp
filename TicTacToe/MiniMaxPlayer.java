public class MiniMaxPlayer {
    private static final int MAX_DEPTH = 5;
    private int gridSize;
    private Chess player;
    private int[][] accMarks;

    private boolean evaluate(TicTacToe game, int depth, int row, int column, int masterRow, int masterColumn){
        if(game.grid[row][column]==null){
            game.placeChess(row, column);
    
            boolean isDraw = game.checkDraw();
            if(isDraw) return false;

            boolean isWin = game.checkWin(row, column);
            if(!isWin){
                if(depth<MAX_DEPTH){
                    game.togglePlayer(); // temp toggle player for passing to recursive miniMax to next level
                    miniMax(game, depth+1, masterRow, masterColumn);
                    game.togglePlayer(); // toggle back player
                }
                game.removeChess(row, column); // remove placed chess for next evaluation in same level
                return true;
            } 

            if(game.player == player){
                accMarks[masterRow][masterColumn] = accMarks[masterRow][masterColumn] + 1;
            }else{
                accMarks[masterRow][masterColumn] = accMarks[masterRow][masterColumn] - 1;
            }

            return false;
        }
        return true;
    }

    private void miniMax(TicTacToe evaluateGame, int depth, int masterRow, int masterColumn){ 
        TicTacToe cloneEvaluateGame = new TicTacToe();
        cloneEvaluateGame.init(evaluateGame.gridSize, evaluateGame.gridSize, Utils.deepCloneGrid(evaluateGame.grid), evaluateGame.player);
        
        outerloop:
        for(int i = 0; i < gridSize; i++){
            for(int j = 0; j < gridSize; j++){
                if(cloneEvaluateGame.grid[i][j]==null){
                    boolean evaluateResult;

                    if(depth==0){
                        evaluateResult = evaluate(cloneEvaluateGame, depth, i, j, i, j);
                    }else{
                        evaluateResult = evaluate(cloneEvaluateGame, depth, i, j, masterRow, masterColumn);
                    }
                   
                    if(depth>MAX_DEPTH || !evaluateResult){
                        break outerloop;
                    }
                    
                }
            }
        }
    }

    public int[] getBestMove(TicTacToe game){
        this.gridSize = game.gridSize;
        this.player = game.player;
        this.accMarks = new int[game.gridSize][game.gridSize];

        // Run mini max algorithm for each layer and cases, accumalate the marks
        miniMax( game, 0, -1, -1);

        // Find the best move by the accumalated marks
        int[] bestMove = {-1, -1};

        for(int i = 0; i < game.gridSize; i++){
            for(int j = 0; j < game.gridSize; j++){
                if(game.grid[i][j]== null){
                    if((bestMove[0] == -1 && bestMove[1] == -1) || (accMarks[i][j]>accMarks[bestMove[0]][bestMove[1]])){
                        bestMove[0] = i;
                        bestMove[1] = j;
                    }
                }
            }
        }
        
        return bestMove;
    }
}
