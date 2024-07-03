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
                int num = i*this.gridSize+j+1;
                System.out.print("  ");
                if(this.grid[i][j]!= null){
                    System.out.print(" " + this.grid[i][j] + " ");
                }else{
                     if(num<100){
                        System.out.print(" ");
                    }
                    System.out.print(num);
                    if(num<10){
                        System.out.print(" ");
                    }
                }
                
                System.out.print("  ");
                if(j != this.grid[i].length-1){
                System.out.print("|");
            }
            }
            System.out.println("");
            if(i != this.grid.length-1){
                System.out.println(String.join("", Collections.nCopies(this.grid.length, "--------")));
            }
        }
    }

    public void play() throws IOException{
        drawGrid();

        while (true) {
            System.out.println("Now is " + currentTurn + " turn. Please choose the avilable number on grid");
            // action in turn
            BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
            String input = reader.readLine();
            try{
                int row;
                int column;
                int choice = Integer.parseInt(input);
                if(choice < 1 || choice > gridSize * gridSize){
                    System.out.println("***Out of range!");
                    continue;
                }else{
                    if(choice%gridSize==0){
                        row = choice/gridSize - 1;
                        column = gridSize - 1;
                    }else{
                        row = choice/gridSize;
                        column = choice%gridSize-1;
                    }
                    if(this.grid[row][column] != null){
                        System.out.println("***Not available!");
                        continue;
                    }else{
                        this.grid[row][column] = currentTurn; 
                        placeCount++;
                        drawGrid();

                        if(checkWin(row, column)){
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
