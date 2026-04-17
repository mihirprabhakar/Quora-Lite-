
# Quora Lite (Node.js + Express + MySQL)

## Overview

Quora Lite is a simple question-and-answer style web application built using Node.js, Express, EJS, and MySQL. It allows users to create, view, update, and delete posts. The application demonstrates core backend development concepts such as RESTful routing, server-side rendering, and database integration.

## Features

* Create a new post
* View all posts
* View a single post
* Edit existing posts
* Delete posts
* Contact form handling
* Basic login and signup (without authentication logic)
* Server-side rendering using EJS templates
* Persistent storage using MySQL

## Tech Stack

* Backend: Node.js, Express.js
* Frontend: EJS, HTML, CSS
* Database: MySQL
* Libraries:
  * mysql2
  * uuid
  * method-override

## Project Structure

```
project/
│
├── views/            # EJS templates
├── public/           # Static files (CSS, images)
├── index.js          # Main server file
├── seed.js           # Faker data seeding script (optional)
├── package.json
```

## Installation

1. Clone the repository:

```
git clone <your-repo-url>
cd <project-folder>
```

2. Install dependencies:

```
npm install
```

3. Install MySQL and create a database:

```
CREATE DATABASE quora_lite;
USE quora_lite;

CREATE TABLE posts (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(100),
    content TEXT,
    img TEXT
);
```

4. Update database configuration in `index.js`:

```
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'quora_lite'
});
```

## Running the Application

Start the server:

```
node index.js
```

Open your browser and navigate to:

```
http://localhost:8080
```

## Seeding Data (Optional)

To populate the database with sample data using Faker:

1. Install Faker:

```
npm install @faker-js/faker
```

2. Run the seed script:

```
node seed.js
```

This will insert multiple sample posts into the database.

## API Routes

### Posts

* GET `/posts` - Retrieve all posts
* GET `/posts/new` - Render form to create a post
* POST `/posts` - Create a new post
* GET `/posts/:id` - View a single post
* GET `/posts/:id/edit` - Render edit form
* PATCH `/posts/:id` - Update a post
* DELETE `/posts/:id` - Delete a post

### Other Routes

* GET `/` - Home page
* GET `/about` - About page
* GET `/contact` - Contact form
* POST `/contact` - Submit contact form
* GET `/privacy` - Privacy policy
* GET `/terms` - Terms and conditions
* GET `/login` - Login page
* POST `/login` - Handle login (basic)
* GET `/signup` - Signup page
* POST `/signup` - Handle signup (basic)

## Limitations

* No user authentication or authorization
* Passwords are not encrypted
* No input validation
* No role-based access control
* All posts are publicly editable and deletable
* Monolithic file structure (no MVC separation)

## Future Improvements

* Implement authentication using bcrypt and sessions or JWT
* Add user accounts and link posts to users
* Introduce input validation and error handling middleware
* Refactor project into MVC architecture
* Build a REST API and integrate with a React frontend
* Add features like comments, likes, and tags

## License

This project is for educational purposes and does not include a specific license.
