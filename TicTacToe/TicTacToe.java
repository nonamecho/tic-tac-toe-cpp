import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Collections;

class TicTacToe {
    static int gridSizeLowLimit = 3;
    static int gridSizeHighLimit = 10;
    int gridSize;
    int accToWinSize;
    int placeCount;
    Chess[][] grid;
    Chess currentTurn;

    public TicTacToe(int gridSize, int accToWinSize){
        this.gridSize = gridSize;
        this.accToWinSize = accToWinSize;
        this.placeCount = 0;
        this.grid = new Chess[gridSize][gridSize];
        this.currentTurn = Chess.O;
    }

    public Boolean checkWin(int row, int column){
        int rowAcc = 0;
        int colAcc = 0;
        int diagAcc = 0;
        int antiDiagAcc = 0;
        for(int checkNum = 0; checkNum < this.gridSize; checkNum++){
            if(this.grid[row][checkNum] == this.currentTurn){
                rowAcc++;
            }
            if(this.grid[checkNum][column] == this.currentTurn){
                colAcc++;
            }
            if(this.grid[checkNum][checkNum] == this.currentTurn){
                diagAcc++;
            }
            if(this.grid[checkNum][this.gridSize - 1 -checkNum] == this.currentTurn){
                antiDiagAcc++;
            }
     
            if(checkNum == this.gridSize - 1){
                if(rowAcc>=this.accToWinSize || colAcc>=this.accToWinSize || diagAcc>=this.accToWinSize || antiDiagAcc>=this.accToWinSize){
                    return true;
                }
            }
        }
        return false;
    }

    public void changePlayer(){
        if(this.currentTurn == Chess.O){
            this.currentTurn = Chess.X;
        }
        else{
            this.currentTurn = Chess.O;
        }
    }

    public void drawGrid(){
        for (int i = 0; i < this.gridSize; i++){
            for(int j = 0; j < this.gridSize; j++){
                if(this.grid[i][j]!= null){
                    Utils.printChessWithEmptySpace(this.grid[i][j].toString(), 3);
                }else{
                    Utils.printChessWithEmptySpace(Integer.toString(Utils.rowAndColToPlacement(i, j, gridSize)), 3);
                }
                
                if(j != this.grid[i].length-1){
                    Utils.printContentNTimes("|",1, false);
            }
            }
            Utils.printContentNTimes("",1, true);
            if(i != this.gridSize-1){
                Utils.printContentNTimes("----", this.gridSize, true);
            }
        }
    }

    public void play() throws IOException{
        drawGrid();

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
                    if(this.grid[rowAndCol[0]][rowAndCol[1]] != null){
                        System.out.println("***Not available!");
                        continue;
                    }else{
                        this.grid[rowAndCol[0]][rowAndCol[1]] = currentTurn; 
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
