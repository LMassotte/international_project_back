const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const { MongoClient } = require('mongodb');

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/organizations', organizationRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// app.get('/api/users/first', async (req, res) => {
//   try {
//     await client.connect();
//     const database = client.db('international');
//     const usersCollection = database.collection('users');

//     const firstUser = await usersCollection.findOne();
//     res.json({ firstUser: firstUser ? firstUser : null });
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.post('/api/users/login', async (req, res) => {
// });

// app.post('/api/users/register', async (req, res) => {
  
// });