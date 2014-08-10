var drone;
var cnt = 0

startBuild = function(){
  cnt = 0;
  drone = up(1)
  _buildTunnel()
}

_buildTunnel = function(){
  for(i = 1; i < 2; i++){
    myStone = blocks.brick.stone
    drone.chkpt('check')

    //wall
    drone.box(myStone,1,5,3)

    //add torch
    drone.up(3).right(1).fwd(1).box(blocks.torch + ':0x4')
    //drone.up(1).box(blocks.torch + ':0x2')
    //drone.up(1).box(blocks.torch + ':0x3')
    //drone.up(1).box(blocks.torch + ':0x4')
    drone.move('check')

    //ceiling
    drone.up(5)
    drone.box(myStone,7,1,3)
    drone.move('check')

    //wall
    drone.right(6)
    drone.box(myStone,1,5,3)

    //add torch
    echo(drone.dir)
    //drone.up(3).back(1).box(blocks.torch + ':' + Drone.PLAYER_TORCH_FACING[drone.dir])
    drone.up(3).left(1).fwd(1).box(blocks.torch + ':0x3')
    drone.move('check')

    drone.fwd(4)
  }
  if(cnt < 20){
    cnt++
    setTimeout(_buildTunnel,1000)
  }
}

exports.tunnel = startBuild
