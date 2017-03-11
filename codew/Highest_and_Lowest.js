function highAndLow(numbers){
  var mini=10000;
  var maxi=-10000;
  var i;
  var res = numbers.split(" ");
  for(i=0;i<res.length;i++){
    if(maxi<=parseInt(res[i])){
      maxi=parseInt(res[i]);
    }
    if(mini>=parseInt(res[i])){
      mini=parseInt(res[i]);
    }
  }
  return maxi+" "+mini;
}