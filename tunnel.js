var drone;
var cnt = 0
var LEFT_FACING = [1,2,3,4]
var RIGHT_FACING = [3,4,1,2]

startBuild = function(){
  cnt = 0;
  drone = up(1)
  _buildTunnel()
}

function pointRight(dir){
  if(dir == 0)
    newDir = 3
  else
    newDir = dir - 1
  return(Drone.PLAYER_TORCH_FACING[newDir])
}

function pointLeft(dir){
  if(dir == 3)
    newDir = 0
  else
    newDir = dir + 1
  return(Drone.PLAYER_TORCH_FACING[newDir])
}

_buildTunnel = function(){
  for(i = 1; i < 2; i++){
    myStone = blocks.brick.stone
    drone.chkpt('check')

    firstTorch = pointRight(drone.dir)
    secondTorch = pointLeft(drone.dir)

    //wall
    drone.box(myStone,1,5,3)

    //add torch
    drone.up(3).right(1).fwd(1).box(blocks.torch + ':' + firstTorch)
    drone.move('check')

    //ceiling
    drone.up(5)
    drone.box(myStone,7,1,3)
    drone.move('check')

    //wall
    drone.right(6)
    drone.box(myStone,1,5,3)

    //add torch
    drone.up(3).left(1).fwd(1).box(blocks.torch + ':' + secondTorch)
    drone.move('check')

    drone.fwd(4)
  }
  if(cnt < 7){
    cnt++
    setTimeout(_buildTunnel,1000)
  }
}

exports.tunnel = startBuild
