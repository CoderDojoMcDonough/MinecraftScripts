var drone;
var cnt = 0

startBuild = function(){
  cnt = 0;
  drone = up(1)
  _buildWall()
}

_buildWall = function(){
  for(i = 1; i < 2; i++){
    drone.box(blocks.brick.stone,1,6,9).fwd(9).turn()
    drone.box(blocks.brick.stone,1,6,9).fwd(9).turn(3)
  }
  if(cnt < 10){
    cnt++
    setTimeout(_buildWall,1000)
  }
}

exports.wall = startBuild
