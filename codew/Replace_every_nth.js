function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}
function replaceNth(text, n, oldValue, newValue) {
  if(n<0){
    return text;
  }
  var cnt=0;
  for(var i=0;i<text.length;i++){
    if(text[i]==oldValue){
      cnt++;
      if(cnt%n==0){
        console.log(cnt);
        text = setCharAt(text,i,newValue);
      }
    }
  }
  return text;
}