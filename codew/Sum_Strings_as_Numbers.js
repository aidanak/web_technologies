function reverse(s){
    return s.split("").reverse().join("");
}
function sumStrings(a1, b1)
{
  while(a1.length!=b1.length){
    if(a1.length>b1.length){
      b1="0"+b1;
    }
    else{
      a1="0"+a1;
    }
  }
  var a=reverse(a1);
  var b=reverse(b1);
  var c=[],carry=0;
  for(var i=0;(i<a.length)|| carry;i++){
    if(i==a.length && carry){
      c[i]=carry;
      break;
    }
    c[i]=parseInt(a[i])+parseInt(b[i])+carry;
    carry=Math.floor(c[i]/10);
    c[i]%=10;
  }
  console.log(c);
  c.reverse();
  var i=0;
  if(c[i]==0){
    i=1;
  }
  var ans="";
  for(i;i<c.length;i++){
    ans+=c[i].toString();
  }
  return ans;
}