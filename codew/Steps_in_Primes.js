function step(g, m, n) {
    var arr=[];
    for(var number=m;number<=n;number++){
      var b=true;
      var start = 2;
      for(var i=2;i<=Math.floor(Math.sqrt(n));i++){
        if(number%i==0){
          b=false;
          break;
        }
      }
      if(b==true && number>1){
          arr.push(number);
      }
    }
    for(var i=0;i<arr.length;i++){
      for(var j=0;j<arr.length;j++){
        if(i!=j && Math.abs(arr[i]-arr[j])==g){
          var str=[Math.min(arr[i],arr[j]),Math.max(arr[i],arr[j])];
          return str;
        }
      }
    }
    return null;
}