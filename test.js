let sum = (a)=>{
    return function(b){
        if(b){
            return sum(a+b);
        }
        return a;
    }
}

let a = sum(1)(2)(3)();
console.log(a);