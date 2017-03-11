function howmuch(m, n) {
    var a = new Array();
    var cnt=0;
    for(var i=Math.min(m,n);i<=Math.max(m,n);i++){  
      if(i%9==1 && i%7==2){
        a[cnt] = new Array(3);
        a[cnt][0]="M: "+i.toString(),a[cnt][1]="B: "+((i-2)/7).toString(),a[cnt][2]="C: "+((i-1)/9).toString();
        cnt++;
      }
    }
    return a;
}