const obj = {
  a: 10,
  b: {
    c: 20,
  },
  d: [30, 40],
};

function fun(obj) {
  if (typeof obj !== 'object') {
    return obj;
  } else {
    let array = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
      array[key] = fun(obj[key]);
    }
    return array;
  }
}

let obj1 = fun(obj);
obj.a=50;
console.log(obj, obj1);
