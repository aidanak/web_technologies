function numbersWithDigitInside(x, d) {
  var ans=[],pro=1,sum=0,cnt=0;
  for(var i=1;i<=x;i++){
    var b=false;
    var str=i.toString();
    for(var j=0;j<str.length;j++){
      if(str[j]==d){
        b=true;
        break;
      }
    }
    if(b==true){
      cnt++;
      sum+=parseInt(str);
      pro*=parseInt(str);
    }
  }
  ans[0]=cnt;
  ans[1]=sum;
  if(cnt==0) ans[2]=0;
  else ans[2]=pro;
  return ans;
}