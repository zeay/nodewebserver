const fs = require('fs');
const express =require('express');
const hbs=require('hbs');
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
var likes={
    newLike:'FootBall',
    oldLike:'cricket',
    set:['singing','Reading']
    
};

app.set('view engine','hbs');
app.use(express.static(__dirname +'/public'));

hbs.registerHelper('getCurrentYear',() =>{
    return new Date().getFullYear();
})

app.use((req,res,next) =>{
    let now = new Date().toString();
    let log = `Request is :${[req.url,req.method]} and Time is ${now} `;
    fs.appendFile('server.log',log + '\n',(error) =>{
        if(error){
            console.log('There is an error');
        }
    });
    next();
})

app.use((req,res,next) =>{
    res.render('main.hbs');
   // next();
})

/*app.get('/main',(req,res) => {
    res.render("main.hbs");
});*/

app.get('/',(req,res) => {
    res.send("Hello Express");
});

app.get('/about',(req,res) =>{
    res.render('me.hbs',{
        myself:'Kumar Saurabh',
        likes,
    });
});

app.get('/bad',(req,res) =>{
    res.send(`Bad request can't fetch data`);
});


app.listen(3000,()=>{
    console.log('server is running on port 3000');
});