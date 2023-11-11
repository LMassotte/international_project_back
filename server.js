const express = require('express');
const cors = require('cors');
const { MongoClient  } = require('mongodb');

//LA DB FIRESTORE A ETE CREEE EN MODE TEST => MODIFIER LES REGLES DE SECURITE SOUS 30 JOURS OU BUG

const app = express();
const port = 5000;
app.use(cors());

const uri = 'mongodb+srv://loic:Qp6Hrg3RNE4bRg2p@internationalprojectclu.f2ktrik.mongodb.net/?retryWrites=true&w=majority'; 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/api/users/first', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('international');
    const usersCollection = database.collection('users');

    const firstUser = await usersCollection.findOne();
    res.json({ firstUser: firstUser ? firstUser : null });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  } 
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});