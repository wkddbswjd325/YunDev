// Express에서 권장하는 메인 애플리케이션 이름 (entry application)
var express = require('express');
// 가져온 모듈을 실행하면 app을 return!
var app = express();
// 위의 두줄은 express를 쓰려면 반드시!!

var bodyParser = require('body-parser'); //post방식 위해서
app.use(bodyParser.urlencoded({extended:false}));

app.locals.pretty = true; // jade 로 만들어진 코드 pretty하게

// 템플릿 엔진 set
app.set('view engine', 'jade');
app.set('views', './views');

// 정적 파일 제공 (디렉토리 이름 : public)
app.use(express.static('public'));

// 아래는 라우팅!!!!! 중요한 부분!
// get은 get방식으로 접근한 사용자를 받음!
app.get('/', function(req, res){
    res.send('<h1>Hello home page!!</h1>');
}); //사용자가 홈으로 접속하면 두번째 인자로 전달한 함수 실행

app.get('/login', function(req, res){
    res.send('<h1>Login Please!</h1>');
}); // 사용자가 로그인이라는 경로로 들어왔을때 실행!
// 127.0.0.1:3000/login

app.get('/route', function(req,res) {
    res.send('Hello Router, <img src="/testimage.jpg">');
})

app.get('/dynamic', function(req,res) {
	var lis = '';
	for(var i=0; i<10; i++) {
		lis = lis + '<li>coding</li>';
	}
	var time = Date();
	var output = `
	<!DOCTYPE html>
	<html>
	<head>
		<title></title>
	</head>
	<body>
		<h1>Hello, dynamic!</h1>
		<ul>
			${lis}
		</ul>
		${time}
	</body>
	</html>`;
    res.send(output);
})

app.get('/template', function(req, res) {
	res.render('temp', {time:Date(), _title:'Jade'});
	// temp라는 템플릿 파일을 웹페이지로 렌더링해서 전송!
})


//semantic도!
app.get('/topic/:id', function(req, res){
	var topics = [
		'Javascript is ...',
		'Nodejs is ...',
		'Express is ...'
	];
	var output = `
		<a href='/topic?id=0'>Javascript</a><br>
		<a href='/topic?id=1'>Node.js</a><br>
		<a href='/topic?id=2'>Express</a><br><br>
		${topics[req.query.id]}<br>
		${topics[req.params.id]}
	`
	res.send(output);
	//위에 query는 쿼리스트링 params는 semantic
})

app.get('/topic/:id/:mode', function(req,res){
	res.send(req.params.id +', '+ req.params.mode)
});

app.get('/form', function(req, res){
	res.render('form');
});

app.get('/form_receiver', function(req, res){
	var title = req.query.title;
	var description = req.query.description;
	res.send(title+ ', '+description);
});

app.post('/form_receiver', function(req, res) {
	var title = req.body.title;
	var description = req.body.description;
	res.send(title+ ', '+description);
});

// 웹 애플리케이션이 3000번 포트를 리스닝
app.listen(3000, function() {
    console.log('Connected 3000 port!');
});