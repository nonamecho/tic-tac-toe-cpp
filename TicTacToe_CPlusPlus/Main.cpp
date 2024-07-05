#include <iostream>
#include <vector>
#include <string>
using namespace std;
static int GRID_SIZE_LOW = 3;
static int GRID_SIZE_HIGH = 5;

// from Enum.java
enum PlayMode{
    SINGLE_PLAYER,
    TWO_PLAYERS
};

enum Chess{
    O,
    X,
    B
};

// from Utils.java
static vector<int> placementToRowAndCol(int placement, int gridSize){
    vector<int> output;

    if(placement % gridSize == 0){
        output.push_back(placement/gridSize - 1);
        output.push_back(gridSize - 1);
    }else{
        output.push_back(placement / gridSize);
        output.push_back(placement % gridSize - 1);
    }

    return output;

};

static int rowAndColToPlacement(int row, int column, int gridSize){
    return row * gridSize + column + 1;
};

void printContentNTimes(string content, int time, bool newLine){
    for(int i = 0; i < time; i++){
        cout << content;
    }
    if(newLine){
        cout << endl;
    }
};

void printChessWithEmptySpace(string content, int space){
    if(content.length() > space){
        throw invalid_argument("content should not greater than space");
    }
    
    printContentNTimes(" ", space - content.length(), false);
    cout << content;
};

static int getPlaceCount(vector<vector<Chess> > grid){
    int counter = 0;
        for(int i = 0; i < grid.size(); i++){
            for (int j = 0; j < grid.size(); j++){
                if(grid[i][j]!=B){
                    counter++;
                }
            }
        }
        return counter;
};

static vector<vector<Chess> > deepCloneGrid(vector<vector<Chess> > grid){
     vector<vector<Chess> > clone;
        for(int i = 0; i < grid.size(); i++){
            for(int j = 0; j < grid.size(); j++){
                clone[i][j] = grid[i][j];
            }
        }
        return clone;
}

static vector<vector<Chess> > generateGrid(int gridSize){
    vector<vector<Chess> > output;
    for(int i = 0; i < gridSize; i++){
        vector<Chess> rowVector;
        for (int j = 0; j < gridSize; j++){
            rowVector.push_back(B);
        }
        output.push_back(rowVector);
    }
    return output;
}

// from Main.java
static PlayMode choosePlayMode(){
     while(true){
        int input;
        cout << "Single player or two players? (1/2)" << endl;
        cin >> input;
        if(input == 1){
            return SINGLE_PLAYER;
        }else if(input == 2){
            return TWO_PLAYERS;
        }else{
            cout << "***Invalid Input" << endl;
        }
        cin.clear();
        cin.ignore(1000,'\n');
    }
};

static int chooseGridSize(){
      while(true){
        int input;
        cout << "please input a grid size (" << GRID_SIZE_LOW << " - " << GRID_SIZE_HIGH << ")" << endl;
        cin >> input;
        if(input < GRID_SIZE_LOW || input > GRID_SIZE_HIGH){
            cout << "***Out of range" << endl;
        }else {
            return input;
        }
        cin.clear();
        cin.ignore(1000,'\n');
    }
}

static int chooseAccToWinSize(int gridSize){
     while(true){
        int input;
        cout << "please input a accumulate to win size (within " << GRID_SIZE_LOW << " and grid size)" << endl;
        cin >> input;
        if(input < GRID_SIZE_LOW || input > gridSize){
            cout << "***Out of range" << endl;
        }else {
            return input;
        }
        cin.clear();
        cin.ignore(1000,'\n');
    }
}

static bool choosePlayAgain(){
      while(true){
        char input;
        cout << "Play again? (Y/N)";
        cin >> input;
        if(input == 'Y' || input == 'y'){
            return true;
        }else if(input == 'N' || input == 'n'){
            return false;
        }
        cout << "***Invalid input";
        cin.clear();
        cin.ignore(1000,'\n');
    }
}

// from TicTacToe.java
class TicTacToe{
    public:
        int gridSize;
        int accToWinSize;
        int placeCount;
        vector<vector<Chess> > grid;
        Chess player;
    public:
        void init(int gridSize, int accToWinSize, vector<vector<Chess> > grid, Chess player){
            this->gridSize = gridSize;
            this->accToWinSize = accToWinSize;
            this->grid = grid;
            this->player = player;
            placeCount = 0;
        }
    public:
        bool checkWin(int row, int column){
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
    public:
        bool checkDraw(){
            return placeCount == gridSize * gridSize;
        }
    public:
        void togglePlayer(){
            player = player == O? X: O;
        };
    public:
        void placeChess(int row, int column){
             grid[row][column] = player; 
             placeCount++;
        };
    public:
        void removeChess(int row, int column){
             grid[row][column] = B;
             placeCount--;
        };
    public:
        void drawGrid(){
            for (int i = 0; i < gridSize; i++){
                for(int j = 0; j < gridSize; j++){
                    if(grid[i][j] != B){
                        string printable = grid[i][j] == O? "O": "X";
                        printChessWithEmptySpace(printable, 3);
                    }else{
                        printChessWithEmptySpace(to_string(rowAndColToPlacement(i,j,gridSize)),3);
                    }

                    if(j != gridSize-1){
                        printContentNTimes("|", 1, false);
                    }
                }
                printContentNTimes("", 1, true);
                if(i != gridSize -1){
                    printContentNTimes("----", gridSize, true);
                }
            }
        };
};

// from Main.java
int main(){
   TicTacToe game;

   // greeting
   cout << "Welcome to Tic Tac Toe!" << endl;
   
   while(true){
    // Choose play mode
   choosePlayMode();

   // Choose grid size
   int gridSize = chooseGridSize();

   // Choose acc to win size
   int accToWinSize = chooseAccToWinSize(gridSize);

   // Start new game
   // Preparation
   vector<vector<Chess> > grid = generateGrid(3);
   game.init(gridSize,accToWinSize,grid, O);
   game.drawGrid();

   while(true){
    vector<int> rowAndCol;
    int placement;
    cout << "Now is " << game.player << " turn. Please choose the available number on grid" << endl;
    cin >> placement;
    if(placement < 1 || placement > gridSize * gridSize){
        cout << "***Out of range!" << endl;
        continue;
    }else{
        rowAndCol = placementToRowAndCol(placement, gridSize);
        if(game.grid[rowAndCol[0]][rowAndCol[1]] != B){
            cout << "***Not available!" << endl;
        }
    }
    game.placeChess(rowAndCol[0], rowAndCol[1]);
    game.drawGrid();

    if(game.checkWin(rowAndCol[0],rowAndCol[1])){
        cout << "Player " << game.player << " win!" << endl;
        break;
    }else if(game.checkDraw()){
        cout << "Draw game!" << endl;
        break;
    }else{
        game.togglePlayer();
    };
   }
 
   // Ask play again
    if(!choosePlayAgain()){
        break;
    }
   }
   
   

   cout << "Thanks for playing" << endl;
}