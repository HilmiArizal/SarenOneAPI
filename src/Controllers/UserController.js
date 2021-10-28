const { uploader } = require("../Services/uploader");
const { UserModel } = require("../Models");
const fs = require("fs");


module.exports = {

    changeProfile: async (req, res) => {
        try {
            const id = req.params.id;
            const path = '/imageprofile';
            const upload = uploader(path, 'IMG').fields([{ name: 'img' }]);
            upload(req, res, (err) => {
                if (err) return res.status(500).send(err);

                const { img } = req.files;
                const imagePath = img ? `${path}/${img[0].filename}` : null;

                const data = JSON.parse(req.body.data);
                data.img = imagePath;

                UserModel.findById(id)
                    .then((user) => {
                        if (!img) {
                            data.img = user.img;
                            return Object.assign(user, data);
                        } else {
                            if (!user.img) {
                                return Object.assign(user, data);
                            } else {
                                fs.unlinkSync('./public' + user.img);
                            }
                            return Object.assign(user, data);
                        }
                    })
                    .then((data) => {
                        return data.save();
                    })
                    .then((updateData) => {
                        const currentUser = new Object();
                        currentUser._id = updateData._id;
                        currentUser.email = updateData.email;
                        currentUser.username = updateData.username;
                        currentUser.phonenumber = updateData.phonenumber;
                        currentUser.nickname = updateData.nickname;
                        currentUser.img = updateData.img;
                        currentUser.division = updateData.division;
                        currentUser.role = updateData.role;
                        res.status(200).send({
                            message: 'Update Data Successful',
                            currentUser
                        });
                    })
                    .catch((err) => {
                        res.status(500).send(err);
                    })
            })
        } catch (err) {
            console.log(err);
        }
    },

    changePassword: async (req, res) => {
        try {
            const id = req.params.id;

            const oldPassword = req.body.oldPassword;
            const newPassword = req.body.newPassword;

            await UserModel.findById(id)
                .then((user) => {
                    if (user.password === oldPassword) {
                        user.password = newPassword;
                        return Object.assign(user);
                    }
                })
                .then((data) => {
                    return data.save();
                })
                .then((updateData) => {
                    res.status(200).send({
                        message: 'Update Data Successful',
                        updateData
                    });
                })
                .catch((err) => {
                    res.status(200).send({
                        message: "Password old it's a wrong!"
                    });
                })
        } catch (err) {
            console.log(err);
        }
    },

    getAllUser: async (req, res) => {
        await UserModel.find()
        .then((results) => {
            res.status(200).send({
                message: results.length > 0 ? 'Get Data Successful' : 'Empty Data',
                data: results
            })
        })
        .catch((err) => {
            res.status(500).send(err);
        })
    },

    getUser: async (req, res) => {
        const search = req.query.search;

        function escapeRegex(text) {
            return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        }

        await UserModel.find().countDocuments()
            .then((count) => {
                const regex = new RegExp(escapeRegex(search), "gi");
                if (!search) {
                    return UserModel.find().sort({ createdAt: -1 });
                } else {
                    return UserModel.find({ $or: [{ username: regex }] }).sort({ createdAt: -1 });
                }
            })
            .then((results) => {
                res.status(200).send({
                    message: results.length > 0 ? 'Get Data Successful' : 'Empty Data',
                    data: results
                });
            })
            .catch((err) => {
                res.status(500).send(err);
            })
    }

}