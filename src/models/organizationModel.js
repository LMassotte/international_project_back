const { MongoClient } = require('mongodb');

class OrganizationModel {
  constructor(uri) {
    this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  }

  async connect() {
    await this.client.connect();
  }

  async findOne(query) {
    const database = this.client.db('international');
    const organizationsCollection = database.collection('organizations');
    return await organizationsCollection.findOne(query);
  }

  async findAll(query = {}) {
    const database = this.client.db('international');
    const organizationsCollection = database.collection('organizations');
    return await organizationsCollection.find(query).toArray();
  }
}

module.exports = OrganizationModel;