function accum(s) {
  var s1="";
  var cnt=0,i=0,j=0;
	for( i=0;i<s.length;i++){
    cnt++;
    s1+=s[i].toUpperCase();
    var str=s[i].toLowerCase();
    for(j=1;j<cnt;j++){
        s1+=str;
    }
    if(i!=s.length-1){
      s1+='-';
    }
  }
  return s1;
}