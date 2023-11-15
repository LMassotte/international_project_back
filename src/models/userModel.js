const { MongoClient } = require('mongodb');

class UserModel {
  constructor(uri) {
    this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  }

  async connect() {
    await this.client.connect();
  }

  async findOne(query) {
    const database = this.client.db('international');
    const usersCollection = database.collection('users');
    return await usersCollection.findOne(query);
  }
}

module.exports = UserModel;