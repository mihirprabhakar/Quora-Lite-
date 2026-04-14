const express=require('express');
const app=express();
const port=8080;
const path=require('path');
const {v4:uuidv4}=require('uuid');
const methodOverride=require('method-override');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));


let posts=[
    {
        id:uuidv4(),
    username:'john',
    content:'hello world',
    img:'https://tse4.mm.bing.net/th/id/OIP.OvQNCbYUN7c16CAQKIsa2QHaEK?rs=1&pid=ImgDetMain&o=7&rm=3'
},
{
    id:uuidv4(),
    username:'abc',
    content:'coding is fun',
    img:'https://i.etsystatic.com/40317824/r/il/339134/4827441773/il_fullxfull.4827441773_887m.jpg'
},
{
    id:uuidv4(),
    username:'xyz',
    content:'love is in the air',
    img:'https://wallpapercave.com/wp/wc1802079.jpg'
}
];

app.get('/',(req,res)=>{
    res.render('main.ejs');
});
//show all posts
app.get('/posts',(req,res)=>{
    res.render('index.ejs',{posts});
});

app.get('/about',(req,res)=>{
    res.render('about.ejs',{posts});
});



app.get('/posts/new',(req,res)=>{
    res.render('new.ejs');
});

app.get('/posts/:id',(req,res)=>{
    let {id}=req.params;
    let post=posts.find(p=>p.id===id);
    
    res.render('post.ejs',{post});
    
    
});

app.post('/posts',(req,res)=>{
    let {username,content,img}=req.body;
    let id=uuidv4();
    let newPost={id,username,content,img};
    posts.push(newPost);
    res.redirect('/posts');
});



app.patch('/posts/:id',(req,res)=>{
    let {id}=req.params;
    let {content,img}=req.body;
    let post=posts.find(p=>p.id===id);
    post.content=content;
    post.img=img;
    res.redirect('/posts');
});

app.get('/posts/:id/edit',(req,res)=>{
    let {id}=req.params;
    let post=posts.find(p=>p.id===id);
    res.render('edit.ejs',{post});
});



app.delete('/posts/:id',(req,res)=>{
    let {id}=req.params;
    posts=posts.filter(p=>p.id!==id);
    res.redirect('/posts');
});


app.get('/contact',(req,res)=>{
    res.render('contact.ejs');
});

app.post('/contact',(req,res)=>{
    let {name,email,message}=req.body;
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
    res.render('confirm.ejs');
});

app.get('/privacy',(req,res)=>{
    res.render('privacy.ejs');
});

app.get('/terms',(req,res)=>{
    res.render('terms.ejs');
});


app.get('/login', (req, res) => {
    res.render('login.ejs');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    console.log(username, password);

    res.send("Login successful");
});


app.get('/signup', (req, res) => {
    res.render('signup.ejs');
});


app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    console.log("New User:", username, email, password);

    res.send("Signup successful ");
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});