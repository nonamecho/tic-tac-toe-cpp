public class MinMaxPlayer {
    private static final int MAX_DEPTH = 6;
    private TicTacToe cloneGame;
    private int[][] accMarks;

    private void minMax(TicTacToe evaluateGame, int checkDepth, int masterRow, int masterColumn){ 
        TicTacToe cloneEvaluateGame = new TicTacToe();
        cloneEvaluateGame.init(evaluateGame.gridSize, evaluateGame.gridSize, Utils.deepCloneGrid(evaluateGame.grid), evaluateGame.player);
        
        outerloop:
        for(int i = 0; i < cloneGame.gridSize; i++){
            for(int j = 0; j < cloneGame.gridSize; j++){
                if(cloneEvaluateGame.grid[i][j]==null){
                    cloneEvaluateGame.placeChess(i, j);
                    boolean isWin = cloneEvaluateGame.checkWin(i, j);
                    if(isWin){
                        if(cloneEvaluateGame.player == cloneGame.player){
                            if(checkDepth == 0){
                                accMarks[i][j] = accMarks[i][j] + 1;
                            }else{
                                accMarks[masterRow][masterColumn] = accMarks[masterRow][masterColumn] + 1;
                            }
                        }else{
                            if(checkDepth == 0){
                                accMarks[i][j] = accMarks[i][j] - 1;
                            }else{
                                accMarks[masterRow][masterColumn] = accMarks[masterRow][masterColumn] - 1;

                            }
                        }
                        break outerloop;
                    }
                    if(checkDepth>MAX_DEPTH){
                        break outerloop;
                    }
                    
                    if(checkDepth<MAX_DEPTH){
                        int newDepth = checkDepth + 1;
                        cloneEvaluateGame.togglePlayer();
                        if(checkDepth==0){
                            minMax(cloneEvaluateGame, newDepth, i, j);
                        }else{
                            minMax(cloneEvaluateGame, newDepth, masterRow, masterColumn);
                        }
                        cloneEvaluateGame.togglePlayer();
                    }
                    cloneEvaluateGame.removeChess(i, j);
                }
            }
        }
       
    }

    public int[] getBestPlacement(TicTacToe game){
        cloneGame = new TicTacToe();
        cloneGame.init(game.gridSize, game.accToWinSize, Utils.deepCloneGrid(game.grid), game.player);
        this.accMarks = new int[game.gridSize][game.gridSize];

        // Run mini max algorithm for each layer and cases, accumalate the marks
        minMax( game, 0, -1, -1);

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
