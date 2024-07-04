#include <iostream>
#include <vector>
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
//TODO
static vector<int> placementToRowAndCol(int placement, int gridSize){};

//TODO
static int rowAndColToPlacement(int row, int column, int gridSize){};

//TODO
void printContentNTimes(string content, int time, bool newLine){};

//TODO
void printChessWithEmptySpace(string content, int space){};

//TODO
static int getPlaceCount(vector<vector<Chess> >){};

//TODO
static vector<vector<Chess> > deepCloneGrid(vector<vector<Chess> > grid){}

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

// TODO
static int chooseGridSize(){
    return 0;
}

// TODO
static int chooseAccToWinSize(){
    return 0;
}

// TODO
static bool choosePlayAgain(){
    return false;
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
    // TODO
    public:
        bool checkWin(){
            return false;
        }
    // TODO
    public:
        bool checkDraw(){
            return false;
        }
    // TODO
    public:
        void togglePlayer(){};
    // TODO
    public:
        void playChess(){};
    // TODO
    public:
        void removeChess(){};
    // TODO
    public:
        void drawGrid(){};
};

// from Main.java
int main(){
   TicTacToe game;

   // greeting
   cout << "Welcome to Tic Tac Toe!" << endl;
   // Choose play mode
   choosePlayMode();

   // Choose grid size
   int gridSize = chooseGridSize();

   // Choose acc to win size
   int accToWinSize = chooseAccToWinSize();

   // Start new game
   // Preparation
   vector<vector<Chess> > grid = generateGrid(3);
   game.init(gridSize,accToWinSize,grid, O);
   game.drawGrid();

   // TODO: Playgame
   while(true){

   // Ask play again
    if(!choosePlayAgain()){
        break;
    }
   }

   

   cout << "Thanks for playing" << endl;
}