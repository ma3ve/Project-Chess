let main = {

    variables: {
	  gameStatus : false, // shows wether the game is still running or the game is over
      turn : 'w', // shows which player's urn is it
	  selectedPiece : '', // stores the seleced piece on board
	  selectedCell : new Array(2), // stores the cell selected
	  previousMove : new Array(2), // stores the cells used in previous move
	  previousCheck : new Array(2), // stores the check position
	  rook11 : true, // tells if the piece has moved
	  rook18 : true, // tells if the piece has moved
	  king_w : true, // tells if the piece has moved
	  rook81 : true, // tells if the piece has moved
	  rook88 : true, // tells if the piece has moved
	  king_b : true, // tells if the piece has moved
      canMove : [], // stores the cells where a piece can move
      board : new Array(9),	// stores the board data
      pieces : { // different chess pieces assigned to there unicode values
        w_king: '&#9812;',
        w_queen: '&#9813;',
        w_bishop: '&#9815;',
        w_knight: '&#9816;',
        w_rook: '&#9814;',
        w_pawn: '&#9817;',
        b_king: '&#9818;',
        b_queen: '&#9819;',
        b_bishop: '&#9821;',
        b_knight: '&#9822;',
        b_rook: '&#9820;',
		b_pawn: '&#9823;',
		_ : '', // represents an empty cell
      }

    },

    methodes : {
		getPiece : function(row , col){ // return the type of piece that's selected
			return main.variables.board[row][col]; 
		},

		setPiece : function(row , col , piece){ // sets the piece type
			main.variables.board[row][col] = piece;
		},

		setPieceValue : function(row , col , piece){  // display the piece on board 
			document.querySelector(`.row${row}.col${col}`).innerHTML = main.variables.pieces[piece];
		},

        updateBoard : function(){ // updates the board
			for(let i = 1 ; i <= 8 ; i++){
				for(let j = 1 ; j <= 8 ; j++){
					let piece = this.getPiece(i , j);
					if(piece != "*"){
						this.setPieceValue(i , j , piece);
					}
					else{
						this.setPieceValue(i , j , "_");
					}
				}
			}
		},

		gameSetup : function(){ // initialises the game for the first time
			main.variables.previousCheck[0] = main.variables.previousCheck[1] = -1;

			for(let i = 0 ; i < 9 ; i++){ // created a 2D arry to store the board information
				main.variables.board[i] = new Array(9);
				for(let j = 0 ; j < 9 ; j++){
					this.setPiece(i , j , "*");
				}
			} 
			
			for(let i = 0 ; i < 2 ; i++){
				main.variables.previousMove[i] = new Array(2);
				for(let j = 0 ; j < 2 ; j++){
					main.variables.previousMove[i][j] = -1;
				}
			}

			main.variables.gameStatus = true;
			main.variables.rook11 = false;
			main.variables.rook18 = false;
			main.variables.king_w = false;
			main.variables.king_b = false;
			main.variables.rook81 = false;
			main.variables.rook88 = false;
			
			main.variables.board[1][1] = main.variables.board[1][8] = 'w_rook';
			main.variables.board[1][2] = main.variables.board[1][7] = 'w_knight';
			main.variables.board[1][3] = main.variables.board[1][6] = 'w_bishop';
			main.variables.board[1][4] = 'w_queen';
			main.variables.board[1][5] = 'w_king';

			main.variables.board[8][1] = main.variables.board[8][8] = 'b_rook';
			main.variables.board[8][2] = main.variables.board[8][7] = 'b_knight';
			main.variables.board[8][3] = main.variables.board[8][6] = 'b_bishop';
			main.variables.board[8][4] = 'b_queen';
			main.variables.board[8][5] = 'b_king';

			for(let i = 1 ; i <= 8 ; i++){
				main.variables.board[2][i] = 'w_pawn';
				main.variables.board[7][i] = 'b_pawn';
			}
			
			this.updateBoard();
		}, 

		clearCanMove : function(){ // removing all the revious cells where a pice could be moved
			let n = main.variables.canMove.length;

			// removing canMove class to all the cells that are eligibe to move
			for(let i = 0 ; i < n ; i++){
				let row = main.variables.canMove[i][0];
				let col = main.variables.canMove[i][1];
				selectedCell = document.querySelector(`.row${row}.col${col}`);
				if((row+col)%2){ // the cell is light color
					if(this.getPiece(row , col) != "*")
						selectedCell.classList.remove('canMoveLightCapture');
					else
						selectedCell.classList.remove('canMoveLight');
				}
				else{
					if(this.getPiece(row , col) != "*")
						selectedCell.classList.remove('canMoveDarkCapture');
					else
						selectedCell.classList.remove('canMoveDark');
				}
			}

			// deleting all the cell entries where the piece can be moved
			main.variables.canMove.splice(0 , main.variables.canMove.length);
		},

		updateCanMove : function(){ // adding all the cells on board where a piece can move
			let n = main.variables.canMove.length;
			for(let i = 0 ; i < n ; i++){
				// adding canMove class to the cells where the piece can move
				let row = main.variables.canMove[i][0];
				let col = main.variables.canMove[i][1];
				selectedCell = document.querySelector(`.row${row}.col${col}`);

				if((row+col)%2){ // the cell is light color
					if(this.getPiece(row , col) != "*")
						selectedCell.classList.add('canMoveLightCapture');
					else
						selectedCell.classList.add('canMoveLight');
				}
				else{
					if(this.getPiece(row , col) != "*")
						selectedCell.classList.add('canMoveDarkCapture');
					else
						selectedCell.classList.add('canMoveDark');
				}
			}
		},

		removePreviousMove : function(){ // removes the previous move from the board
			let prev = main.variables.previousMove;
			if((prev[0][0]+prev[0][1])%2)
				document.querySelector(`.row${prev[0][0]}.col${prev[0][1]}`).classList.remove('previousMoveLight');
			else	
				document.querySelector(`.row${prev[0][0]}.col${prev[0][1]}`).classList.remove('previousMoveDark');

			if((prev[1][0]+prev[1][1])%2)
				document.querySelector(`.row${prev[1][0]}.col${prev[1][1]}`).classList.remove('previousMoveLight');
			else	
				document.querySelector(`.row${prev[1][0]}.col${prev[1][1]}`).classList.remove('previousMoveDark');
		},

		addPreviousMove : function(){ // adds the selected move to the board
			let prev = main.variables.previousMove;
			if((prev[0][0]+prev[0][1])%2)
				document.querySelector(`.row${prev[0][0]}.col${prev[0][1]}`).classList.add('previousMoveLight');
			else	
				document.querySelector(`.row${prev[0][0]}.col${prev[0][1]}`).classList.add('previousMoveDark');

			if((prev[1][0]+prev[1][1])%2)
				document.querySelector(`.row${prev[1][0]}.col${prev[1][1]}`).classList.add('previousMoveLight');
			else	
				document.querySelector(`.row${prev[1][0]}.col${prev[1][1]}`).classList.add('previousMoveDark');
		},

		moveSelectedPiece : function(row , col){ // moves the selected piece on board
			let prevRow = main.variables.selectedCell[0];
			let prevCol = main.variables.selectedCell[1];

			// special castling conditions
				if(this.getPiece(row , col).charAt(0) == main.variables.turn){ 
					// king has been choosen to move, also the king wants to castle. Because the cell in which the king wants to moves also contains a piece of his type
					
					// right-castle
					if(col == 8){
						this.setPiece(prevRow , prevCol+1 , this.getPiece(row , col));
						this.setPiece(prevRow , prevCol+2 , this.getPiece(prevRow , prevCol));
						this.setPiece(prevRow , prevCol , "*");
						this.setPiece(row , col , "*");

						if(main.variables.turn == 'w'){
							main.variables.rook18 = true;
							main.variables.king_w = true;
						}
						else{
							main.variables.rook88 = true;
							main.variables.king_b = true;
						}
						//---------------------------------------------
						if(main.variables.previousMove[0][0] != -1){
							this.removePreviousMove();
						}
			
						main.variables.previousMove[0] = [prevRow , prevCol+1];
						main.variables.previousMove[1] = [prevRow , prevCol+2];
			
						this.addPreviousMove();
			
						this.updateBoard();

						if(main.variables.turn == 'w')
							main.variables.turn = 'b';
						else
							main.variables.turn = 'w';
						//----------------------------------------------

						return;
					}
					else if(col == 1){
						this.setPiece(prevRow , prevCol-1 , this.getPiece(row , col));
						this.setPiece(prevRow , prevCol-2 , this.getPiece(prevRow , prevCol));
						this.setPiece(prevRow , prevCol , "*");
						this.setPiece(row , col , "*");

						if(main.variables.turn == 'w'){
							main.variables.rook11 = true;
							main.variables.king_w = true;
						}
						else{
							main.variables.rook81 = true;
							main.variables.king_b = true;
						}
						//----------------------------------------------
						if(main.variables.previousMove[0][0] != -1){
							this.removePreviousMove();
						}
			
						main.variables.previousMove[0] = [prevRow , prevCol-1];
						main.variables.previousMove[1] = [prevRow , prevCol-2];
			
						this.addPreviousMove();
			
						this.updateBoard();

						if(main.variables.turn == 'w')
							main.variables.turn = 'b';
						else
							main.variables.turn = 'w';
						//----------------------------------------------

						return;
					}
				}
			//----------------------------------------------------------------------------------------

			// Normal movement
			this.setPiece(row , col , main.variables.selectedPiece);

			this.setPiece(prevRow, prevCol , "*");
 
			if(main.variables.previousMove[0][0] != -1){
				this.removePreviousMove();
			}

			main.variables.previousMove[0] = [prevRow , prevCol];
			main.variables.previousMove[1] = [row , col];

			this.addPreviousMove();

			this.updateBoard();

			if(main.variables.turn == 'w')
				main.variables.turn = 'b';
			else
				main.variables.turn = 'w';
			
			if(prevRow == 1 && prevCol == 1){
				main.variables.rook11 = true;
			}
			else if(prevRow == 1 && prevCol == 8){
				main.variables.rook18 = true;
			}
			else if(prevRow == 1 && prevCol == 5){
				main.variables.king_w = true;
			}
			else if(prevRow == 8 && prevCol == 1){
				main.variables.rook81 = true;
			}
			else if(prevRow == 8 && prevCol == 8){
				main.variables.rook88 = true;
			}
			else if(prevRow == 8 && prevCol == 5){
				main.variables.king_b = true;
			}
		},

		removePreviousSelectedCell : function(){ // removes the previously selected piece
			// cell row and col is selected
			let cell = main.variables.selectedCell;

			if(main.variables.selectedPiece != ''){
			// getting the div of previous selected cell and removing the selectedCell class from it
				let chosenCell = document.querySelector(`.row${cell[0]}.col${cell[1]}`);
				if((cell[0]+cell[1])%2)
					chosenCell.classList.remove('selectedCellLight');
				else	
					chosenCell.classList.remove('selectedCellDark');
			}

			main.variables.selectedPiece = '';
		},

		tempMove : function(prevRow , prevCol , nextRow , nextCol){
			this.setPiece(nextRow , nextCol , this.getPiece(prevRow , prevCol));
			this.setPiece(prevRow , prevCol , "*");
		},

		undoTempMove : function(prevRow , prevCol , nextRow , nextCol , piece){
			this.setPiece(prevRow , prevCol , this.getPiece(nextRow , nextCol));
			this.setPiece(nextRow , nextCol , piece);
		},

		canMoveKnight : function(row , col){ // adds all the cells where the selected knoght can move
			let turn = main.variables.turn;
			let tempPiece;
			let arrForCheck;

			let x = row + 2, y = col + 1;
			if(x <= 8 && y <= 8 && this.getPiece(x , y).charAt(0) != turn){
				tempPiece = this.getPiece(x , y);
				this.tempMove(row , col , x , y);
				arrForCheck = this.evaluateCheck();
				if(arrForCheck[0] == -1)
					main.variables.canMove.push([x , y]);

				this.undoTempMove(row , col , x , y , tempPiece);
			}

			x = row + 2, y = col - 1;
			if(x <= 8 && y >= 1 && this.getPiece(x , y).charAt(0) != turn){
				tempPiece = this.getPiece(x , y);
				this.tempMove(row , col , x , y);
				arrForCheck = this.evaluateCheck();

				if(arrForCheck[0] == -1)
					main.variables.canMove.push([x , y]);

				this.undoTempMove(row , col , x , y , tempPiece);
			}

			x = row - 2, y = col + 1;
			if(x >= 1 && y <= 8 && this.getPiece(x , y).charAt(0) != turn){
				tempPiece = this.getPiece(x , y);
				this.tempMove(row , col , x , y);
				arrForCheck = this.evaluateCheck();

				if(arrForCheck[0] == -1)
					main.variables.canMove.push([x , y]);

				this.undoTempMove(row , col , x , y , tempPiece);
			}

			x = row - 2, y = col - 1;
			if(x >= 1 && y >= 1 && this.getPiece(x , y).charAt(0) != turn){
				tempPiece = this.getPiece(x , y);
				this.tempMove(row , col , x , y);
				arrForCheck = this.evaluateCheck();

				if(arrForCheck[0] == -1)
					main.variables.canMove.push([x , y]);

				this.undoTempMove(row , col , x , y , tempPiece);
			}

			x = row + 1, y = col + 2;
			if(x <= 8 && y <= 8 && this.getPiece(x , y).charAt(0) != turn){
				tempPiece = this.getPiece(x , y);
				this.tempMove(row , col , x , y);
				arrForCheck = this.evaluateCheck();

				if(arrForCheck[0] == -1)
					main.variables.canMove.push([x , y]);

				this.undoTempMove(row , col , x , y , tempPiece);
			}

			x = row - 1, y = col + 2;
			if(x >= 1 && y <= 8 && this.getPiece(x , y).charAt(0) != turn){
				tempPiece = this.getPiece(x , y);
				this.tempMove(row , col , x , y);
				arrForCheck = this.evaluateCheck();

				if(arrForCheck[0] == -1)
					main.variables.canMove.push([x , y]);

				this.undoTempMove(row , col , x , y , tempPiece);
			}

			x = row + 1, y = col - 2;
			if(x <= 8 && y >= 1 && this.getPiece(x , y).charAt(0) != turn){
				tempPiece = this.getPiece(x , y);
				this.tempMove(row , col , x , y);
				arrForCheck = this.evaluateCheck();

				if(arrForCheck[0] == -1)
					main.variables.canMove.push([x , y]);

				this.undoTempMove(row , col , x , y , tempPiece);
			}

			x = row - 1, y = col - 2;
			if(x >= 1 && y >= 1 && this.getPiece(x , y).charAt(0) != turn){
				tempPiece = this.getPiece(x , y);
				this.tempMove(row , col , x , y);
				arrForCheck = this.evaluateCheck();

				if(arrForCheck[0] == -1)
					main.variables.canMove.push([x , y]);

				this.undoTempMove(row , col , x , y , tempPiece);
			}
		},

		canMovePawn : function(row , col){
			let turn = main.variables.turn;

			let tempPiece;
			let arrForCheck;

			if(turn == 'w'){
				let x , y;
				if(row == 2){
					x = row+2 , y = col;
					if(this.getPiece(x , y) == "*" && this.getPiece(x-1 , y) == "*"){ // can move if it's an empty cell
						tempPiece = this.getPiece(x , y);
						this.tempMove(row , col , x , y);
						arrForCheck = this.evaluateCheck();

						if(arrForCheck[0] == -1)
							main.variables.canMove.push([x , y]);

						this.undoTempMove(row , col , x , y , tempPiece);
					}
				}
				x = row+1 , y = col;
				if(x <= 8 && this.getPiece(x , y) == "*"){ // can move if it's an empty cell
					tempPiece = this.getPiece(x , y);
					this.tempMove(row , col , x , y);
					arrForCheck = this.evaluateCheck();

					if(arrForCheck[0] == -1)
						main.variables.canMove.push([x , y]);

					this.undoTempMove(row , col , x , y , tempPiece);
				}

				x = row+1 , y = col+1;
				if(x <= 8 && y <= 8 && this.getPiece(x , y).charAt(0) == "b"){ // can move if it can capture a black piece
					tempPiece = this.getPiece(x , y);
					this.tempMove(row , col , x , y);
					arrForCheck = this.evaluateCheck();

					if(arrForCheck[0] == -1)
						main.variables.canMove.push([x , y]);

					this.undoTempMove(row , col , x , y , tempPiece);
				}

				x = row+1 , y = col-1;
				if(x <= 8 && y >= 0 && this.getPiece(x , y).charAt(0) == "b"){ // can move if it can capture a black piece
					tempPiece = this.getPiece(x , y);
					this.tempMove(row , col , x , y);
					arrForCheck = this.evaluateCheck();

					if(arrForCheck[0] == -1)
						main.variables.canMove.push([x , y]);

					this.undoTempMove(row , col , x , y , tempPiece);
				} 
			}

			//-------------------------------------------------------------------------------------------------------------

			else{
				let x , y;
				if(row == 7){
					x = row-2 , y = col;
					if(this.getPiece(x , y) == "*" && this.getPiece(x+1 , y) == "*"){ // can move if it's an empty cell
						tempPiece = this.getPiece(x , y);
						this.tempMove(row , col , x , y);
						arrForCheck = this.evaluateCheck();
		
						if(arrForCheck[0] == -1)
							main.variables.canMove.push([x , y]);
		
						this.undoTempMove(row , col , x , y , tempPiece);
					}
				}
				x = row-1 , y = col;
				if(x >= 0 && this.getPiece(x , y) == "*"){ // can move if it's an empty cell
					tempPiece = this.getPiece(x , y);
					this.tempMove(row , col , x , y);
					arrForCheck = this.evaluateCheck();

					if(arrForCheck[0] == -1)
						main.variables.canMove.push([x , y]);

					this.undoTempMove(row , col , x , y , tempPiece);
				}

				x = row-1 , y = col+1;
				if(x >= 0 && y <= 8 && this.getPiece(x , y).charAt(0) == "w"){ // can move if it can capture a black piece
					tempPiece = this.getPiece(x , y);
					this.tempMove(row , col , x , y);
					arrForCheck = this.evaluateCheck();

					if(arrForCheck[0] == -1)
						main.variables.canMove.push([x , y]);

					this.undoTempMove(row , col , x , y , tempPiece);
				}

				x = row-1 , y = col-1;
				if(x >= 0 && y >= 0 && this.getPiece(x , y).charAt(0) == "w"){ // can move if it can capture a black piece
					tempPiece = this.getPiece(x , y);
					this.tempMove(row , col , x , y);
					arrForCheck = this.evaluateCheck();

					if(arrForCheck[0] == -1)
						main.variables.canMove.push([x , y]);

					this.undoTempMove(row , col , x , y , tempPiece);
				} 
			}
		},

		canMoveRook : function(row , col){
			let i;
			let turn = main.variables.turn;

			let tempPiece;
			let arrForCheck;

			// top
			i = row+1
			while(i <= 8){
				let piece = this.getPiece(i , col);
				if(piece == "*"){
					tempPiece = this.getPiece(i , col);
					this.tempMove(row , col , i , col);
					arrForCheck = this.evaluateCheck();

					if(arrForCheck[0] == -1)
						main.variables.canMove.push([i , col]);

					this.undoTempMove(row , col , i , col , tempPiece);
				}
				else if(piece.charAt(0) != turn){
					tempPiece = this.getPiece(i , col);
					this.tempMove(row , col , i , col);
					arrForCheck = this.evaluateCheck();

					if(arrForCheck[0] == -1)
						main.variables.canMove.push([i , col]);

					this.undoTempMove(row , col , i , col , tempPiece);
					break;			
				}
				else{
					break;
				}
				i++;
			}

			// bottom
			i = row-1;
			while(i >= 1){
				let piece = this.getPiece(i , col);
				if(piece == "*"){
					tempPiece = this.getPiece(i , col);
					this.tempMove(row , col , i , col);
					arrForCheck = this.evaluateCheck();

					if(arrForCheck[0] == -1)
						main.variables.canMove.push([i , col]);

					this.undoTempMove(row , col , i , col , tempPiece);
				}
				else if(piece.charAt(0) != turn){
					tempPiece = this.getPiece(i , col);
					this.tempMove(row , col , i , col);
					arrForCheck = this.evaluateCheck();

					if(arrForCheck[0] == -1)
						main.variables.canMove.push([i , col]);

					this.undoTempMove(row , col , i , col , tempPiece);
					break;			
				}
				else{
					break;
				}
				i--;
			}

			// right
			i = col+1;
			while(i <= 8){
				let piece = this.getPiece(row , i);
				if(piece == "*"){
					tempPiece = this.getPiece(row , i);
					this.tempMove(row , col , row , i);
					arrForCheck = this.evaluateCheck();

					if(arrForCheck[0] == -1)
						main.variables.canMove.push([row , i]);

					this.undoTempMove(row , col , row , i , tempPiece);
				}
				else if(piece.charAt(0) != turn){
					tempPiece = this.getPiece(row , i);
					this.tempMove(row , col , row , i);
					arrForCheck = this.evaluateCheck();

					if(arrForCheck[0] == -1)
						main.variables.canMove.push([row , i]);

					this.undoTempMove(row , col , row , i , tempPiece);
					break;			
				}
				else{
					break;
				}
				i++;
			}

			// left
			i = col-1;
			while(i >= 1){
				let piece = this.getPiece(row , i);
				if(piece == "*"){
					tempPiece = this.getPiece(row , i);
					this.tempMove(row , col , row , i);
					arrForCheck = this.evaluateCheck();

					if(arrForCheck[0] == -1)
						main.variables.canMove.push([row , i]);

					this.undoTempMove(row , col , row , i , tempPiece);
				}
				else if(piece.charAt(0) != turn){
					tempPiece = this.getPiece(row , i);
					this.tempMove(row , col , row , i);
					arrForCheck = this.evaluateCheck();

					if(arrForCheck[0] == -1)
						main.variables.canMove.push([row , i]);

					this.undoTempMove(row , col , row , i , tempPiece);
					break;			
				}
				else{
					break;
				}
				i--;
			}
		},

		canMoveBishop : function(row , col){
			let i , j;
			let turn = main.variables.turn;

			let tempPiece;
			let arrForCheck;

			// top right
			i = row+1 , j = col+1;
			while(i <= 8 && j <= 8){
				let piece = this.getPiece(i , j);
				if(piece == "*"){
					tempPiece = this.getPiece(i , j);
					this.tempMove(row , col , i , j);
					arrForCheck = this.evaluateCheck();
					
					if(arrForCheck[0] == -1)
						main.variables.canMove.push([i , j]);

					this.undoTempMove(row , col , i , j , tempPiece);
				}
				else if(piece.charAt(0) != turn){
					tempPiece = this.getPiece(i , j);
					this.tempMove(row , col , i , j);
					arrForCheck = this.evaluateCheck();
					
					if(arrForCheck[0] == -1)
						main.variables.canMove.push([i , j]);

					this.undoTempMove(row , col , i , j , tempPiece);
					break;			
				}
				else{
					break;
				}
				i++;
				j++;
			}

			// top left
			i = row+1 , j = col-1;
			while(i <= 8 && j >= 1){
				let piece = this.getPiece(i , j);
				if(piece == "*"){
					tempPiece = this.getPiece(i , j);
					this.tempMove(row , col , i , j);
					arrForCheck = this.evaluateCheck();
					
					if(arrForCheck[0] == -1)
						main.variables.canMove.push([i , j]);

					this.undoTempMove(row , col , i , j , tempPiece);
				}
				else if(piece.charAt(0) != turn){
					tempPiece = this.getPiece(i , j);
					this.tempMove(row , col , i , j);
					arrForCheck = this.evaluateCheck();
					
					if(arrForCheck[0] == -1)
						main.variables.canMove.push([i , j]);

					this.undoTempMove(row , col , i , j , tempPiece);
					break;			
				}
				else{
					break;
				}
				i++;
				j--;
			}

			// bottom right
			i = row-1 , j = col+1;
			while(i >= 1 && j <= 8){
				let piece = this.getPiece(i , j);
				if(piece == "*"){
					tempPiece = this.getPiece(i , j);
					this.tempMove(row , col , i , j);
					arrForCheck = this.evaluateCheck();
					
					if(arrForCheck[0] == -1)
						main.variables.canMove.push([i , j]);

					this.undoTempMove(row , col , i , j , tempPiece);
				}
				else if(piece.charAt(0) != turn){
					tempPiece = this.getPiece(i , j);
					this.tempMove(row , col , i , j);
					arrForCheck = this.evaluateCheck();
					
					if(arrForCheck[0] == -1)
						main.variables.canMove.push([i , j]);

					this.undoTempMove(row , col , i , j , tempPiece);
					break;			
				}
				else{
					break;
				}
				i--;
				j++;
			}

			// bottom left
			i = row-1 , j = col-1;
			while(i >= 1 && j >= 1){
				let piece = this.getPiece(i , j);
				if(piece == "*"){
					tempPiece = this.getPiece(i , j);
					this.tempMove(row , col , i , j);
					arrForCheck = this.evaluateCheck();
					
					if(arrForCheck[0] == -1)
						main.variables.canMove.push([i , j]);

					this.undoTempMove(row , col , i , j , tempPiece);
				}
				else if(piece.charAt(0) != turn){
					tempPiece = this.getPiece(i , j);
					this.tempMove(row , col , i , j);
					arrForCheck = this.evaluateCheck();
					
					if(arrForCheck[0] == -1)
						main.variables.canMove.push([i , j]);

					this.undoTempMove(row , col , i , j , tempPiece);
					break;			
				}
				else{
					break;
				}
				i--;
				j--;
			}
		},

		canMoveQueen : function(row , col){
			this.canMoveBishop(row , col);
			this.canMoveRook(row , col);
		},

		canMoveKing : function(row , col){
			let turn = main.variables.turn;
			let i , j;

			let tempPiece;
			let arrForCheck;

			// top
			i = row+1 , j = col;
			if(i <= 8 && (this.getPiece(i , j) == "*" || this.getPiece(i , j).charAt(0) != turn)){
				tempPiece = this.getPiece(i , j);
				this.tempMove(row , col , i , j);
				arrForCheck = this.evaluateCheck();
				
				if(arrForCheck[0] == -1)
					main.variables.canMove.push([i , j]);

				this.undoTempMove(row , col , i , j , tempPiece);
			}

			// top-right
			i = row+1 , j = col+1;
			if(i <= 8 && j <= 8 && (this.getPiece(i , j) == "*" || this.getPiece(i , j).charAt(0) != turn)){
				tempPiece = this.getPiece(i , j);
				this.tempMove(row , col , i , j);
				arrForCheck = this.evaluateCheck();
				
				if(arrForCheck[0] == -1)
					main.variables.canMove.push([i , j]);

				this.undoTempMove(row , col , i , j , tempPiece);
			}

			// top-left
			i = row+1 , j = col-1;
			if(i <= 8 && j >= 1 && (this.getPiece(i , j) == "*" || this.getPiece(i , j).charAt(0) != turn)){
				tempPiece = this.getPiece(i , j);
				this.tempMove(row , col , i , j);
				arrForCheck = this.evaluateCheck();
				
				if(arrForCheck[0] == -1)
					main.variables.canMove.push([i , j]);

				this.undoTempMove(row , col , i , j , tempPiece);
			}

			// bottom
			i = row-1 , j = col;
			if(i >= 1 && (this.getPiece(i , j) == "*" || this.getPiece(i , j).charAt(0) != turn)){
				tempPiece = this.getPiece(i , j);
				this.tempMove(row , col , i , j);
				arrForCheck = this.evaluateCheck();
				
				if(arrForCheck[0] == -1)
					main.variables.canMove.push([i , j]);

				this.undoTempMove(row , col , i , j , tempPiece);
			}

			// bottom-right
			i = row-1 , j = col+1;
			if(i >= 1&& j <= 8 && (this.getPiece(i , j) == "*" || this.getPiece(i , j).charAt(0) != turn)){
				tempPiece = this.getPiece(i , j);
				this.tempMove(row , col , i , j);
				arrForCheck = this.evaluateCheck();
				
				if(arrForCheck[0] == -1)
					main.variables.canMove.push([i , j]);

				this.undoTempMove(row , col , i , j , tempPiece);
			}

			// bottom-left
			i = row-1 , j = col-1;
			if(i >= 1 && j >= 1 && (this.getPiece(i , j) == "*" || this.getPiece(i , j).charAt(0) != turn)){
				tempPiece = this.getPiece(i , j);
				this.tempMove(row , col , i , j);
				arrForCheck = this.evaluateCheck();
				
				if(arrForCheck[0] == -1)
					main.variables.canMove.push([i , j]);

				this.undoTempMove(row , col , i , j , tempPiece);
			}

			// left
			i = row , j = col-1;
			if(j >= 1 && (this.getPiece(i , j) == "*" || this.getPiece(i , j).charAt(0) != turn)){
				tempPiece = this.getPiece(i , j);
				this.tempMove(row , col , i , j);
				arrForCheck = this.evaluateCheck();
				
				if(arrForCheck[0] == -1)
					main.variables.canMove.push([i , j]);

				this.undoTempMove(row , col , i , j , tempPiece);
			}

			// right
			i = row , j = col+1;
			if(j <= 8 && (this.getPiece(i , j) == "*" || this.getPiece(i , j).charAt(0) != turn)){
				tempPiece = this.getPiece(i , j);
				this.tempMove(row , col , i , j);
				arrForCheck = this.evaluateCheck();
				
				if(arrForCheck[0] == -1)
					main.variables.canMove.push([i , j]);

				this.undoTempMove(row , col , i , j , tempPiece);
			}

			// right-castle
			if(turn == 'w' && this.evaluateCheck()[0] == -1 && main.variables.king_w == false && main.variables.rook18 == false){

				let flagCanCastle = true;
				if(this.getPiece(1 , 6) != "*" || this.getPiece(1 , 7) != "*"){
					flagCanCastle = false;
				}
				if(flagCanCastle){
					tempPiece = this.getPiece(1 , 6);
					this.tempMove(row , col , 1 , 6);
					arrForCheck = this.evaluateCheck();
					
					if(arrForCheck[0] != -1)
						flagCanCastle = false

					this.undoTempMove(row , col , 1 , 6 , tempPiece);
				}
				if(flagCanCastle){
					tempPiece = this.getPiece(1 , 7);
					this.tempMove(row , col , 1 , 7);
					arrForCheck = this.evaluateCheck();
					
					if(arrForCheck[0] != -1)
						flagCanCastle = false

					this.undoTempMove(row , col , 1 , 7 , tempPiece);
				}

				if(flagCanCastle){
					main.variables.canMove.push([1 , 8]);
				}
			}
			else if(turn == 'b' && this.evaluateCheck()[0] == -1 && main.variables.king_b == false && main.variables.rook88 == false){
				let flagCanCastle = true;
				if(this.getPiece(8 , 6) != "*" || this.getPiece(8 , 7) != "*"){
					flagCanCastle = false;
				}
				if(flagCanCastle){
					tempPiece = this.getPiece(8 , 6);
					this.tempMove(row , col , 8 , 6);
					arrForCheck = this.evaluateCheck();
					
					if(arrForCheck[0] != -1)
						flagCanCastle = false

					this.undoTempMove(row , col , 8 , 6 , tempPiece);
				}
				if(flagCanCastle){
					tempPiece = this.getPiece(8 , 7);
					this.tempMove(row , col , 8 , 7);
					arrForCheck = this.evaluateCheck();
					
					if(arrForCheck[0] != -1)
						flagCanCastle = false

					this.undoTempMove(row , col , 8 , 7 , tempPiece);
				}

				if(flagCanCastle){
					main.variables.canMove.push([8 , 8]);
				}
			}

			// left-castle
			if(turn == 'w' && this.evaluateCheck()[0] == -1 && main.variables.king_w == false && main.variables.rook11 == false){
				let flagCanCastle = true;
				if(this.getPiece(1 , 2) != "*" || this.getPiece(1 , 3) != "*" || this.getPiece(1 , 4) != "*"){
					flagCanCastle = false;
				}
				if(flagCanCastle){
					tempPiece = this.getPiece(1 , 4);
					this.tempMove(row , col , 1 , 4);
					arrForCheck = this.evaluateCheck();
					
					if(arrForCheck[0] != -1)
						flagCanCastle = false

					this.undoTempMove(row , col , 1 , 4 , tempPiece);
				}
				if(flagCanCastle){
					tempPiece = this.getPiece(1 , 3);
					this.tempMove(row , col , 1 , 3);
					arrForCheck = this.evaluateCheck();
					
					if(arrForCheck[0] != -1)
						flagCanCastle = false

					this.undoTempMove(row , col , 1 , 3 , tempPiece);
				}

				if(flagCanCastle){
					main.variables.canMove.push([1 , 1]);
				}
			}
			else if(turn == 'b' && this.evaluateCheck()[0] == -1 && main.variables.king_b == false && main.variables.rook81 == false){
				let flagCanCastle = true;
				if(this.getPiece(8 , 2) != "*" || this.getPiece(8 , 3) != "*" || this.getPiece(8 , 4) != "*"){
					flagCanCastle = false;
				}
				if(flagCanCastle){
					tempPiece = this.getPiece(8 , 4);
					this.tempMove(row , col , 8 , 4);
					arrForCheck = this.evaluateCheck();
					
					if(arrForCheck[0] != -1)
						flagCanCastle = false

					this.undoTempMove(row , col , 8 , 4 , tempPiece);
				}
				if(flagCanCastle){
					tempPiece = this.getPiece(8 , 3);
					this.tempMove(row , col , 8 , 3);
					arrForCheck = this.evaluateCheck();
					
					if(arrForCheck[0] != -1)
						flagCanCastle = false

					this.undoTempMove(row , col , 8 , 3 , tempPiece);
				}

				if(flagCanCastle){
					main.variables.canMove.push([8 , 1]);
				}
			}
		},

		//-----------------------------------------------------------------------------------------------------------
		// code for special cases, like check, checkMate, castle etc.

		canMoveKnightCheck : function(row , col){ // adds all the cells where the selected knoght can move
			let turn = main.variables.turn;

			let x = row + 2, y = col + 1;
			if(x <= 8 && y <= 8 && this.getPiece(x , y).charAt(0) != turn){
				main.variables.canMove.push([x , y]);
			}

			x = row + 2, y = col - 1;
			if(x <= 8 && y >= 1 && this.getPiece(x , y).charAt(0) != turn){
				main.variables.canMove.push([x , y]);
			}

			x = row - 2, y = col + 1;
			if(x >= 1 && y <= 8 && this.getPiece(x , y).charAt(0) != turn){
				main.variables.canMove.push([x , y]);
			}

			x = row - 2, y = col - 1;
			if(x >= 1 && y >= 1 && this.getPiece(x , y).charAt(0) != turn){
				main.variables.canMove.push([x , y]);
			}

			x = row + 1, y = col + 2;
			if(x <= 8 && y <= 8 && this.getPiece(x , y).charAt(0) != turn){
				main.variables.canMove.push([x , y]);
			}

			x = row - 1, y = col + 2;
			if(x >= 1 && y <= 8 && this.getPiece(x , y).charAt(0) != turn){
				main.variables.canMove.push([x , y]);
			}

			x = row + 1, y = col - 2;
			if(x <= 8 && y >= 1 && this.getPiece(x , y).charAt(0) != turn){
				main.variables.canMove.push([x , y]);
			}

			x = row - 1, y = col - 2;
			if(x >= 1 && y >= 1 && this.getPiece(x , y).charAt(0) != turn){
				main.variables.canMove.push([x , y]);
			}
		},

		canMovePawnCheck : function(row , col){
			let turn = main.variables.turn;

			if(turn == 'w'){
				let x , y;
				if(row == 2){
					x = row+2 , y = col;
					if(this.getPiece(x , y) == "*" && this.getPiece(x-1 , y) == "*"){ // can move if it's an empty cell
						main.variables.canMove.push([x , y]);
					}
				}
				x = row+1 , y = col;
				if(x <= 8 && this.getPiece(x , y) == "*"){ // can move if it's an empty cell
					main.variables.canMove.push([x , y]);
				}

				x = row+1 , y = col+1;
				if(x <= 8 && y <= 8 && this.getPiece(x , y).charAt(0) == "b"){ // can move if it can capture a black piece
					main.variables.canMove.push([x , y]);
				}

				x = row+1 , y = col-1;
				if(x <= 8 && y >= 0 && this.getPiece(x , y).charAt(0) == "b"){ // can move if it can capture a black piece
					main.variables.canMove.push([x, y]);
				} 
			}

			//-------------------------------------------------------------------------------------------------------------

			else{
				let x , y;
				if(row == 7){
					x = row-2 , y = col;
					if(this.getPiece(x , y) == "*" && this.getPiece(x+1 , y) == "*"){ // can move if it's an empty cell
						main.variables.canMove.push([x , y]);
					}
				}
				x = row-1 , y = col;
				if(x >= 0 && this.getPiece(x , y) == "*"){ // can move if it's an empty cell
					main.variables.canMove.push([x , y]);
				}

				x = row-1 , y = col+1;
				if(x >= 0 && y <= 8 && this.getPiece(x , y).charAt(0) == "w"){ // can move if it can capture a black piece
					main.variables.canMove.push([x , y]);
				}

				x = row-1 , y = col-1;
				if(x >= 0 && y >= 0 && this.getPiece(x , y).charAt(0) == "w"){ // can move if it can capture a black piece
					main.variables.canMove.push([x, y]);
				} 
			}
		},

		canMoveRookCheck : function(row , col){
			let i;
			let turn = main.variables.turn;

			// top
			i = row+1
			while(i <= 8){
				let piece = this.getPiece(i , col);
				if(piece == "*"){
					main.variables.canMove.push([i , col]);
				}
				else if(piece.charAt(0) != turn){
					main.variables.canMove.push([i , col]);
					break;			
				}
				else{
					break;
				}
				i++;
			}

			// bottom
			i = row-1;
			while(i >= 1){
				let piece = this.getPiece(i , col);
				if(piece == "*"){
					main.variables.canMove.push([i , col]);
				}
				else if(piece.charAt(0) != turn){
					main.variables.canMove.push([i , col]);
					break;			
				}
				else{
					break;
				}
				i--;
			}

			// right
			i = col+1;
			while(i <= 8){
				let piece = this.getPiece(row , i);
				if(piece == "*"){
					main.variables.canMove.push([row , i]);
				}
				else if(piece.charAt(0) != turn){
					main.variables.canMove.push([row , i]);
					break;			
				}
				else{
					break;
				}
				i++;
			}

			// left
			i = col-1;
			while(i >= 1){
				let piece = this.getPiece(row , i);
				if(piece == "*"){
					main.variables.canMove.push([row , i]);
				}
				else if(piece.charAt(0) != turn){
					main.variables.canMove.push([row , i]);
					break;			
				}
				else{
					break;
				}
				i--;
			}
		},

		canMoveBishopCheck : function(row , col){
			let i , j;
			let turn = main.variables.turn;

			// top right
			i = row+1 , j = col+1;
			while(i <= 8 && j <= 8){
				let piece = this.getPiece(i , j);
				if(piece == "*"){
					main.variables.canMove.push([i , j]);
				}
				else if(piece.charAt(0) != turn){
					main.variables.canMove.push([i , j]);
					break;			
				}
				else{
					break;
				}
				i++;
				j++;
			}

			// top left
			i = row+1 , j = col-1;
			while(i <= 8 && j >= 1){
				let piece = this.getPiece(i , j);
				if(piece == "*"){
					main.variables.canMove.push([i , j]);
				}
				else if(piece.charAt(0) != turn){
					main.variables.canMove.push([i , j]);
					break;			
				}
				else{
					break;
				}
				i++;
				j--;
			}

			// bottom right
			i = row-1 , j = col+1;
			while(i >= 1 && j <= 8){
				let piece = this.getPiece(i , j);
				if(piece == "*"){
					main.variables.canMove.push([i , j]);
				}
				else if(piece.charAt(0) != turn){
					main.variables.canMove.push([i , j]);
					break;			
				}
				else{
					break;
				}
				i--;
				j++;
			}

			// bottom left
			i = row-1 , j = col-1;
			while(i >= 1 && j >= 1){
				let piece = this.getPiece(i , j);
				if(piece == "*"){
					main.variables.canMove.push([i , j]);
				}
				else if(piece.charAt(0) != turn){
					main.variables.canMove.push([i , j]);
					break;			
				}
				else{
					break;
				}
				i--;
				j--;
			}
		},

		canMoveQueenCheck : function(row , col){
			this.canMoveBishopCheck(row , col);
			this.canMoveRookCheck(row , col);
		},

		canMoveKingCheck : function(row , col){
			let turn = main.variables.turn;
			let i , j;

			// top
			i = row+1 , j = col;
			if(i <= 8 && (this.getPiece(i , j) == "*" || this.getPiece(i , j).charAt(0) != turn)){
				main.variables.canMove.push([i , j]);
			}

			// top-right
			i = row+1 , j = col+1;
			if(i <= 8 && j <= 8 && (this.getPiece(i , j) == "*" || this.getPiece(i , j).charAt(0) != turn)){
				main.variables.canMove.push([i , j]);
			}

			// top-left
			i = row+1 , j = col-1;
			if(i <= 8 && j >= 1 && (this.getPiece(i , j) == "*" || this.getPiece(i , j).charAt(0) != turn)){
				main.variables.canMove.push([i , j]);
			}

			// bottom
			i = row-1 , j = col;
			if(i >= 1 && (this.getPiece(i , j) == "*" || this.getPiece(i , j).charAt(0) != turn)){
				main.variables.canMove.push([i , j]);
			}

			// bottom-right
			i = row-1 , j = col+1;
			if(i >= 1&& j <= 8 && (this.getPiece(i , j) == "*" || this.getPiece(i , j).charAt(0) != turn)){
				main.variables.canMove.push([i , j]);
			}

			// bottom-left
			i = row-1 , j = col-1;
			if(i >= 1 && j >= 1 && (this.getPiece(i , j) == "*" || this.getPiece(i , j).charAt(0) != turn)){
				main.variables.canMove.push([i , j]);
			}

			// left
			i = row , j = col-1;
			if(j >= 1 && (this.getPiece(i , j) == "*" || this.getPiece(i , j).charAt(0) != turn)){
				main.variables.canMove.push([i , j]);
			}

			// right
			i = row , j = col+1;
			if(j <= 8 && (this.getPiece(i , j) == "*" || this.getPiece(i , j).charAt(0) != turn)){
				main.variables.canMove.push([i , j]);
			}

		},

		evaluateCheck : function(){ // evaluates if the current turn player is in check
			let originalCanMove = main.variables.canMove.slice();
		
			let turn = main.variables.turn;

			if(turn == 'w'){
				main.variables.turn = 'b';
			}
			else{
				main.variables.turn = 'w';
			}

			let inCheck = false;

			for(let row = 1 ; row <= 8 ; row++){
				for(let col = 1 ; col <= 8 ; col++){
					let piece = this.getPiece(row, col);
					if(piece != "*" && piece.charAt(0) != turn){ // found an opponent piece to check the check condition
						this.clearCanMove();

						switch(piece){
							case "b_knight" : // fall through (i.e both "b_knight" and "w_knight" will execute same function)
							case "w_knight" :{ // if a white or black knoght is seleced
								// getting all the cells where the currently selected knight can move
								this.canMoveKnightCheck(row , col);
							}break;
			
							//-------------------------------------------------------------------------------------------------------------
			
							case "w_pawn" : // fall through
							case "b_pawn" :{
								// getting all the cells where the currently selected pawn can move
								this.canMovePawnCheck(row , col);
							}break;
							
							//-------------------------------------------------------------------------------------------------------------
			
							case "w_rook" : // fall through
							case "b_rook" :{
								// getting all the cells where the currently selected rook can move
								this.canMoveRookCheck(row , col);
							}break;
			
							//-------------------------------------------------------------------------------------------------------------
			
							case "w_bishop" : // fall through
							case "b_bishop" :{
								// getting all the cells where the currently selected bishop can move
								this.canMoveBishopCheck(row , col);
							}break;
			
							//-------------------------------------------------------------------------------------------------------------
			
							case "w_queen" : // fall through
							case "b_queen" :{
								// getting all the cells where the currently selected queen can move
								this.canMoveQueenCheck(row , col);
							}break;
			
							//-------------------------------------------------------------------------------------------------------------
			
							case "w_king" : // fall through
							case "b_king" :{
								// getting all the cells where the currently selected king can move
								this.canMoveKingCheck(row , col);
							}break;

							//-------------------------------------------------------------------------------------------------------------

							default :{
								this.clearCanMove();
							}
						}

						let n = main.variables.canMove.length;

						// removing canMove class to all the cells that are eligibe to move
						for(let i = 0 ; i < n ; i++){
							let x = main.variables.canMove[i][0];
							let y = main.variables.canMove[i][1];
							piece = this.getPiece(x , y);
							
							 // king is in check
							if(piece.charAt(0) == turn && (piece == 'w_king' || piece == 'b_king')){
								main.variables.canMove = originalCanMove.slice();
								main.variables.turn = turn;
								return [x , y];	// rturns the check position of king
							}
						}
					}
				}
			}

			main.variables.canMove = originalCanMove.slice();
			main.variables.turn = turn;
			return [-1, -1]; // these values shows that the king is not in check
		},

		evaluateCheckMate : function(){
			let turn = main.variables.turn;
			let arrForCheck = this.evaluateCheck();
			let flagForCheckMate = true;
			if(arrForCheck[0] != -1){
				for(let row = 1 ; row <= 8 ; row++){
					for(let col = 1 ; col <= 8 ; col++){
						let piece = this.getPiece(row, col);
						if(piece != "*" && piece.charAt(0) == turn){ // found an opponent piece to check the check condition
							this.clearCanMove();
	
							switch(piece){
								case "b_knight" : // fall through (i.e both "b_knight" and "w_knight" will execute same function)
								case "w_knight" :{ // if a white or black knoght is seleced
									// getting all the cells where the currently selected knight can move
									this.canMoveKnight(row , col);
								}break;
				
								//-------------------------------------------------------------------------------------------------------------
				
								case "w_pawn" : // fall through
								case "b_pawn" :{
									// getting all the cells where the currently selected pawn can move
									this.canMovePawn(row , col);
								}break;
								
								//-------------------------------------------------------------------------------------------------------------
				
								case "w_rook" : // fall through
								case "b_rook" :{
									// getting all the cells where the currently selected rook can move
									this.canMoveRook(row , col);
								}break;
				
								//-------------------------------------------------------------------------------------------------------------
				
								case "w_bishop" : // fall through
								case "b_bishop" :{
									// getting all the cells where the currently selected bishop can move
									this.canMoveBishop(row , col);
								}break;
				
								//-------------------------------------------------------------------------------------------------------------
				
								case "w_queen" : // fall through
								case "b_queen" :{
									// getting all the cells where the currently selected queen can move
									this.canMoveQueen(row , col);
								}break;
				
								//-------------------------------------------------------------------------------------------------------------
				
								case "w_king" : // fall through
								case "b_king" :{
									// getting all the cells where the currently selected king can move
									this.canMoveKing(row , col);
								}break;
	
								//-------------------------------------------------------------------------------------------------------------
	
								default :{
									this.clearCanMove();
								}
							}

							if(main.variables.canMove.length != 0){
								flagForCheckMate = false;
							}
						}
					}
				}
			}
			else{
				flagForCheckMate = false;
			}

			return flagForCheckMate;
		},

		beautifyCanMoveCells : function(){
			// for can capture cells

			// for dark cells
			let elements = document.querySelectorAll('.canMoveDarkCapture');
			elements.forEach(function(singleElement){
				let piece = singleElement.innerHTML;
				singleElement.innerHTML = `<div class = 'darkCapture'>${piece}</div>`;
			});
			// for light cells
			elements = document.querySelectorAll('.canMoveLightCapture');
			elements.forEach(function(singleElement){
				let piece = singleElement.innerHTML;
				singleElement.innerHTML = `<div class = 'lightCapture'>${piece}</div>`;
			});

			//---------------------------------------------------------------------------------
			// for normal move and not capture cells

			// for dark cells
			elements = document.querySelectorAll('.canMoveDark');
			elements.forEach(function(singleElement){
				let piece = singleElement.innerHTML;
				singleElement.innerHTML = `<div class = 'darkMove'></div>`;
			});
			// for light cells
			elements = document.querySelectorAll('.canMoveLight');
			elements.forEach(function(singleElement){
				let piece = singleElement.innerHTML;
				singleElement.innerHTML = `<div class = 'lightMove'></div>`;
			});
		},

		removeBeautyOfCanMoveCell : function(){ // removes the modifications of can move cell 
			// for can capture cells

			// for dark cells
			let elements = document.querySelectorAll('.darkCapture');
			elements.forEach(function(singleElement){
				singleElement.remove();
			});
			// for light cells
			elements = document.querySelectorAll('.lightCapture');
			elements.forEach(function(singleElement){
				singleElement.remove();
			});

			//---------------------------------------------------------------------------------
			// for normal move and not capture cells

			// for dark cells
			elements = document.querySelectorAll('.darkMove');
			elements.forEach(function(singleElement){
				singleElement.remove();
			});
			// for light cells
			elements = document.querySelectorAll('.lightMove');
			elements.forEach(function(singleElement){
				singleElement.remove();
			});

			this.updateBoard();
		},

        cellSelected : function(row , col){
			this.removeBeautyOfCanMoveCell();

			if(!main.variables.gameStatus){
				return;
			}

			// piece type at row and col
			let piece = this.getPiece(row , col);

			// if the selected cell is an cell where a piece can already move, then move that pice to that cell
			let n = main.variables.canMove.length;
			for(let i = 0 ; i < n ; i++){
				let x = main.variables.canMove[i][0];
				let y = main.variables.canMove[i][1];
				
				if(x == row && y == col){
					this.clearCanMove();
					this.moveSelectedPiece(row , col);
					this.removePreviousSelectedCell();

					if(main.variables.previousCheck[0] != -1){ // removing the previous check
						let x = main.variables.previousCheck[0], y = main.variables.previousCheck[1];

						if((x+y)%2){
							document.querySelector(`.row${x}.col${y}`).classList.remove('checkLight');
						}
						else{
							document.querySelector(`.row${x}.col${y}`).classList.remove('checkDark');
						}
					}

					let kingPos = this.evaluateCheck();

					if(kingPos[0] != -1){ // Adding check position
						if((kingPos[0] + kingPos[1])%2){
							document.querySelector(`.row${kingPos[0]}.col${kingPos[1]}`).classList.add('checkLight');
						}
						else{
							document.querySelector(`.row${kingPos[0]}.col${kingPos[1]}`).classList.add('checkDark');
						}
					}

					main.variables.previousCheck[0] = kingPos[0];
					main.variables.previousCheck[1] = kingPos[1];

					if(this.evaluateCheckMate()){
						main.variables.gameStatus = false;
						let win;
						if(main.variables.turn == 'b')
							win = 'white';
						else
							win = 'black';
						alert('Checkmate ' + win + ' Wins');
					}

					return;
				}
			}

			// checking if the piece selected is valid and is selected by the correct player
			if(piece == "*" || (piece.charAt(0) == 'w' && main.variables.turn == 'b') || (piece.charAt(0) == 'b' && main.variables.turn == 'w')){
				this.clearCanMove();
				this.removePreviousSelectedCell();
				return;
			}

            this.removePreviousSelectedCell(); 
			
			let chosenCell;
			// getting the div of current selected cell and adding the selectedCell class to it
			chosenCell = document.querySelector(`.row${row}.col${col}`);
			if((row+col)%2)
				chosenCell.classList.add('selectedCellLight');
			else	
				chosenCell.classList.add('selectedCellDark');
			main.variables.selectedCell[0] = row;
			main.variables.selectedCell[1] = col;
			main.variables.selectedPiece = this.getPiece(row , col);
			
			// making the cells visible where the current selected piece can move
			switch(piece){
				case "b_knight" : // fall through (i.e both "b_knight" and "w_knight" will execute same function)
				case "w_knight" :{ // if a white or black knoght is seleced
					// remove the previously selected canMove cells
					this.clearCanMove();

					// getting all the cells where the currently selected knight can move
					this.canMoveKnight(row , col);
					
					// Adding canMove cells for currently selected piece
					this.updateCanMove();
				}break;

				//-------------------------------------------------------------------------------------------------------------

				case "w_pawn" : // fall through
				case "b_pawn" :{
					// remove the previously selected canMove cells
					this.clearCanMove();

					// getting all the cells where the currently selected pawn can move
					this.canMovePawn(row , col);
					
					// Adding canMove cells for currently selected piece
					this.updateCanMove();
				}break;
				
				//-------------------------------------------------------------------------------------------------------------

				case "w_rook" : // fall through
				case "b_rook" :{
					// remove the previously selected canMove cells
					this.clearCanMove();

					// getting all the cells where the currently selected rook can move
					this.canMoveRook(row , col);
					
					// Adding canMove cells for currently selected piece
					this.updateCanMove();
				}break;

				//-------------------------------------------------------------------------------------------------------------

				case "w_bishop" : // fall through
				case "b_bishop" :{
					// remove the previously selected canMove cells
					this.clearCanMove();

					// getting all the cells where the currently selected bishop can move
					this.canMoveBishop(row , col);
					
					// Adding canMove cells for currently selected piece
					this.updateCanMove();
				}break;

				//-------------------------------------------------------------------------------------------------------------

				case "w_queen" : // fall through
				case "b_queen" :{
					// remove the previously selected canMove cells
					this.clearCanMove();

					// getting all the cells where the currently selected queen can move
					this.canMoveQueen(row , col);
					
					// Adding canMove cells for currently selected piece
					this.updateCanMove();
				}break;

				//-------------------------------------------------------------------------------------------------------------

				case "w_king" : // fall through
				case "b_king" :{
					// remove the previously selected canMove cells
					this.clearCanMove();

					// getting all the cells where the currently selected king can move
					this.canMoveKing(row , col);
					
					// Adding canMove cells for currently selected piece
					this.updateCanMove();
				}break;

				//-------------------------------------------------------------------------------------------------------------

				default :{
					this.clearCanMove();
				}
			}

			this.beautifyCanMoveCells();
        }
    }
}

//------------------------------------------------------------------------------------------------------------------------------

main.methodes.gameSetup();