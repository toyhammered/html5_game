
function isPrime(n) {
    if (n < 2) return false;
    
    for (var i=2,m=Math.sqrt(n);i<=m;i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}
