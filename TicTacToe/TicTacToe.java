import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

class TicTacToe {
    static int gridSizeLowLimit = 3;
    static int gridSizeHighLimit = 10;
    int gridSize;
    int accToWinSize;
    int placeCount;
    Chess[][] grid;
    Chess currentTurn;

    public void init(int gridSize, int accToWinSize){
        this.gridSize = gridSize;
        this.accToWinSize = accToWinSize;
        placeCount = 0;
        grid = new Chess[gridSize][gridSize];
        currentTurn = Chess.O;
    }

    public Boolean checkWin(int row, int column){
        int rowAcc = 0;
        int colAcc = 0;
        int diagAcc = 0;
        int antiDiagAcc = 0;
        for(int checkNum = 0; checkNum < gridSize; checkNum++){
            if(grid[row][checkNum] == currentTurn){
                rowAcc++;
            }
            if(grid[checkNum][column] == currentTurn){
                colAcc++;
            }
            if(grid[checkNum][checkNum] == currentTurn){
                diagAcc++;
            }
            if(grid[checkNum][gridSize - 1 -checkNum] == currentTurn){
                antiDiagAcc++;
            }
     
            if(checkNum == gridSize - 1){
                if(rowAcc>=accToWinSize || colAcc>=accToWinSize || diagAcc>=accToWinSize || antiDiagAcc>=accToWinSize){
                    return true;
                }
            }
        }
        return false;
    }

    public void changePlayer(){
        if(currentTurn == Chess.O){
            currentTurn = Chess.X;
        }
        else{
            currentTurn = Chess.O;
        }
    }

    public void drawGrid(){
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
