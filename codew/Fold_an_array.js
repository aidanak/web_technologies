function foldArray(array, runs)
{
  var i=0,j=0;
  for(i=0;i<runs;i++){
    var b=[];
    for(j=0;j<array.length/2;j++){
      if(j!=array.length-1-j)b[j]=array[j]+array[array.length-j-1];
      else b[j]=array[j];
    }
    array=b;
  }
  return b;
}