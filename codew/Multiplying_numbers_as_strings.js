function multiply(a, b)
{
  var s1,s2;
  if(a.length>b.length){
    s1=Array.from(a);
    s2=Array.from(b)
  }
  else{
    s1=Array.from(b);
    s2=Array.from(a)
  }
  var s1 = s1.reverse();
  var s2 = s2.reverse();
  var c=[s1.length+s2.length];
  for(var i=0;i<s1.length+s2.length;i++){
    c[i]=0;
  }
  for(var i=0;i<s1.length;i++){
    for(var j=0,carry=0;(j<s2.length) || carry;j++){
      var cur=c[i+j]+carry;
      if(j<s2.length){
        cur+=parseInt(s1[i])*parseInt(s2[j]);
      }
      c[i+j] = cur%10;
		  carry = Math.floor(cur/10);
    }
  }
  c.reverse();
  var cnt=-1;
  console.log(c);
  for(var i=0;;i++){
    if(c[i]!=0){
      cnt=i;
      break;
    }
  }
  console.log(cnt);
  if(cnt==c.length){
     return "0";
  }
  var ans="";
  for(var i=cnt;i<c.length;i++){
    ans+=c[i].toString();
  }
  return ans;
}