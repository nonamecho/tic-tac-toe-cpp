import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

class Main{
    public static int chooseGridSize()throws IOException{
        while(true){
            System.out.println("please input a grid size (" + TicTacToe.GRID_SIZE_LOW + " - " + TicTacToe.GRID_SIZE_HIGH + ")");
            BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
            String input = reader.readLine();
            try{
                int output = Integer.parseInt(input);
                if(output < TicTacToe.GRID_SIZE_LOW || output > TicTacToe.GRID_SIZE_HIGH){
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
            System.out.println("please input a accumulate to win size (within " + TicTacToe.GRID_SIZE_LOW + " and grid size)");
            BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
            String input = reader.readLine();
            try{
                int output = Integer.parseInt(input);
                if(output < TicTacToe.GRID_SIZE_LOW || output > gridSize){
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

    public static boolean choosePlayAgain() throws IOException{
        while(true){
            System.out.println("Play again? (Y/N)");
            BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
            String input = reader.readLine().toLowerCase();

            if(input.equals("y")){
                return true;
            }else if(input.equals("n")){
                return false;
            }else{
                System.out.println("***Invlid input");
            }
        }
    }
    
    public static void main(String[] args) throws IOException  {        
        // Create the game object
        TicTacToe game = new TicTacToe();

        // greeting
        System.out.println("Welcome to Tic Tac Toe!"); 

        while (true) {
        // Choose grid size
        int gridSize = chooseGridSize();

         // Choose acc to win size
        int accToWinSize = chooseAccToWinSize(gridSize);

        // Start new game
         // Preparation
         game.init(gridSize, accToWinSize, new Chess[gridSize][gridSize], Chess.O);
         game.drawGrid();
 
         // Play game
         while (true) {
             System.out.println("Now is " + game.player + " turn. Please choose the avilable number on grid");
             BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
             String input = reader.readLine();
             try{
                 int placement = Integer.parseInt(input);
                 if(placement < 1 || placement > gridSize * gridSize){
                     System.out.println("***Out of range!");
                     continue;
                 }else{
                     int[] rowAndCol = Utils.placementToRowAndCol(placement, gridSize);
                     if(game.grid[rowAndCol[0]][rowAndCol[1]] != null){
                         System.out.println("***Not available!");
                         continue;
                     }else{
                         game.placeChess(rowAndCol[0],rowAndCol[1]);
                         game.drawGrid();
 
                         if(game.checkWin(rowAndCol[0], rowAndCol[1])){
                             System.out.println("Player " + game.player + " win!");
                             break;
                         }else if(game.placeCount == gridSize * gridSize){
                             System.out.println("Draw game!");
                             break;
                         }else{
                             game.togglePlayer();
                         }
                     }
                 }
             }catch(NumberFormatException e){
                 System.out.println("***Invalid input");
                 continue;
             }
             
         }

        // Ask play again
        if(!choosePlayAgain()){
            break;
        }
        }
        // ending
        System.out.println("Thanks for playing!"); 

 


    }
}