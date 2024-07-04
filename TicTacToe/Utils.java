import java.util.Collections;

public class Utils {
    public static int[] placementToRowAndCol(int placement, int gridSize){
        int row;
        int column;

        if(placement % gridSize == 0){
            row = placement/gridSize - 1;
            column = gridSize - 1;
        }else{
            row = placement / gridSize;
            column = placement % gridSize - 1;
        }
        int[] output = {row, column};
        return output;
    }

    public static int rowAndColToPlacement(int row, int column, int gridSize){
        return row * gridSize + column + 1;
    }

    public static void printContentNTimes(String content, int time, boolean newLine){
        String printable = String.join("", Collections.nCopies(time, content));
        if(newLine){
            System.out.println(printable);
        }else{
            System.out.print(printable);
        }
    }

    public static void printChessWithEmptySpace(String content, int space){
        if(content.length() > space){
            throw new IllegalArgumentException();
        }
        printContentNTimes(" ", space - content.length(), false);
        System.out.print(content);
    }

    public static int getPlaceCount(Chess[][]grid){
        int counter = 0;
        for(int i = 0; i < grid.length; i++){
            for (int j = 0; j < grid.length; j++){
                if(grid[i][j]!=null){
                    counter++;
                }
            }
        }
        return counter;
    }

    public static Chess[][] deepCloneGrid(Chess[][] grid){
        Chess[][] clone = new Chess[grid.length][grid.length];
        for(int i = 0; i < grid.length; i++){
            for(int j = 0; j < grid.length; j++){
                clone[i][j] = grid[i][j];
            }
        }
        return clone;
    }
}
