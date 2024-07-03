public class MinMaxPlayer {
    private static final int MAX_DEPTH = 6;
    private TicTacToe game;
    private int[][] accMarks;
    private Chess player;

    private void minMax(Chess evaluatePlayer){
        for(int i = 0; i < game.gridSize; i++){
            for(int j = 0;j < game.gridSize; j++){
                int checkDepth = 0;
                if(game.grid[i][j]==null){
                    TicTacToe evaluateGame = new TicTacToe();
                    evaluateGame.init(game.gridSize, game.gridSize, game.grid, evaluatePlayer);
                    evaluateGame.placeChess(i, j);
                    boolean isWin = evaluateGame.checkWin(i, j);
                    if(isWin){
                        if(evaluatePlayer == player){
                            accMarks[i][j]++;
                        }else{
                            accMarks[i][j]--;
                        }
                    }
                    if(checkDepth<MAX_DEPTH){
                        minMax(evaluatePlayer==Chess.O?Chess.X:Chess.O);
                    }
                }
            }
        }
    }

    public int[] getBestPlacement(Chess player, Chess[][] grid, int accToWinSize){
        game = new TicTacToe();
        game.init(grid.length, accToWinSize, grid, player);
        this.accMarks = new int[grid.length][grid.length];
        this.player = player; 

        // Run mini max algorithm for each layer and cases, accumalate the marks
        minMax(player);

        // Find the best move by the accumalated marks
        int[] bestMove = {0,0};

        for(int i = 0; i < game.gridSize; i++){
            for(int j = 0; j < game.gridSize; j++){
                if(accMarks[i][j]>=accMarks[bestMove[0]][bestMove[1]]){
                    bestMove[0] = i;
                    bestMove[1] = j;
                }
            }
        }
        
        return bestMove;
    }
}
