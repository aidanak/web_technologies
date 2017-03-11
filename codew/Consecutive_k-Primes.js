function pf( n)
{
    var cnt=0;
    while (n%2 == 0)
    {
        cnt++;
        n = n/2;
    }
    for (var i = 3; i <= Math.sqrt(n); i = i+2)
    {
        while (n%i == 0)
        {
            cnt++;
            n = n/i;
        }
    }
    if (n > 2)
        cnt++;
    return cnt;
}
function consecKprimes(k, arr) {
    var barr=[],ans=0;
    for(var i=0;i<arr.length;i++){
       if(pf(arr[i])==k) barr.push(true);
       else barr.push(false);
    }
    for(var i=1;i<arr.length;i++){
       if(barr[i] && barr[i-1]){
         ans++;
       }
    }
    return ans;
}