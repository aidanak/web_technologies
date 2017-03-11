function pascalsTriangle(n) {
  
  var arr = new Array(n),ans=[];
  for (var i = 0; i < n; i++) {
    arr[i] = new Array(n);
  }
  for(var i=0;i<n;i++){
    arr[i][0]=1;
    arr[i][i]=1;
  }
  var cnt=0;
  for(var i=0;i<n;i++){
    for(var j=0;j<cnt;j++){
      if(j!=0 && i!=j){
        arr[i][j]=arr[i-1][j]+arr[i-1][j-1];
      }
    }
    cnt++;
  }
  for(var i=0;i<n;i++){
    for(var j=0;j<n;j++){
      if(arr[i][j]!=null)ans.push(arr[i][j]);
    }
  }
  console.log(arr);
  return ans;
}