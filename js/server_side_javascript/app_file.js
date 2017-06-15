var express = require('express');
var app = express();
var bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({extended:false}));

var fs = require('fs');

app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'jade');

app.get('/topic/new', function(req,res){
    fs.readdir('data', function(err,files){
        if(err) {
            console.log(err);
            res.status(500).send('Interval Server Error');
        }
        res.render('new', {topics:files});
    });
})

app.post('/topic', function(req,res){
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('data/'+title, description, function(err){
        if(err) {
            console.log(err);
            res.status(500).send('Interval Server Error');
        }
        res.redirect('/topic/'+title);
    });
});

app.get(['/topic','/topic/:id'], function(req,res) {
    fs.readdir('data', function(err,files){
        if(err) {
            console.log(err);
            res.status(500).send('Interval Server Error');
        }
        var id = req.params.id;
        if(id) {
            //id값이 있을때
            fs.readFile('data/'+id, 'utf8', function(err,data){
                if(err) {
                    console.log(err);
                    res.status(500).send('Interval Server Error');
                }
                res.render('view', {topics:files, title:id, description:data});
            });
        } else {
            //id값이 없을때
            res.render('view', {topics:files, title:'Welcome', description:'Hello JS'});
        }
    });
});

app.listen(3000, function(){
    console.log('Connected 3000 port!!');
});