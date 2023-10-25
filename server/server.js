const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const bcrypt = require("bcrypt")
const cors = require('cors');
const app = express();
app.use(cors(
  {
    origin:'*'
  }
));
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',  // Usually 'localhost' if the database is hosted locally
    user: 'root',
    password: 'password',
    database: 'app',
    insecureAuth : true,
    port:3306
  });

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

// ... (rest of your code remains the same)

// Signup endpoint
app.post('/signup',async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password,10);
   const sqlSearch = "SELECT * FROM users WHERE username = ?"
   const search_query = mysql.format(sqlSearch,[username])
   const sqlInsert = "INSERT INTO users(username , password) VALUES (?,?)"
   const insert_query = mysql.format(sqlInsert,[username, hashedPassword])
   // ? will be replaced by values
   // ?? will be replaced by string
    connection.query (search_query, async (err, result) => {
    if (err) throw (err)
    console.log("------> Search Results")
    console.log(result.length)
    if (result.length != 0) {
     console.log("------> User already exists")
     res.status(409).send("User already exists") 
    } 
    else {
      connection.query (insert_query, (err, result)=> {
        console.log(insert_query)
     if (err) throw (err)
     console.log ("--------> Created new User")
     console.log(result.insertId)
     res.sendStatus(201)
    })
   }
  }) //end of connection.query()
  }) //end of

// Signin endpoint
app.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const sqlSearch = 'SELECT * FROM users WHERE username = ?';
    const searchQuery = mysql.format(sqlSearch, [username]);
  
    connection.query(searchQuery, async (err, result) => {
      if (err) throw err;
      console.log(result)
      if (result.length === 0) {
        console.log('------> User not found');
        res.status(401).send('Invalid username or password');
      } else {
        const user = result[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
  
        if (passwordMatch) {
          // Passwords match, generate JWT token and send it to the client
          res.status(200).json({ user:user.username , message:'Auth successful' });
        } else {
          // Passwords don't match
          console.log('rrrr')
          console.log('------> Invalid password');
          res.status(401).send('Invalid username or password');
        }
      }
    });
  });

// ... (rest of your code remains the same)

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
