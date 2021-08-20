const MongooseClient = require('mongoose');


const connectionDB = async () => {
    try {
        const connection = await MongooseClient.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        console.log(`Mongo DB Connected : ${connection.connection.host}`);
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectionDB;