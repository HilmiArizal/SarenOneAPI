
const { UserModel } = require('../Models');

module.exports = {

    register: async (req, res) => {
        try {
            const addUser = new UserModel({
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                phonenumber: null,
                nickname: null,
                img: null,
                division: null,
                role: 3,
                verification: 0
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
                    if (!user) return res.status(200).send({ message: 'User Not Found!' });
                    if (user.password !== req.body.password) return res.status(200).send({ message: 'Password is a wrong!' });

                    const currentUser = new Object();
                    currentUser._id = user._id;
                    currentUser.email = user.email;
                    currentUser.username = user.username;
                    currentUser.phonenumber = user.phonenumber;
                    currentUser.nickname = user.nickname;
                    currentUser.img = user.img;
                    currentUser.division = user.division;
                    currentUser.role = user.role;

                    res.status(200).send({ message: 'Login Success', currentUser });
                })
                .catch((err) => {
                    res.status(500).send(err);
                })
        } catch (err) {
            console.log(err);
        }
    }

}