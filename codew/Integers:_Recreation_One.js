function isInt(n){
    return Number(n) === n && n % 1 === 0;
}
function listSquared(m, n) {
    var ans=new Array(),cnt=0;
    for(var i=m;i<=n;i++){
      var sum=0;
      for(var j=1;j<=i;j++){
        if(i%j==0){
          sum+=j*j;
        }
      }
      //console.log(sum);
      if(isInt(Math.sqrt(sum))){
        ans[cnt]=new Array(2);
        ans[cnt][0]=i;
        ans[cnt][1]=sum;
        cnt++;
      }
      
    }
    return ans;
}