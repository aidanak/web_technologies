function mix(s1, s2) {
  var arr=[],arr2=[],ar=[];
  for(var i='a'.charCodeAt()-97;i<='z'.charCodeAt()-97;i++){
    arr[i]=0;
    arr2[i]=0;
  }
  for(var i=0;i<s1.length;i++){
    if(s1[i]>='a' && s1[i]<='z') arr[s1[i].charCodeAt()-97]++;
  }
  for(var i=0;i<s2.length;i++){
    if(s2[i]>='a' && s2[i]<='z') arr2[s2[i].charCodeAt()-97]++;
  }
  strarr=[];
  for(var i='a'.charCodeAt()-97;i<='z'.charCodeAt()-97;i++){
    var str="";
    if(Math.max(arr[i],arr2[i])>1){
      if(arr[i]>arr2[i])str+="1:";
      else if(arr[i]<arr2[i])str+="2:";
      else str+="=:";
      for(var j=0;j<Math.max(arr[i],arr2[i]);j++){
        str+=String.fromCharCode(i+97);
      }
      strarr.push(str);
    }
  }
  strarr.sort(function(a,b){
    if(a.length== b.length){
      if(a[0]==b[0]){
        return a[2] > b[2] ? 1 : -1;
      }
      return a[0] < b[0] ? -1 : 1;
    }
    return a.length > b.length ? -1 : 1;
  });
  var ans="";
  for(var i=0;i<strarr.length;i++){
    ans+=strarr[i];
    if(i!=strarr.length-1){
      ans+="/";
    }
  }
  return ans;
}