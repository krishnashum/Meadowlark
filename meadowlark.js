var express = require('express')
var app = express()
var handlebars = require('express3-handlebars').create({defaultLayout:'Main'});
var fortunes = require('./lib/fortune.js')

app.set('port',process.env.PORT || 3000)
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars')


app.get("/",(req , res)=>{
    // res.type('text/plain');
    // res.status('200');
    // res.send("meadowlark home page");
    res.render('home');
})

app.get("/about",(req , res)=>{
    // res.type('text/plain');
    // res.status('200');
    // res.send("meadowlark about page");
    //var randomFortune = fortunes[Math.floor( Math.random() * fortunes.length)];
    res.render('about',{fortune : fortune.getFortune()});
})

app.use(express.static(__dirname + '/public'));
app.use(function(req,res){
  //res.type('text/plain');
  res.status(404);
  //res.send('404 - page not found');
  res.render('404');
})

app.use(function(err,req,res,next){
  console.log(err.stack);
  //res.type('text/plain');
  res.status(500);
  //res.send('500 - internal server error');
  res.render('500');
})

app.listen(app.get('port'),function(){
  console.log('Express started on http://localhost:'+app.get('port')+';press Ctrl + C to terminate. ');
})
