const { UserModel } = require('../Models');


module.exports = {

    register: async (req, res) => {
        try {
            const addUser = new UserModel({
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                nickname: null,
                img: null,
                division: null,
                role: 'admin'
            });

            await addUser.save()
                .then((user) => {
                    res.status(200).send({ message: 'Register Success', user })
                })
                .catch((err) => {
                    res.status(500).send(err);
                })
        } catch (err) {
            console.log(err);
        }
    },

    login: async (req, res) => {
        try {
            await UserModel.findOne({ username: req.body.username })
                .then((user) => {
                    if (!user) return res.status(404).send({ message: 'User Not Found!' });
                    if (user.password !== req.body.password) return res.status(400).send({ message: 'Password is a wrong!' });
                    res.status(200).send({ message: 'Login Success', user })
                })
                .catch((err) => {
                    res.status(500).send(err);
                })
        } catch (err) {
            console.log(err);
        }
    }

}