function LCS(x, y) {
  var len1=x.length;
  var len2=y.length;
  var dp= new Array(len1+1);
  var solution= new Array(len1+1);
  for (var i = 0; i <=len1; i++) {
    dp[i] = new Array(len2+1);
    solution[i] = new Array(len2+1);
  }
  for(var i=0;i<=len1;i++){
    dp[i][0]=0;
    solution[i][0] = "0";
  }
  for(var i=0;i<=len2;i++){
    dp[0][i]=0;
    solution[0][i] = "0";
  }
  for(var i=1;i<=len1;i++){
    for(var j=1;j<=len2;j++){
      if(x[i-1]==y[j-1]){
        dp[i][j]=dp[i-1][j-1]+1;
        solution[i][j] = "diagonal";
      }
      else{
        if(dp[i-1][j]>dp[i][j-1]){
          solution[i][j]="top";
          dp[i][j]=dp[i-1][j];
        }
        else{
          solution[i][j]="left";
          dp[i][j]=dp[i][j-1];
        }
      }
    }
  }
  var a=len1,b=len2;
  var c = solution[len1][len2];
  var answer = "";
  while (c!= "0") {
			if (solution[a][b] == "diagonal") {
				answer = x[a - 1]+answer;
				a--;
				b--;
			} 
      else if (solution[a][b] == "left") {
				b--;
			} 
      else if (solution[a][b] == "top") {
				a--;
			}
			c = solution[a][b];
		}
  return answer;
}