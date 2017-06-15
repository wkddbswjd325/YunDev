var fs = require('fs');

// Sync
console.log(1);
var data = fs.readFileSync('data.txt', {encoding:'utf8'});
console.log(data);

// Async
console.log(2);
// err은 에러(에러 없으면 null), data는 출력된데이터
// 백그라운드
fs.readFile('data.txt', {encoding:'utf8'},function(err,data){
    console.log(3);
    console.log(data);
})

console.log(4);