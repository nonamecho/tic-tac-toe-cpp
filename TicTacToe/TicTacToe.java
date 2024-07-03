import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

class TicTacToe {
    public static int gridSizeLowLimit = 3;
    public static int gridSizeHighLimit = 10;
    private int gridSize;
    private int accToWinSize;
    private int placeCount;
    private Chess[][] grid;
    private Chess currentTurn;

    private void init(int gridSize, int accToWinSize){
        this.gridSize = gridSize;
        this.accToWinSize = accToWinSize;
        placeCount = 0;
        grid = new Chess[gridSize][gridSize];
        currentTurn = Chess.O;
    }

    private Boolean checkWin(int row, int column){
        int rowAcc = 0;
        int colAcc = 0;
        int diagAcc = 0;
        int antiDiagAcc = 0;
        for(int checkNum = 0; checkNum < gridSize; checkNum++){
            if(grid[row][checkNum] == currentTurn){
                rowAcc++;
                if(rowAcc==accToWinSize){
                    return true;
                }
            }else{
                rowAcc = 0;
            }
            if(grid[checkNum][column] == currentTurn){
                colAcc++;
                if(colAcc==accToWinSize){
                    return true;
                }
            }else{
                colAcc = 0;
            }
            if(grid[checkNum][checkNum] == currentTurn){
                diagAcc++;
                if(diagAcc==accToWinSize){
                    return true;
                }
            }else{
                diagAcc = 0;
            }
            if(grid[checkNum][gridSize - 1 -checkNum] == currentTurn){
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

    private void changePlayer(){
        if(currentTurn == Chess.O){
            currentTurn = Chess.X;
        }
        else{
            currentTurn = Chess.O;
        }
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
        init(gridSize, accToWinSize);
        drawGrid();

        // Play game
        while (true) {
            System.out.println("Now is " + currentTurn + " turn. Please choose the avilable number on grid");
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
                        // Place Chess
                        grid[rowAndCol[0]][rowAndCol[1]] = currentTurn; 
                        placeCount++;
                        drawGrid();

                        if(checkWin(rowAndCol[0], rowAndCol[1])){
                            System.out.println("Player " + currentTurn + " win!");
                            break;
                        }else if(placeCount == gridSize* gridSize){
                            System.out.println("Draw game!");
                            break;
                        }else{
                            changePlayer();
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
