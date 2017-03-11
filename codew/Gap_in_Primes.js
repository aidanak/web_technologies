function gap(g, m, n) {
    var arr=[],oldnum=0;
    for(var number=m;number<=n;number++){
      var b=true;
      for(var i=2;i<=Math.floor(Math.sqrt(n));i++){
        if(number%i==0){
          b=false;
          break;
        }
      }
      if(b==true && number>1){
          if(Math.abs(number-oldnum)==g && oldnum!=0){
            var str=[oldnum,number];
            return str;
          }
          oldnum=number;
      }
    }
    return null;
}