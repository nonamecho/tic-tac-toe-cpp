import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Collections;

enum Chess {
    X,
    O
}

class TicTacToe {
    static int gridSizeLowLimit = 3;
    static int gridSizeHighLimit = 10;
    int gridSize;
    int accToWinSize;
    Chess[][] grid;
    Chess currentTurn;

    public TicTacToe(int gridSize, int accToWinSize){
        this.gridSize = gridSize;
        this.accToWinSize = accToWinSize;
        this.grid = new Chess[gridSize][gridSize];
        this.currentTurn = Chess.O;
    }

    public Boolean isEndGame(){
        for (int i = 0; i < this.grid.length; i++){
            for(int j = 0; j < this.grid[i].length; j++){
                if(this.grid[i][j] == null){
                    return false;
                }
            }
        }
        return true;
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

    public Boolean placeChess(int row, int column){
        if(this.grid[row][column] != null){
            return false;
        }else{
            // place chess
            this.grid[row][column] = this.currentTurn; 
            return true;
        }
    }

    public void drawGrid(){
        for (int i = 0; i < this.gridSize; i++){
            for(int j = 0; j < this.gridSize; j++){
                int num = i*this.gridSize+j+1;
                System.out.print("  ");
                if(this.grid[i][j]!= null){
                    System.out.print("" + this.grid[i][j] + " ");
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
   
}

class Main{
    public static int chooseGridSize()throws IOException{
        while(true){
            System.out.println("please input a grid size (" + TicTacToe.gridSizeLowLimit + " - " + TicTacToe.gridSizeHighLimit + ")");
            BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
            String input = reader.readLine();
            try{
                int output = Integer.parseInt(input);
                if(output < TicTacToe.gridSizeLowLimit || output > TicTacToe.gridSizeHighLimit){
                    System.out.println("***Out of range");
                    continue;
                }
                return output;
            }catch(NumberFormatException e){
                System.out.println("***Invalid input");
                continue;
            } 
        }
    }

    public static int chooseAccToWinSize(int gridSize) throws IOException{
        while(true){
            System.out.println("please input a accumulate to win size (within " + TicTacToe.gridSizeLowLimit + " and grid size)");
            BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
            String input = reader.readLine();
            try{
                int output = Integer.parseInt(input);
                if(output < TicTacToe.gridSizeLowLimit || output > gridSize){
                    System.out.println("***Out of range");
                    continue;
                }
                return output;
            }catch(NumberFormatException e){
                System.out.println("***Invalid input");
                continue;
            } 
        }
    }
     public static void main(String[] args) throws IOException  {
        
        // greeting
        System.out.println("Welcome to Tic Tac Toe!"); 

        // Choose grid size
        int gridSize = chooseGridSize();

         // Choose acc to win size
        int accToWinSize = chooseAccToWinSize(gridSize);

        // Start new game
        TicTacToe game = new TicTacToe(gridSize, accToWinSize);
        game.drawGrid();

        while(true){
        // new turn instruction
        System.out.println("Now is " + game.currentTurn + " turn. Please choose the avilable number on grid");

        // action in turn
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String choiceInString = reader.readLine();
        int choice = Integer.parseInt(choiceInString);
        int row;
        int column;

        if(choice < 1 || choice > game.gridSize * game.gridSize){
            System.out.println("***Out of range!");
            continue;
        }else{
            if(choice%game.gridSize==0){
                row = choice/game.gridSize - 1;
                column = game.gridSize - 1;
            }else{
                row = choice/game.gridSize;
                column = choice%game.gridSize-1;
            }
        }

        if(!game.placeChess(row, column)){
            System.out.println("***Not available!");
            continue;
        }

        // draw grid
        game.drawGrid();

        if(game.checkWin(row, column)){
            System.out.println("Player " + game.currentTurn + " win!");
            break;
        }else if(game.isEndGame()){
            System.out.println("Draw game!");
            break;
        }else{
            game.changePlayer();
        }
        }

        // ending
        System.out.println("Thanks for playing!"); 

 


    }
}