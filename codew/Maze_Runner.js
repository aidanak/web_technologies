function mazeRunner(maze, directions) {
console.log(maze)
    var xin,yin;
    for(var i=0;i<maze.length;i++){
      for(var j=0;j<maze.length;j++){
        if(maze[i][j]==2){
          xin=i;
          yin=j;
        }
      }
    }
    for(var i=0;i<directions.length;i++){
      if(directions[i]=='N'){
        xin--;
      }
      else if(directions[i]=='S'){
        xin++;
      }
      else if(directions[i]=='E'){
        yin++;
      }
      else if(directions[i]=='W'){
        yin--;
      }
      if(xin>maze.length-1 || yin>maze.length-1 || xin<0 || yin<0){
        return "Dead";
      }
      if(maze[xin][yin]==1) {
        return "Dead";
      }
      if(maze[xin][yin]==3){
        return "Finish";
      }
    }
    return "Lost";
}