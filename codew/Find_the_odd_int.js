function findOdd(A) {
  var i=0;
  var B=[];
  for(i=0;i<A.length;i++){
    B[A[i]]=0;
  }
  for(i=0;i<A.length;i++){
    B[A[i]]++;
  }
  for(i=0;i<A.length;i++){
    if(B[A[i]]%2!=0){
      return A[i];
    }
    
  }
  return 0;
}