const { TeamModel } = require("../Models");
const { uploader } = require("../Services/uploader");
const fs = require("fs");


module.exports = {

    getTeam: async (req, res) => {
        try {
            await TeamModel.find()
                .then((data) => {
                    res.status(200).send({
                        message: 'Get Data Successfull',
                        data
                    });
                })
                .catch((err) => {
                    res.status(500).send(err);
                })
        } catch (err) {
            console.log(err);
        }
    },

    addTeam: async (req, res) => {
        try {
            const path = '/imageteam';
            const upload = uploader(path, 'IMG').fields([{ name: 'image' }]);
            upload(req, res, (err) => {
                if (err) return res.status(500).send(err);

                const { image } = req.files;
                const imagePath = image ? `${path}/${image[0].filename}` : null;

                const data = JSON.parse(req.body.data);
                data.image = imagePath;

                const dataTeam = new TeamModel(data);
                dataTeam.save()
                    .then((data) => {
                        res.status(200).send({
                            message: 'Add Data Successful',
                            data
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

    editTeam: async (req, res) => {
        try {
            const id = req.params.id;
            const path = '/imageteam';
            const upload = uploader(path, 'IMG').fields([{ name: 'image' }]);
            upload(req, res, (err) => {
                if (err) return res.status(500).send(err);

                const { image } = req.files;
                const imagePath = image ? `${path}/${image[0].filename}` : null;

                const data = JSON.parse(req.body.data);
                data.image = imagePath;

                TeamModel.findById(id)
                    .then((team) => {
                        if (!image) {
                            data.image = team.image;
                            return Object.assign(team, data);
                        } else {
                            if (!team.image) {
                                return Object.assign(team, data);
                            } else {
                                fs.unlinkSync('./public' + team.image);
                                return Object.assign(team, data);
                            }
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
                        res.status(500).send(err);
                    })
            })
        } catch (err) {
            console.log(err);
        }
    },

    deleteTeam: async (req, res) => {
        try {
            const id = req.params.id;
            await TeamModel.findById(id)
                .then((team) => {
                    TeamModel.deleteOne({ _id: id })
                        .then((deleteData) => {
                            fs.unlinkSync('./public' + team.image);
                            res.status(200).send({
                                message: 'Delete Data Successfull',
                                deleteData
                            });
                        })
                        .catch((err) => {
                            res.status(500).send(err);
                        })
                })
        } catch (err) {
            console.log(err);
        }
    }

}