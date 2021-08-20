const { ProductModel } = require("../Models");
const { uploader } = require("../Services/uploader")


module.exports = {

    getProduct: async (req, res) => {
        try {
            const getProductDB = await ProductModel.find();
            res.status(200).send(getProductDB);
        } catch (err) {
            res.status(500).send(err);
        }
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

                const productModel = new ProductModel(data);
                try {
                    productModel.save();
                    res.status(200).send({ message: "Success!" });
                } catch (err) {
                    res.status(500).send(err);
                }
            });
        } catch (err) {
            console.log(err);
        }
    }
}