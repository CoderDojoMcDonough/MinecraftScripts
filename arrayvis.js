var utils = require('utils');

var drone;
var arr = [blocks.oak, blocks.brick.red, blocks.brick.red, blocks.oak, blocks.oak, blocks.oak]

visualize = function(){
  cnt = 0;
  //drone = up(1).fwd(2).right(10).turn(3)
  drone = up(1).turn(1).left(10)

  // regular for loop
  for(i=0;i<arr.length;i++){
    _buildBox(arr[i], i)
  }

  //ScriptCraft's foreach
  //utils.foreach(arr,function(thisBlock){
    //echo(thisBlock)
    //_buildBox(thisBlock)
  //})
}

_buildBox = function(thisBlock, index){
  drone.box0(blocks.brick.stone,5,1,5)
  drone.chkpt('check')

  //draw current array index in blocktype
  if(index != undefined){
    drone.left(5).turn(3)
    drone.blocktype("" + index, blocks.brick.red)
    drone.move('check')
  }

  //draw array contents
  drone.fwd(2).right(2)
  drone.box(thisBlock)
  drone.move('check')


  //advance to next spot
  drone.fwd(4)
}

//try ...
//  js arr.push(blocks.oak)
//  js arr.pop()

exports.vis = visualize
exports.arr = arr
exports.mydrone = drone
