var getQuote = function(quotes, hero){
  var ind="",ind1;
  for(var i=0;i<hero.length;i++){
    if(hero[i]>='0' && hero[i]<='9'){
      ind+=hero[i];
    }
  }
  console.log(ind);
  ind1=parseInt(ind);
  if(hero[0]=='B'){
    return "Batman: "+quotes[ind1];
  }
  if(hero[0]=='R'){
    return "Robin: "+quotes[ind1];
  }
  if(hero[0]=='J'){
    return "Joker: "+quotes[ind1];
  }
}