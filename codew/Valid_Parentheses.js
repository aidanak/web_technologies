function validParentheses(parens){
  var c=0;
  for(var i=0;i<parens.length;i++){
    if(parens[i]=="("){
      c++;
    }
    else{
      c--;
    }
    if(c<0){
      return false;
    }
  }
  if(c==0){
    return true;
  }
  else{
    return false;
  }
}