var _ = require('underscore');
var arr = [3,6,9,1,12];

console.log(arr[0]);
//위를 언더스코어로
console.log(_.first(arr));
console.log(arr[arr.length-1]);
//언더스코어로 ==> 가독성이 올라감
console.log(_.last(arr));