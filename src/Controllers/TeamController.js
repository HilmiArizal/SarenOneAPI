const { TeamModel } = require("../Models");
const { uploader } = require("../Services/uploader");
const fs = require("fs");


module.exports = {

    getListTeam: async (req, res) => {
        const search = req.query.search;
        const currentPage = parseInt(req.query.currentPage);
        const perPage = parseInt(req.query.perPage);
        let totalData;

        function escapeRegex(text) {
            return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        }

        await TeamModel.find().countDocuments()
            .then((count) => {
                totalData = count;
                const regex = new RegExp(escapeRegex(search), "gi");
                if (!search) {
                    return TeamModel.find().skip(currentPage * perPage).limit(perPage);
                } else {
                    return TeamModel.find({ $or: [{ fullname: regex }] }).skip(currentPage * perPage).limit(perPage);
                }
            })
            .then((results) => {
                res.status(200).send({
                    message: results.length > 0 ? 'Get Data Successful' : 'Empty Data',
                    data: results,
                    total_data: totalData,
                    per_page: perPage,
                    current_page: currentPage
                });
            })
            .catch((err) => {
                res.status(500).send(err);
            })
    },

    getTeam: async (req, res) => {
        try {
            await TeamModel.find()
                .then((data) => {
                    res.status(200).send({
                        message: 'Get Data Successful',
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