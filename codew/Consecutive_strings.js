function longestConsec(strarr, k) {
    if(strarr.length==0 || k<=0 || k>strarr.length) return "";
    var n=strarr[0].length,arr=[],arrs=[],maxi,num,maxii,ans="";
    for(var i=0;i<strarr.length;i++){
      arr.push(strarr[i].length);
      arrs.push(n);
      if(i+1<strarr.length)n+=strarr[i+1].length;
    }
    maxi=arrs[k-1];
    maxii=k-1;
    for(var i=k;i<arrs.length;i++){
      num=arrs[i]-arrs[i-k];
      if(maxi<num){
        maxi=num;
        maxii=i;
      }
    }
    for(var i=maxii-k+1;i<=maxii;i++){
      ans+=strarr[i];
    }
    return ans;
}