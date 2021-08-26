const { ProductModel } = require("../Models");
const { uploader } = require("../Services/uploader");
const fs = require('fs');


module.exports = {

    // ============ ADMIN =============

    getProduct: async (req, res) => {
        const search = req.query.search;
        const currentPage = parseInt(req.query.currentPage);
        const perPage = parseInt(req.query.perPage);
        let totalData;

        function escapeRegex(text) {
            return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        }

        await ProductModel.find().countDocuments()
            .then((count) => {
                totalData = count;
                const regex = new RegExp(escapeRegex(search), "gi");
                if (!search) {
                    return ProductModel.find().skip(currentPage * perPage).limit(perPage).sort({ createdAt: -1 });
                } else {
                    return ProductModel.find({ $or: [{ name: regex }] }).skip(currentPage * perPage).limit(perPage).sort({ createdAt: -1 });
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

    addProduct: async (req, res) => {
        try {
            const path = '/imageproduct';
            const upload = uploader(path, 'IMG').fields([{ name: 'image' }]);
            upload(req, res, (err) => {
                if (err) return res.status(500).send(err);

                const { image } = req.files;
                const imagePath = image ? `${path}/${image[0].filename}` : null;

                const data = JSON.parse(req.body.data);
                data.image = imagePath;

                const productModel = new ProductModel(data)
                productModel.save()
                    .then((results) => {
                        res.status(200).send({
                            message: 'Add Data Successful',
                            data: results,
                        });
                    })
                    .catch((err) => {
                        res.status(500).send(err);
                    });
            });
        } catch (err) {
            console.log(err);
        }
    },

    editProduct: async (req, res) => {
        try {
            const id = req.query.id;
            const path = '/imageproduct';
            const upload = uploader(path, 'IMG').fields([{ name: 'image' }]);
            upload(req, res, (err) => {
                if (err) return res.status(500).send(err);

                const { image } = req.files;
                const imagePath = image ? `${path}/${image[0].filename}` : null;

                const data = JSON.parse(req.body.data);
                data.image = imagePath;

                ProductModel.findById(id)
                    .then((product) => {
                        if (image) {
                            if (!product.image) {
                                return null;
                            } else {
                                fs.unlinkSync('./public' + product.image);
                            }
                            return Object.assign(product, data);
                        }
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
            })
        } catch (err) {
            console.log(err)
        }

    },

    deleteProduct: async (req, res) => {
        const id = req.params.id;

        await ProductModel.findById(id)
            .then((product) => {
                ProductModel.deleteOne({ _id: id })
                    .then((results) => {
                        fs.unlinkSync('./public' + product.image);
                        res.status(200).send({ message: "Delete Data Successful", results });
                    })
            })
            .catch((err) => {
                res.status(500).send(err);
            })
    },

    // ============ USER =============

    getAllProduct: async (req, res) => {
        await ProductModel.find()
            .then((product) => {
                res.status(200).send({
                    message: 'Get All Data Successful',
                    product
                });
            }).catch((err) => {
                res.status(500).send(err);
            })
    },

    getProductByProductId: async (req, res) => {
        const id = req.params.id;

        await ProductModel.findById(id)
            .then((product) => {
                res.status(200).send({ message: "Get Data Successful", product });
            })
            .catch((err) => {
                res.status(500).send(err);
            })
    }
}