function validBraces(braces){
  var s=braces;
  var stack=[]; 
  for(var i=0;i<s.length;i++){
    if(s[i]=='(' || s[i]=='[' || s[i]=='{'){
      stack.push(s[i]);
      continue;
    }
    if(stack.length==0){
      stack.push('x');
    }
    else{
       var val=stack.pop();
       if((val!='{' && s[i]=='}') || (val!='(' && s[i]==')') || (val!='[' && s[i]==']') ){
          stack.push(val);
          stack.push(s[i]);
       }
    }
  }
  if(stack.length==0){
    return true;
  }
  return false;
}