function dontGiveMeFive(start, end)
{
  var cnt=end-start+1;
  for(var i=start;i<=end;i++){
    var str=i.toString();
    for(var j=0;j<str.length;j++){
      if(str[j]=='5'){
        cnt--;
        break;
      }
    }
  }
  return cnt;
}