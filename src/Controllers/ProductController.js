const { ProductModel } = require("../Models");
const { uploader } = require("../Services/uploader")


module.exports = {

    getProduct: async (req, res) => {
        const currentPage = parseInt(req.query.currentPage);
        const perPage = parseInt(req.query.perPage);

        let totalData;

        await ProductModel.find().countDocuments()
            .then((count) => {
                totalData = count;
                return ProductModel.find().skip(currentPage * perPage).limit(perPage).sort({ createdAt: -1 });
            })
            .then((results) => {
                res.status(200).send({
                    message: results.length > 0 ? 'Get Data Succesful' : 'Empty Data',
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

                const data = req.body;
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
    }
}