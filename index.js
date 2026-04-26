const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'quora_lite'
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to Server");
    }
});
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('main.ejs');
});

app.get('/posts', (req, res) => {
    db.query("SELECT * FROM posts", (err, results) => {
        if (err) {
            console.log(err);
            return res.send("Error fetching posts");
        }
        res.render('index.ejs', { posts: results });
    });
});

app.get('/about', (req, res) => {
    res.render('about.ejs');
});

app.get('/posts/new', (req, res) => {
    res.render('new.ejs');
});

app.get('/posts/:id', (req, res) => {
    let { id } = req.params;

    db.query("SELECT * FROM posts WHERE id = ?", [id], (err, results) => {
        if (err) return res.send("Error");

        if (results.length === 0) {
            return res.send("Post not found");
        }

        res.render('post.ejs', { post: results[0] });
    });
});

app.post('/posts', (req, res) => {
    let { username, content, img } = req.body;
    let id = uuidv4();

    let sql = "INSERT INTO posts (id, username, content, img) VALUES (?, ?, ?, ?)";

    db.query(sql, [id, username, content, img], (err) => {
        if (err) {
            console.log(err);
            return res.send("Error creating post");
        }
        res.redirect('/posts');
    });
});

app.get('/posts/:id/edit', (req, res) => {
    let { id } = req.params;

    db.query("SELECT * FROM posts WHERE id = ?", [id], (err, results) => {
        if (err) return res.send("Error");

        if (results.length === 0) {
            return res.send("Post not found");
        }

        res.render('edit.ejs', { post: results[0] });
    });
});

app.patch('/posts/:id', (req, res) => {
    let { id } = req.params;
    let { content, img } = req.body;

    let sql = "UPDATE posts SET content = ?, img = ? WHERE id = ?";

    db.query(sql, [content, img, id], (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Error updating post");
        }

        if (result.affectedRows === 0) {
            return res.send("Post not found");
        }

        res.redirect('/posts');
    });
});

app.delete('/posts/:id', (req, res) => {
    let { id } = req.params;

    db.query("DELETE FROM posts WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Error deleting post");
        }

        if (result.affectedRows === 0) {
            return res.send("Post not found");
        }

        res.redirect('/posts');
    });
});

app.get('/contact', (req, res) => {
    res.render('contact.ejs');
});

app.post('/contact', (req, res) => {
    let { name, email, message } = req.body;
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
    res.render('confirm.ejs');
});

app.get('/privacy', (req, res) => {
    res.render('privacy.ejs');
});

app.get('/terms', (req, res) => {
    res.render('terms.ejs');
});

app.get('/login', (req, res) => {
    res.render('login.ejs');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);

    res.redirect("/posts");
});

app.get('/signup', (req, res) => {
    res.render('signup.ejs');
});

app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    console.log("New User:", username, email, password);

    res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
