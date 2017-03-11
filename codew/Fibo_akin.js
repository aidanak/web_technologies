function lengthSupUK(n, k) {
  var cnt=0;
  var u=[];
  u[1]=u[2]=1;
  for(var i=3;i<=n;i++){
    var x=u[i-1];
    var y=u[i-2];
    u[i]=u[i-x]+u[i-y];
    if(u[i]>=k) cnt++;
  }
  return cnt;
}

function comp(n) {
    var cnt=0;
  var u=[];
  u[1]=u[2]=1;
  for(var i=3;i<=n;i++){
    var x=u[i-1];
    var y=u[i-2];
    u[i]=u[i-x]+u[i-y];
    if(u[i]<u[i-1]) cnt++;
  }
  return cnt;
}