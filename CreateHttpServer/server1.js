const http = require('http');

// 8080포트에서 요청이 오기를 기다리는 중이 됨!

http.createServer((req, res)=>{
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
}).listen(8080, ()=>{
    console.log('8080번 포트에서 서버 대기 중입니다!');
});