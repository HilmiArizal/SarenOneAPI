const PORT = process.env.PORT || 8000;
const connection = require('./src/Database');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotEnv = require('dotenv');
dotEnv.config({path: 'config.env'});

// DATABASE CONNECTION
connection();

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


app.get('/', (req, res) => {
    res.send(`SERVER RUNNING IN PORT ${PORT}`);
});

const { ProductRouter } = require('./src/Routers');
app.use('/product', ProductRouter);


app.listen(PORT, () => { console.log(`SERVER RUNNING IN PORT ${PORT}`) });