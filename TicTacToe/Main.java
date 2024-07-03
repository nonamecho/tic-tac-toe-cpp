import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

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
        // greeting
        System.out.println("Welcome to Tic Tac Toe!"); 

        while (true) {
        // Choose grid size
        int gridSize = chooseGridSize();

         // Choose acc to win size
        int accToWinSize = chooseAccToWinSize(gridSize);

        // Start new game
        TicTacToe game = new TicTacToe(gridSize, accToWinSize);
        game.play();

        // Ask play again
        if(!choosePlayAgain()){
            break;
        }
        }
        // ending
        System.out.println("Thanks for playing!"); 

 


    }
}