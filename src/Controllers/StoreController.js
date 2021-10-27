const { StoreModel } = require("../Models");


module.exports = {

    getAllStore: async (req, res) => {
        await StoreModel.find()
            .then((store) => {
                res.status(200).send({
                    message: 'Get All Data Successful',
                    store
                });
            }).catch((err) => {
                res.status(500).send(err);
            })
    },

    getStore: async (req, res) => {
        const search = req.query.search;
        const currentPage = parseInt(req.query.currentPage);
        const perPage = parseInt(req.query.perPage);
        let totalData;

        function escapeRegex(text) {
            return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        }

        await StoreModel.find().countDocuments()
            .then((count) => {
                totalData = count;
                const regex = new RegExp(escapeRegex(search), "gi");
                if (!search) {
                    return StoreModel.find().skip(currentPage * perPage).limit(perPage).sort({ createdAt: -1 });
                } else {
                    return StoreModel.find({ $or: [{ name: regex }] }).skip(currentPage * perPage).limit(perPage).sort({ createdAt: -1 });
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

    addStore: async (req, res) => {
        const data = req.body;
        const storeModel = new StoreModel(data)
        storeModel.save()
            .then((results) => {
                res.status(200).send({
                    message: 'Add Data Successful',
                    data: results,
                });
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    },

    editStore: async (req, res) => {
        const id = req.query.id;
        const data = req.body;
        await StoreModel.findById(id)
            .then((product) => {
                return Object.assign(product, data);
            })
            .then((data) => {
                return data.save();
            })
            .then((updateData) => {
                res.status(200).send({
                    message: 'Update Data Successful',
                    updateData,
                })
            })
            .catch((err) => {
                res.status(500).send(err);
            })
    },

    deleteStore: async (req, res) => {
        const id = req.params.id;

        await StoreModel.findById(id)
            .then((store) => {
                StoreModel.deleteOne({ _id: id })
                    .then((results) => {
                        res.status(200).send({ message: "Delete Data Successful", results });
                    })
            })
            .catch((err) => {
                res.status(500).send(err);
            })
    }

}