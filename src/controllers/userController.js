const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const userModel = new UserModel('mongodb+srv://loic:Qp6Hrg3RNE4bRg2p@internationalprojectclu.f2ktrik.mongodb.net/?retryWrites=true&w=majority');

const UserController = {
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            await userModel.connect();

            const user = await userModel.findOne({ email });

            if (user) {
                const passwordMatch = await bcrypt.compare(password, user.password);

                if (passwordMatch) {
                    res.json({ success: true, message: 'Login successful' });
                } else {
                    res.status(401).json({ success: false, message: 'Invalid password' });
                }
            } else {
                res.status(404).json({ success: false, message: 'User not found' });
            }
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    register: async (req, res) => {
        const { email, password } = req.body;

        try {
            await userModel.connect();
            const database = userModel.client.db('international');
            const usersCollection = database.collection('users');

            const existingUser = await userModel.findOne({ email });

            if (existingUser) {
                res.status(400).json({ success: false, message: 'User already exists' });
                return;
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await usersCollection.insertOne({
                email,
                password: hashedPassword,
            });
            res.status(200).json({ success: true, message: 'User registered successfully' });
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).send('Internal Server Error');
        }
    },

    getFirstUser: async (req, res) => {
        try {
            await userModel.connect();
            const firstUser = await userModel.findOne();
            res.json({ firstUser: firstUser ? firstUser : null });
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).send('Internal Server Error');
        }
    },
};

module.exports = UserController;