public class MiniMaxPlayer {
    private static final int MAX_DEPTH = 6;
    private int gridSize;
    private Chess player;
    private int[][] accMarks;

    private void miniMax(TicTacToe evaluateGame, int checkDepth, int masterRow, int masterColumn){ 
        TicTacToe cloneEvaluateGame = new TicTacToe();
        cloneEvaluateGame.init(evaluateGame.gridSize, evaluateGame.gridSize, Utils.deepCloneGrid(evaluateGame.grid), evaluateGame.player);
        
        
        outerloop:
        for(int i = 0; i < gridSize; i++){
            for(int j = 0; j < gridSize; j++){
                if(cloneEvaluateGame.grid[i][j]==null){
                    cloneEvaluateGame.placeChess(i, j);
                    boolean isWin = cloneEvaluateGame.checkWin(i, j);
                    if(isWin){
                        if(cloneEvaluateGame.player == player){
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
                        if(checkDepth == 0){
                            miniMax(cloneEvaluateGame, newDepth, i, j);
                        }else{
                            miniMax(cloneEvaluateGame, newDepth, masterRow, masterColumn);
                        }
                        cloneEvaluateGame.togglePlayer();
                    }
                    cloneEvaluateGame.removeChess(i, j);
                }
            }
        }
       
    }
    
    public int[] getBestPlacement(TicTacToe game){
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
