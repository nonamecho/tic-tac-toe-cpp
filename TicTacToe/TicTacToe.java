import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

class TicTacToe {
    public static final int GRID_SIZE_LOW = 3;
    public static final int GRID_SIZE_HIGH = 10;
    public int gridSize;
    public int accToWinSize;
    public int placeCount;
    public Chess[][] grid;
    public Chess player;

    public void init(int gridSize, int accToWinSize, Chess[][] grid, Chess player){
        this.gridSize = gridSize;
        this.accToWinSize = accToWinSize;
        this.grid = grid;
        this.player = player;
        placeCount = Utils.getPlaceCount(grid);
    }

    public boolean checkWin(int row, int column){
        int rowAcc = 0;
        int colAcc = 0;
        int diagAcc = 0;
        int antiDiagAcc = 0;
        for(int checkNum = 0; checkNum < gridSize; checkNum++){
            if(grid[row][checkNum] == player){
                rowAcc++;
                if(rowAcc==accToWinSize){
                    return true;
                }
            }else{
                rowAcc = 0;
            }
            if(grid[checkNum][column] == player){
                colAcc++;
                if(colAcc==accToWinSize){
                    return true;
                }
            }else{
                colAcc = 0;
            }
            if(grid[checkNum][checkNum] == player){
                diagAcc++;
                if(diagAcc==accToWinSize){
                    return true;
                }
            }else{
                diagAcc = 0;
            }
            if(grid[checkNum][gridSize - 1 -checkNum] == player){
                antiDiagAcc++;
                if(antiDiagAcc==accToWinSize){
                    return true;
                }
            }else{
                antiDiagAcc = 0;
            }
        }
        return false;
    }

    public void togglePlayer(){
        player = player == Chess.O? Chess.X: Chess.O;
    }

    public void placeChess(int row, int column){
        grid[row][column] = player; 
        placeCount++;
    }

    private void drawGrid(){
        for (int i = 0; i < gridSize; i++){
            for(int j = 0; j < gridSize; j++){
                if(grid[i][j]!= null){
                    Utils.printChessWithEmptySpace(grid[i][j].toString(), 3);
                }else{
                    Utils.printChessWithEmptySpace(Integer.toString(Utils.rowAndColToPlacement(i, j, gridSize)), 3);
                }
                
                if(j != grid[i].length-1){
                    Utils.printContentNTimes("|",1, false);
            }
            }
            Utils.printContentNTimes("",1, true);
            if(i != gridSize-1){
                Utils.printContentNTimes("----", gridSize, true);
            }
        }
    }

    public void play(int gridSize, int accToWinSize) throws IOException{
        // Preparation
        init(gridSize, accToWinSize, new Chess[gridSize][gridSize], Chess.O);
        drawGrid();

        // Play game
        while (true) {
            System.out.println("Now is " + player + " turn. Please choose the avilable number on grid");
            BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
            String input = reader.readLine();
            try{
                int placement = Integer.parseInt(input);
                if(placement < 1 || placement > gridSize * gridSize){
                    System.out.println("***Out of range!");
                    continue;
                }else{
                    int[] rowAndCol = Utils.placementToRowAndCol(placement, gridSize);
                    if(grid[rowAndCol[0]][rowAndCol[1]] != null){
                        System.out.println("***Not available!");
                        continue;
                    }else{
                        placeChess(rowAndCol[0],rowAndCol[1]);
                        drawGrid();

                        if(checkWin(rowAndCol[0], rowAndCol[1])){
                            System.out.println("Player " + player + " win!");
                            break;
                        }else if(placeCount == gridSize * gridSize){
                            System.out.println("Draw game!");
                            break;
                        }else{
                            togglePlayer();
                        }
                    }
                }
            }catch(NumberFormatException e){
                System.out.println("***Invalid input");
                continue;
            }
            
        }
        
    }

}
