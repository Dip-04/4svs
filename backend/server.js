const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const saltRounds = 10;

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Test@123',
    database: 'security',
    port: 3308,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
 // encryption 
function encrypt(text, key) {
    let result = '';

    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        if (char.match(/[a-z]/i)) {
            let code = text.charCodeAt(i);

            if (code >= 65 && code <= 90) {
                char = String.fromCharCode(((code - 65 + key) % 26) + 65);
            } else if (code >= 97 && code <= 122) {
                char = String.fromCharCode(((code - 97 + key) % 26) + 97);
            }
        }

        result += char;
    }

    return result;
}

app.get('/getPhoneNumber/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const sql = 'SELECT mobile FROM users WHERE username = ?';
    const values = [username];

    const [data] = await db.promise().execute(sql, values);

    if (data.length > 0) {
      return res.json({ phoneNumber: data[0].mobile });
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error in database query:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/register', async (req, res) => {
    try {
        console.log('Received a registration request:', req.body);

        
        if (!req.body.name || !req.body.username || !req.body.email || !req.body.password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const usernameLength = req.body.username.length;
        const encryptedPassword=encrypt(req.body.password,usernameLength);
        const sql = "INSERT INTO users (`name`, `username`, `email`, `password`) VALUES (?, ?, ?, ?)";
        const values = [req.body.name, req.body.username, req.body.email, encryptedPassword];


        const [data] = await db.promise().execute(sql, values);

       
        return res.json(data);
    } catch (error) {
        console.error('Error in database query:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/verify-otp', async (req, res) => {
    try {
      const { username, phone } = req.body;
  
      
      const updateSql = "UPDATE users SET mobile = ? WHERE username = ?";
      const updateValues = [phone, username];
      await db.promise().execute(updateSql, updateValues);
  
      return res.json({ success: true });
    } catch (error) {
      console.error('Error in OTP verification:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/register-color', async (req, res) => {
    try {
      const { username, color } = req.body;
  
      const updateSql = 'UPDATE users SET color = ? WHERE username = ?';
      const updateValues = [color, username];
  
      await db.promise().execute(updateSql, updateValues);
  
      return res.json({ success: true });
    } catch (error) {
      console.error('Error in updating color:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  

app.post('/login', async (req, res) => {
  try {
      console.log('Received a login request:', req.body);

      if (!req.body.username || !req.body.password) {
          return res.status(400).json({ error: 'Missing required fields' });
      }

      const { username, password } = req.body;
      const encryptedPassword = encrypt(password, username.length);

   
      const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
      const values = [username, encryptedPassword];

      const [data] = await db.promise().execute(sql, values);

      if (data.length > 0) {
       
          return res.json({ success: true, user: data[0] });
      } else {
        
          return res.status(401).json({ error: 'Invalid username or password' });
      }
  } catch (error) {
      console.error('Error in database query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});




  

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});