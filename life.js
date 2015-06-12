var utils = require('utils');
var currentGenCnt = 0;
var numberOfGenerations = 0;
var emptyNeighbors = [];

var delay = 200;

var neighbors = [
	{x:1, y:1},
	{x:1, y:0},
	{x:1, y:-1},
	{x:0, y:-1},
	{x:-1, y:-1},
	{x:-1, y:0},
	{x:-1, y:1},
	{x:0, y:1}
];

exports.life = function(genCnt){
	numberOfGenerations = genCnt;
	currentGenCnt = 0;

	var playerPos = utils.getMousePos();
	makeGliderAt(playerPos);

	createCells(liveCells);
	setTimeout(_gen,delay)
}

function makeGliderAt(playerPos){
	var startX = playerPos.getX() + 5;
	var startY = playerPos.getZ() + 5;
	
	liveCells =	[
		{x:startX, y:startY},
		{x:startX + 1, y:startY + 1},
		{x:startX + 2, y:startY - 1},
		{x:startX + 2, y:startY},
		{x:startX + 2, y:startY + 1}
	];
}

_gen = function(){

	var nextGenCells = [];
	var newLife = [];
	var removeArray = [];

	emptyNeighbors = [];

	liveCells.forEach(function(cell){
		neighborCount = countNeighbors(cell);
		if(neighborCount == 2 || neighborCount == 3){
			//don't need to push onto new life array, since the block is already on the screen.
			//newLife.push(cell);
			nextGenCells.push(cell);
		}else{
			removeArray.push(cell);
		}
	});

	emptyNeighbors.forEach(function(cell){
		neighborCount = countNeighbors(cell);
		if(neighborCount == 3){
			newLife.push(cell);
			nextGenCells.push(cell);
		}
	});

	removeCells(removeArray);
	createCells(newLife);

	liveCells = nextGenCells;

	if(currentGenCnt < numberOfGenerations){
    currentGenCnt++;
    setTimeout(_gen,delay);
  }
}

function createCells(cellArray){
	//drone = new Drone(1,5,1,3,self.location.world);
	cellArray.forEach(function(cell){
		//echo(cell.x + ":" + cell.y);
		//drone.move(cell.x,4,cell.y,3,self.location.world).box(blocks.wool.blue);
		new Drone(cell.x,4,cell.y,3,self.location.world).box(blocks.wool.blue);
	});
}
function removeCells(cellArray){
	cellArray.forEach(function(cell){
		new Drone(cell.x,4,cell.y,3,self.location.world).box(blocks.air);
	});
	
}

function countNeighbors(cell){
	var acc = 0;
	for(var i = 0;i < neighbors.length;i++){
		neighbor = neighbors[i];
		if(isAlive(cell,neighbor)){
			acc++;
		}
	}
	return(acc);
}
function isAlive(cell,neighbor){
	newX = cell.x + neighbor.x;
	newY = cell.y + neighbor.y;
	neighborPos = {x:newX, y:newY};

	//see if a liveCell exists at neighbor's position
	// using 'some' so search ends as soon as one is found
	neighborIsAlive = isInCellArray(liveCells, neighborPos);
	if(!neighborIsAlive){
		//if empty neighbor is not already in the emptyNeibhbors array, add it
		if(!isInCellArray(emptyNeighbors, neighborPos)){
			emptyNeighbors.push(neighborPos);
		}
	}
	return(neighborIsAlive);
}
function isInCellArray(cellArray, coords){
	return(cellArray.some(cellMatches,coords));
}
function cellMatches(cell){
	return(cell.x == this.x && cell.y == this.y);
}

function printCells(cellArray){
	var cellString = "";
	cellArray.forEach(function(cell){
		cellString += cell.x + ':' + cell.y + ', ';
	});
	return(cellString);
}


// GAME OF LIFE RULES
// Any live cell with fewer than two live neighbours dies, as if caused by under-population.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overcrowding.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.


// pseudo code /////////////////

// array of live cell locations
// x,y


// for each generation
//   for each live cell in liveArray
//     if neighborCount == 2 || neighborCount == 3
//     	live
//     else
//     	die
//     findChildren

// findChildren    
//   for each neighbor cell
//     if cell is empty and neighborCount == 3
//     	live
